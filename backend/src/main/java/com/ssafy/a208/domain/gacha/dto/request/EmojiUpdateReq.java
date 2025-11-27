package com.ssafy.a208.domain.gacha.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

@Schema(description = "이모지 확률 수정 요청")
public record EmojiUpdateReq(
        @NotNull(message = "확률은 필수입니다")
        @DecimalMin(value = "0.1", message = "확률은 0.1 이상이어야 합니다")
        @DecimalMax(value = "100.0", message = "확률은 100 이하여야 합니다")
        @Schema(description = "이모지 확률 (백분율)", example = "15.5")
        Double probability
) {
}