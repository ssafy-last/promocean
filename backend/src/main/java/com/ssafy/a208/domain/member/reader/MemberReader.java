package com.ssafy.a208.domain.member.reader;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.exception.MemberNotFoundException;
import com.ssafy.a208.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberReader {

    private final MemberRepository memberRepository;

    public Member getMemberById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(MemberNotFoundException::new);
    }
}
