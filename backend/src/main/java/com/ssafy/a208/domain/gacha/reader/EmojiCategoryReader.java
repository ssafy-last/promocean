package com.ssafy.a208.domain.gacha.reader;

import com.ssafy.a208.domain.gacha.entity.EmojiCategory;
import com.ssafy.a208.domain.gacha.exception.EmojiCategoryNotFoundException;
import com.ssafy.a208.domain.gacha.repository.EmojiCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class EmojiCategoryReader {

    private final EmojiCategoryRepository emojiCategoryRepository;

    public EmojiCategory getEmojiCategoryById(Long categoryId) {
        return emojiCategoryRepository.findByIdAndDeletedAtIsNull(categoryId)
                .orElseThrow(EmojiCategoryNotFoundException::new);
    }

    public List<EmojiCategory> getAllEmojiCategories() {
        return emojiCategoryRepository.findByDeletedAtIsNull();
    }
}