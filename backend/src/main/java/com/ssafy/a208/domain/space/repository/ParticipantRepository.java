package com.ssafy.a208.domain.space.repository;

import com.ssafy.a208.domain.space.entity.Participant;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    Optional<Participant> findBySpaceIdAndMemberIdAndDeletedAtIsNull(Long spaceId, Long memberId);
}
