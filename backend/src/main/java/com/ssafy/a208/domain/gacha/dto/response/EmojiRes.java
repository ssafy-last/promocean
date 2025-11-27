package com.ssafy.a208.domain.gacha.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Schema(description = "이모지 응답")
@Builder
public record EmojiRes(
        @Schema(description = "이모지 ID", example = "1")
        Long emojiId,

        @Schema(description = "이모지 이름", example = "행복한 오리")
        String name,

        @Schema(description = "이모지 등급", example = "레어")
        String grade,

        @Schema(description = "카테고리 이름", example = "동물")
        String categoryName,

        @Schema(description = "이모지 확률 (백분율)", example = "30.0")
        Double probability,

        @Schema(description = "이모지 이미지 URL", example = "https://클라우드프론트url/emoji.png")
        String imageUrl
) {
}