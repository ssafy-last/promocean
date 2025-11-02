package com.ssafy.a208.domain.space.controller;

import com.ssafy.a208.domain.space.dto.request.SpaceReq;
import com.ssafy.a208.domain.space.dto.response.space.SpaceDetailRes;
import com.ssafy.a208.domain.space.dto.response.space.SpaceInfoRes;
import com.ssafy.a208.domain.space.dto.response.space.SpaceSummariesRes;
import com.ssafy.a208.domain.space.service.SpaceService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/spaces")
@Tag(name = "스페이스", description = "스페이스 생성, 조회, 수정, 삭제 API가 담겨있어요")
public class SpaceRestController {
    private final SpaceService spaceService;

    @PostMapping
    @Operation(summary = "팀스페이스 생성", description = "팀스페이스를 생성할 수 있습니다.")
    public ResponseEntity<ApiResponse<SpaceInfoRes>> createTeamSpace(
            @RequestBody @Valid SpaceReq spaceReq,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        SpaceInfoRes spaceInfoRes = spaceService.saveSpace(spaceReq, userDetails);
        return ApiResponse.of(HttpStatus.CREATED, spaceInfoRes);
    }

    @GetMapping
    @Operation(summary = "팀스페이스 목록조회", description = "팀스페이스 목록을 조회할 수 있습니다.")
    public ResponseEntity<ApiResponse<SpaceSummariesRes>> getTeamSpaces(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        SpaceSummariesRes teamSpaces = spaceService.getTeamSpaces(userDetails);
        return ApiResponse.of(HttpStatus.OK, teamSpaces);
    }

    @GetMapping("/{spaceId}")
    @Operation(summary = "스페이스 상세조회", description = "스페이스의 내용을 상세 조회할 수 있습니다.")
    public ResponseEntity<ApiResponse<SpaceDetailRes>> getSpace(
            @PathVariable Long spaceId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        SpaceDetailRes space = spaceService.getSpace(spaceId, userDetails);
        return ApiResponse.of(HttpStatus.OK, space);
    }

    @PatchMapping("/{spaceId}")
    @Operation(summary = "스페이스 수정", description = "스페이스의 제목을 수정할 수 있습니다.")
    public ResponseEntity<ApiResponse<SpaceDetailRes>> updateSpace(
            @PathVariable Long spaceId,
            @RequestBody @Valid SpaceReq spaceReq,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        spaceService.updateSpace(spaceId, spaceReq, userDetails);
        return ApiResponse.of(HttpStatus.OK);
    }

    @DeleteMapping("/{spaceId}")
    @Operation(summary = "팀스페이스 삭제", description = "팀스페이스를 삭제할 수 있습니다.")
    public ResponseEntity<ApiResponse<SpaceDetailRes>> deleteTeamSpace(
            @PathVariable Long spaceId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        spaceService.deleteTeamSpace(spaceId, userDetails);
        return ApiResponse.of(HttpStatus.OK);
    }

}
