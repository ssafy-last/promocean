package com.ssafy.a208.domain.gacha.service;

import com.ssafy.a208.domain.gacha.dto.response.MyEmojiListRes;
import com.ssafy.a208.domain.gacha.dto.response.MyEmojiListRes.CategoryDto;
import com.ssafy.a208.domain.gacha.dto.response.MyEmojiListRes.EmojiDto;
import com.ssafy.a208.domain.gacha.entity.Emoji;
import com.ssafy.a208.domain.gacha.entity.EmojiCategory;
import com.ssafy.a208.domain.gacha.entity.MemberEmoji;
import com.ssafy.a208.domain.gacha.reader.MemberEmojiReader;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberEmojiService {

    private final MemberReader memberReader;
    private final MemberEmojiReader memberEmojiReader;
    private final S3Service s3Service;

    @Transactional(readOnly = true)
    public MyEmojiListRes getMyEmojis(CustomUserDetails userDetails) {
        Member member = memberReader.getMemberById(userDetails.memberId());

        List<MemberEmoji> memberEmojis = memberEmojiReader.getMemberEmojisByMember(member);

        Map<EmojiCategory, List<MemberEmoji>> emojisByCategory = memberEmojis.stream()
                .collect(Collectors.groupingBy(me -> me.getEmoji().getCategory()));

        List<CategoryDto> categoryDtos = emojisByCategory.entrySet().stream()
                .map(entry -> {
                    EmojiCategory category = entry.getKey();
                    List<MemberEmoji> emojisInCategory = entry.getValue();

                    List<EmojiDto> emojiDtos = emojisInCategory.stream()
                            .map(me -> {
                                Emoji emoji = me.getEmoji();
                                String imageUrl = emoji.getEmojiFile() != null ?
                                        s3Service.getCloudFrontUrl(emoji.getEmojiFile().getFilePath()) : null;

                                return EmojiDto.builder()
                                        .emojiId(emoji.getId())
                                        .grade(emoji.getGrade().getName())
                                        .imageUrl(imageUrl)
                                        .obtainedAt(me.getObtainedAt())
                                        .build();
                            })
                            .toList();

                    return CategoryDto.builder()
                            .categoryId(category.getId())
                            .categoryName(category.getName())
                            .emojis(emojiDtos)
                            .build();
                })
                .toList();

        int totalCount = memberEmojis.size();

        log.info("보유 이모지 목록 조회 완료 - memberId: {}, totalCount: {}, categories: {}",
                member.getId(), totalCount, categoryDtos.size());

        return MyEmojiListRes.builder()
                .categories(categoryDtos)
                .totalCount(totalCount)
                .build();
    }
}