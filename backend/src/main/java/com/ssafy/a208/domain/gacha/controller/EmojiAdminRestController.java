package com.ssafy.a208.domain.gacha.controller;

import com.ssafy.a208.domain.gacha.dto.request.EmojiBatchCreateReq;
import com.ssafy.a208.domain.gacha.dto.request.EmojiCreateReq;
import com.ssafy.a208.domain.gacha.dto.request.EmojiUpdateReq;
import com.ssafy.a208.domain.gacha.dto.response.EmojiBatchCreateRes;
import com.ssafy.a208.domain.gacha.dto.response.EmojiListRes;
import com.ssafy.a208.domain.gacha.dto.response.EmojiRes;
import com.ssafy.a208.domain.gacha.service.EmojiAdminService;
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
@RequestMapping("/api/v1/admin/emojis")
@RequiredArgsConstructor
@Tag(name = "이모지 관리자", description = "이모지 관리 API (관리자 전용)")
public class EmojiAdminRestController {

    private final EmojiAdminService emojiAdminService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            summary = "이모지 생성 API (관리자)",
            description = "새로운 이모지를 생성합니다. 등급에 따라 자동으로 기본 확률이 설정됩니다. 관리자만 사용 가능합니다."
    )
    public ResponseEntity<ApiResponse<EmojiRes>> createEmoji(
            @Valid @RequestBody EmojiCreateReq req
    ) {
        EmojiRes res = emojiAdminService.createEmoji(req);
        return ApiResponse.create(res);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            summary = "전체 이모지 목록 조회 API (관리자)",
            description = "모든 이모지 목록을 조회합니다. 관리자만 사용 가능합니다."
    )
    public ResponseEntity<ApiResponse<EmojiListRes>> getAllEmojis() {
        EmojiListRes res = emojiAdminService.getAllEmojis();
        return ApiResponse.ok(res);
    }

    @PatchMapping("/{emojiId}/probability")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            summary = "이모지 확률 수정 API (관리자)",
            description = "특정 이모지의 확률을 수정합니다. 이벤트 등으로 개별 확률 조정이 필요할 때 사용합니다. 관리자만 사용 가능합니다."
    )
    public ResponseEntity<ApiResponse<EmojiRes>> updateEmojiProbability(
            @PathVariable Long emojiId,
            @Valid @RequestBody EmojiUpdateReq req
    ) {
        EmojiRes res = emojiAdminService.updateEmojiProbability(emojiId, req);
        return ApiResponse.ok(res);
    }

    @PostMapping("/batch")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            summary = "이모지 일괄 생성 API (관리자)",
            description = "여러 개의 이모지를 한 번에 생성합니다. 각 이모지마다 다른 등급을 지정할 수 있습니다. 관리자만 사용 가능합니다."
    )
    public ResponseEntity<ApiResponse<EmojiBatchCreateRes>> createEmojiBatch(
            @Valid @RequestBody EmojiBatchCreateReq req
    ) {
        EmojiBatchCreateRes res = emojiAdminService.createEmojiBatch(req);
        return ApiResponse.create(res);
    }

    @DeleteMapping("/{emojiId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            summary = "이모지 삭제 API (관리자)",
            description = "이모지를 삭제합니다. 관리자만 사용 가능합니다."
    )
    public ResponseEntity<ApiResponse<Void>> deleteEmoji(
            @PathVariable Long emojiId
    ) {
        emojiAdminService.deleteEmoji(emojiId);
        return ApiResponse.ok();
    }
}