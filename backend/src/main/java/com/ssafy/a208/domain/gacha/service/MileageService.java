package com.ssafy.a208.domain.gacha.service;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.domain.member.repository.MemberRepository;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MileageService {

    private final MemberReader memberReader;

    private static final int POST_MILEAGE = 30;
    private static final int REPLY_MILEAGE = 10;

    @Transactional
    public void earnPostMileage(Member member) {
        member.earnMileage(POST_MILEAGE);
        log.info("게시글 작성 마일리지 적립 - memberId: {}, amount: {}",
                member.getId(), POST_MILEAGE);
    }

    @Transactional
    public void earnReplyMileage(Member member) {
        member.earnMileage(REPLY_MILEAGE);
        log.info("댓글 작성 마일리지 적립 - memberId: {}, amount: {}",
                member.getId(), REPLY_MILEAGE);
    }

    @Transactional(readOnly = true)
    public Integer getMileage(CustomUserDetails userDetails) {
        Member member = memberReader.getMemberById(userDetails.memberId());

        log.info("마일리지 조회 - memberId: {}, mileage: {}", member.getId(), member.getMileage());

        return member.getMileage();
    }
}