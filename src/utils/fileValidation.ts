/**
 * 파일 시그니처(매직 넘버) 검증 유틸리티
 * 파일의 실제 바이너리 헤더를 검사하여 확장자 위조를 방지합니다.
 */

/**
 * 허용된 이미지 형식의 파일 시그니처 (매직 넘버)
 */
const IMAGE_SIGNATURES = {
  // JPEG: FF D8 FF로 시작
  jpg: [
    [0xFF, 0xD8, 0xFF, 0xE0], // JFIF
    [0xFF, 0xD8, 0xFF, 0xE1], // EXIF
    [0xFF, 0xD8, 0xFF, 0xE2], // Canon
    [0xFF, 0xD8, 0xFF, 0xE3], // Samsung
    [0xFF, 0xD8, 0xFF, 0xE8], // SPIFF
  ],
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  png: [[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]],
  // WebP: 52 49 46 46 ... 57 45 42 50
  webp: [[0x52, 0x49, 0x46, 0x46]], // "RIFF"로 시작하고 8-11바이트에 "WEBP"가 있음
};

/**
 * 파일의 처음 몇 바이트를 읽어서 시그니처와 비교
 */
async function checkFileSignature(
  file: File,
  signatures: number[][]
): Promise<boolean> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (!reader.result) {
        resolve(false);
        return;
      }

      const arr = new Uint8Array(reader.result as ArrayBuffer);

      // 각 시그니처와 비교
      const isValid = signatures.some((signature) => {
        // 파일이 시그니처보다 짧으면 false
        if (arr.length < signature.length) return false;

        // 모든 바이트가 일치하는지 확인
        return signature.every((byte, index) => arr[index] === byte);
      });

      resolve(isValid);
    };

    reader.onerror = () => resolve(false);

    // 시그니처 확인을 위해 처음 12바이트만 읽음 (WebP 검증에 충분)
    reader.readAsArrayBuffer(file.slice(0, 12));
  });
}

/**
 * WebP 파일인지 추가 검증
 * RIFF 시그니처 + "WEBP" 문자열 확인
 */
async function checkWebPSignature(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (!reader.result) {
        resolve(false);
        return;
      }

      const arr = new Uint8Array(reader.result as ArrayBuffer);

      // RIFF 확인 (처음 4바이트)
      const isRIFF =
        arr[0] === 0x52 && arr[1] === 0x49 && arr[2] === 0x46 && arr[3] === 0x46;

      // WEBP 확인 (8-11바이트)
      const isWEBP =
        arr[8] === 0x57 && arr[9] === 0x45 && arr[10] === 0x42 && arr[11] === 0x50;

      resolve(isRIFF && isWEBP);
    };

    reader.onerror = () => resolve(false);

    // WebP 검증을 위해 처음 12바이트 읽음
    reader.readAsArrayBuffer(file.slice(0, 12));
  });
}

/**
 * 이미지 파일의 실제 형식을 검증합니다.
 * @param file - 검증할 파일
 * @returns 유효한 이미지 형식이면 true, 아니면 false
 */
export async function validateImageFile(file: File): Promise<{
  isValid: boolean;
  detectedType?: 'jpg' | 'png' | 'webp';
  error?: string;
}> {
  try {
    // 파일 크기 검증 (10MB 제한)
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return {
        isValid: false,
        error: '파일 크기는 10MB를 초과할 수 없습니다.',
      };
    }

    // JPG 검증
    const isJPG = await checkFileSignature(file, IMAGE_SIGNATURES.jpg);
    if (isJPG) {
      return { isValid: true, detectedType: 'jpg' };
    }

    // PNG 검증
    const isPNG = await checkFileSignature(file, IMAGE_SIGNATURES.png);
    if (isPNG) {
      return { isValid: true, detectedType: 'png' };
    }

    // WebP 검증 (추가 검사 필요)
    const isWebP = await checkWebPSignature(file);
    if (isWebP) {
      return { isValid: true, detectedType: 'webp' };
    }

    return {
      isValid: false,
      error: '허용되지 않은 이미지 형식입니다. JPG, PNG, WebP 파일만 업로드할 수 있습니다.',
    };
  } catch (error) {
    console.error('파일 검증 중 오류 발생:', error);
    return {
      isValid: false,
      error: '파일 검증 중 오류가 발생했습니다.',
    };
  }
}

/**
 * 파일 확장자를 가져옵니다
 */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}
