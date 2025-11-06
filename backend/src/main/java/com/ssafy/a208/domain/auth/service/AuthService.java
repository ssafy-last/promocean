package com.ssafy.a208.domain.auth.service;

import com.ssafy.a208.domain.auth.dto.LoginReq;
import com.ssafy.a208.domain.auth.dto.LoginRes;
import com.ssafy.a208.domain.auth.exception.InvalidPasswordException;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.entity.Profile;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.domain.member.reader.ProfileReader;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.security.util.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final S3Service s3Service;
    private final JwtProvider provider;
    private final PasswordEncoder encoder;
    private final MemberReader memberReader;
    private final ProfileReader profileReader;

    public LoginRes login(LoginReq loginReq) {
        Member member = memberReader.getMemberByEmail(loginReq.email());

        if (encoder.matches(loginReq.password(), member.getPassword())) {
            String aT = provider.generateToken(member);
            Profile profile = profileReader.getProfile(member.getId());

            return LoginRes.builder()
                    .accessToken("Bearer " + aT)
                    .email(member.getEmail())
                    .nickname(member.getNickname())
                    .profileUrl(s3Service.getCloudFrontUrl(profile.getFilePath()))
                    .personalSpaceId(member.getPersonalSpace().getId())
                    .build();
        }

        throw new InvalidPasswordException();
    }

}
