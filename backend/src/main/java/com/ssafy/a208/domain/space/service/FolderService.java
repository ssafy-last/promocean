package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.space.dto.response.folder.FolderInfo;
import com.ssafy.a208.domain.space.entity.Folder;
import com.ssafy.a208.domain.space.repository.FolderRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FolderService {
    private final FolderRepository folderRepository;

    @Transactional(readOnly = true)
    public List<FolderInfo> getFoldersBySpaceId(Long spaceId) {
        List<Folder> folders = folderRepository.findBySpaceIdAndDeletedAtIsNull(spaceId);
        return folders.stream()
                .map(folder -> FolderInfo.builder()
                        .folderId(folder.getId())
                        .name(folder.getName())
                        .color(folder.getColor())
                        .build())
                .toList();

    }
}
