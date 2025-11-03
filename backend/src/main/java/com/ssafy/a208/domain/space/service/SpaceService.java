package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.reader.SpaceReader;
import com.ssafy.a208.global.common.enums.SpaceType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SpaceService {

    private final SpaceReader spaceReader;
    private final ParticipantService participantService;

    public Space getEditableSpace(Long spaceId, Long memberId) {
        Space space = spaceReader.getSpaceById(spaceId);
        if (space.getType() == SpaceType.TEAM) {
            participantService.validateEditableParticipant(spaceId, memberId);
        }
        return space;
    }

    public void validateEditableSpace(Long spaceId, Long memberId) {
        getEditableSpace(spaceId, memberId);
    }

}
