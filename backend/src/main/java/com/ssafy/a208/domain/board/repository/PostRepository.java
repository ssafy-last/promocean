package com.ssafy.a208.domain.board.repository;

import com.ssafy.a208.domain.board.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findByIdAndDeletedAtIsNull(Long postId);
}
