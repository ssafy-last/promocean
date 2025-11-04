package com.ssafy.a208.domain.contest.dto;

import com.ssafy.a208.domain.contest.entity.Contest;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record ContestListRes(
        Long contestId,
        String title,
        String host,
        String profileUrl,
        LocalDate startAt,
        LocalDate endAt,
        String status,
        LocalDate updatedAt
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
                contest.getUpdatedAt().toLocalDate()
        );
    }
}
