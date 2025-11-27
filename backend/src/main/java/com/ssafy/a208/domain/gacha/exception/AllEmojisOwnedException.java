package com.ssafy.a208.domain.gacha.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class AllEmojisOwnedException extends ApiException {
    private static final String MESSAGE = "이미 모든 이모지를 보유하고 있습니다";

    public AllEmojisOwnedException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}