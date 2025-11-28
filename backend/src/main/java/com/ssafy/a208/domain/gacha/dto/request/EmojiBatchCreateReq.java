package com.ssafy.a208.domain.gacha.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Schema(description = "이모지 일괄 생성 요청")
public record EmojiBatchCreateReq(
        @NotNull(message = "카테고리는 필수입니다")
        @Schema(description = "카테고리 ID", example = "1")
        Long categoryId,

        @NotEmpty(message = "이모지는 최소 1개 이상이어야 합니다")
        @Valid
        @Schema(description = "이모지 목록")
        List<EmojiItem> emojis
) {
    @Schema(description = "이모지 항목")
    public record EmojiItem(
            @NotNull(message = "이모지 등급은 필수입니다")
            @Schema(description = "이모지 등급 (COMMON, RARE, EPIC, LEGENDARY)", example = "RARE")
            String grade,

            @NotNull(message = "이모지 이미지 경로는 필수입니다")
            @Schema(description = "이모지 이미지 파일 경로 (tmp/로 시작)", example = "tmp/happy-duck.png")
            String filePath
    ) {
    }
}