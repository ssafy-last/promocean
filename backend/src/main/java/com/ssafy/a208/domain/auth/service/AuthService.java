package com.ssafy.a208.domain.auth.service;

import com.ssafy.a208.domain.auth.dto.LoginReq;
import com.ssafy.a208.domain.auth.dto.LoginRes;
import com.ssafy.a208.domain.auth.exception.InvalidPasswordException;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.entity.Profile;
import com.ssafy.a208.domain.member.exception.MemberNotFoundException;
import com.ssafy.a208.domain.member.repository.MemberRepository;
import com.ssafy.a208.domain.member.repository.ProfileRepository;
import com.ssafy.a208.global.common.FileEntity;
import com.ssafy.a208.global.security.util.JwtProvider;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtProvider provider;
    private final PasswordEncoder encoder;
    private final MemberRepository memberRepository;
    private final ProfileRepository profileRepository;

    public LoginRes login(LoginReq loginReq) {
        Member member = memberRepository.findByEmail(loginReq.email())
                .orElseThrow(MemberNotFoundException::new);

        if (encoder.matches(loginReq.password(), member.getPassword())) {
            String aT = provider.generateToken(member);
            Optional<Profile> profile = profileRepository.findByMember(member);

            // TODO 프로필 이미지 url에 Presigned url 적용 필요
            return LoginRes.builder()
                    .accessToken("Bearer " + aT)
                    .email(member.getEmail())
                    .nickname(member.getNickname())
                    .profileUrl(profile.map(FileEntity::getFilePath).orElse(null))
                    .build();
        }

        throw new InvalidPasswordException();
    }

}
