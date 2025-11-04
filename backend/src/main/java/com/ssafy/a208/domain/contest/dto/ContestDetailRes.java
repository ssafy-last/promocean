package com.ssafy.a208.domain.contest.dto;

import com.ssafy.a208.domain.contest.entity.Contest;
import com.ssafy.a208.domain.member.entity.Profile;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record ContestDetailRes(
    long contestId,
    String author,
    String profileUrl,
    String title,
    String content,
    String type,
    LocalDate startAt,
    LocalDate endAt,
    LocalDate voteEndAt,
    LocalDate updatedAt
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
                contest.getUpdatedAt().toLocalDate()
        );
    }
}
