package com.ssafy.a208.domain.gacha.service;

import com.ssafy.a208.domain.gacha.dto.request.EmojiCategoryCreateReq;
import com.ssafy.a208.domain.gacha.dto.response.EmojiCategoryListRes;
import com.ssafy.a208.domain.gacha.dto.response.EmojiCategoryRes;
import com.ssafy.a208.domain.gacha.entity.EmojiCategory;
import com.ssafy.a208.domain.gacha.reader.EmojiCategoryReader;
import com.ssafy.a208.domain.gacha.repository.EmojiCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmojiCategoryService {

    private final EmojiCategoryRepository emojiCategoryRepository;
    private final EmojiCategoryReader emojiCategoryReader;

    @Transactional
    public EmojiCategoryRes createCategory(EmojiCategoryCreateReq req) {
        EmojiCategory category = EmojiCategory.builder()
                .name(req.name())
                .description(req.description())
                .build();

        emojiCategoryRepository.save(category);

        log.info("이모지 카테고리 생성 완료 - categoryId: {}, name: {}",
                category.getId(), category.getName());

        return EmojiCategoryRes.builder()
                .categoryId(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .build();
    }

    @Transactional(readOnly = true)
    public EmojiCategoryListRes getAllCategories() {
        List<EmojiCategory> categories = emojiCategoryReader.getAllEmojiCategories();

        List<EmojiCategoryRes> categoryResList = categories.stream()
                .map(category -> EmojiCategoryRes.builder()
                        .categoryId(category.getId())
                        .name(category.getName())
                        .description(category.getDescription())
                        .build())
                .toList();

        log.info("이모지 카테고리 목록 조회 완료 - count: {}", categoryResList.size());

        return EmojiCategoryListRes.builder()
                .categories(categoryResList)
                .totalCount(categoryResList.size())
                .build();
    }

    @Transactional
    public EmojiCategoryRes updateCategory(Long categoryId, EmojiCategoryCreateReq req) {
        EmojiCategory category = emojiCategoryReader.getEmojiCategoryById(categoryId);

        category.updateCategory(req.name(), req.description());

        log.info("이모지 카테고리 수정 완료 - categoryId: {}", categoryId);

        return EmojiCategoryRes.builder()
                .categoryId(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .build();
    }

    @Transactional
    public void deleteCategory(Long categoryId) {
        EmojiCategory category = emojiCategoryReader.getEmojiCategoryById(categoryId);

        category.deleteEmoJiCategory();

        log.info("이모지 카테고리 삭제 완료 - categoryId: {}", categoryId);
    }
}