package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.space.entity.Participant;
import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.reader.ParticipantReader;
import com.ssafy.a208.domain.space.reader.SpaceReader;
import com.ssafy.a208.global.common.enums.SpaceType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SpaceService {

    private final SpaceReader spaceReader;
    private final ParticipantReader participantReader;

    public Space validateAccessToSpace(Long spaceId, Member member) {
        Space space = spaceReader.getSpaceById(spaceId);

        if (space.getType() == SpaceType.TEAM) {
            Participant participant = participantReader.getParticipant(space, member);
            participantReader.checkParticipantRole(participant);
        }

        return space;
    }

}
