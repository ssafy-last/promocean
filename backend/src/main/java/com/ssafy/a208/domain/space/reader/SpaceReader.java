package com.ssafy.a208.domain.space.reader;

import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.exception.SpaceNotFoundException;
import com.ssafy.a208.domain.space.repository.SpaceRepository;
import com.ssafy.a208.global.common.enums.SpaceType;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SpaceReader {

    private final SpaceRepository spaceRepository;

    public Space getSpaceById(Long spaceId) {
        return spaceRepository.findByIdAndDeletedAtIsNull(spaceId)
                .orElseThrow(SpaceNotFoundException::new);
    }

    public List<Space> getTeamSpaces(List<Long> spaceIds) {
        return spaceRepository.findAllByIdInAndTypeAndDeletedAtIsNull(spaceIds, SpaceType.TEAM);
    }
}