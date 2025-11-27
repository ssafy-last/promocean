package com.ssafy.a208.domain.gacha.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "이모지 카테고리 생성 요청")
public record EmojiCategoryCreateReq(
        @NotBlank(message = "카테고리 이름은 필수입니다")
        @Schema(description = "카테고리 이름", example = "동물")
        String name,

        @Schema(description = "카테고리 설명", example = "귀여운 동물 이모지")
        String description
) {
}