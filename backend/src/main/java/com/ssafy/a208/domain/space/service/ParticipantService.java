package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.domain.space.dto.request.ParticipantReq;
import com.ssafy.a208.domain.space.entity.Participant;
import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.exception.space.SpaceAccessDeniedException;
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
    private final MemberReader memberReader;

    @Transactional
    public void saveParticipants(List<ParticipantReq> participantReqs, Space space) {
        List<Participant> participants = participantReqs.stream().map(
                        participant -> {
                            Member member = memberReader.getMemberByEmail(participant.email());
                            return Participant.builder()
                                    .nickname(member.getNickname())
                                    .role(ParticipantRole.valueOf(participant.role()))
                                    .member(member)
                                    .space(space)
                                    .build();
                        })
                .toList();
        participantRepository.saveAll(participants);
    }

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
    public void validateManageableParticipant(Long spaceId, Long memberId) {
        Participant participant = participantReader.getParticipant(spaceId, memberId);
        validateManagePermission(participant);
    }

    @Transactional(readOnly = true)
    public void validateEditableParticipant(Long spaceId, Long memberId) {
        Participant participant = participantReader.getParticipant(spaceId, memberId);
        validateEditPermission(participant);
    }

    @Transactional(readOnly = true)
    public void validateReadableParticipant(Long spaceId, Long memberId) {
        Participant participant = participantReader.getParticipant(spaceId, memberId);
        validateReadPermission(participant);
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
