package com.ssafy.a208.domain.contest.repository;

import com.ssafy.a208.domain.contest.entity.Contest;
import com.ssafy.a208.global.common.enums.ContestStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContestRepository extends JpaRepository<Contest, Long> {
    Page<Contest> findByStatus(Pageable pageable, ContestStatus contestStatus);

    Page<Contest> findByTitleContainingIgnoreCase(Pageable pageable, String title);

    Page<Contest> findByStatusAndTitleContainingIgnoreCase(Pageable pageable, ContestStatus contestStatus, String title);
}
