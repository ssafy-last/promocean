package com.ssafy.a208.domain.board.reader;

import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.exception.PostNotFoundException;
import com.ssafy.a208.domain.board.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * 게시글 조회 전용 Reader 클래스.
 * - 삭제되지 않은 게시글만 조회합니다.
 */
@Component
@RequiredArgsConstructor
public class PostReader {

    private final PostRepository postRepository;

    /**
     * 게시글 ID로 게시글 조회 (삭제되지 않은 것만)
     * @param postId 게시글 ID
     * @return Post 엔티티
     * @throws PostNotFoundException 존재하지 않거나 삭제된 경우
     */
    public Post getPostById(Long postId) {
        return postRepository.findByIdAndDeletedAtIsNull(postId)
                .orElseThrow(PostNotFoundException::new);
    }
}
