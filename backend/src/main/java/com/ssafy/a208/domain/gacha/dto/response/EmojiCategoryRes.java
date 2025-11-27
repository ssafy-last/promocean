package com.ssafy.a208.domain.gacha.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Schema(description = "이모지 카테고리 응답")
@Builder
public record EmojiCategoryRes(
        @Schema(description = "카테고리 ID", example = "1")
        Long categoryId,

        @Schema(description = "카테고리 이름", example = "동물")
        String name,

        @Schema(description = "카테고리 설명", example = "귀여운 동물 이모지")
        String description
) {
}