package com.ssafy.a208.domain.gacha.service;

import com.ssafy.a208.domain.gacha.dto.response.GachaRes;
import com.ssafy.a208.domain.gacha.entity.Emoji;
import com.ssafy.a208.domain.gacha.entity.MemberEmoji;
import com.ssafy.a208.domain.gacha.exception.AllEmojisOwnedException;
import com.ssafy.a208.domain.gacha.reader.EmojiReader;
import com.ssafy.a208.domain.gacha.reader.MemberEmojiReader;
import com.ssafy.a208.domain.gacha.repository.MemberEmojiRepository;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class GachaService {

    private final MemberReader memberReader;
    private final EmojiReader emojiReader;
    private final MemberEmojiReader memberEmojiReader;
    private final MemberEmojiRepository memberEmojiRepository;
    private final S3Service s3Service;

    private static final int GACHA_COST = 100;

    @Transactional
    public GachaRes drawGacha(CustomUserDetails userDetails) {
        Member member = memberReader.getMemberById(userDetails.memberId());

        // 마일리지 차감
        member.useMileage(GACHA_COST);

        // 보유하지 않은 이모지 중에서 뽑기
        Emoji drawnEmoji = selectRandomEmojiExcludingOwned(member);

        // 보유 이모지에 추가
        MemberEmoji memberEmoji = MemberEmoji.builder()
                .member(member)
                .emoji(drawnEmoji)
                .obtainedAt(LocalDateTime.now())
                .build();
        memberEmojiRepository.save(memberEmoji);

        log.info("가챠 완료 - memberId: {}, emojiId: {}, grade: {}",
                member.getId(), drawnEmoji.getId(), drawnEmoji.getGrade());

        // 이미지 URL 생성
        String imageUrl = drawnEmoji.getEmojiFile() != null ?
                s3Service.getCloudFrontUrl(drawnEmoji.getEmojiFile().getFilePath()) : null;

        return GachaRes.builder()
                .emojiId(drawnEmoji.getId())
                .grade(drawnEmoji.getGrade().getName())
                .imageUrl(imageUrl)
                .isNew(true)
                .build();
    }

    private Emoji selectRandomEmojiExcludingOwned(Member member) {
        // 전체 이모지 목록
        List<Emoji> allEmojis = emojiReader.getAllEmojis();

        // 보유한 이모지 ID 집합
        Set<Long> ownedEmojiIds = memberEmojiReader.getOwnedEmojiIdsByMember(member);

        // 보유하지 않은 이모지만 필터링
        List<Emoji> availableEmojis = allEmojis.stream()
                .filter(emoji -> !ownedEmojiIds.contains(emoji.getId()))
                .toList();

        // 모든 이모지를 보유한 경우
        if (availableEmojis.isEmpty()) {
            throw new AllEmojisOwnedException();
        }

        // 확률 기반 랜덤 선택
        double totalProbability = availableEmojis.stream()
                .mapToDouble(Emoji::getProbability)
                .sum();

        double random = Math.random() * totalProbability;
        double cumulative = 0.0;

        for (Emoji emoji : availableEmojis) {
            cumulative += emoji.getProbability();
            if (random <= cumulative) {
                return emoji;
            }
        }

        return availableEmojis.get(availableEmojis.size() - 1);
    }
}