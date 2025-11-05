package com.ssafy.a208.domain.space.dto.response.space;

import java.util.List;
import lombok.Builder;

@Builder
public record SpaceInfosRes(List<SpaceInfo> spaceInfos) {

}
