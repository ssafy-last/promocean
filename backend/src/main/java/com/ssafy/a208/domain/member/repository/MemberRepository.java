package com.ssafy.a208.domain.member.repository;

import com.ssafy.a208.domain.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    Optional<Member> findByIdAndDeletedAtIsNull(Long id);

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

}
