package com.ssafy.a208.domain.gacha.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

@Schema(description = "이모지 카테고리 목록 응답")
@Builder
public record EmojiCategoryListRes(
        @Schema(description = "카테고리 목록")
        List<EmojiCategoryRes> categories,

        @Schema(description = "총 개수", example = "5")
        int totalCount
) {
}