package com.ssafy.a208.domain.space.reader;

import com.ssafy.a208.domain.space.entity.Article;
import com.ssafy.a208.domain.space.exception.ArticleNotFoundException;
import com.ssafy.a208.domain.space.repository.ArticleRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ArticleReader {

    private final ArticleRepository articleRepository;

    public Article getArticleById(Long articleId) {
        return articleRepository.findByIdAndDeletedAtIsNull(articleId)
                .orElseThrow(ArticleNotFoundException::new);
    }

    public List<Article> getArticlesByFolderId(Long folderId) {
        return articleRepository.findAllByFolderIdAndDeletedAtIsNull(folderId);
    }

    public List<Article> getAllArticles() {
        return articleRepository.findAllByDeletedAtIsNull();
    }

}
