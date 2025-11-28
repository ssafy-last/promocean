package com.ssafy.a208.domain.gacha.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class EmojiNotOwnedException extends ApiException {
    private static final String MESSAGE = "보유하지 않은 이모지입니다";

    public EmojiNotOwnedException() {
        super(HttpStatus.FORBIDDEN, MESSAGE);
    }
}