package com.ssafy.a208.domain.board.service;

import com.ssafy.a208.domain.board.dto.*;
import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.entity.Reply;
import com.ssafy.a208.domain.board.exception.InvalidPostRequestException;
import com.ssafy.a208.domain.board.exception.PostNotFoundException;
import com.ssafy.a208.domain.board.exception.PostAccessDeniedException;
import com.ssafy.a208.domain.board.reader.PostFileReader;
import com.ssafy.a208.domain.board.reader.PostLikeReader;
import com.ssafy.a208.domain.board.reader.PostReader;
import com.ssafy.a208.domain.board.reader.ReplyReader;
import com.ssafy.a208.domain.board.repository.PostRepository;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.domain.scrap.service.ScrapService;
import com.ssafy.a208.domain.tag.entity.PostTag;
import com.ssafy.a208.domain.tag.service.PostTagService;
import com.ssafy.a208.global.common.enums.PostCategory;
import com.ssafy.a208.global.common.enums.PromptType;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

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
    private final PostLikeReader postLikeReader;
    private final ReplyReader replyReader;
    private final PostRepository postRepository;
    private final PostFileService postFileService;
    private final PostTagService postTagService;
    private final PostLikeService postLikeService;
    private final ReplyService replyService;
    private final ScrapService scrapService;
    private final S3Service s3Service;

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

    /**
     * 게시글 상세 조회
     *
     * @param userDetails 인증된 사용자 정보 (nullable - 비로그인 사용자 고려)
     * @param postId 조회할 게시글 ID
     * @return 게시글 상세 정보
     * @throws PostNotFoundException 게시글을 찾을 수 없을 때
     */
    @Transactional(readOnly = true)
    public PostDetailRes getPostDetail(CustomUserDetails userDetails, Long postId) {
        Post post = postReader.getPostById(postId);
        Member author = post.getAuthor();

        // 작성자 프로필 이미지 URL
        String profileKey = author.getProfileImage();
        String profileUrl = profileKey != null ?
                s3Service.getCloudFrontUrl(profileKey) : null;

        // 파일 URL 조회 (이미지 프롬프트인 경우)
        String fileUrl = null;
        if (post.getType() == PromptType.IMAGE) {
            fileUrl = postFileReader.getPostFileByPost(post)
                    .map(postFile -> s3Service.getCloudFrontUrl(postFile.getFilePath()))
                    .orElse(null);
        }

        // 태그 목록
        List<String> tags = post.getPostTags().stream()
                .filter(postTag -> postTag.getDeletedAt() == null)
                .map(postTag -> postTag.getTag().getName())
                .toList();

        // 좋아요 수
        int likeCnt = postLikeReader.getPostLikesByPost(post).size();

        // 댓글 목록
        List<Reply> replies = replyReader.getRepliesByPost(post);
        int replyCnt = replies.size();

        // 현재 사용자의 좋아요 여부
        boolean isLiked = false;
        if (userDetails != null) {
            Member currentMember = memberReader.getMemberById(userDetails.memberId());
            isLiked = postLikeReader.getPostLikeByPostAndMember(post, currentMember).isPresent();
        }

        // 댓글 DTO 변환
        List<PostDetailRes.ReplyDto> replyDtos = replies.stream()
                .map(reply -> {
                    String replyProfileKey = reply.getAuthor().getProfileImage();
                    String replyProfileUrl = replyProfileKey != null ?
                            s3Service.getCloudFrontUrl(replyProfileKey) : null;

                    return PostDetailRes.ReplyDto.builder()
                            .author(reply.getAuthor().getNickname())
                            .profile(replyProfileUrl)
                            .content(reply.getContent())
                            .createdAt(reply.getCreatedAt())
                            .updatedAt(reply.getUpdatedAt())
                            .build();
                })
                .toList();

        log.info("게시글 상세 조회 완료 - postId: {}", postId);

        return PostDetailRes.builder()
                .postId(post.getId())
                .author(author.getNickname())
                .profile(profileUrl)
                .title(post.getTitle())
                .description(post.getDescription())
                .category(post.getCategory().getName())
                .prompt(post.getPrompt())
                .type(post.getType().getName())
                .sampleQuestion(post.getExampleQuestion())
                .sampleAnswer(post.getExampleAnswer())
                .fileUrl(fileUrl)
                .tags(tags)
                .likeCnt(likeCnt)
                .replyCnt(replyCnt)
                .isLiked(isLiked)
                .createdAt(post.getCreatedAt())
                .replies(replyDtos)
                .build();
    }

    /**
     * 게시글 목록 조회 - V1 (개선 전: N+1 문제 있음)
     */
    /** @deprecated V3로 대체됨 */
    @Deprecated
    @Transactional(readOnly = true)
    public PostListRes getPostsV1(PostListQueryDto query) {
        // 페이징 설정
        Pageable pageable = PageRequest.of(query.page() - 1, query.size());

        // fetchJoin 없이 조회 (N+1 발생!)
        Page<Post> postPage = postReader.getPostsWithFiltersV1(query, pageable);

        // DTO 변환 (각 게시글마다 추가 쿼리 발생)
        List<PostListItemDto> posts = postPage.getContent().stream()
                .map(post -> {
                    // 프로필 이미지 - 추가 쿼리 발생
                    String profileKey = post.getAuthor().getProfileImage();
                    String profileUrl = profileKey != null ?
                            s3Service.getCloudFrontUrl(profileKey) : null;

                    // 태그 - 각 게시글마다 쿼리 발생
                    List<String> tags = post.getPostTags().stream()
                            .filter(postTag -> postTag.getDeletedAt() == null)
                            .map(postTag -> postTag.getTag().getName())
                            .toList();

                    // 좋아요 수 - 각 게시글마다 쿼리 발생
                    int likeCnt = (int) post.getPostLikes().stream()
                            .filter(like -> like.getDeletedAt() == null)
                            .count();

                    // 댓글 수 - 각 게시글마다 쿼리 발생
                    int replyCnt = replyReader.getRepliesByPost(post).size();

                    String fileUrl = null;
                    if (post.getType() == PromptType.IMAGE && post.getPostFile() != null) {
                        fileUrl = s3Service.getCloudFrontUrl(post.getPostFile().getFilePath());
                    }

                    return PostListItemDto.builder()
                            .postId(post.getId())
                            .author(post.getAuthor().getNickname())
                            .profile(profileUrl)
                            .title(post.getTitle())
                            .description(post.getDescription())
                            .type(post.getType().getName())
                            .category(post.getCategory().getName())
                            .tags(tags)
                            .likeCnt(likeCnt)
                            .replyCnt(replyCnt)
                            .fileUrl(fileUrl)
                            .createdAt(post.getCreatedAt())
                            .build();
                })
                .toList();

        log.info("게시글 목록 조회 완료 (V1) - page: {}, size: {}, totalCount: {}",
                query.page(), query.size(), postPage.getTotalElements());

        return PostListRes.builder()
                .posts(posts)
                .itemCnt(posts.size())
                .totalCnt(postPage.getTotalElements())
                .totalPages(postPage.getTotalPages())
                .currentPage(query.page())
                .build();
    }

    /**
     * 게시글 목록 조회 V2
     *
     * @param query 검색 조건
     * @return 게시글 목록
     */
    /** @deprecated V3로 대체됨 */
    @Deprecated
    @Transactional(readOnly = true)
    public PostListRes getPostsV2(PostListQueryDto query) {
        // 페이징 설정
        Pageable pageable = PageRequest.of(query.page() - 1, query.size());

        // QueryDSL을 통한 동적 쿼리 실행
        Page<Post> postPage = postReader.getPostsWithFiltersV2(query, pageable);

        // DTO 변환
        List<PostListItemDto> posts = postPage.getContent().stream()
                .map(post -> {
                    // 작성자 프로필 이미지
                    String profileKey = post.getAuthor().getProfileImage();
                    String profileUrl = profileKey != null ?
                            s3Service.getCloudFrontUrl(profileKey) : null;

                    // 태그 목록
                    List<String> tags = post.getPostTags().stream()
                            .filter(postTag -> postTag.getDeletedAt() == null)
                            .map(postTag -> postTag.getTag().getName())
                            .toList();

                    // 좋아요 수
                    int likeCnt = (int) post.getPostLikes().stream()
                            .filter(like -> like.getDeletedAt() == null)
                            .count();

                    // 댓글 수
                    int replyCnt = replyReader.getRepliesByPost(post).size();

                    String fileUrl = null;
                    if (post.getType() == PromptType.IMAGE && post.getPostFile() != null) {
                        fileUrl = s3Service.getCloudFrontUrl(post.getPostFile().getFilePath());
                    }

                    return PostListItemDto.builder()
                            .postId(post.getId())
                            .author(post.getAuthor().getNickname())
                            .profile(profileUrl)
                            .title(post.getTitle())
                            .description(post.getDescription())
                            .type(post.getType().getName())
                            .category(post.getCategory().getName())
                            .tags(tags)
                            .likeCnt(likeCnt)
                            .replyCnt(replyCnt)
                            .fileUrl(fileUrl)
                            .createdAt(post.getCreatedAt())
                            .build();
                })
                .toList();

        log.info("게시글 목록 조회 완료 - page: {}, size: {}, totalCount: {}",
                query.page(), query.size(), postPage.getTotalElements());

        return PostListRes.builder()
                .posts(posts)
                .itemCnt(posts.size())
                .totalCnt(postPage.getTotalElements())
                .totalPages(postPage.getTotalPages())
                .currentPage(query.page())
                .build();
    }



    /**
     * 게시글 목록 조회 - V3 (Projection 사용 - 최종 개선)
     */
    @Transactional(readOnly = true)
    public PostListRes getPostsV3(PostListQueryDto query) {
        // 페이징 설정
        Pageable pageable = PageRequest.of(query.page() - 1, query.size());

        // Projection으로 필요한 데이터만 조회
        Page<PostListItemProjection> projectionPage = postReader.getPostsWithFiltersV3(query, pageable);

        // 게시글 ID 목록 추출
        List<Long> postIds = projectionPage.getContent().stream()
                .map(PostListItemProjection::getPostId)
                .toList();

        // 태그는 별도 조회 (배치 처리)
        List<PostTag> postTags = postReader.getPostTagsByPostIds(postIds);

        // 게시글 ID별 태그 맵 생성
        Map<Long, List<String>> tagMap = postTags.stream()
                .collect(Collectors.groupingBy(
                        pt -> pt.getPost().getId(),
                        Collectors.mapping(
                                pt -> pt.getTag().getName(),
                                Collectors.toList()
                        )
                ));

        // DTO 변환
        List<PostListItemDto> postItems = projectionPage.getContent().stream()
                .map(projection -> {
                    // 프로필 URL
                    String profileUrl = projection.getProfilePath() != null ?
                            s3Service.getCloudFrontUrl(projection.getProfilePath()) : null;

                    // 파일 URL
                    String fileUrl = projection.getFilePath() != null ?
                            s3Service.getCloudFrontUrl(projection.getFilePath()) : null;

                    // 태그
                    List<String> tags = tagMap.getOrDefault(projection.getPostId(), List.of());

                    return PostListItemDto.builder()
                            .postId(projection.getPostId())
                            .author(projection.getAuthorNickname())
                            .profile(profileUrl)
                            .title(projection.getTitle())
                            .description(projection.getDescription())
                            .type(projection.getTypeName())
                            .category(projection.getCategoryName())
                            .tags(tags)
                            .likeCnt(projection.getLikeCount().intValue())
                            .replyCnt(projection.getReplyCount().intValue())
                            .fileUrl(fileUrl)
                            .createdAt(projection.getCreatedAt())
                            .build();
                })
                .toList();

        log.info("게시글 목록 조회 완료 (V3 - Projection) - page: {}, size: {}, totalCount: {}",
                query.page(), query.size(), projectionPage.getTotalElements());

        return PostListRes.builder()
                .posts(postItems)
                .itemCnt(postItems.size())
                .totalCnt(projectionPage.getTotalElements())
                .totalPages(projectionPage.getTotalPages())
                .currentPage(query.page())
                .build();
    }
}