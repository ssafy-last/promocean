package com.ssafy.a208.domain.space.dto.response.space;

import lombok.Builder;

@Builder
public record SpaceSummaryRes(Long spaceId, String name) {

}
