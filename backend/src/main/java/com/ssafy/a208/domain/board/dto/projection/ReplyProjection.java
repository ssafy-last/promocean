package com.ssafy.a208.domain.board.dto.projection;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * 댓글 조회용 Projection DTO
 */
@Getter
public class ReplyProjection {

    private final Long replyId;
    private final String authorNickname;
    private final String profilePath;
    private final String content;
    private final Long emojiId;
    private final String emojiImagePath;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    @QueryProjection
    public ReplyProjection(
            Long replyId,
            String authorNickname,
            String profilePath,
            String content,
            Long emojiId,
            String emojiImagePath,
            LocalDateTime createdAt,
            LocalDateTime updatedAt
    ) {
        this.replyId = replyId;
        this.authorNickname = authorNickname;
        this.profilePath = profilePath;
        this.content = content;
        this.emojiId = emojiId;
        this.emojiImagePath = emojiImagePath;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}