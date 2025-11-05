package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.domain.space.dto.request.SpaceReq;
import com.ssafy.a208.domain.space.dto.request.SpaceUpdateReq;
import com.ssafy.a208.domain.space.dto.response.space.SpaceInfo;
import com.ssafy.a208.domain.space.dto.response.space.SpaceInfosRes;
import com.ssafy.a208.domain.space.dto.response.space.SpaceRes;
import com.ssafy.a208.domain.space.entity.Participant;
import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.entity.SpaceCover;
import com.ssafy.a208.domain.space.exception.space.CannotDeletePersonalSpaceException;
import com.ssafy.a208.domain.space.exception.spacecover.InvalidSpaceCoverRequestException;
import com.ssafy.a208.domain.space.reader.SpaceCoverReader;
import com.ssafy.a208.domain.space.reader.SpaceReader;
import com.ssafy.a208.domain.space.repository.SpaceCoverRepository;
import com.ssafy.a208.domain.space.repository.SpaceRepository;
import com.ssafy.a208.global.common.enums.ImageDirectory;
import com.ssafy.a208.global.common.enums.ParticipantRole;
import com.ssafy.a208.global.common.enums.SpaceType;
import com.ssafy.a208.global.image.dto.FileMetaData;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import com.ssafy.a208.global.security.exception.InvalidFilePathException;
import com.ssafy.a208.global.security.exception.S3OperationException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.services.s3.model.S3Exception;

@Service
@RequiredArgsConstructor
public class SpaceService {

    private final SpaceRepository spaceRepository;
    private final SpaceReader spaceReader;
    private final MemberReader memberReader;
    private final ParticipantService participantService;
    private final SpaceCoverRepository spaceCoverRepository;
    private final SpaceCoverReader spaceCoverReader;
    private final S3Service s3Service;
    private static final String DEFAULT_SPACE_KEY = "spaces/default-space.png";

    @Transactional
    public Space createPersonalSpace(String userNickname) {
        Space space = Space.builder()
                .name(String.format("%s의 개인 스페이스", userNickname))
                .type(SpaceType.PERSONAL)
                .build();
        return spaceRepository.save(space);
    }

    @Transactional
    public SpaceRes createTeamSpace(CustomUserDetails userDetails, SpaceReq spaceReq) {
        Member member = memberReader.getMemberById(userDetails.memberId());
        Space space = Space.builder()
                .name(spaceReq.name())
                .type(SpaceType.TEAM)
                .build();
        FileMetaData fileMetaData = s3Service.getFileMetadata(DEFAULT_SPACE_KEY);
        SpaceCover spaceCover = SpaceCover.builder()
                .space(space)
                .contentType(fileMetaData.contentType())
                .size(fileMetaData.size())
                .filePath(fileMetaData.filePath())
                .originalName(fileMetaData.originalName())
                .build();
        spaceRepository.save(space);
        spaceCoverRepository.save(spaceCover);
        participantService.saveParticipant(ParticipantRole.OWNER, member, space);
        participantService.saveParticipants(spaceReq.participants(), space);
        return SpaceRes.builder()
                .spaceId(space.getId())
                .name(space.getName())
                .spaceCoverUrl(s3Service.getCloudFrontUrl(DEFAULT_SPACE_KEY))
                .build();
    }

    @Transactional(readOnly = true)
    public SpaceInfosRes getTeamSpaces(CustomUserDetails userDetails) {
        List<Participant> participants = participantService.getParticipants(userDetails.memberId());
        List<Long> spaceIds = participants.stream()
                .map(participant -> participant.getSpace().getId())
                .toList();
        List<Space> teamSpaces = spaceReader.getTeamSpaces(spaceIds);
        List<SpaceInfo> spaceInfos = teamSpaces.stream()
                .map(teamSpace -> {
                    Optional<SpaceCover> spaceCover = spaceCoverRepository.findBySpaceIdAndDeletedAtIsNull(
                            teamSpace.getId());
                    String coverUrl = null;
                    if (spaceCover.isPresent()) {
                        coverUrl = s3Service.getCloudFrontUrl(spaceCover.get().getFilePath());
                    }
                    return SpaceInfo.builder()
                            .spaceId(teamSpace.getId())
                            .name(teamSpace.getName())
                            .spaceCoverUrl(coverUrl)
                            .build();
                })
                .toList();
        return SpaceInfosRes.builder()
                .spaceInfos(spaceInfos)
                .build();
    }

    @Transactional
    public void updateTeamSpace(CustomUserDetails userDetails, Long spaceId, SpaceUpdateReq spaceUpdateReq) {
        participantService.validateManageableParticipant(spaceId, userDetails.memberId());
        Space space = spaceReader.getSpaceById(spaceId);
        if (space.getType().equals(SpaceType.TEAM)) {
            if (!Objects.isNull(spaceUpdateReq.name()) && !spaceUpdateReq.name().isBlank()) {
                space.updateName(spaceUpdateReq.name());
            }
            if (!Objects.isNull(spaceUpdateReq.spaceCoverPath()) && !spaceUpdateReq.spaceCoverPath().isBlank()) {
                SpaceCover spaceCover = spaceCoverReader.getSpaceCoverBySpaceId(spaceId);
                if (!spaceCover.getFilePath().equals(DEFAULT_SPACE_KEY)) {
                    s3Service.deleteFile(spaceCover.getFilePath());
                }
                String filePath = resolveKey(spaceUpdateReq.spaceCoverPath(), DEFAULT_SPACE_KEY, ImageDirectory.SPACES);
                FileMetaData metadata = s3Service.getFileMetadata(filePath);
                spaceCover.updateFile(metadata);
            }
        }
        else if (space.getType().equals(SpaceType.PERSONAL)) {
            throw new InvalidSpaceCoverRequestException();
        }
    }

    @Transactional
    public void deleteTeamSpace(CustomUserDetails userDetails, Long spaceId) {
        participantService.validateManageableParticipant(spaceId, userDetails.memberId());
        Space space = spaceReader.getSpaceById(spaceId);
        validateDeletableSpace(space);
        SpaceCover spaceCover = spaceCoverReader.getSpaceCoverBySpaceId(spaceId);
        if (!spaceCover.getFilePath().equals(DEFAULT_SPACE_KEY)) {
            s3Service.deleteFile(spaceCover.getFilePath());
        }
        spaceCover.deleteSpaceCover();
        space.deleteTeamSpace();
    }

    public Space getEditableSpace(Long spaceId, Long memberId) {
        Space space = spaceReader.getSpaceById(spaceId);
        if (space.getType() == SpaceType.TEAM) {
            participantService.validateEditableParticipant(spaceId, memberId);
        }
        return space;
    }

    public Space getReadableSpace(Long spaceId, Long memberId) {
        Space space = spaceReader.getSpaceById(spaceId);
        if (space.getType() == SpaceType.TEAM) {
            participantService.validateReadableParticipant(spaceId, memberId);
        }
        return space;
    }

    public void validateEditableSpace(Long spaceId, Long memberId) {
        getEditableSpace(spaceId, memberId);
    }

    public void validateReadableSpace(Long spaceId, Long memberId) {
        getReadableSpace(spaceId, memberId);
    }

    private void validateDeletableSpace(Space space) {
        if (space.getType() == SpaceType.PERSONAL) {
            throw new CannotDeletePersonalSpaceException();
        }
    }

    private String resolveKey(String filePath, String defaultKey, ImageDirectory imageDirectory) {
        if (Objects.isNull(filePath) || filePath.isBlank()) {
            return defaultKey;
        }

        if (!filePath.startsWith("tmp")) {
            throw new InvalidFilePathException();
        }
        try {
            return s3Service.moveObject(filePath, imageDirectory);
        } catch (S3Exception e) {
            e.printStackTrace();
            throw new S3OperationException(HttpStatus.valueOf(e.statusCode()));
        }
    }

}
