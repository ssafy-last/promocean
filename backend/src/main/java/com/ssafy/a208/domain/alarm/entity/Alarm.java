package com.ssafy.a208.domain.alarm.entity;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.global.common.BaseEntity;
import com.ssafy.a208.global.common.enums.AlarmCategory;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Alarm extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("알림 내용")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Comment("알림 카테고리")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AlarmCategory category;

    @Comment("목적지 아이디")
    @Column(nullable = false)
    private Long destId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Builder
    public Alarm(String content, AlarmCategory category, Long destId, Member member) {
        this.content = content;
        this.category = category;
        this.destId = destId;
        this.member = member;
    }
}
