package com.ssafy.a208.domain.contest.util;

import com.ssafy.a208.domain.contest.dto.ContestCreateReq;
import com.ssafy.a208.domain.contest.exception.InvalidAuthorException;
import com.ssafy.a208.domain.contest.exception.InvalidEndException;
import com.ssafy.a208.domain.contest.exception.InvalidRoleException;
import com.ssafy.a208.domain.contest.exception.InvalidStartException;
import com.ssafy.a208.domain.contest.exception.InvalidVoteException;
import com.ssafy.a208.global.common.enums.MemberRole;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ContestValidator {

    public void validateDate(
            boolean startValid,
            ContestCreateReq contestCreateReq
    ) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startAt = contestCreateReq.startAt();
        LocalDateTime endAt = contestCreateReq.endAt();
        LocalDateTime voteEndAt = contestCreateReq.voteEndAt();

        if(startValid && startAt.isBefore(now)) {
            throw new InvalidStartException();
        }
        if(endAt.isBefore(startAt)) {
            throw new InvalidEndException();
        }
        if(voteEndAt.isBefore(endAt)) {
            throw new InvalidVoteException();
        }
    }

    public void validateRole(MemberRole role) {
        if(role != MemberRole.ADMIN) {
            throw new InvalidRoleException();
        }
    }

    public void validateHost(Long memberId, Long hostId) {
        if(!Objects.equals(memberId, hostId)) {
            throw new InvalidAuthorException();
        }
    }
}
