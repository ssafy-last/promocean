package com.ssafy.a208.domain.board.repository;

import com.ssafy.a208.domain.board.entity.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Long> {

}
