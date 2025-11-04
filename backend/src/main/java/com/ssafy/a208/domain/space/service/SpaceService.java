package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.domain.space.dto.request.SpaceReq;
import com.ssafy.a208.domain.space.dto.response.space.SpaceInfoRes;
import com.ssafy.a208.domain.space.dto.response.space.SpaceSummariesRes;
import com.ssafy.a208.domain.space.dto.response.space.SpaceSummaryRes;
import com.ssafy.a208.domain.space.entity.Participant;
import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.exception.space.CannotDeletePersonalSpaceException;
import com.ssafy.a208.domain.space.reader.SpaceReader;
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
    private final SpaceReader spaceReader;
    private final MemberReader memberReader;
    private final ParticipantService participantService;

    @Transactional
    public Space savePersonalSpace(String userNickname) {
        Space space = Space.builder()
                .name(String.format("%s의 개인 스페이스", userNickname))
                .type(SpaceType.PERSONAL)
                .build();
        return spaceRepository.save(space);
    }

    @Transactional
    public SpaceInfoRes saveTeamSpace(CustomUserDetails userDetails, SpaceReq spaceReq) {
        Member member = memberReader.getMemberById(userDetails.memberId());
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
        List<Participant> participants = participantService.getParticipants(userDetails.memberId());
        List<Long> spaceIds = participants.stream()
                .map(participant -> participant.getSpace().getId())
                .toList();
        List<Space> teamSpaces = spaceRepository.findAllByIdInAndTypeAndDeletedAtIsNull(spaceIds, SpaceType.TEAM);
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

    @Transactional
    public void updateTeamSpace(CustomUserDetails userDetails, Long spaceId, SpaceReq spaceReq) {
        participantService.validateManageableParticipant(spaceId, userDetails.memberId());
        Space space = spaceRepository.findByIdAndDeletedAtIsNull(spaceId);
        space.updateName(spaceReq.name());
    }

    @Transactional
    public void deleteTeamSpace(CustomUserDetails userDetails, Long spaceId) {
        participantService.validateManageableParticipant(spaceId, userDetails.memberId());
        Space space = spaceRepository.findByIdAndDeletedAtIsNull(spaceId);
        validateDeletableSpace(space);
        space.deleteTeamSpace();
    }

    public Space getEditableSpace(Long spaceId, Long memberId) {
        Space space = spaceReader.getSpaceById(spaceId);
        if (space.getType() == SpaceType.TEAM) {
            participantService.validateEditableParticipant(spaceId, memberId);
        }
        return space;
    }

    public Space getReadableSpace(Long spaceId, Long memberId) {
        Space space = spaceReader.getSpaceById(spaceId);
        if (space.getType() == SpaceType.TEAM) {
            participantService.validateReadableParticipant(spaceId, memberId);
        }
        return space;
    }

    public void validateEditableSpace(Long spaceId, Long memberId) {
        getEditableSpace(spaceId, memberId);
    }

    public void validateReadableSpace(Long spaceId, Long memberId) {
        getReadableSpace(spaceId, memberId);
    }

    private void validateDeletableSpace(Space space) {
        if (space.getType() == SpaceType.PERSONAL) {
            throw new CannotDeletePersonalSpaceException();
        }
    }

}
