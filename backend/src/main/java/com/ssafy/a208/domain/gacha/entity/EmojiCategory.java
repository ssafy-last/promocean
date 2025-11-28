package com.ssafy.a208.domain.gacha.entity;

import com.ssafy.a208.global.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EmojiCategory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("카테고리 이름")
    @Column(nullable = false, unique = true, length = 50)
    private String name;

    @Comment("카테고리 설명")
    @Column(length = 200)
    private String description;

    @OneToMany(mappedBy = "category", cascade = CascadeType.PERSIST)
    private List<Emoji> emojis = new ArrayList<>();

    @Builder
    public EmojiCategory(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public void updateCategory(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public void deleteEmoJiCategory() {
        this.delete();
    }
}