package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.repository.MemberRepository;
import com.ssafy.a208.domain.space.dto.request.SpaceReq;
import com.ssafy.a208.domain.space.dto.response.folder.FolderInfo;
import com.ssafy.a208.domain.space.dto.response.space.SpaceDetailRes;
import com.ssafy.a208.domain.space.dto.response.space.SpaceInfoRes;
import com.ssafy.a208.domain.space.dto.response.space.SpaceSummariesRes;
import com.ssafy.a208.domain.space.dto.response.space.SpaceSummaryRes;
import com.ssafy.a208.domain.space.entity.Participant;
import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.exception.space.CannotDeletePersonalSpaceException;
import com.ssafy.a208.domain.space.repository.SpaceRepository;
import com.ssafy.a208.global.common.enums.ParticipantRole;
import com.ssafy.a208.global.common.enums.SpaceType;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SpaceService {

    private final SpaceRepository spaceRepository;
    private final MemberRepository memberRepository;
    private final ParticipantService participantService;
    private final FolderService folderService;

    @Transactional
    public SpaceInfoRes saveSpace(SpaceReq spaceReq, CustomUserDetails userDetails) {
        // TODO: memberService로 변경
        Member member = memberRepository.findByEmail(userDetails.email()).get();
        Space space = Space.builder()
                .name(spaceReq.name())
                .type(SpaceType.TEAM)
                .build();
        spaceRepository.save(space);
        participantService.saveParticipant(ParticipantRole.OWNER, member, space);

        return SpaceInfoRes.builder()
                .spaceId(space.getId())
                .name(space.getName())
                .participants(List.of(member.getEmail()))
                .build();
    }

    @Transactional(readOnly = true)
    public SpaceSummariesRes getTeamSpaces(CustomUserDetails userDetails) {
        List<Participant> participants = participantService.getParticipantsByMemberId(
                userDetails.memberId());
        List<Long> spaceIds = participants.stream()
                .map(participant -> participant.getSpace().getId())
                .toList();
        List<Space> teamSpaces = spaceRepository.findAllByIdInAndTypeAndDeletedAtIsNull(spaceIds,
                SpaceType.TEAM);
        List<SpaceSummaryRes> spaceSummaries = teamSpaces.stream()
                .map(teamSpace -> SpaceSummaryRes.builder()
                        .spaceId(teamSpace.getId())
                        .name(teamSpace.getName())
                        .build())
                .toList();

        return SpaceSummariesRes.builder()
                .spaceSummaries(spaceSummaries)
                .build();
    }

    @Transactional(readOnly = true)
    public SpaceDetailRes getTeamSpace(Long spaceId, CustomUserDetails userDetails) {
        participantService.validateAccess(spaceId, userDetails.memberId());
        List<FolderInfo> folderInfos = folderService.getFoldersBySpaceId(spaceId);
        return SpaceDetailRes.builder()
                .folders(folderInfos)
                .build();
    }

    @Transactional(readOnly = true)
    public SpaceDetailRes getMySpace(CustomUserDetails userDetails) {
        List<Participant> participants = participantService.getParticipantsByMemberId(
                userDetails.memberId());
        List<Long> spaceIds = participants.stream()
                .map(participant -> participant.getSpace().getId())
                .toList();
        Space mySpace = spaceRepository.findAllByIdInAndTypeAndDeletedAtIsNull(spaceIds,
                SpaceType.PERSONAL).get(0);
        List<FolderInfo> folderInfos = folderService.getFoldersBySpaceId(mySpace.getId());
        return SpaceDetailRes.builder()
                .folders(folderInfos)
                .build();
    }

    @Transactional
    public void updateTeamSpace(Long spaceId, SpaceReq spaceReq, CustomUserDetails userDetails) {
        participantService.validateEditPermission(spaceId, userDetails.memberId());
        Space space = spaceRepository.findByIdAndDeletedAtIsNull(spaceId);
        space.updateName(spaceReq.name());
    }

    @Transactional
    public void updateMySpace(SpaceReq spaceReq, CustomUserDetails userDetails) {
        List<Participant> participants = participantService.getParticipantsByMemberId(
                userDetails.memberId());
        List<Long> spaceIds = participants.stream()
                .map(participant -> participant.getSpace().getId())
                .toList();
        Space mySpace = spaceRepository.findAllByIdInAndTypeAndDeletedAtIsNull(spaceIds,
                SpaceType.PERSONAL).get(0);
        Space space = spaceRepository.findByIdAndDeletedAtIsNull(mySpace.getId());
        space.updateName(spaceReq.name());
    }

    @Transactional
    public void deleteTeamSpace(Long spaceId, CustomUserDetails userDetails) {
        participantService.validateManagePermission(spaceId, userDetails.memberId());
        Space space = spaceRepository.findByIdAndDeletedAtIsNull(spaceId);
        validateSpaceIsDeletable(space);
        space.deleteTeamSpace();
    }

    private void validateSpaceIsDeletable(Space space) {
        if (space.getType() == SpaceType.PERSONAL) {
            throw new CannotDeletePersonalSpaceException();
        }
    }

}
