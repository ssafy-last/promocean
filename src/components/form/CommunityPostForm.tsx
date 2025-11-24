// frontend/src/components/post/CommunityPostForm.tsx

import React from 'react';
import TitleInput from '@/components/editor/TitleInput';
import HashtagInput from '@/components/editor/HashtagInput';
import PostingWriteSection from '@/components/section/PostingWriteSection';
import PostingFooter from '@/components/layout/PostingFooter';
import PostingFloatingSection from '@/components/section/PostingFloatingSection';
import CommunityResultSection from '@/components/post/CommunityResultSection';
import { CommunityPostFormProps } from '@/types/postFormTypes';

/**
 * 커뮤니티 게시글 폼 컴포넌트
 * 커뮤니티 게시글 작성/수정 시 사용되는 폼
 */
export default function CommunityPostForm({
  formState,
  imageState,
  uiState,
  onTitleChange,
  onTagsChange,
  onDescriptionChange,
  onUsedPromptChange,
  onExamplePromptChange,
  onAnswerPromptChange,
  onCategoryChange,
  onPromptTypeChange,
  onImageUpload,
  onGeneratedImageRemove,
  onUploadedImageRemove,
  onAISubmit,
  onSubmit,
  onPromptErrorChange,
  onExamplePromptErrorChange,
  categoryItems,
  promptTypeItems,
}: CommunityPostFormProps) {
  const {
    title,
    tags,
    descriptionState,
    usedPrompt,
    examplePrompt,
    answerPrompt,
    selectedCategory,
    selectedPromptType,
  } = formState;

  const { generatedImageUrl, uploadedImageUrl } = imageState;
  const { isGeneratingAnswer, examplePromptError } = uiState;

  return (
    <>
      {/* 제목 */}
      <div className="mb-4">
        <TitleInput value={title} onChange={onTitleChange} placeholder="제목을 입력하세요" />
      </div>

      {/* 해시태그 */}
      <div className="mb-4">
        <HashtagInput tags={tags} onTagsChange={onTagsChange} />
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
            isSubmitButton={selectedPromptType === 'image'}
            onSubmit={onAISubmit}
            isLoading={isGeneratingAnswer}
          />

          {/* 결과 섹션 */}
          <CommunityResultSection
            selectedPromptType={selectedPromptType}
            examplePrompt={examplePrompt}
            answerPrompt={answerPrompt}
            generatedImageUrl={generatedImageUrl}
            uploadedImageUrl={uploadedImageUrl}
            examplePromptError={examplePromptError}
            isGeneratingAnswer={isGeneratingAnswer}
            onExamplePromptChange={(content) => {
              onExamplePromptChange(content);
              onExamplePromptErrorChange(false);
            }}
            onAnswerPromptChange={onAnswerPromptChange}
            onAISubmit={onAISubmit}
            onRemoveGenerated={onGeneratedImageRemove}
            onRemoveUploaded={onUploadedImageRemove}
            onImageUpload={onImageUpload}
          />

          {/* 제출 버튼 */}
          <PostingFooter onSubmit={onSubmit} />
        </div>

        {/* 플로팅 컨테이너 (1 비율) */}
        <div className="lg:col-span-1 space-y-4">
          {/* 카테고리 선택 */}
          <PostingFloatingSection
            title="카테고리"
            items={categoryItems}
            selectedValue={selectedCategory}
            onSelect={onCategoryChange}
            name="category"
          />

          {/* 프롬프트 타입 */}
          <PostingFloatingSection
            title="프롬프트 타입"
            items={promptTypeItems}
            selectedValue={selectedPromptType}
            onSelect={onPromptTypeChange}
            name="promptType"
          />
        </div>
      </div>
    </>
  );
}
