// frontend/src/components/post/CommunityResultSection.tsx

import React from 'react';
import PostingWriteSection from '@/components/section/PostingWriteSection';
import ImageResultSection from '@/components/section/ImageResultSection';

interface CommunityResultSectionProps {
  selectedPromptType: string;
  examplePrompt: string;
  answerPrompt: string;
  generatedImageUrl: string;
  uploadedImageUrl: string;
  examplePromptError: boolean;
  isGeneratingAnswer: boolean;
  onExamplePromptChange: (content: string) => void;
  onAnswerPromptChange: (content: string) => void;
  onAISubmit: () => void;
  onRemoveGenerated: () => void;
  onRemoveUploaded: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 커뮤니티 게시글 결과 섹션 컴포넌트
 * 텍스트 타입: 예시 질문 + 답변 프롬프트
 * 이미지 타입: 결과 사진 업로드
 */
export default function CommunityResultSection({
  selectedPromptType,
  examplePrompt,
  answerPrompt,
  generatedImageUrl,
  uploadedImageUrl,
  examplePromptError,
  isGeneratingAnswer,
  onExamplePromptChange,
  onAnswerPromptChange,
  onAISubmit,
  onRemoveGenerated,
  onRemoveUploaded,
  onImageUpload,
}: CommunityResultSectionProps) {
  if (selectedPromptType === 'text') {
    return (
      <div>
        {/* 예시 질문 프롬프트 */}
        <PostingWriteSection
          title="예시 질문 프롬프트"
          placeholder="예시 질문을 입력하세요..."
          onChange={(content) => {
            onExamplePromptChange(content);
          }}
          value={examplePrompt}
          isSubmitButton={true}
          onSubmit={onAISubmit}
          isLoading={isGeneratingAnswer}
          hasError={examplePromptError}
          errorMessage="예시 질문을 입력해주세요. AI 답변 생성을 위해 필수 항목입니다."
          dataField="example-prompt"
        />

        {/* 답변 프롬프트 */}
        <PostingWriteSection
          title="답변 프롬프트"
          placeholder="답변을 입력하세요..."
          onChange={onAnswerPromptChange}
          value={answerPrompt}
        />
      </div>
    );
  }

  // 이미지 타입
  return (
    <ImageResultSection
      title="결과 사진"
      generatedImageUrl={generatedImageUrl}
      uploadedImageUrl={uploadedImageUrl}
      onRemoveGenerated={onRemoveGenerated}
      onRemoveUploaded={onRemoveUploaded}
      onImageUpload={onImageUpload}
      inputId="image-upload"
    />
  );
}
