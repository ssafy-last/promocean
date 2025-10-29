package com.ssafy.a208.global.common.enums;

public enum ContestStatus {
    SCHEDULED("개최전"),
    ONGOING("진행중"),
    VOTING("투표중"),
    FINISHED("종료");

    private final String name;

    ContestStatus(String name) {
        this.name = name;
    }
}
