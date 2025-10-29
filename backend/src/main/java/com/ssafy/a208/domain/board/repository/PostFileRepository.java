package com.ssafy.a208.domain.board.repository;

import com.ssafy.a208.domain.board.entity.PostFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostFileRepository extends JpaRepository<PostFile, Long> {

}
