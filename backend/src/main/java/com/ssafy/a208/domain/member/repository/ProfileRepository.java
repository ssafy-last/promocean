package com.ssafy.a208.domain.member.repository;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.entity.Profile;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Optional<Profile> findByMember(Member member);

}
