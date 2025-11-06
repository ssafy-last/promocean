package com.ssafy.a208.domain.board.service;

import com.ssafy.a208.domain.board.dto.PostCreateReq;
import com.ssafy.a208.domain.board.dto.PostCreateRes;
import com.ssafy.a208.domain.board.dto.PostUpdateReq;
import com.ssafy.a208.domain.board.dto.PostUpdateRes;
import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.exception.InvalidPostRequestException;
import com.ssafy.a208.domain.board.exception.PostNotFoundException;
import com.ssafy.a208.domain.board.exception.PostAccessDeniedException;
import com.ssafy.a208.domain.board.reader.PostFileReader;
import com.ssafy.a208.domain.board.reader.PostReader;
import com.ssafy.a208.domain.board.repository.PostRepository;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.domain.scrap.service.ScrapService;
import com.ssafy.a208.domain.tag.service.PostTagService;
import com.ssafy.a208.global.common.enums.PostCategory;
import com.ssafy.a208.global.common.enums.PromptType;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

/**
 * 게시글 서비스
 * 게시글 생성, 수정 등 핵심 비즈니스 로직을 담당합니다.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PostService {

    private final MemberReader memberReader;
    private final PostFileReader postFileReader;
    private final PostReader postReader;
    private final PostRepository postRepository;
    private final PostFileService postFileService;
    private final PostTagService postTagService;
    private final PostLikeService postLikeService;
    private final ReplyService replyService;
    private final ScrapService scrapService;

    /**
     * 게시글을 생성합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param req 게시글 작성 요청 DTO
     * @return 생성된 게시글의 ID를 포함한 응답 DTO
     */
    @Transactional
    public PostCreateRes createPost(CustomUserDetails userDetails, PostCreateReq req) {
        // 작성자 조회
        Member author = memberReader.getMemberById(userDetails.memberId());

        // Enum 매핑
        PostCategory category = PostCategory.valueOf(req.category());
        PromptType promptType = PromptType.valueOf(req.promptType());

        // 게시글 생성
        Post post = Post.builder()
                .title(req.title())
                .description(req.description())
                .category(category)
                .prompt(req.prompt())
                .type(promptType)
                .exampleQuestion(req.sampleQuestion())
                .exampleAnswer(req.sampleAnswer())
                .author(author)
                .build();

        postRepository.save(post);

        // 태그 처리
        postTagService.createTags(req.tags(), post);

        // 이미지 프롬프트인 경우 파일 처리
        if (promptType == PromptType.IMAGE && Objects.nonNull(req.filePath())
                && !req.filePath().isBlank()) {
            postFileService.createPostFile(req.filePath(), post);
        }

        log.info("게시글 생성 완료 - postId: {}, type: {}", post.getId(), promptType);

        return PostCreateRes.builder().postId(post.getId()).build();
    }

    /**
     * 게시글을 수정합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId 수정할 게시글 ID
     * @param req 게시글 수정 요청 DTO
     * @return 수정된 게시글의 ID를 포함한 응답 DTO
     * @throws PostNotFoundException 게시글을 찾을 수 없을 때
     * @throws PostAccessDeniedException 수정 권한이 없을 때
     */
    @Transactional

    public PostUpdateRes updatePost(CustomUserDetails userDetails, Long postId, PostUpdateReq req) {
        // 게시글 조회
        Post post = postReader.getPostById(postId);

        // 작성자 확인
        if (!post.isAuthor(userDetails.memberId())) {
            throw new PostAccessDeniedException();
        }

        // Enum 매핑
        PostCategory category = PostCategory.valueOf(req.category());
        PromptType promptType = PromptType.valueOf(req.promptType());

        // 텍스트 프롬프트에서 프롬프트 변경 시 예시도 변경 필요
        if (promptType == PromptType.TEXT && !post.getPrompt().equals(req.prompt())) {
            if (post.getExampleAnswer() != null
                    && post.getExampleAnswer().equals(req.sampleAnswer())) {
                throw new InvalidPostRequestException(
                        "프롬프트가 변경되었습니다. 새로운 프롬프트에 맞는 예시 답변을 입력해주세요");
            }
        }

        // 파일 처리
        postFileService.updatePostFile(post, promptType, req.filePath(), req.prompt());

        // 게시글 기본 정보 업데이트
        post.update(
                req.title(),
                req.description(),
                category,
                req.prompt(),
                promptType,
                req.sampleQuestion(),
                req.sampleAnswer()
        );

        // 태그 처리
        postTagService.createTags(req.tags(), post);

        log.info("게시글 수정 완료 - postId: {}, type: {}", post.getId(), promptType);

        return PostUpdateRes.builder().postId(post.getId()).build();
    }

    /**
     * 게시글을 삭제합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId 삭제할 게시글 ID
     * @throws PostNotFoundException 게시글을 찾을 수 없을 때
     * @throws PostAccessDeniedException 삭제 권한이 없을 때
     */
    @Transactional
    public void deletePost(CustomUserDetails userDetails, Long postId) {
        // 게시글 조회
        Post post = postReader.getPostById(postId);

        // 작성자 확인
        if (!post.isAuthor(userDetails.memberId())) {
            throw new PostAccessDeniedException();
        }

        // 좋아요 소프트 딜리트
        postLikeService.deleteLikesByPost(post);

        // Reader를 통해 파일 조회 및 삭제 처리
        postFileReader.getPostFileByPost(post)
                .ifPresent(postFileService::deletePostFile);

        // 태그 소프트 딜리트
        postTagService.deleteTags(post);

        // 게시글 소프트 딜리트
        post.deletePost();

        // 댓글 소프트 딜리트
        replyService.deleteRepliesByPost(post);

        // 스크랩 소프트 딜리트
        scrapService.deleteScrapsByPost(post);

        log.info("게시글 삭제 완료 - postId: {}", postId);
    }
}