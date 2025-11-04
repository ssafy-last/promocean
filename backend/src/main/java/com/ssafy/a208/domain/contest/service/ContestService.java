package com.ssafy.a208.domain.contest.service;

import com.ssafy.a208.domain.contest.dto.ContestCreateReq;
import com.ssafy.a208.domain.contest.dto.ContestDetailRes;
import com.ssafy.a208.domain.contest.dto.ContestListRes;
import com.ssafy.a208.domain.contest.entity.Contest;
import com.ssafy.a208.domain.contest.exception.ContestNotFoundException;
import com.ssafy.a208.domain.contest.exception.InvalidAuthorException;
import com.ssafy.a208.domain.contest.repository.ContestRepository;
import com.ssafy.a208.domain.contest.util.ContestValidator;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.entity.Profile;
import com.ssafy.a208.domain.member.exception.ProfileNotFoundException;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.domain.member.repository.ProfileRepository;
import com.ssafy.a208.global.common.enums.ContestStatus;
import com.ssafy.a208.global.common.enums.PromptType;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ContestService {

    private final ContestRepository contestRepository;
    private final MemberReader memberReader;
    private final ProfileRepository profileRepository;

    private final S3Service s3Service;
    private final ContestValidator contestValidator;

    @Transactional
    public ContestDetailRes createContest(
            ContestCreateReq contestCreateReq,
            CustomUserDetails customUserDetails
    ) {
        Member host = memberReader.getMemberById(customUserDetails.memberId());

        contestValidator.validateRole(host.getRole());
        contestValidator.validateDate(true, contestCreateReq);

        PromptType type = PromptType.valueOf(contestCreateReq.type());

        Contest contest =  Contest.builder()
                .title(contestCreateReq.title())
                .content(contestCreateReq.content())
                .type(type)
                .startAt(contestCreateReq.startAt())
                .endAt(contestCreateReq.endAt())
                .voteEndAt(contestCreateReq.voteEndAt())
                .host(host)
                .build();

        contestRepository.save(contest);

        Profile profile = profileRepository.findByMemberIdAndDeletedAtIsNull(customUserDetails.memberId())
                .orElseThrow(ProfileNotFoundException::new);

        String profileUrl =  s3Service.getCloudFrontUrl(profile.getFilePath());

        return ContestDetailRes.from(contest, profileUrl);
    }

    @Transactional(readOnly = true)
    public Page<ContestListRes> getContestList(
            Pageable pageable,
            ContestStatus contestStatus,
            String title
    ) {
        Page<Contest> page;
        if(contestStatus == null && title == null) {
            page = contestRepository.findAll(pageable);
        } else if(contestStatus != null && title == null) {
            page = contestRepository.findByStatus(pageable, contestStatus);
        } else if(contestStatus == null) {
            page = contestRepository.findByTitleContainingIgnoreCase(pageable, title);
        } else {
            page = contestRepository.findByStatusAndTitleContainingIgnoreCase(pageable, contestStatus, title);
        }

        List<ContestListRes> contestList = page.getContent().stream()
            .map(contest -> {
                Long hostId = contest.getHost().getId();
                Profile profile = profileRepository.findByMemberIdAndDeletedAtIsNull(hostId).orElse(null);
                String profileUrl = (profile != null)
                    ? s3Service.getCloudFrontUrl(profile.getFilePath())
                    : null;

                return ContestListRes.from(contest, profileUrl);
            })
            .toList();

        return new PageImpl<>(contestList, pageable, page.getTotalElements());
    }

    @Transactional(readOnly = true)
    public ContestDetailRes getContest(
            Long contestId
    ) {
        Contest contest = contestRepository.findById(contestId)
            .orElseThrow(ContestNotFoundException::new);
        Profile profile = profileRepository.findByMemberIdAndDeletedAtIsNull(contest.getHost().getId())
            .orElseThrow(ProfileNotFoundException::new);
        String profileUrl =  s3Service.getCloudFrontUrl(profile.getFilePath());

        return ContestDetailRes.from(contest, profileUrl);
    }

    @Transactional
    public void updateContest(
            Long contestId,
            ContestCreateReq contestCreateReq,
            CustomUserDetails customUserDetails
    ) {
        Contest contest = contestRepository.findById(contestId)
            .orElseThrow(ContestNotFoundException::new);
        Member member = memberReader.getMemberById(customUserDetails.memberId());

        contestValidator.validateHost(member.getId(), contest.getHost().getId());
        contestValidator.validateRole(member.getRole());
        contestValidator.validateDate(false, contestCreateReq);

        contest.updateContest(contestCreateReq, PromptType.valueOf(contestCreateReq.type()));
    }
}
