package com.ssafy.a208.domain.board.service;

import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.entity.PostFile;
import com.ssafy.a208.domain.board.exception.InvalidPostRequestException;
import com.ssafy.a208.domain.board.reader.PostFileReader;
import com.ssafy.a208.domain.board.repository.PostFileRepository;
import com.ssafy.a208.global.common.enums.ImageDirectory;
import com.ssafy.a208.global.common.enums.PromptType;
import com.ssafy.a208.global.image.dto.FileMetaData;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.security.exception.InvalidFilePathException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

/**
 * 게시글 파일 관련 서비스
 * 파일 생성, 수정, 삭제를 담당합니다.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PostFileService {

    private final S3Service s3Service;
    private final PostFileRepository postFileRepository;
    private final PostFileReader postFileReader;

    /**
     * 게시글 파일을 생성합니다.
     *
     * @param filePath 파일 경로
     * @param post 게시글 엔티티
     * @return 파일 경로
     */
    @Transactional
    public String createPostFile(String filePath, Post post) {
        String destPath = s3Service.moveObject(filePath, ImageDirectory.POSTS);
        FileMetaData metaData = s3Service.getFileMetadata(destPath);

        PostFile postFile = PostFile.builder()
                .originalName(metaData.originalName())
                .filePath(metaData.filePath())
                .size(metaData.size())
                .contentType(metaData.contentType())
                .post(post)
                .build();

        postFileRepository.save(postFile);

        log.info("게시글 파일 생성 완료 - postId: {}, filePath: {}", post.getId(), destPath);

        return destPath;
    }

    /**
     * 게시글 파일을 업데이트합니다.
     *
     * @param post 게시글 엔티티
     * @param promptType 프롬프트 타입
     * @param newFilePath 새로운 파일 경로
     * @param newPrompt 새로운 프롬프트 내용
     */
    @Transactional
    public void updatePostFile(Post post, PromptType promptType, String newFilePath, String newPrompt) {
        Optional<PostFile> existingFileOptional = postFileReader.getPostFileByPost(post);

        // 이미지 프롬프트인 경우
        if (promptType == PromptType.IMAGE) {
            if (Objects.isNull(newFilePath) || newFilePath.isBlank()) {
                return;
            }

            // 기존 파일 경로와 동일한지 확인
            boolean isSameFile = existingFileOptional
                    .map(existing -> existing.getFilePath().equals(newFilePath))
                    .orElse(false);

            if (isSameFile) {
                // 프롬프트가 변경되었는지 확인
                boolean isPromptChanged = !post.getPrompt().equals(newPrompt);

                if (isPromptChanged) {
                    // 프롬프트는 바뀌었는데 이미지는 그대로면 에러
                    throw new InvalidPostRequestException(
                            "프롬프트가 변경되었습니다. 새로운 프롬프트에 맞는 이미지를 업로드해주세요");
                }

                // 기존 파일과 동일하고 프롬프트도 안 바뀜 -> 변경 xxxx
                log.info("기존 파일 유지 - postId: {}, filePath: {}", post.getId(), newFilePath);
                return;
            }

            // 새 파일로 변경
            if (newFilePath.startsWith("tmp/")) {
                existingFileOptional.ifPresentOrElse(
                        existingFile -> {
                            // 기존 S3 파일 삭제
                            s3Service.deleteFile(existingFile.getFilePath());

                            // 새 파일 이동
                            String destPath = s3Service.moveObject(newFilePath, ImageDirectory.POSTS);
                            FileMetaData metaData = s3Service.getFileMetadata(destPath);

                            // DB 업데이트
                            existingFile.updateFile(metaData);
                            log.info("게시글 파일 수정 완료 - postId: {}, filePath: {}",
                                    post.getId(), destPath);
                        },
                        () -> createPostFile(newFilePath, post)
                );
            } else if (newFilePath.startsWith("posts/")) {
                // posts 경로인데 기존 파일과 다름 -> 다른 게시글의 파일 참조 시도
                throw new InvalidFilePathException();
            } else {
                throw new InvalidFilePathException();
            }

        } else {
            // 텍스트 프롬프트인 경우 기존 파일 삭제
            existingFileOptional.ifPresent(this::deletePostFile);
        }
    }

    /**
     * 게시글 파일을 삭제합니다.
     *
     * @param postFile 삭제할 PostFile 엔티티
     */
    @Transactional
    public void deletePostFile(PostFile postFile) {
        s3Service.deleteFile(postFile.getFilePath());
        postFile.deletePostFile();
        log.info("게시글 파일 삭제 완료 - filePath: {}", postFile.getFilePath());
    }
}