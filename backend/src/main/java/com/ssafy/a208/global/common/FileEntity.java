package com.ssafy.a208.global.common;


import jakarta.persistence.Column;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FileEntity extends BaseEntity {

    @Comment("원본 파일명")
    @Column(nullable = false)
    private String originalName;

    @Comment("파일 경로")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String filePath;

    @Comment("확장자")
    @Column(nullable = false, length = 4)
    private String extension;

    @Comment("파일 크기")
    @Column(nullable = false)
    private Long size;

    protected FileEntity(String originalName, String filePath, String extension, Long size) {
        this.originalName = originalName;
        this.filePath = filePath;
        this.extension = extension;
        this.size = size;
    }
}
