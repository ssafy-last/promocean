package com.ssafy.a208.domain.gacha.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

@Schema(description = "이모지 일괄 생성 응답")
@Builder
public record EmojiBatchCreateRes(
        @Schema(description = "생성된 이모지 목록")
        List<EmojiRes> emojis,

        @Schema(description = "생성 성공 개수", example = "10")
        int successCount,

        @Schema(description = "생성 실패 개수", example = "0")
        int failCount,

        @Schema(description = "실패한 파일 경로 목록")
        List<String> failedPaths
) {
}