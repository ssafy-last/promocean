// frontend/src/components/post/SubmissionPostForm.tsx

import React from 'react';
import PostingWriteSection from '@/components/section/PostingWriteSection';
import PostingFooter from '@/components/layout/PostingFooter';
import PostingFloatingSection from '@/components/section/PostingFloatingSection';
import SubmissionResultSection from './SubmissionResultSection';
import { SubmissionPostFormProps } from '@/types/postFormTypes';

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

  const promptTypeItems = [
    {
      id: "text",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h8M4 18h8" />
        </svg>
      ),
      label: "텍스트",
      value: "text",
    },
    {
      id: "image",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: "이미지",
      value: "image",
    },
  ];

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
            items={promptTypeItems}
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
