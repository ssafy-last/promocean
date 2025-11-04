package com.ssafy.a208.domain.tag.service;

import com.ssafy.a208.domain.space.entity.Article;
import com.ssafy.a208.domain.tag.entity.ArticleTag;
import com.ssafy.a208.domain.tag.entity.Tag;
import com.ssafy.a208.domain.tag.reader.ArticleTagReader;
import com.ssafy.a208.domain.tag.reader.TagReader;
import com.ssafy.a208.domain.tag.repository.ArticleTagRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ArticleTagService {

    private final TagReader tagReader;
    private final TagService tagService;
    private final ArticleTagReader articleTagReader;
    private final ArticleTagRepository articleTagRepository;

    /**
     * Tag가 이미 있다면 매핑테이블 저장만 하고 새로운 Tag라면 Tag 생성 후 매핑테이블 저장하는 함수
     *
     * @param tags    태그 목록
     * @param article 아티클 객체
     */
    @Transactional
    public void createTag(List<String> tags, Article article) {
        // 기존 매핑정보 제거
        this.deleteTag(article);

        for (String name : tags) {
            Optional<Tag> tag = tagReader.getTagByName(name);

            tag.ifPresentOrElse(
                    // 태그가 존재하는 경우
                    existing -> {
                        // 매핑 정보 찾기
                        Optional<ArticleTag> articleTag = articleTagReader
                                .getArticleTag(article.getId(), existing.getId());

                        // 매핑정보 있으면 restore, 없으면 새로생성
                        articleTag.ifPresentOrElse(
                                exist -> exist.restoreArticleTag(),
                                () -> articleTagRepository
                                        .save(ArticleTag.builder().tag(existing).article(article)
                                                .build()));
                    },
                    // 태그를 새로 만들어야 하는 경우
                    () -> {
                        // 태그 생성
                        Tag newTag = tagService.createTag(name);

                        // 매핑정보 생성
                        articleTagRepository.save(ArticleTag.builder()
                                .tag(newTag)
                                .article(article)
                                .build());
                    }
            );
        }
    }

    public List<String> getTags(Article article) {
        List<ArticleTag> articleTags = articleTagReader.getArticleTag(article.getId());
        List<String> tags = new ArrayList<>();
        for (ArticleTag articleTag : articleTags) {
            tags.add(articleTag.getTag().getName());
        }
        return tags;
    }

    public void deleteTag(Article article) {
        List<ArticleTag> articleTags = articleTagReader.getArticleTag(article.getId());
        for (ArticleTag articleTag : articleTags) {
            articleTag.deleteArticleTag();
        }
    }
}
