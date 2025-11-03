package com.ssafy.a208.global.common.enums;

import lombok.Getter;

@Getter
public enum ImageDirectory {
    TMP("tmp"),
    POSTS("posts"),
    PROFILES("profiles"),
    ARTICLES("articles"),
    SUBMISSIONS("submissions");

    private final String name;

    ImageDirectory(String name) {
        this.name = name;
    }
}
