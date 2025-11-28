package com.ssafy.a208.domain.gacha.repository;

import com.ssafy.a208.domain.gacha.entity.Emoji;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmojiRepository extends JpaRepository<Emoji, Long> {
    List<Emoji> findByDeletedAtIsNull();
}