package com.ssafy.a208.global.common.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum EmojiGrade {
    COMMON("커먼", 1),
    RARE("레어", 2),
    EPIC("에픽", 3),
    LEGENDARY("레전더리", 4);

    private final String name;
    private final int tier;
}