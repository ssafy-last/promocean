package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.space.entity.Participant;
import com.ssafy.a208.domain.space.exception.SpaceAccessDeniedException;
import com.ssafy.a208.domain.space.reader.ParticipantReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantReader participantReader;

    public Participant getEditableParticipant(Long spaceId, Long memberId) {
        Participant participant = participantReader.getParticipant(spaceId, memberId);
        checkParticipantRole(participant);
        return participant;
    }

    public void validateEditableParticipant(Long spaceId, Long memberId) {
        getEditableParticipant(spaceId, memberId);
    }

    private void checkParticipantRole(Participant participant) {
        if (participant.getRole().canEdit()) {
            return;
        }

        throw new SpaceAccessDeniedException();
    }

}
