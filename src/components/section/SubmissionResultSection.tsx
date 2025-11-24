// frontend/src/components/post/SubmissionResultSection.tsx

import React from 'react';
import PostingWriteSection from '@/components/section/PostingWriteSection';
import ImageResultSection from './ImageResultSection';

interface SubmissionResultSectionProps {
  selectedPromptType: string;
  answerPrompt: string;
  generatedImageUrl: string;
  uploadedImageUrl: string;
  onAnswerPromptChange: (content: string) => void;
  onRemoveGenerated: () => void;
  onRemoveUploaded: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 산출물 제출 결과 섹션 컴포넌트
 * 텍스트 결과 또는 이미지 결과를 표시
 */
export default function SubmissionResultSection({
  selectedPromptType,
  answerPrompt,
  generatedImageUrl,
  uploadedImageUrl,
  onAnswerPromptChange,
  onRemoveGenerated,
  onRemoveUploaded,
  onImageUpload,
}: SubmissionResultSectionProps) {
  if (selectedPromptType === 'text') {
    return (
      <PostingWriteSection
        title="결과"
        placeholder="결과를 입력하세요..."
        onChange={onAnswerPromptChange}
        value={answerPrompt}
        isSubmitButton={false}
      />
    );
  }

  // 이미지 타입
  return (
    <div>
      {/* 이미지가 있는 경우 */}
      {(generatedImageUrl || uploadedImageUrl) ? (
        <ImageResultSection
          title="결과"
          generatedImageUrl={generatedImageUrl}
          uploadedImageUrl={uploadedImageUrl}
          onRemoveGenerated={onRemoveGenerated}
          onRemoveUploaded={onRemoveUploaded}
          onImageUpload={onImageUpload}
          inputId="image-upload-replace"
        />
      ) : (
        /* 이미지가 없는 경우 */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">결과</h3>

          {/* 텍스트 결과 입력 */}
          <PostingWriteSection
            title=""
            placeholder="결과를 텍스트로 입력하거나 이미지를 업로드하세요..."
            onChange={onAnswerPromptChange}
            value={answerPrompt}
          />

          {/* 이미지 업로드 UI */}
          <ImageResultSection
            title=""
            generatedImageUrl=""
            uploadedImageUrl=""
            onRemoveGenerated={onRemoveGenerated}
            onRemoveUploaded={onRemoveUploaded}
            onImageUpload={onImageUpload}
            inputId="image-upload"
          />
        </div>
      )}
    </div>
  );
}
