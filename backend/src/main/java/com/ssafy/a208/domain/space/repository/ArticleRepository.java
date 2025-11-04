package com.ssafy.a208.domain.space.repository;

import com.ssafy.a208.domain.space.entity.Article;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    Optional<Article> findByIdAndDeletedAtIsNull(Long id);

    List<Article> findAllByFolderIdAndDeletedAtIsNull(Long folderId);

    List<Article> findAllByDeletedAtIsNull();
}
