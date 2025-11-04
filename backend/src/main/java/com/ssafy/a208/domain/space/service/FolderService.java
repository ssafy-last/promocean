package com.ssafy.a208.domain.space.service;


import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.domain.space.dto.request.FolderReq;
import com.ssafy.a208.domain.space.dto.response.FolderRes;
import com.ssafy.a208.domain.space.entity.Folder;
import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.reader.FolderReader;
import com.ssafy.a208.domain.space.repository.FolderRepository;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FolderService {

    private final SpaceService spaceService;
    private final FolderReader folderReader;
    private final MemberReader memberReader;
    private final FolderRepository folderRepository;

    @Transactional
    public FolderRes createFolder(CustomUserDetails userDetails, Long spaceId,
            FolderReq folderReq) {
        Member member = memberReader.getMemberById(userDetails.memberId());
        Space space = spaceService.validateAccessToSpace(spaceId, member);
        folderReader.checkDuplicatedName(space, folderReq.name());

        Folder folder = Folder.builder()
                .name(folderReq.name())
                .color(folderReq.color())
                .space(space)
                .build();
        folderRepository.save(folder);

        return FolderRes.builder()
                .folderId(folder.getId())
                .name(folder.getName())
                .color(folder.getColor())
                .isPinned(folder.isPinned())
                .build();
    }

    @Transactional
    public void updateFolder(CustomUserDetails userDetails, Long spaceId, Long folderId,
            FolderReq folderReq) {
        Member member = memberReader.getMemberById(userDetails.memberId());
        Space space = spaceService.validateAccessToSpace(spaceId, member);
        Folder folder = folderReader.getFolderById(folderId);
        folderReader.checkDuplicatedName(space, folderReq.name());

        folder.updateFolder(folderReq);
    }

    @Transactional
    public void deleteFolder(CustomUserDetails userDetails, Long spaceId, Long folderId) {
        Member member = memberReader.getMemberById(userDetails.memberId());
        spaceService.validateAccessToSpace(spaceId, member);
        Folder folder = folderReader.getFolderById(folderId);

        folder.deleteFolder();
    }

    @Transactional
    public FolderRes pinFolder(CustomUserDetails userDetails, Long spaceId, Long folderId) {
        Member member = memberReader.getMemberById(userDetails.memberId());
        spaceService.validateAccessToSpace(spaceId, member);
        Folder folder = folderReader.getFolderById(folderId);

        folder.updatePin();
        return FolderRes.builder()
                .folderId(folder.getId())
                .name(folder.getName())
                .color(folder.getColor())
                .isPinned(folder.isPinned())
                .build();
    }

}
