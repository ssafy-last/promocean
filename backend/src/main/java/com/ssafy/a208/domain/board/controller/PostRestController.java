package com.ssafy.a208.domain.board.controller;

import com.ssafy.a208.domain.board.dto.PostCreateReq;
import com.ssafy.a208.domain.board.dto.PostCreateRes;
import com.ssafy.a208.domain.board.dto.PostUpdateReq;
import com.ssafy.a208.domain.board.dto.PostUpdateRes;
import com.ssafy.a208.domain.board.service.PostService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * 게시글 관련 REST API 컨트롤러
 */
@Slf4j
@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@Tag(name = "Post API", description = "프롬프트 게시글 API")
public class PostRestController {

    private final PostService postService;

    /**
     * 게시글 작성 API
     * 로그인한 사용자가 텍스트 또는 이미지 프롬프트 게시글을 작성합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param req 게시글 작성 요청 DTO
     * @return 생성된 게시글의 ID
     */
    @PostMapping
    @Operation(
            summary = "게시글 작성 API",
            description = "로그인한 사용자가 텍스트 또는 이미지 프롬프트 게시글을 작성합니다."
    )
    public ResponseEntity<ApiResponse<PostCreateRes>> createPost(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody PostCreateReq req
    ) {
        PostCreateRes res = postService.createPost(userDetails, req);
        return ApiResponse.create(res);
    }

    /**
     * 게시글 수정 API
     * 게시글 작성자가 게시글을 수정합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId 수정할 게시글 ID
     * @param req 게시글 수정 요청 DTO
     * @return 수정된 게시글의 ID
     */
    @PutMapping("/{postId}")
    @Operation(
            summary = "게시글 수정 API",
            description = "게시글 작성자가 게시글을 수정합니다."
    )
    public ResponseEntity<ApiResponse<PostUpdateRes>> updatePost(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long postId,
            @Valid @RequestBody PostUpdateReq req
    ) {
        PostUpdateRes res = postService.updatePost(userDetails, postId, req);
        return ApiResponse.ok(res);
    }

    /**
     * 게시글 삭제 API
     * 게시글 작성자가 게시글을 삭제합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId 삭제할 게시글 ID
     * @return 응답 없음
     */
    @DeleteMapping("/{postId}")
    @Operation(
            summary = "게시글 삭제 API",
            description = "게시글 작성자가 게시글을 삭제합니다. 소프트 딜리트 방식으로 처리됩니다."
    )
    public ResponseEntity<ApiResponse<Void>> deletePost(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long postId
    ) {
        postService.deletePost(userDetails, postId);
        return ApiResponse.ok();
    }

}
