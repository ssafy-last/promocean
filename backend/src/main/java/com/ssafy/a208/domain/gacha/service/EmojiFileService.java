package com.ssafy.a208.domain.gacha.service;

import com.ssafy.a208.domain.gacha.entity.Emoji;
import com.ssafy.a208.domain.gacha.entity.EmojiFile;
import com.ssafy.a208.domain.gacha.repository.EmojiFileRepository;
import com.ssafy.a208.global.common.enums.ImageDirectory;
import com.ssafy.a208.global.image.dto.FileMetaData;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.security.exception.InvalidFilePathException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 이모지 파일 관련 서비스
 * 파일 생성, 삭제를 담당합니다.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EmojiFileService {

    private final S3Service s3Service;
    private final EmojiFileRepository emojiFileRepository;

    /**
     * 이모지 파일을 생성합니다.
     *
     * @param filePath 파일 경로 (tmp/ 경로)
     * @param emoji 이모지 엔티티
     * @return 이동된 파일 경로
     */
    @Transactional
    public String createEmojiFile(String filePath, Emoji emoji) {
        // tmp/ 경로 검증 및 emojis 디렉토리로 이동
        String destPath = extractFilePath(filePath);

        // S3에서 파일 메타데이터 가져오기
        FileMetaData metaData = s3Service.getFileMetadata(destPath);

        // 이모지 파일 엔티티 생성
        EmojiFile emojiFile = EmojiFile.builder()
                .originalName(metaData.originalName())
                .filePath(metaData.filePath())
                .size(metaData.size())
                .contentType(metaData.contentType())
                .emoji(emoji)
                .build();

        emojiFileRepository.save(emojiFile);

        log.info("이모지 파일 생성 완료 - emojiId: {}, filePath: {}", emoji.getId(), destPath);

        return destPath;
    }

    /**
     * 이모지 파일을 삭제합니다.
     *
     * @param emojiFile 삭제할 EmojiFile 엔티티
     */
    @Transactional
    public void deleteEmojiFile(EmojiFile emojiFile) {
        // S3에서 파일 삭제
        s3Service.deleteFile(emojiFile.getFilePath());

        // 소프트 딜리트
        emojiFile.deleteEmojiFile();

        log.info("이모지 파일 삭제 완료 - filePath: {}", emojiFile.getFilePath());
    }

    /**
     * tmp/ 경로 검증 및 파일 이동을 담당하는 헬퍼 메서드입니다.
     * - S3Service.moveObject 호출 시 emojis 디렉토리로 이동
     *
     * @param filePath 원본 파일 경로 (tmp/ 경로여야 함)
     * @return 이동된 파일의 최종 경로
     * @throws InvalidFilePathException tmp/ 경로가 아닐 경우
     */
    private String extractFilePath(String filePath) {
        if (!filePath.startsWith("tmp/")) {
            throw new InvalidFilePathException();
        }
        return s3Service.moveObject(filePath, ImageDirectory.EMOJIS);
    }
}