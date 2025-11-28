package com.ssafy.a208.domain.gacha.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InsufficientMileageException extends ApiException {
    private static final String MESSAGE = "마일리지가 부족합니다";

    public InsufficientMileageException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}