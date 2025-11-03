package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.space.entity.Participant;
import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.exception.SpaceAccessDeniedException;
import com.ssafy.a208.domain.space.reader.ParticipantReader;
import com.ssafy.a208.domain.space.repository.ParticipantRepository;
import com.ssafy.a208.global.common.enums.ParticipantRole;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantReader participantReader;
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
    public List<Participant> getParticipants(Long memberId) {
        return participantReader.getParticipants(memberId);
    }

    @Transactional(readOnly = true)
    public Participant getManageableParticipant(Long spaceId, Long memberId) {
        Participant participant = participantReader.getParticipant(spaceId, memberId);
        validateManagePermission(participant);
        return participant;
    }

    @Transactional(readOnly = true)
    public Participant getEditableParticipant(Long spaceId, Long memberId) {
        Participant participant = participantReader.getParticipant(spaceId, memberId);
        validateEditPermission(participant);
        return participant;
    }

    @Transactional(readOnly = true)
    public Participant getReadableParticipant(Long spaceId, Long memberId) {
        Participant participant = participantReader.getParticipant(spaceId, memberId);
        validateReadPermission(participant);
        return participant;
    }

    @Transactional(readOnly = true)
    public void validateManageableParticipant(Long spaceId, Long memberId) {
        getManageableParticipant(spaceId, memberId);
    }

    @Transactional(readOnly = true)
    public void validateEditableParticipant(Long spaceId, Long memberId) {
        getEditableParticipant(spaceId, memberId);
    }

    @Transactional(readOnly = true)
    public void validateReadableParticipant(Long spaceId, Long memberId) {
        getReadableParticipant(spaceId, memberId);
    }

    private void validateManagePermission(Participant participant) {
        if (!participant.getRole().canManage()) {
            throw new SpaceAccessDeniedException("스페이스 관리 권한이 없는 회원입니다.");
        }
    }

    private void validateEditPermission(Participant participant) {
        if (!participant.getRole().canEdit()) {
            throw new SpaceAccessDeniedException("스페이스 수정 권한이 없는 회원입니다.");
        }
    }

    private void validateReadPermission(Participant participant) {
        if (!participant.getRole().canRead()) {
            throw new SpaceAccessDeniedException("스페이스 조회 권한이 없는 회원입니다.");
        }
    }


}
