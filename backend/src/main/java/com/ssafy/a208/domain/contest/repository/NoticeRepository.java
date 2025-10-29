package com.ssafy.a208.domain.contest.repository;

import com.ssafy.a208.domain.contest.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

}
