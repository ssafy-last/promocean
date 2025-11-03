package com.ssafy.a208.domain.space.controller;

import com.ssafy.a208.domain.space.dto.request.ArticleReq;
import com.ssafy.a208.domain.space.dto.response.ArticleRes;
import com.ssafy.a208.domain.space.service.ArticleService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/spaces/{spaceId}/folders/{folderId}/articles")
@Tag(name = "아티클", description = "아티클 생성/수정/삭제/목록조회/상세조회 API가 담겨있어요")
public class ArticleRestController {

    private final ArticleService articleService;

    @PostMapping
    @Operation(summary = "아티클 생성 API", description = "아티클을 생성하는 API입니다.")
    public ResponseEntity<ApiResponse<ArticleRes>> createArticle(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long spaceId,
            @PathVariable Long folderId,
            @RequestBody @Valid ArticleReq articleReq
    ) {
        ArticleRes res = articleService.createArticle(userDetails, spaceId, folderId, articleReq);
        return ApiResponse.ok(res);
    }
}
