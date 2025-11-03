package com.ssafy.a208.domain.space.exception.space;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class SpaceAccessDeniedException extends ApiException {

    public SpaceAccessDeniedException(String message) {
        super(HttpStatus.FORBIDDEN, message);
    }
}
