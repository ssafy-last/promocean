package com.ssafy.a208.domain.gacha.repository;

import com.ssafy.a208.domain.gacha.entity.EmojiCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmojiCategoryRepository extends JpaRepository<EmojiCategory, Long> {
    List<EmojiCategory> findByDeletedAtIsNull();
    Optional<EmojiCategory> findByIdAndDeletedAtIsNull(Long id);
}