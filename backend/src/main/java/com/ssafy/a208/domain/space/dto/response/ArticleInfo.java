package com.ssafy.a208.domain.space.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;

@Builder
public record ArticleInfo(
        Long articleId,
        String title,
        String fileUrl,
        String type,
        LocalDateTime updatedAt,
        List<String> tags
) {

}
