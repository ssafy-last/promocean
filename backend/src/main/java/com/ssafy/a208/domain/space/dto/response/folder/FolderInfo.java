package com.ssafy.a208.domain.space.dto.response.folder;

import lombok.Builder;

@Builder
public record FolderInfo(Long folderId, String name, String color) {

}
