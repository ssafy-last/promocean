package com.ssafy.a208.domain.space.reader;

import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.exception.SpaceNotFoundException;
import com.ssafy.a208.domain.space.repository.SpaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SpaceReader {

    private final SpaceRepository spaceRepository;

    public Space getSpaceById(Long id) {
        return spaceRepository.findById(id)
                .orElseThrow(SpaceNotFoundException::new);
    }
}
