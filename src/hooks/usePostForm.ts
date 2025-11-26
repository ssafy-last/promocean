// frontend/src/hooks/usePostForm.ts

import { useState, useCallback } from 'react';

export interface PostFormState {
  // 기본 폼 데이터
  title: string;
  tags: string[];
  descriptionState: string;
  usedPrompt: string;
  examplePrompt: string;
  answerPrompt: string;

  // 선택 옵션
  selectedCategory: string;
  selectedPromptType: string;
  selectedFolder: string;
  selectedFolderId: number | null;

  // 대회 관련
  contestType: string;
}

export interface PostFormActions {
  setTitle: (title: string) => void;
  setTags: (tags: string[]) => void;
  setDescriptionState: (state: string) => void;
  setUsedPrompt: (prompt: string) => void;
  setExamplePrompt: (prompt: string) => void;
  setAnswerPrompt: (answer: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedPromptType: (type: string) => void;
  setSelectedFolder: (folder: string) => void;
  setSelectedFolderId: (id: number | null) => void;
  setContestType: (type: string) => void;
  resetForm: () => void;
}

const initialState: PostFormState = {
  title: '',
  tags: [],
  descriptionState: '',
  usedPrompt: '',
  examplePrompt: '',
  answerPrompt: '',
  selectedCategory: 'work',
  selectedPromptType: 'text',
  selectedFolder: '',
  selectedFolderId: null,
  contestType: 'text',
};

/**
 * 게시글 폼 상태 관리 커스텀 훅
 */
export function usePostForm(folderIdParam?: string | null) {
  const [formState, setFormState] = useState<PostFormState>({
    ...initialState,
    selectedFolderId: folderIdParam ? parseInt(folderIdParam, 10) : null,
  });

  const setTitle = useCallback((title: string) => {
    setFormState(prev => ({ ...prev, title }));
  }, []);

  const setTags = useCallback((tags: string[]) => {
    setFormState(prev => ({ ...prev, tags }));
  }, []);

  const setDescriptionState = useCallback((descriptionState: string) => {
    setFormState(prev => ({ ...prev, descriptionState }));
  }, []);

  const setUsedPrompt = useCallback((usedPrompt: string) => {
    setFormState(prev => ({ ...prev, usedPrompt }));
  }, []);

  const setExamplePrompt = useCallback((examplePrompt: string) => {
    setFormState(prev => ({ ...prev, examplePrompt }));
  }, []);

  const setAnswerPrompt = useCallback((answerPrompt: string) => {
    setFormState(prev => ({ ...prev, answerPrompt }));
  }, []);

  const setSelectedCategory = useCallback((selectedCategory: string) => {
    setFormState(prev => ({ ...prev, selectedCategory }));
  }, []);

  const setSelectedPromptType = useCallback((selectedPromptType: string) => {
    setFormState(prev => ({ ...prev, selectedPromptType }));
  }, []);

  const setSelectedFolder = useCallback((selectedFolder: string) => {
    setFormState(prev => ({ ...prev, selectedFolder }));
  }, []);

  const setSelectedFolderId = useCallback((selectedFolderId: number | null) => {
    setFormState(prev => ({ ...prev, selectedFolderId }));
  }, []);

  const setContestType = useCallback((contestType: string) => {
    setFormState(prev => ({ ...prev, contestType }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState(initialState);
  }, []);

  return {
    formState,
    actions: {
      setTitle,
      setTags,
      setDescriptionState,
      setUsedPrompt,
      setExamplePrompt,
      setAnswerPrompt,
      setSelectedCategory,
      setSelectedPromptType,
      setSelectedFolder,
      setSelectedFolderId,
      setContestType,
      resetForm,
    },
  };
}
