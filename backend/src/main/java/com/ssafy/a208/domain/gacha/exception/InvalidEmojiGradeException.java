package com.ssafy.a208.domain.gacha.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidEmojiGradeException extends ApiException {
    private static final String MESSAGE = "유효하지 않은 이모지 등급입니다 (COMMON, RARE, EPIC, LEGENDARY만 가능)";

    public InvalidEmojiGradeException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}