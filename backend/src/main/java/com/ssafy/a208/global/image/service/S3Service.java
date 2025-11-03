package com.ssafy.a208.global.image.service;

import com.ssafy.a208.global.common.enums.ImageDirectory;
import com.ssafy.a208.global.image.dto.FileMetaData;
import com.ssafy.a208.global.image.dto.S3Url;
import com.ssafy.a208.global.image.utils.FileMetadataUtil;
import com.ssafy.a208.global.image.utils.S3Uploader;
import com.ssafy.a208.global.image.utils.S3UrlGenerator;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.model.HeadObjectResponse;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Uploader s3Uploader;
    private final S3UrlGenerator s3UrlGenerator;
    private final FileMetadataUtil fileMetadataUtil;

    public S3Url getPostS3Url(String filename) {
        String key = "tmp/" + UUID.randomUUID() + "_" + filename;

        PresignedPutObjectRequest request = s3UrlGenerator.generatePresignedPostUrl(key);

        return S3Url.builder()
                .presignedUrl(request.url().toString())
                .key(key)
                .build();
    }

    public String getCloudFrontUrl(String filePath) {
        return s3UrlGenerator.generateCloudFrontGetUrl(filePath);
    }

    public String moveObject(String filePath, ImageDirectory imageDirectory) {
        String url = s3Uploader.copyObject(filePath, imageDirectory.getName());
        s3Uploader.deleteObject(filePath);
        return url;
    }

    public FileMetaData getFileMetadata(String key) {
        HeadObjectResponse response = s3Uploader.getMetaData(key);

        return FileMetaData.builder()
                .originalName(fileMetadataUtil.getFileName(key))
                .filePath(key)
                .contentType(response.contentType())
                .size(response.contentLength())
                .build();
    }

    public void deleteFile(String filePath) {
        s3Uploader.deleteObject(filePath);
    }

}
