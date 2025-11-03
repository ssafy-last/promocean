package com.ssafy.a208.domain.space.dto.response;

import lombok.Builder;

@Builder
public record ArticleRes(
        Long articleId,
        String title,
        String description,
        String prompt,
        String type,
        String exampleQuestion,
        String exampleAnswer,
        String fileUrl
) {

}
