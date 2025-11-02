package com.ssafy.a208.domain.space.exception.space;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class SpaceManageAccessDeniedException extends ApiException {

    private static final String MESSAGE = "스페이스 관리 권한이 없는 회원입니다.";

    public SpaceManageAccessDeniedException() {
        super(HttpStatus.FORBIDDEN, MESSAGE);
    }
}
