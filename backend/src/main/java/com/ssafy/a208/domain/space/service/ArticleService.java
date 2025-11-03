package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.space.dto.request.ArticleReq;
import com.ssafy.a208.domain.space.dto.response.ArticleRes;
import com.ssafy.a208.domain.space.entity.Article;
import com.ssafy.a208.domain.space.entity.Folder;
import com.ssafy.a208.domain.space.exception.InvalidArticleRequestException;
import com.ssafy.a208.domain.space.repository.ArticleRepository;
import com.ssafy.a208.global.common.enums.PromptType;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final SpaceService spaceService;
    private final FolderService folderService;
    private final ArticleRepository articleRepository;
    private final ArticleFileService articleFileService;

    @Transactional
    public ArticleRes createArticle(CustomUserDetails userDetails, Long spaceId, Long folderId,
            ArticleReq articleReq) {
        Folder folder = folderService.getEditableFolder(spaceId, folderId, userDetails.memberId());
        validateArticleRequest(articleReq);

        Article article = Article.builder()
                .title(articleReq.title())
                .description(articleReq.description())
                .prompt(articleReq.prompt())
                .type(PromptType.valueOf(articleReq.type()))
                .exampleQuestion(articleReq.exampleQuestion())
                .exampleAnswer(articleReq.exampleAnswer())
                .folder(folder)
                .build();
        articleRepository.save(article);

        String fileUrl = null;
        if (!Objects.isNull(articleReq.filePath()) && !articleReq.filePath().isBlank()) {
            fileUrl = articleFileService.createArticleFile(articleReq.filePath(), article);
        }

        return ArticleRes.builder()
                .articleId(article.getId())
                .title(article.getTitle())
                .description(article.getDescription())
                .prompt(article.getPrompt())
                .type(article.getType().getName())
                .exampleQuestion(article.getExampleQuestion())
                .exampleAnswer(article.getExampleAnswer())
                .fileUrl(fileUrl)
                .build();
    }

    private void validateArticleRequest(ArticleReq articleReq) {
        if (Objects.equals(articleReq.type(), 1)) { // TEXT
            if (!Objects.isNull(articleReq.filePath()) && !articleReq.filePath().isBlank()) {
                throw new InvalidArticleRequestException();
            }
        } else if (Objects.equals(articleReq.type(), 2)) { // IMAGE
            if ((!Objects.isNull(articleReq.exampleQuestion()) && !articleReq.exampleQuestion()
                    .isBlank())
                    || (!Objects.isNull(articleReq.exampleAnswer()) && !articleReq.exampleAnswer()
                    .isBlank())) {
                throw new InvalidArticleRequestException();
            }
        }
    }
}
