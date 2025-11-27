package com.ssafy.a208.domain.gacha.reader;

import com.ssafy.a208.domain.gacha.entity.Emoji;
import com.ssafy.a208.domain.gacha.exception.EmojiNotFoundException;
import com.ssafy.a208.domain.gacha.repository.EmojiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class EmojiReader {

    private final EmojiRepository emojiRepository;

    public Emoji getEmojiById(Long emojiId) {
        return emojiRepository.findById(emojiId)
                .orElseThrow(EmojiNotFoundException::new);
    }

    public List<Emoji> getAllEmojis() {
        return emojiRepository.findByDeletedAtIsNull();
    }
}