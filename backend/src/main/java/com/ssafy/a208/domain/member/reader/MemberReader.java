package com.ssafy.a208.domain.member.reader;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.exception.MemberNotFoundException;
import com.ssafy.a208.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class MemberReader {
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public Member getMemberById(Long memberId) {
        return memberRepository.findByIdAndDeletedAtIsNull(memberId).orElseThrow(
                MemberNotFoundException::new);
    }
}
