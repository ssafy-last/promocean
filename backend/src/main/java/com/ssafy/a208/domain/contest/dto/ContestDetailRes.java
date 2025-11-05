package com.ssafy.a208.domain.contest.dto;

import com.ssafy.a208.domain.contest.entity.Contest;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record ContestDetailRes(
    long contestId,
    String author,
    String profileUrl,
    String title,
    String content,
    String type,
    LocalDateTime startAt,
    LocalDateTime endAt,
    LocalDateTime voteEndAt,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {
    public static ContestDetailRes from(Contest contest, String profileUrl) {
        return new ContestDetailRes(
                contest.getId(),
                contest.getHost().getNickname(),
                profileUrl,
                contest.getTitle(),
                contest.getContent(),
                contest.getType().getName(),
                contest.getStartAt(),
                contest.getEndAt(),
                contest.getVoteEndAt(),
                contest.getCreatedAt(),
                contest.getUpdatedAt()
        );
    }
}
