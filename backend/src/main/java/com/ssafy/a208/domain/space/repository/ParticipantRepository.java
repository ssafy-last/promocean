package com.ssafy.a208.domain.space.repository;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.space.entity.Participant;
import java.util.List;
import java.util.Optional;
import com.ssafy.a208.domain.space.entity.Space;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    List<Participant> findParticipantByMemberIdAndDeletedAtIsNull(Long memberId);
    Optional<Participant> findBySpaceIdAndMemberIdAndDeletedAtIsNull(Long spaceId, Long memberId);
    Optional<Participant> findBySpaceAndMemberAndDeletedAtIsNull(Space space, Member member);
}
