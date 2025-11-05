package com.ssafy.a208.domain.member.service;

import com.ssafy.a208.domain.member.dto.request.SignupReq;
import com.ssafy.a208.domain.member.dto.request.UpdateMemberReq;
import com.ssafy.a208.domain.member.dto.response.CheckDuplicateRes;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.entity.Profile;
import com.ssafy.a208.domain.member.exception.InvalidMemberCheckRequestException;
import com.ssafy.a208.domain.member.exception.MemberNotFoundException;
import com.ssafy.a208.domain.member.repository.MemberRepository;
import com.ssafy.a208.domain.member.repository.ProfileRepository;
import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.service.SpaceService;
import com.ssafy.a208.global.common.enums.ImageDirectory;
import com.ssafy.a208.global.image.dto.FileMetaData;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import com.ssafy.a208.global.security.exception.InvalidFilePathException;
import com.ssafy.a208.global.security.exception.S3OperationException;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.services.s3.model.S3Exception;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final S3Service s3Service;
    private final PasswordEncoder encoder;
    private final SpaceService spaceService;
    private final MemberRepository memberRepository;
    private final ProfileRepository profileRepository;

    private static final int TOKEN_AMOUNT = 5;
    private static final String DEFAULT_PROFILE_KEY = "profiles/default-profile.png";

    @Transactional
    public void signup(SignupReq signupReq) {
        Space space = spaceService.createPersonalSpace(signupReq.nickname());
        String encodedPassword = encoder.encode(signupReq.password());
        Member member = Member.builder()
                .email(signupReq.email())
                .nickname(signupReq.nickname())
                .password(encodedPassword)
                .usableCnt(TOKEN_AMOUNT)
                .personalSpace(space)
                .build();
        String filePath = resolveProfileKey(signupReq.filePath());
        FileMetaData fileMetaData = s3Service.getFileMetadata(filePath);
        Profile profile = Profile.builder()
                .member(member)
                .contentType(fileMetaData.contentType())
                .size(fileMetaData.size())
                .filePath(fileMetaData.filePath())
                .originalName(fileMetaData.originalName())
                .build();
        memberRepository.save(member);
        profileRepository.save(profile);
    }

    @Transactional
    public void withdrawal(CustomUserDetails userDetails) {
        Member member = memberRepository.findByIdAndDeletedAtIsNull(userDetails.memberId())
                .orElseThrow(MemberNotFoundException::new);

        // TODO Member 연결된 Entity 삭제 필요
        member.deleteMember();
    }

    @Transactional
    public void updateMember(CustomUserDetails userDetails, UpdateMemberReq memberReq) {
        Member member = memberRepository.findByIdAndDeletedAtIsNull(userDetails.memberId())
                .orElseThrow(MemberNotFoundException::new);
        Optional<Profile> profile = profileRepository.findByMemberIdAndDeletedAtIsNull(
                member.getId());

        if (!Objects.isNull(memberReq.nickname()) && !memberReq.nickname().isBlank()) {
            member.updateNickname(memberReq.nickname());
        }

        if (!Objects.isNull(memberReq.password()) && !memberReq.password().isBlank()) {
            String encodedPassword = encoder.encode(memberReq.password());
            member.updatePassword(encodedPassword);
        }

        if (!Objects.isNull(memberReq.filePath()) && !memberReq.filePath().isBlank()) {
            String filePath = resolveProfileKey(memberReq.filePath());
            FileMetaData fileMetaData = s3Service.getFileMetadata(filePath);

            profile.ifPresentOrElse(
                    existing -> {
                        if (!Objects.equals(existing.getFilePath(), DEFAULT_PROFILE_KEY)) {
                            s3Service.deleteFile(existing.getFilePath());
                        }
                        existing.updateFile(fileMetaData);
                    },
                    () -> {
                        Profile newProfile = Profile.builder()
                                .member(member)
                                .contentType(fileMetaData.contentType())
                                .size(fileMetaData.size())
                                .filePath(fileMetaData.filePath())
                                .originalName(fileMetaData.originalName())
                                .build();
                        profileRepository.save(newProfile);
                    }
            );
        }
    }

    @Transactional(readOnly = true)
    public CheckDuplicateRes checkDuplicate(String email, String nickname) {
        if ((Objects.isNull(email) && Objects.isNull(nickname))
                || (!Objects.isNull(email) && !Objects.isNull(nickname))) {
            throw new InvalidMemberCheckRequestException();
        }

        if (!Objects.isNull(email)) {
            boolean isDuplicated = memberRepository.existsByEmail(email);
            return CheckDuplicateRes.builder()
                    .isDuplicated(isDuplicated)
                    .build();
        }

        boolean isDuplicated = memberRepository.existsByNickname(nickname);
        return CheckDuplicateRes.builder()
                .isDuplicated(isDuplicated)
                .build();
    }

    private String resolveProfileKey(String filePath) {
        if (Objects.isNull(filePath) || filePath.isBlank()) {
            return DEFAULT_PROFILE_KEY;
        }

        if (!filePath.startsWith("tmp")) {
            throw new InvalidFilePathException();
        }
        try {
            return s3Service.moveObject(filePath, ImageDirectory.PROFILES);
        } catch (S3Exception e) {
            e.printStackTrace();
            throw new S3OperationException(HttpStatus.valueOf(e.statusCode()));
        }
    }
}
