package com.ssafy.a208.domain.board.reader;

import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.entity.PostLike;
import com.ssafy.a208.domain.board.repository.PostLikeRepository;
import com.ssafy.a208.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * 게시글 좋아요 조회 전용 Reader 클래스.
 * - 삭제되지 않은 좋아요만 조회합니다.
 */
@Component
@RequiredArgsConstructor
public class PostLikeReader {

    private final PostLikeRepository postLikeRepository;

    /**
     * 특정 게시글과 멤버의 좋아요 조회
     * (이미 좋아요를 눌렀는지 확인할 때 사용)
     *
     * @param post 게시글 엔티티
     * @param member 멤버 엔티티
     * @return 삭제되지 않은 PostLike (Optional)
     */
    public Optional<PostLike> getPostLikeByPostAndMember(Post post, Member member) {
        return postLikeRepository.findByPostAndMemberAndDeletedAtIsNull(post, member);
    }
}
