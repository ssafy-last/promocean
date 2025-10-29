package com.ssafy.a208.domain.contest.repository;

import com.ssafy.a208.domain.contest.entity.SubmissionFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubmissionFileRepository extends JpaRepository<SubmissionFile, Long> {

}
