package com.ssafy.a208.global.common.enums;

public enum PromptType {
    TEXT(1, "텍스트"), IMAGE(2, "이미지");

    private final int value;
    private final String name;

    PromptType(int value, String name) {
        this.value = value;
        this.name = name;
    }
}
