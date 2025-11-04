package com.ssafy.a208.domain.tag.reader;

import com.ssafy.a208.domain.tag.entity.ArticleTag;
import com.ssafy.a208.domain.tag.repository.ArticleTagRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ArticleTagReader {

    private final ArticleTagRepository articleTagRepository;

    public List<ArticleTag> getArticleTag(Long articleId) {
        return articleTagRepository.findAllByArticleIdAndDeletedAtIsNull(articleId);
    }

    public Optional<ArticleTag> getArticleTag(Long articleId, Long tagId) {
        return articleTagRepository.findByArticleIdAndTagId(articleId, tagId);
    }
}
