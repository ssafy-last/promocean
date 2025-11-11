package com.ssafy.a208.domain.scrap.service;

import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.reader.PostReader;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.domain.scrap.dto.ScrapListRes;
import com.ssafy.a208.domain.scrap.dto.ScrapPostListItemDto;
import com.ssafy.a208.domain.scrap.dto.ScrapPostProjection;
import com.ssafy.a208.domain.scrap.dto.ScrapQueryDto;
import com.ssafy.a208.domain.scrap.entity.Scrap;
import com.ssafy.a208.domain.scrap.exception.ScrapAlreadyExistsException;
import com.ssafy.a208.domain.scrap.reader.ScrapReader;
import com.ssafy.a208.domain.scrap.repository.ScrapRepository;
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
import java.util.Optional;


/**
 * 스크랩 서비스
 * 스크랩 생성, 삭제 등 핵심 비즈니스 로직을 담당합니다.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ScrapService {

    private final MemberReader memberReader;
    private final PostReader postReader;
    private final ScrapReader scrapReader;
    private final ScrapRepository scrapRepository;
    private final S3Service s3Service;

    /**
     * 게시글을 스크랩합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId 게시글 ID
     * @throws ScrapAlreadyExistsException 이미 스크랩한 경우
     */
    @Transactional
    public void createScrap(CustomUserDetails userDetails, Long postId) {
        // 멤버 조회
        Member member = memberReader.getMemberById(userDetails.memberId());

        // 게시글 조회
        Post post = postReader.getPostById(postId);

        // 스크랩 존재 여부 확인 (삭제된 것 포함)
        Optional<Scrap> existingScrap = scrapReader.getScrapByPostAndMemberIncludeDeleted(post, member);

        if (existingScrap.isPresent()) {
            Scrap scrap = existingScrap.get();

            if (scrap.getDeletedAt() == null) {
                // 이미 스크랩이 있음
                throw new ScrapAlreadyExistsException();
            } else {
                // 소프트 딜리트된 스크랩 복구
                scrap.restoreScrap();
                log.info("스크랩 복구 완료 - scrapId: {}, postId: {}, memberId: {}",
                        scrap.getId(), postId, member.getId());
                return;
            }
        }

        // 스크랩 생성
        Scrap scrap = Scrap.builder()
                .post(post)
                .member(member)
                .build();

        scrapRepository.save(scrap);

        log.info("스크랩 생성 완료 - scrapId: {}, postId: {}, memberId: {}",
                scrap.getId(), postId, member.getId());
    }

    /**
     * 게시글 스크랩을 취소합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId 게시글 ID
     */
    @Transactional
    public void deleteScrap(CustomUserDetails userDetails, Long postId) {
        // 멤버 조회
        Member member = memberReader.getMemberById(userDetails.memberId());

        // 게시글 조회
        Post post = postReader.getPostById(postId);

        // 스크랩 조회
        Scrap scrap = scrapReader.getScrapByPostAndMemberOrThrow(post, member);

        // 스크랩 소프트 딜리트
        scrap.deleteScrap();

        log.info("스크랩 삭제 완료 - scrapId: {}, postId: {}, memberId: {}",
                scrap.getId(), postId, member.getId());
    }

    /**
     * 게시글의 모든 스크랩을 소프트 딜리트합니다.
     *
     * @param post 게시글 엔티티
     */
    @Transactional
    public void deleteScrapsByPost(Post post) {
        List<Scrap> scraps = scrapReader.getScrapsByPost(post);
        scraps.forEach(Scrap::deleteScrap);
        log.info("게시글의 스크랩 삭제 완료 - postId: {}, 스크랩 수: {}", post.getId(), scraps.size());
    }

    /**
     * 사용자의 스크랩 목록을 조회합니다.
     * QueryDSL을 사용한 동적 쿼리로 필터링 및 정렬을 수행합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param query 검색 조건
     * @return 스크랩 목록 응답 DTO
     */
    @Transactional(readOnly = true)
    public ScrapListRes getScraps(CustomUserDetails userDetails, ScrapQueryDto query) {
        // 멤버 조회
        Member member = memberReader.getMemberById(userDetails.memberId());

        // 페이징 설정
        Pageable pageable = PageRequest.of(query.page() - 1, query.size());

        // Projection 기반 조회
        Page<ScrapPostProjection> scrapPage =
                scrapReader.getScrapsByMemberWithFilters(member, query, pageable);

        // DTO 변환
        List<ScrapPostListItemDto> posts = scrapPage.getContent().stream()
                .map(projection -> {
                    // 프로필 이미지 URL 변환
                    String profileUrl = projection.getProfilePath() != null
                            ? s3Service.getCloudFrontUrl(projection.getProfilePath())
                            : null;

                    // 썸네일 URL 변환
                    String fileUrl = projection.getFilePath() != null
                            ? s3Service.getCloudFrontUrl(projection.getFilePath())
                            : null;

                    return ScrapPostListItemDto.builder()
                            .postId(projection.getPostId())
                            .author(projection.getAuthorNickname())
                            .profile(profileUrl)
                            .title(projection.getTitle())
                            .type(projection.getTypeName())
                            .category(projection.getCategoryName())
                            .fileUrl(fileUrl)
                            .tags(List.of()) // 태그는 후처리 필요 시 배치 조회 추가 가능
                            .isDeleted(projection.getIsDeleted())
                            .build();
                })
                .toList();

        log.info("스크랩 목록 조회 완료 - memberId: {}, page: {}, size: {}, totalCount: {}",
                member.getId(), query.page(), query.size(), scrapPage.getTotalElements());

        return ScrapListRes.builder()
                .posts(posts)
                .itemCnt(posts.size())
                .totalCnt(scrapPage.getTotalElements())
                .totalPages(scrapPage.getTotalPages())
                .currentPage(query.page())
                .build();
    }
}