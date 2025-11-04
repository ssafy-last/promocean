package com.ssafy.a208.domain.tag.repository;

import com.ssafy.a208.domain.tag.entity.ArticleTag;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleTagRepository extends JpaRepository<ArticleTag, Long> {

    Optional<ArticleTag> findByArticleIdAndTagId(Long articleId, Long tagId);

    List<ArticleTag> findAllByArticleIdAndDeletedAtIsNull(Long articleId);
}
