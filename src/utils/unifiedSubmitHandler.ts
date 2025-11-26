// frontend/src/utils/unifiedSubmitHandler.ts

import { validateSubmission, validateArticle, validateArchiveFolder } from './postValidator';
import { submitSubmission, submitCommunityPost, submitArchiveArticle } from './postSubmitter';

export interface SubmitHandlerParams {
  // 모드 및 타입
  isSubmissionType: boolean;
  isArchiveType: boolean;
  isEditMode: boolean;

  // 폼 상태
  title: string;
  tags: string[];
  descriptionState: string;
  usedPrompt: string;
  examplePrompt: string;
  answerPrompt: string;
  selectedCategory: string;
  selectedPromptType: string;
  selectedFolderId: number | null;

  // 이미지 상태
  generatedImageKey: string;
  uploadedImageKey: string;
  generatedImageUrl: string;
  uploadedImageUrl: string;

  // URL 파라미터
  contestIdParam: string | null;
  submissionIdParam: string | null;
  postIdParam: string | null;
  articleIdParam: string | null;
  spaceIdParam: string | null;
  postType: string | null;

  // Router
  router: any;
}

/**
 * 통합 제출 핸들러
 * 모든 타입의 게시글 제출을 처리
 */
export async function handleUnifiedSubmit(params: SubmitHandlerParams): Promise<void> {
  const {
    isSubmissionType,
    isArchiveType,
    isEditMode,
    title,
    tags,
    descriptionState,
    usedPrompt,
    examplePrompt,
    answerPrompt,
    selectedCategory,
    selectedPromptType,
    selectedFolderId,
    generatedImageKey,
    uploadedImageKey,
    generatedImageUrl,
    uploadedImageUrl,
    contestIdParam,
    submissionIdParam,
    postIdParam,
    articleIdParam,
    spaceIdParam,
    postType,
    router,
  } = params;

  // 산출물 제출 모드
  if (isSubmissionType) {
    const validation = validateSubmission({
      descriptionState,
      usedPrompt,
      answerPrompt,
      selectedPromptType,
      generatedImageKey,
      uploadedImageKey,
    });

    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    if (!contestIdParam) {
      alert('대회 ID가 없습니다.');
      return;
    }

    const contestId = parseInt(contestIdParam, 10);
    if (isNaN(contestId)) {
      alert('잘못된 대회 ID입니다.');
      return;
    }

    const submissionId = submissionIdParam ? parseInt(submissionIdParam, 10) : undefined;

    try {
      await submitSubmission({
        contestId,
        selectedPromptType,
        descriptionState,
        usedPrompt,
        answerPrompt,
        uploadedImageKey,
        generatedImageKey,
        uploadedImageUrl,
        generatedImageUrl,
        isEditMode: !!isEditMode,
        submissionId,
        router,
      });
    } catch (error) {
      console.error('산출물 제출/수정 실패:', error);
      alert(error instanceof Error ? error.message : '산출물 제출/수정에 실패했습니다.');
    }
    return;
  }

  // 커뮤니티/아카이브 게시글 검증
  const validation = validateArticle({
    title,
    descriptionState,
    usedPrompt,
    selectedPromptType,
    generatedImageKey,
    uploadedImageKey,
  });

  if (!validation.valid) {
    alert(validation.error);
    return;
  }

  try {
    // 아카이브 게시글
    if (isArchiveType) {
      const folderValidation = validateArchiveFolder(selectedFolderId);
      if (!folderValidation.valid) {
        alert(folderValidation.error);
        return;
      }

      const articleId = articleIdParam ? parseInt(articleIdParam, 10) : undefined;

      await submitArchiveArticle({
        title,
        descriptionState,
        usedPrompt,
        examplePrompt,
        answerPrompt,
        selectedPromptType,
        tags,
        uploadedImageKey,
        generatedImageKey,
        selectedFolderId: selectedFolderId!,
        postType: postType || 'my-space',
        spaceId: spaceIdParam ? parseInt(spaceIdParam, 10) : undefined,
        isEditMode: !!isEditMode,
        articleId,
        router,
      });
    } else {
      // 커뮤니티 게시글
      const postId = postIdParam ? parseInt(postIdParam, 10) : undefined;

      await submitCommunityPost({
        title,
        descriptionState,
        usedPrompt,
        examplePrompt,
        answerPrompt,
        selectedCategory,
        selectedPromptType,
        tags,
        uploadedImageKey,
        generatedImageKey,
        isEditMode: !!isEditMode,
        postId,
        router,
      });
    }
  } catch (error) {
    console.error('게시글 제출/수정 실패:', error);
    alert(error instanceof Error ? error.message : '게시글 제출/수정에 실패했습니다.');
  }
}
