// MyEmojiListRes.java
package com.ssafy.a208.domain.gacha.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Schema(description = "보유 이모지 목록 응답 (카테고리별)")
@Builder
public record MyEmojiListRes(
        @Schema(description = "카테고리별 이모지 목록")
        List<CategoryDto> categories,

        @Schema(description = "총 보유 개수", example = "5")
        int totalCount
) {
    @Schema(description = "카테고리별 이모지")
    @Builder
    public record CategoryDto(
            @Schema(description = "카테고리 ID", example = "1")
            Long categoryId,

            @Schema(description = "카테고리 이름", example = "동물")
            String categoryName,

            @Schema(description = "해당 카테고리의 이모지 목록")
            List<EmojiDto> emojis
    ) {
    }

    @Schema(description = "이모지 정보")
    @Builder
    public record EmojiDto(
            @Schema(description = "이모지 ID", example = "1")
            Long emojiId,

            @Schema(description = "이모지 등급", example = "레어")
            String grade,

            @Schema(description = "이모지 이미지 URL", example = "https://클라우드프론트url/emoji.png")
            String imageUrl,

            @Schema(description = "획득 일시", example = "2025-11-27T10:00:00")
            LocalDateTime obtainedAt
    ) {
    }
}