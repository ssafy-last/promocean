package com.ssafy.a208.domain.space.dto.response.space;

import com.ssafy.a208.domain.space.dto.response.folder.FolderInfo;
import java.util.List;
import lombok.Builder;

@Builder
public record SpaceDetailRes(List<FolderInfo> folders) {

}
