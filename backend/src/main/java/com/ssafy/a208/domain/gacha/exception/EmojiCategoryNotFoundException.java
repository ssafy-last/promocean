package com.ssafy.a208.domain.gacha.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class EmojiCategoryNotFoundException extends ApiException {
    private static final String MESSAGE = "존재하지 않는 이모지 카테고리입니다";

    public EmojiCategoryNotFoundException() {
        super(HttpStatus.NOT_FOUND, MESSAGE);
    }
}