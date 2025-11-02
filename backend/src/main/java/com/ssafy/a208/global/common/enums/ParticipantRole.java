package com.ssafy.a208.global.common.enums;

public enum ParticipantRole {
    OWNER(30), READER(10), EDITOR(20);

    private final int value;

    ParticipantRole(int value) {
        this.value = value;
    }

    public boolean canManage() {
        return this == OWNER;
    }

    public boolean canEdit() {
        return this == OWNER || this == EDITOR;
    }

}
