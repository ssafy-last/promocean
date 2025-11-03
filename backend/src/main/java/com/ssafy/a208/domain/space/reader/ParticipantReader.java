package com.ssafy.a208.domain.space.reader;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.space.entity.Participant;
import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.exception.SpaceAccessDeniedException;
import com.ssafy.a208.domain.space.repository.ParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ParticipantReader {

    private final ParticipantRepository participantRepository;

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
