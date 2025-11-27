package com.ssafy.a208.domain.gacha.entity;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.global.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(
        uniqueConstraints = @UniqueConstraint(
                name = "uk_member_emoji",
                columnNames = {"member_id", "emoji_id"}
        )
)
public class MemberEmoji extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emoji_id", nullable = false)
    private Emoji emoji;

    @Comment("획득 일시")
    @Column(nullable = false)
    private LocalDateTime obtainedAt;

    @Builder
    public MemberEmoji(Member member, Emoji emoji, LocalDateTime obtainedAt) {
        this.member = member;
        this.emoji = emoji;
        this.obtainedAt = obtainedAt;
    }
}