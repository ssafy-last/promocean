package com.ssafy.a208.domain.space.reader;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.space.entity.Participant;
import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.exception.SpaceAccessDeniedException;
import com.ssafy.a208.domain.space.exception.space.SpaceNotFoundException;
import com.ssafy.a208.domain.space.repository.ParticipantRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class ParticipantReader {

    private final ParticipantRepository participantRepository;


    public List<Participant> getParticipantsByMemberId(Long memberId) {
        return participantRepository.findParticipantByMemberIdAndDeletedAtIsNull(memberId);
    }

    public Participant getParticipantBySpaceIdAndMemberId(Long spaceId, Long memberId) {
        return participantRepository.findBySpaceIdAndMemberIdAndDeletedAtIsNull(spaceId, memberId)
                .orElseThrow(SpaceNotFoundException::new);
    }

    public void validateAccess(Long spaceId, Long memberId) {
        getParticipantBySpaceIdAndMemberId(spaceId, memberId);
    }

    public void validateEditPermission(Long spaceId, Long memberId) {
        Participant participant = getParticipantBySpaceIdAndMemberId(spaceId, memberId);
        if (!participant.getRole().canEdit()) {
            throw new com.ssafy.a208.domain.space.exception.space.SpaceAccessDeniedException("스페이스 수정 권한이 없는 회원입니다.");
        }
    }

    public void validateManagePermission(Long spaceId, Long memberId) {
        Participant participant = getParticipantBySpaceIdAndMemberId(spaceId, memberId);
        if (!participant.getRole().canManage()) {
            throw new com.ssafy.a208.domain.space.exception.space.SpaceAccessDeniedException("스페이스 관리 권한이 없는 회원입니다.");
        }
    }

    public Participant getParticipant(Space space, Member member) {
        return participantRepository.findBySpaceAndMemberAndDeletedAtIsNull(space, member)
                .orElseThrow(SpaceAccessDeniedException::new);
    }

    public void checkParticipantRole(Participant participant){
        if (participant.getRole().getValue() < 20) {
            throw new SpaceAccessDeniedException();
        }
    }
}
