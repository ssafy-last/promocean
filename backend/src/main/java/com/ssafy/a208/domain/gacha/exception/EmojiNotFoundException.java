package com.ssafy.a208.domain.gacha.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class EmojiNotFoundException extends ApiException {
    private static final String MESSAGE = "존재하지 않는 이모지입니다";

    public EmojiNotFoundException() {
        super(HttpStatus.NOT_FOUND, MESSAGE);
    }
}