package com.ssafy.a208.domain.gacha.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

@Schema(description = "전체 이모지 목록 응답")
@Builder
public record EmojiListRes(
        @Schema(description = "이모지 목록")
        List<EmojiRes> emojis,

        @Schema(description = "총 개수", example = "10")
        int totalCount
) {
}