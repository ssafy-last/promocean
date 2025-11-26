// frontend/src/types/postFormTypes.ts

import { PostFormState } from '@/hooks/usePostForm';
import { ImageState } from '@/hooks/useImageManagement';
import { UIState } from '@/hooks/usePostUIState';

/**
 * 게시글 작성 폼의 공통 Props
 */
export interface BasePostFormProps {
  // 폼 상태
  formState: PostFormState;
  imageState: ImageState;
  uiState: UIState;

  // 폼 액션
  onTitleChange: (title: string) => void;
  onTagsChange: (tags: string[]) => void;
  onDescriptionChange: (description: string) => void;
  onUsedPromptChange: (prompt: string) => void;
  onExamplePromptChange: (prompt: string) => void;
  onAnswerPromptChange: (answer: string) => void;
  onCategoryChange: (category: string) => void;
  onPromptTypeChange: (type: string) => void;

  // 이미지 액션
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onGeneratedImageRemove: () => void;
  onUploadedImageRemove: () => void;

  // AI 액션
  onAISubmit: () => void;

  // 제출 액션
  onSubmit: () => void;

  // 에러 상태 변경
  onPromptErrorChange: (error: boolean) => void;
  onExamplePromptErrorChange: (error: boolean) => void;
}

/**
 * 산출물 제출 폼 Props
 */
export interface SubmissionPostFormProps extends BasePostFormProps {
  isLoadingContest: boolean;
}

/**
 * 커뮤니티 게시글 폼 Props
 */
export interface CommunityPostFormProps extends BasePostFormProps {
  categoryItems: any[];
  promptTypeItems: any[];
}

/**
 * 아카이브 게시글 폼 Props
 */
export interface ArchivePostFormProps extends BasePostFormProps {
  promptTypeItems: any[];
  selectedFolder: string;
  onFolderChange: (folder: string, folderId: number) => void;
  pinnedFolders: any[];
  normalFolders: any[];
}
