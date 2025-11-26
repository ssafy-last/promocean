// frontend/src/utils/postValidator.ts

import { convertLexicalToMarkdown } from "@/utils/lexicalUtils";

/**
 * 산출물 제출 검증
 */
export function validateSubmission(params: {
  descriptionState: string;
  usedPrompt: string;
  answerPrompt: string;
  selectedPromptType: string;
  generatedImageKey: string;
  uploadedImageKey: string;
}): { valid: boolean; error?: string } {
  const {
    descriptionState,
    usedPrompt,
    answerPrompt,
    selectedPromptType,
    generatedImageKey,
    uploadedImageKey,
  } = params;

  if (!descriptionState.trim()) {
    return { valid: false, error: '설명을 입력해주세요.' };
  }

  if (!usedPrompt.trim()) {
    return { valid: false, error: '프롬프트를 입력해주세요.' };
  }

  // 결과 검증 (텍스트 타입은 answerPrompt, 이미지 타입은 이미지 키)
  if (selectedPromptType === 'text') {
    if (!answerPrompt.trim()) {
      return { valid: false, error: '결과를 입력해주세요.' };
    }
  } else if (selectedPromptType === 'image') {
    if (!generatedImageKey && !uploadedImageKey && !answerPrompt.trim()) {
      return { valid: false, error: '결과 이미지를 업로드하거나 AI로 생성하거나 텍스트로 입력해주세요.' };
    }
  }

  return { valid: true };
}

/**
 * 커뮤니티/아카이브 게시글 제출 검증
 */
export function validateArticle(params: {
  title: string;
  descriptionState: string;
  usedPrompt: string;
  selectedPromptType: string;
  generatedImageKey: string;
  uploadedImageKey: string;
}): { valid: boolean; error?: string } {
  const {
    title,
    descriptionState,
    usedPrompt,
    selectedPromptType,
    generatedImageKey,
    uploadedImageKey,
  } = params;

  if (!title.trim()) {
    return { valid: false, error: '제목을 입력해주세요.' };
  }

  if (!descriptionState.trim()) {
    return { valid: false, error: '설명을 입력해주세요.' };
  }

  if (!usedPrompt.trim()) {
    return { valid: false, error: '사용 프롬프트를 입력해주세요.' };
  }

  // 이미지 타입일 때만 이미지 검증
  if (selectedPromptType === 'image') {
    // 이미지 타입일 때는 AI 생성 이미지나 업로드된 이미지 중 하나는 있어야 함
    if (!generatedImageKey && !uploadedImageKey) {
      return { valid: false, error: '결과 이미지를 업로드하거나 AI로 생성해주세요.' };
    }
  }

  // 길이 검증
  if (title.length > 100) {
    return { valid: false, error: '제목은 100자 이하로 입력해주세요.' };
  }

  const description = convertLexicalToMarkdown(descriptionState);
  if (description.length > 300) {
    return { valid: false, error: '설명은 300자 이하로 입력해주세요.' };
  }

  return { valid: true };
}

/**
 * 아카이브 게시글 추가 검증 (폴더 선택)
 */
export function validateArchiveFolder(selectedFolderId: number | null): { valid: boolean; error?: string } {
  if (!selectedFolderId) {
    return { valid: false, error: '폴더를 선택해주세요.' };
  }

  return { valid: true };
}
