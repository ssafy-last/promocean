package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.space.entity.Article;
import com.ssafy.a208.domain.space.entity.ArticleFile;
import com.ssafy.a208.domain.space.reader.ArticleFileReader;
import com.ssafy.a208.domain.space.repository.ArticleFileRepository;
import com.ssafy.a208.global.common.enums.ImageDirectory;
import com.ssafy.a208.global.image.dto.FileMetaData;
import com.ssafy.a208.global.image.service.S3Service;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArticleFileService {

    private final S3Service s3Service;
    private final ArticleFileReader articleFileReader;
    private final ArticleFileRepository articleFileRepository;

    public String createArticleFile(String filePath, Article article) {
        String destPath = s3Service.moveObject(filePath, ImageDirectory.ARTICLES);
        FileMetaData metaData = s3Service.getFileMetadata(destPath);
        ArticleFile articleFile = ArticleFile.builder()
                .originalName(metaData.originalName())
                .filePath(metaData.filePath())
                .size(metaData.size())
                .contentType(metaData.contentType())
                .article(article)
                .build();
        articleFileRepository.save(articleFile);
        return destPath;
    }

    public void deleteArticleFile(Article article) {
        Optional<ArticleFile> articleFile = articleFileReader.getArticleFileById(article.getId());
        articleFile.ifPresent(existing -> existing.deleteArticleFile());
    }

}
