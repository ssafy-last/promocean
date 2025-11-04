package com.ssafy.a208.domain.space.dto.response;

import java.util.List;
import lombok.Builder;

@Builder
public record ArticleInfo(
        Long articleId,
        String title,
        String fileUrl,
        String type,
        List<String> tags
) {

}
