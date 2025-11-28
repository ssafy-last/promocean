package com.ssafy.a208.domain.gacha.controller;

import com.ssafy.a208.domain.gacha.dto.response.GachaRes;
import com.ssafy.a208.domain.gacha.dto.response.MyEmojiListRes;
import com.ssafy.a208.domain.gacha.service.GachaService;
import com.ssafy.a208.domain.gacha.service.MemberEmojiService;
import com.ssafy.a208.domain.gacha.service.MileageService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/gacha")
@RequiredArgsConstructor
@Tag(name = "가챠", description = "이모지 가챠 및 보유 이모지 관리 API가 담겨있어요.")
public class GachaRestController {

    private final GachaService gachaService;
    private final MemberEmojiService memberEmojiService;
    private final MileageService mileageService;

    @PostMapping("/draw")
    @Operation(
            summary = "가챠 뽑기 API",
            description = "마일리지를 사용하여 이모지를 뽑습니다. 이미 보유한 이모지는 나오지 않습니다."
    )
    public ResponseEntity<ApiResponse<GachaRes>> drawGacha(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        GachaRes res = gachaService.drawGacha(userDetails);
        return ApiResponse.ok(res);
    }

    @GetMapping("/my-emojis")
    @Operation(
            summary = "보유 이모지 목록 조회 API",
            description = "사용자가 보유한 이모지 목록을 조회합니다."
    )
    public ResponseEntity<ApiResponse<MyEmojiListRes>> getMyEmojis(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        MyEmojiListRes res = memberEmojiService.getMyEmojis(userDetails);
        return ApiResponse.ok(res);
    }

    @GetMapping("/mileage")
    @Operation(
            summary = "마일리지 조회 API",
            description = "현재 사용자의 마일리지를 조회합니다."
    )
    public ResponseEntity<ApiResponse<Integer>> getMileage(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Integer mileage = mileageService.getMileage(userDetails);
        return ApiResponse.ok(mileage);
    }
}