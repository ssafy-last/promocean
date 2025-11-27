package com.ssafy.a208.domain.gacha.entity;

import com.ssafy.a208.global.common.BaseEntity;
import com.ssafy.a208.global.common.enums.EmojiGrade;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Emoji extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("이모지 등급 (COMMON, RARE, EPIC, LEGENDARY)")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EmojiGrade grade;

    @Comment("가챠 확률 (백분율)")
    @Column(nullable = false)
    private Double probability;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    @Comment("이모지 카테고리")
    private EmojiCategory category;

    @OneToOne(mappedBy = "emoji", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private EmojiFile emojiFile;

    @Builder
    public Emoji(EmojiGrade grade, Double probability, EmojiCategory category) {
        this.grade = grade;
        this.probability = probability;
        this.category = category;
    }

    public void updateProbability(Double probability) {
        this.probability = probability;
    }

    public void deleteEmoji() {
        this.delete();
    }
}