package com.ssafy.a208.global.common.enums;

import lombok.Getter;

@Getter
public enum ParticipantRole {
    OWNER(30), READER(10), EDITOR(20);

    private final int value;

    ParticipantRole(int value) {
        this.value = value;
    }

    public boolean canManage() {
        return this.value >= 30;
    }

    public boolean canEdit() {
        return this.value >= 20;
    }

}
