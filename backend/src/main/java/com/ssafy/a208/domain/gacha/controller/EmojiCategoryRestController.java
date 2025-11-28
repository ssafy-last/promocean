package com.ssafy.a208.domain.gacha.controller;

import com.ssafy.a208.domain.gacha.dto.request.EmojiCategoryCreateReq;
import com.ssafy.a208.domain.gacha.dto.response.EmojiCategoryListRes;
import com.ssafy.a208.domain.gacha.dto.response.EmojiCategoryRes;
import com.ssafy.a208.domain.gacha.service.EmojiCategoryService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/admin/emoji-categories")
@RequiredArgsConstructor
@Tag(name = "이모지 카테고리 관리자", description = "이모지 카테고리 관리 API (관리자 전용)가 담겨있어요")
public class EmojiCategoryRestController {

    private final EmojiCategoryService emojiCategoryService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            summary = "이모지 카테고리 생성 API (관리자)",
            description = "새로운 이모지 카테고리를 생성합니다. 관리자만 사용 가능합니다."
    )
    public ResponseEntity<ApiResponse<EmojiCategoryRes>> createCategory(
            @Valid @RequestBody EmojiCategoryCreateReq req
    ) {
        EmojiCategoryRes res = emojiCategoryService.createCategory(req);
        return ApiResponse.create(res);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            summary = "전체 이모지 카테고리 목록 조회 API (관리자)",
            description = "모든 이모지 카테고리 목록을 조회합니다. 관리자만 사용 가능합니다."
    )
    public ResponseEntity<ApiResponse<EmojiCategoryListRes>> getAllCategories() {
        EmojiCategoryListRes res = emojiCategoryService.getAllCategories();
        return ApiResponse.ok(res);
    }

    @PutMapping("/{categoryId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            summary = "이모지 카테고리 수정 API (관리자)",
            description = "이모지 카테고리를 수정합니다. 관리자만 사용 가능합니다."
    )
    public ResponseEntity<ApiResponse<EmojiCategoryRes>> updateCategory(
            @PathVariable Long categoryId,
            @Valid @RequestBody EmojiCategoryCreateReq req
    ) {
        EmojiCategoryRes res = emojiCategoryService.updateCategory(categoryId, req);
        return ApiResponse.ok(res);
    }

    @DeleteMapping("/{categoryId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            summary = "이모지 카테고리 삭제 API (관리자)",
            description = "이모지 카테고리를 삭제합니다. 관리자만 사용 가능합니다."
    )
    public ResponseEntity<ApiResponse<Void>> deleteCategory(
            @PathVariable Long categoryId
    ) {
        emojiCategoryService.deleteCategory(categoryId);
        return ApiResponse.ok();
    }
}