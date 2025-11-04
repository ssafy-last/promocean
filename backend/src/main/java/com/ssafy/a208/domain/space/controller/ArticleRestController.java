package com.ssafy.a208.domain.space.controller;

import com.ssafy.a208.domain.space.dto.request.ArticleReq;
import com.ssafy.a208.domain.space.dto.response.ArticleDetailRes;
import com.ssafy.a208.domain.space.dto.response.ArticleListRes;
import com.ssafy.a208.domain.space.service.ArticleService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/spaces/{spaceId}")
@Tag(name = "아티클", description = "아티클 생성/수정/삭제/목록조회/상세조회 API가 담겨있어요")
public class ArticleRestController {

    private final ArticleService articleService;

    @PostMapping("/folders/{folderId}/articles")
    @Operation(summary = "아티클 생성 API", description = "아티클을 생성하는 API입니다.")
    public ResponseEntity<ApiResponse<ArticleDetailRes>> createArticle(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long spaceId,
            @PathVariable Long folderId,
            @RequestBody @Valid ArticleReq articleReq
    ) {
        ArticleDetailRes res = articleService.createArticle(userDetails, spaceId, folderId,
                articleReq);
        return ApiResponse.create(res);
    }

    @PutMapping("/folders/{folderId}/articles/{articleId}")
    @Operation(summary = "아티클 수정 API", description = "아티클을 수정하는 API입니다.")
    public ResponseEntity<ApiResponse<Void>> updateArticle(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long spaceId,
            @PathVariable Long folderId,
            @PathVariable Long articleId,
            @RequestBody @Valid ArticleReq articleReq
    ) {
        articleService.updateArticle(userDetails, spaceId, folderId, articleId, articleReq);
        return ApiResponse.ok();
    }

    @DeleteMapping("/folders/{folderId}/articles/{articleId}")
    @Operation(summary = "아티클 삭제 API", description = "아티클을 삭제하는 API입니다.")
    public ResponseEntity<ApiResponse<Void>> deleteArticle(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long spaceId,
            @PathVariable Long folderId,
            @PathVariable Long articleId
    ) {
        articleService.deleteArticle(userDetails, spaceId, folderId, articleId);
        return ApiResponse.ok();
    }

    @GetMapping("/articles")
    @Operation(summary = "아티클 목록조회 API", description = "아티클 목록을 조회하는 API입니다.")
    public ResponseEntity<ApiResponse<ArticleListRes>> getArticleList(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long spaceId,
            @RequestParam(required = false) Long folderId
    ) {
        ArticleListRes res = articleService.getArticleList(userDetails, spaceId, folderId);
        return ApiResponse.ok(res);
    }

    @GetMapping("/articles/{articleId}")
    @Operation(summary = "아티클 상세조회 API", description = "아티클을 조회하는 API입니다.")
    public ResponseEntity<ApiResponse<ArticleDetailRes>> getArticleDetail(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long spaceId,
            @PathVariable Long articleId
    ) {
        ArticleDetailRes res = articleService.getArticleDetail(userDetails, spaceId, articleId);
        return ApiResponse.ok(res);
    }

}
