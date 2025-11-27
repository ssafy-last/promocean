// GachaRes.java
package com.ssafy.a208.domain.gacha.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Schema(description = "가챠 결과 응답")
@Builder
public record GachaRes(
        @Schema(description = "뽑은 이모지 ID", example = "1")
        Long emojiId,

        @Schema(description = "이모지 등급", example = "레어")
        String grade,

        @Schema(description = "이모지 이미지 URL", example = "https://클라우드프론트url/emoji.png")
        String imageUrl,

        @Schema(description = "신규 획득 여부", example = "true")
        boolean isNew
) {
}