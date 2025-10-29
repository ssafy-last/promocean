package com.ssafy.a208.domain.member.entity;

import com.ssafy.a208.global.common.BaseEntity;
import com.ssafy.a208.global.common.enums.MemberRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("닉네임")
    @Column(nullable = false, length = 10)
    private String nickname;

    @Comment("이메일")
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Comment("비밀번호")
    @Column(nullable = false)
    private String password;

    @Comment("토큰량")
    @Column(nullable = false)
    private int tokenAmount;

    @Comment("권한")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MemberRole role;

    @Builder
    public Member(String nickname, String email, String password, int tokenAmount,
            MemberRole role) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.tokenAmount = tokenAmount;
        this.role = role;
    }
}
