package com.ssafy.a208.domain.contest.dto;

import com.ssafy.a208.domain.contest.entity.Contest;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record ContestListRes(
        Long contestId,
        String title,
        String host,
        String profileUrl,
        LocalDateTime startAt,
        LocalDateTime endAt,
        String status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static ContestListRes from(Contest contest, String profileUrl) {
        return new ContestListRes(
                contest.getId(),
                contest.getTitle(),
                contest.getHost().getNickname(),
                profileUrl,
                contest.getStartAt(),
                contest.getEndAt(),
                contest.getStatus().getName(),
                contest.getCreatedAt(),
                contest.getUpdatedAt()
        );
    }
}
