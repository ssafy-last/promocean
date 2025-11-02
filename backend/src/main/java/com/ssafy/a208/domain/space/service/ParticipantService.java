package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.space.entity.Participant;
import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.exception.space.SpaceEditAccessDeniedException;
import com.ssafy.a208.domain.space.exception.space.SpaceManageAccessDeniedException;
import com.ssafy.a208.domain.space.exception.space.SpaceNotFoundException;
import com.ssafy.a208.domain.space.repository.ParticipantRepository;
import com.ssafy.a208.global.common.enums.ParticipantRole;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantRepository participantRepository;

    @Transactional
    public void saveParticipant(ParticipantRole role, Member member, Space space) {
        Participant participant = Participant.builder()
                .nickname(member.getNickname())
                .role(role)
                .member(member)
                .space(space)
                .build();
        participantRepository.save(participant);
    }

    @Transactional(readOnly = true)
    public List<Participant> getParticipantsByMemberId(Long memberId) {
        return participantRepository.findParticipantByMemberIdAndDeletedAtIsNull(memberId);
    }

    @Transactional(readOnly = true)
    public Participant getParticipantBySpaceIdAndMemberId(Long spaceId, Long memberId) {
        return participantRepository.findBySpaceIdAndMemberIdAndDeletedAtIsNull(spaceId, memberId)
                .orElseThrow(SpaceNotFoundException::new);
    }

    @Transactional(readOnly = true)
    public void validateAccess(Long spaceId, Long memberId) {
        getParticipantBySpaceIdAndMemberId(spaceId, memberId);
    }

    @Transactional(readOnly = true)
    public void validateEditPermission(Long spaceId, Long memberId) {
        Participant participant = getParticipantBySpaceIdAndMemberId(spaceId, memberId);
        if (!participant.getRole().canEdit()) {
            throw new SpaceEditAccessDeniedException();
        }
    }

    @Transactional(readOnly = true)
    public void validateManagePermission(Long spaceId, Long memberId) {
        Participant participant = getParticipantBySpaceIdAndMemberId(spaceId, memberId);
        if (!participant.getRole().canManage()) {
            throw new SpaceManageAccessDeniedException();
        }
    }


}
