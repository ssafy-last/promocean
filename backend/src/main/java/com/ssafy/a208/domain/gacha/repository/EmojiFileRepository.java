package com.ssafy.a208.domain.gacha.repository;

import com.ssafy.a208.domain.gacha.entity.EmojiFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmojiFileRepository extends JpaRepository<EmojiFile, Long> {
}