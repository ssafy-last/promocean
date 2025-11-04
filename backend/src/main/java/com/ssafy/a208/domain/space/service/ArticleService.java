package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.space.dto.request.ArticleReq;
import com.ssafy.a208.domain.space.dto.response.ArticleDetailRes;
import com.ssafy.a208.domain.space.dto.response.ArticleInfo;
import com.ssafy.a208.domain.space.dto.response.ArticleListRes;
import com.ssafy.a208.domain.space.entity.Article;
import com.ssafy.a208.domain.space.entity.ArticleFile;
import com.ssafy.a208.domain.space.entity.Folder;
import com.ssafy.a208.domain.space.exception.InvalidArticleRequestException;
import com.ssafy.a208.domain.space.reader.ArticleFileReader;
import com.ssafy.a208.domain.space.reader.ArticleReader;
import com.ssafy.a208.domain.space.repository.ArticleRepository;
import com.ssafy.a208.domain.tag.service.ArticleTagService;
import com.ssafy.a208.global.common.enums.PromptType;
import com.ssafy.a208.global.image.dto.FileMetaData;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final S3Service s3Service;
    private final ArticleTagService tagService;
    private final SpaceService spaceService;
    private final ArticleReader articleReader;
    private final FolderService folderService;
    private final ArticleRepository articleRepository;
    private final ArticleFileReader articleFileReader;
    private final ArticleFileService articleFileService;

    @Transactional
    public ArticleDetailRes createArticle(CustomUserDetails userDetails, Long spaceId,
            Long folderId,
            ArticleReq articleReq) {
        Folder folder = folderService.getEditableFolder(spaceId, folderId, userDetails.memberId());
        validateArticleRequest(articleReq);

        // 아티클 생성
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

        // 태그 생성
        tagService.createTag(articleReq.tags(), article);

        // 파일 생성
        String fileUrl = null;
        if (!Objects.isNull(articleReq.filePath()) && !articleReq.filePath().isBlank()) {
            fileUrl = articleFileService.createArticleFile(articleReq.filePath(), article);
        }

        return ArticleDetailRes.builder()
                .articleId(article.getId())
                .title(article.getTitle())
                .description(article.getDescription())
                .prompt(article.getPrompt())
                .type(article.getType().getName())
                .sampleQuestion(article.getExampleQuestion())
                .sampleAnswer(article.getExampleAnswer())
                .fileUrl(fileUrl)
                .tags(articleReq.tags())
                .updatedAt(article.getUpdatedAt().toLocalDate())
                .build();
    }

    @Transactional
    public void updateArticle(CustomUserDetails userDetails, Long spaceId, Long folderId,
            Long articleId, ArticleReq articleReq) {
        folderService.validateEditableFolder(spaceId, folderId, userDetails.memberId());
        Article article = articleReader.getArticleById(articleId);
        validateArticleRequest(articleReq);

        // 해시태그 처리
        tagService.createTag(articleReq.tags(), article);

        // 이미지에서 텍스트로 바뀌는 경우 이미지 삭제
        if (articleReq.type() == 1 && article.getType().getValue() == 2) {
            articleFileService.deleteArticleFile(article);
        }

        // 파일 들어왔으면 고쳐주기
        if (!Objects.isNull(articleReq.filePath()) && !articleReq.filePath().isBlank()) {
            Optional<ArticleFile> file = articleFileReader.getArticleFileById(articleId);
            file.ifPresentOrElse(
                    existing -> {
                        s3Service.deleteFile(existing.getFilePath());
                        FileMetaData metaData = s3Service.getFileMetadata(articleReq.filePath());
                        existing.updateFile(metaData);
                    },
                    () -> {
                        articleFileService.createArticleFile(articleReq.filePath(), article);
                    }
            );
        }

        article.updateArticle(articleReq);
    }

    @Transactional
    public void deleteArticle(CustomUserDetails userDetails, Long spaceId, Long folderId,
            Long articleId) {
        folderService.validateEditableFolder(spaceId, folderId, userDetails.memberId());
        Article article = articleReader.getArticleById(articleId);
        ArticleFile file = articleFileReader.getArticleFileById(articleId).orElse(null);
        if (!Objects.isNull(file)) {
            s3Service.deleteFile(file.getFilePath());
            file.deleteArticleFile();
        }

        article.deleteArticle();
        tagService.deleteTag(article);
    }

    @Transactional(readOnly = true)
    public ArticleListRes getArticleList(CustomUserDetails userDetails, Long spaceId,
            Long folderId) {
        List<Article> articles;
        if (Objects.isNull(folderId)) {
            spaceService.validateEditableSpace(spaceId, userDetails.memberId());
            articles = articleReader.getAllArticles();
        } else {
            folderService.validateEditableFolder(spaceId, folderId, userDetails.memberId());
            articles = articleReader.getArticlesByFolderId(folderId);
        }

        List<ArticleInfo> articleInfos = articles.stream()
                .map(article -> ArticleInfo.builder()
                        .articleId(article.getId())
                        .title(article.getTitle())
                        .type(article.getType().getName())
                        .fileUrl(articleFileReader.getArticleFileById(article.getId())
                                .map(ArticleFile::getFilePath)
                                .map(s3Service::getCloudFrontUrl)
                                .orElse(null))
                        .tags(tagService.getTags(article))
                        .build()).toList();
        return ArticleListRes.builder()
                .articles(articleInfos).build();
    }

    @Transactional(readOnly = true)
    public ArticleDetailRes getArticleDetail(CustomUserDetails userDetails, Long spaceId,
            Long articleId) {
        spaceService.validateEditableSpace(spaceId, userDetails.memberId());
        Article article = articleReader.getArticleById(articleId);
        Optional<ArticleFile> articleFile = articleFileReader.getArticleFileById(articleId);
        String fileUrl = null;
        if (articleFile.isPresent()) {
            fileUrl = s3Service.getCloudFrontUrl(articleFile.get().getFilePath());
        }

        return ArticleDetailRes.builder()
                .articleId(article.getId())
                .title(article.getTitle())
                .description(article.getDescription())
                .prompt(article.getPrompt())
                .type(article.getType().getName())
                .fileUrl(fileUrl)
                .sampleQuestion(article.getExampleQuestion())
                .sampleAnswer(article.getExampleAnswer())
                .updatedAt(article.getUpdatedAt().toLocalDate())
                .tags(tagService.getTags(article))
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
