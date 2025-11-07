package com.ssafy.a208.domain.space.dto.response;

import com.ssafy.a208.global.common.enums.PromptType;
import java.time.LocalDateTime;
import java.util.List;

public record ArticleListItemQueryRes(
        Long articleId,
        String title,
        PromptType type,
        String filePath,
        List<String> tags,
        LocalDateTime updatedAt
) {

}
