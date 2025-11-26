// frontend/src/components/post/SubmissionPostForm.tsx

import React from 'react';
import PostingWriteSection from '@/components/section/PostingWriteSection';
import PostingFooter from '@/components/layout/PostingFooter';
import PostingFloatingSection from '@/components/section/PostingFloatingSection';
import SubmissionResultSection from '@/components/section/SubmissionResultSection';
import { SubmissionPostFormProps } from '@/types/postFormTypes';
import { PROMPT_TYPE_ITEMS } from '@/constants/postFormConstants';

/**
 * 산출물 제출 폼 컴포넌트
 * 대회 산출물 제출 시 사용되는 폼
 */
export default function SubmissionPostForm({
  formState,
  imageState,
  uiState,
  onDescriptionChange,
  onUsedPromptChange,
  onAnswerPromptChange,
  onImageUpload,
  onGeneratedImageRemove,
  onUploadedImageRemove,
  onAISubmit,
  onSubmit,
  onPromptErrorChange,
  isLoadingContest,
}: SubmissionPostFormProps) {
  const { descriptionState, usedPrompt, answerPrompt, selectedPromptType } = formState;
  const { generatedImageUrl, uploadedImageUrl } = imageState;
  const { isGeneratingAnswer } = uiState;

  return (
    <>
      {/* 페이지 제목 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">산출물 제출</h1>
        <p className="text-sm text-gray-600 mt-1">대회에 제출할 산출물을 작성해주세요.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* 글 작성 컨테이너 (4 비율) */}
        <div className="lg:col-span-4 space-y-4">
          {/* 설명 */}
          <PostingWriteSection
            title="설명"
            placeholder="텍스트를 입력하세요..."
            onChange={onDescriptionChange}
            value={descriptionState}
            isSubmitButton={false}
          />

          {/* 사용 프롬프트 */}
          <PostingWriteSection
            title="프롬프트"
            placeholder="프롬프트를 입력하세요..."
            onChange={(content) => {
              onUsedPromptChange(content);
              onPromptErrorChange(false);
            }}
            value={usedPrompt}
            isSubmitButton={selectedPromptType === 'image' || selectedPromptType === 'text'}
            onSubmit={onAISubmit}
            isLoading={isGeneratingAnswer}
          />

          {/* 결과 섹션 */}
          <SubmissionResultSection
            selectedPromptType={selectedPromptType}
            answerPrompt={answerPrompt}
            generatedImageUrl={generatedImageUrl}
            uploadedImageUrl={uploadedImageUrl}
            onAnswerPromptChange={onAnswerPromptChange}
            onRemoveGenerated={onGeneratedImageRemove}
            onRemoveUploaded={onUploadedImageRemove}
            onImageUpload={onImageUpload}
          />

          {/* 제출 버튼 */}
          <PostingFooter onSubmit={onSubmit} />
        </div>

        {/* 플로팅 컨테이너 (1 비율) */}
        <div className="lg:col-span-1 space-y-4">
          {/* 프롬프트 타입 - 읽기 전용 */}
          <PostingFloatingSection
            title="프롬프트 타입"
            items={PROMPT_TYPE_ITEMS}
            selectedValue={selectedPromptType}
            onSelect={undefined} // 산출물은 타입 변경 불가
            name="promptType"
          />
          {isLoadingContest && (
            <div className="text-sm text-gray-500 mt-2">대회 정보를 불러오는 중...</div>
          )}
        </div>
      </div>
    </>
  );
}
