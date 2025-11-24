// frontend/src/utils/imageUploader.ts

import { UploadAPI } from '@/api/upload';
import { s3KeyToCloudFrontUrl } from './imageUtils';

export interface ImageUploadResult {
  success: boolean;
  imageUrl?: string;
  imageKey?: string;
  error?: string;
}

/**
 * 파일 크기 검증
 * @param file - 검증할 파일
 * @param maxSizeMB - 최대 크기 (MB)
 */
function validateFileSize(file: File, maxSizeMB: number = 10): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

/**
 * 파일 타입 검증
 * @param file - 검증할 파일
 */
function validateFileType(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return allowedTypes.includes(file.type);
}

/**
 * 이미지 파일을 S3에 업로드
 * @param file - 업로드할 이미지 파일
 * @returns 업로드 결과 (URL, Key)
 */
export async function uploadImageToS3(file: File): Promise<ImageUploadResult> {
  try {
    // 파일 검증
    if (!validateFileType(file)) {
      return {
        success: false,
        error: '지원하지 않는 파일 형식입니다. (JPEG, PNG, GIF, WebP만 가능)',
      };
    }

    if (!validateFileSize(file, 10)) {
      return {
        success: false,
        error: '파일 크기는 10MB 이하여야 합니다.',
      };
    }

    console.log('이미지 업로드 시작:', file.name);

    // 1. Presigned URL 요청
    const uploadData = await UploadAPI.getImagesS3Upload(file.name);
    if (!uploadData) {
      return {
        success: false,
        error: 'Presigned URL을 받아오지 못했습니다.',
      };
    }

    console.log('Presigned URL 응답:', uploadData);

    // 2. S3에 이미지 업로드
    const uploadResult = await UploadAPI.uploadImageToS3({
      presignedUrl: uploadData.presignedUrl,
      file: file,
    });

    if (!uploadResult || !uploadResult.ok) {
      console.error('S3 업로드 실패:', uploadResult);
      return {
        success: false,
        error: 'S3 업로드에 실패했습니다.',
      };
    }

    // 3. CloudFront URL 생성
    const cloudFrontUrl = s3KeyToCloudFrontUrl(uploadData.key);

    console.log('이미지 업로드 성공:', {
      key: uploadData.key,
      cloudFrontUrl,
    });

    return {
      success: true,
      imageUrl: cloudFrontUrl,
      imageKey: uploadData.key,
    };
  } catch (error) {
    console.error('이미지 업로드 중 오류:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '이미지 업로드에 실패했습니다.',
    };
  }
}

/**
 * 이미지 파일 선택 이벤트 처리
 * @param event - 파일 입력 이벤트
 * @returns 업로드 결과 또는 null (파일이 선택되지 않은 경우)
 */
export async function handleImageFileSelect(
  event: React.ChangeEvent<HTMLInputElement>
): Promise<ImageUploadResult | null> {
  const file = event.target.files?.[0];
  if (!file) {
    return null;
  }

  return await uploadImageToS3(file);
}
