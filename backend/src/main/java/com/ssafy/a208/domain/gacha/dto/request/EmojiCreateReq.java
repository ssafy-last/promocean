package com.ssafy.a208.domain.gacha.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "이모지 생성 요청")
public record EmojiCreateReq(
        @NotNull(message = "이모지 등급은 필수입니다")
        @Schema(description = "이모지 등급 (COMMON, RARE, EPIC, LEGENDARY)", example = "RARE")
        String grade,

        @NotNull(message = "카테고리는 필수입니다")
        @Schema(description = "카테고리 ID", example = "1")
        Long categoryId,

        @NotBlank(message = "이모지 이미지 경로는 필수입니다")
        @Schema(description = "이모지 이미지 파일 경로 (S3)", example = "emojis/happy-duck.png")
        String filePath
) {
}