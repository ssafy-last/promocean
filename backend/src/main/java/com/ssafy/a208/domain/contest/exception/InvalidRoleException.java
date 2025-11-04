package com.ssafy.a208.domain.contest.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidRoleException extends ApiException {

    private static final String MESSAGE = "대회를 생성 및 수정할 권한이 없습니다.";

    public InvalidRoleException() { super(HttpStatus.FORBIDDEN, MESSAGE); }
}
