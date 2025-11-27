package com.ssafy.a208.domain.board.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;

/**
 * 댓글 작성/수정 요청 DTO
 */
@Schema(description = "댓글 작성/수정 요청")
public record ReplyReq(
        @Size(max = 1000, message = "댓글은 1000자까지 작성할 수 있습니다.")
        @Schema(description = "댓글 내용 (이모지만 사용할 경우 null 가능)", example = "정말 유용한 프롬프트네요!")
        String content,

        @Schema(description = "사용할 이모지 ID (선택)", example = "1")
        Long emojiId
) {
    public ReplyReq {
        if ((content == null || content.isBlank()) && emojiId == null) {
            throw new IllegalArgumentException("댓글 내용 또는 이모지 중 하나는 필수입니다");
        }
    }
}