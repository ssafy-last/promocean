package com.ssafy.a208.domain.gacha.service;

import com.ssafy.a208.domain.gacha.dto.request.EmojiBatchCreateReq;
import com.ssafy.a208.domain.gacha.dto.request.EmojiCreateReq;
import com.ssafy.a208.domain.gacha.dto.request.EmojiUpdateReq;
import com.ssafy.a208.domain.gacha.dto.response.EmojiBatchCreateRes;
import com.ssafy.a208.domain.gacha.dto.response.EmojiListRes;
import com.ssafy.a208.domain.gacha.dto.response.EmojiRes;
import com.ssafy.a208.domain.gacha.entity.Emoji;
import com.ssafy.a208.domain.gacha.entity.EmojiCategory;
import com.ssafy.a208.domain.gacha.exception.InvalidEmojiGradeException;
import com.ssafy.a208.domain.gacha.reader.EmojiCategoryReader;
import com.ssafy.a208.domain.gacha.reader.EmojiReader;
import com.ssafy.a208.domain.gacha.repository.EmojiRepository;
import com.ssafy.a208.global.common.enums.EmojiGrade;
import com.ssafy.a208.global.image.service.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmojiAdminService {

    private final EmojiRepository emojiRepository;
    private final EmojiReader emojiReader;
    private final EmojiCategoryReader emojiCategoryReader;
    private final EmojiFileService emojiFileService;
    private final S3Service s3Service;

    @Transactional
    public EmojiRes createEmoji(EmojiCreateReq req) {
        EmojiGrade grade;
        try {
            grade = EmojiGrade.valueOf(req.grade().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidEmojiGradeException();
        }

        EmojiCategory category = emojiCategoryReader.getEmojiCategoryById(req.categoryId());

        Double defaultProbability = grade.getDefaultProbability();

        Emoji emoji = Emoji.builder()
                .grade(grade)
                .probability(defaultProbability)
                .category(category)
                .build();

        emojiRepository.save(emoji);

        String destPath = emojiFileService.createEmojiFile(req.filePath(), emoji);

        log.info("이모지 생성 완료 - emojiId: {}, grade: {}, category: {}, probability: {}",
                emoji.getId(), grade, category.getName(), defaultProbability);

        String imageUrl = s3Service.getCloudFrontUrl(destPath);

        return EmojiRes.builder()
                .emojiId(emoji.getId())
                .grade(grade.getName())
                .categoryName(category.getName())
                .probability(defaultProbability)
                .imageUrl(imageUrl)
                .build();
    }

    @Transactional(readOnly = true)
    public EmojiListRes getAllEmojis() {
        List<Emoji> emojis = emojiReader.getAllEmojis();

        List<EmojiRes> emojiResList = emojis.stream()
                .map(emoji -> {
                    String imageUrl = emoji.getEmojiFile() != null ?
                            s3Service.getCloudFrontUrl(emoji.getEmojiFile().getFilePath()) : null;

                    return EmojiRes.builder()
                            .emojiId(emoji.getId())
                            .grade(emoji.getGrade().getName())
                            .categoryName(emoji.getCategory().getName())
                            .probability(emoji.getProbability())
                            .imageUrl(imageUrl)
                            .build();
                })
                .toList();

        log.info("전체 이모지 목록 조회 완료 - count: {}", emojiResList.size());

        return EmojiListRes.builder()
                .emojis(emojiResList)
                .totalCount(emojiResList.size())
                .build();
    }

    @Transactional
    public EmojiRes updateEmojiProbability(Long emojiId, EmojiUpdateReq req) {
        Emoji emoji = emojiReader.getEmojiById(emojiId);

        emoji.updateProbability(req.probability());

        log.info("이모지 확률 수정 완료 - emojiId: {}, new: {}",
                emojiId, req.probability());

        String imageUrl = emoji.getEmojiFile() != null ?
                s3Service.getCloudFrontUrl(emoji.getEmojiFile().getFilePath()) : null;

        return EmojiRes.builder()
                .emojiId(emoji.getId())
                .grade(emoji.getGrade().getName())
                .categoryName(emoji.getCategory().getName())
                .probability(emoji.getProbability())
                .imageUrl(imageUrl)
                .build();
    }


    @Transactional
    public EmojiBatchCreateRes createEmojiBatch(EmojiBatchCreateReq req) {
        // 카테고리 조회
        EmojiCategory category = emojiCategoryReader.getEmojiCategoryById(req.categoryId());

        List<EmojiRes> createdEmojis = new ArrayList<>();
        List<String> failedPaths = new ArrayList<>();

        // 각 이모지 항목 처리
        for (EmojiBatchCreateReq.EmojiItem item : req.emojis()) {
            try {
                // 등급 검증
                EmojiGrade grade;
                try {
                    grade = EmojiGrade.valueOf(item.grade().toUpperCase());
                } catch (IllegalArgumentException e) {
                    log.error("유효하지 않은 등급 - filePath: {}, grade: {}", item.filePath(), item.grade());
                    failedPaths.add(item.filePath());
                    continue;  // 다음 이모지 처리
                }

                Double defaultProbability = grade.getDefaultProbability();

                // 이모지 생성
                Emoji emoji = Emoji.builder()
                        .grade(grade)
                        .probability(defaultProbability)
                        .category(category)
                        .build();

                emojiRepository.save(emoji);

                // 파일 처리
                String destPath = emojiFileService.createEmojiFile(item.filePath(), emoji);
                String imageUrl = s3Service.getCloudFrontUrl(destPath);

                EmojiRes emojiRes = EmojiRes.builder()
                        .emojiId(emoji.getId())
                        .grade(grade.getName())
                        .categoryName(category.getName())
                        .probability(defaultProbability)
                        .imageUrl(imageUrl)
                        .build();

                createdEmojis.add(emojiRes);

                log.info("이모지 생성 성공 - emojiId: {}, grade: {}, filePath: {}",
                        emoji.getId(), grade, item.filePath());

            } catch (Exception e) {
                log.error("이모지 생성 실패 - filePath: {}, error: {}", item.filePath(), e.getMessage());
                failedPaths.add(item.filePath());
            }
        }

        int successCount = createdEmojis.size();
        int failCount = failedPaths.size();

        log.info("이모지 일괄 생성 완료 - category: {}, total: {}, success: {}, fail: {}",
                category.getName(), req.emojis().size(), successCount, failCount);

        return EmojiBatchCreateRes.builder()
                .emojis(createdEmojis)
                .successCount(successCount)
                .failCount(failCount)
                .failedPaths(failedPaths)
                .build();
    }

    @Transactional
    public void deleteEmoji(Long emojiId) {
        Emoji emoji = emojiReader.getEmojiById(emojiId);

        if (emoji.getEmojiFile() != null) {
            emojiFileService.deleteEmojiFile(emoji.getEmojiFile());
        }

        emoji.deleteEmoji();

        log.info("이모지 삭제 완료 - emojiId: {}", emojiId);
    }
}