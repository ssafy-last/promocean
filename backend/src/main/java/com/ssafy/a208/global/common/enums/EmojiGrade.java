package com.ssafy.a208.global.common.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum EmojiGrade {
    COMMON("커먼", 1, 50.0),
    RARE("레어", 2, 30.0),
    EPIC("에픽", 3, 15.0),
    LEGENDARY("레전더리", 4, 5.0);

    private final String name;
    private final int tier;
    private final double defaultProbability;
}