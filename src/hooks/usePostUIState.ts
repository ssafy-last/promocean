// frontend/src/hooks/usePostUIState.ts

import { useState, useCallback } from 'react';

export interface UIState {
  // 로딩 상태
  isLoadingArticle: boolean;
  isGeneratingAnswer: boolean;
  isLoadingTokens: boolean;
  isLoadingContest: boolean;

  // 에러 상태
  promptError: boolean;
  examplePromptError: boolean;

  // 토큰 잔량
  remainingTokens: number | null;
}

export interface UIStateActions {
  setIsLoadingArticle: (loading: boolean) => void;
  setIsGeneratingAnswer: (loading: boolean) => void;
  setIsLoadingTokens: (loading: boolean) => void;
  setIsLoadingContest: (loading: boolean) => void;
  setPromptError: (error: boolean) => void;
  setExamplePromptError: (error: boolean) => void;
  setRemainingTokens: (tokens: number | null) => void;
  clearErrors: () => void;
}

const initialState: UIState = {
  isLoadingArticle: false,
  isGeneratingAnswer: false,
  isLoadingTokens: false,
  isLoadingContest: false,
  promptError: false,
  examplePromptError: false,
  remainingTokens: null,
};

/**
 * 게시글 작성/수정 페이지의 UI 상태 관리 커스텀 훅
 * 로딩, 에러, 토큰 잔량 등 UI 관련 상태를 관리합니다.
 */
export function usePostUIState() {
  const [uiState, setUIState] = useState<UIState>(initialState);

  const setIsLoadingArticle = useCallback((isLoadingArticle: boolean) => {
    setUIState(prev => ({ ...prev, isLoadingArticle }));
  }, []);

  const setIsGeneratingAnswer = useCallback((isGeneratingAnswer: boolean) => {
    setUIState(prev => ({ ...prev, isGeneratingAnswer }));
  }, []);

  const setIsLoadingTokens = useCallback((isLoadingTokens: boolean) => {
    setUIState(prev => ({ ...prev, isLoadingTokens }));
  }, []);

  const setIsLoadingContest = useCallback((isLoadingContest: boolean) => {
    setUIState(prev => ({ ...prev, isLoadingContest }));
  }, []);

  const setPromptError = useCallback((promptError: boolean) => {
    setUIState(prev => ({ ...prev, promptError }));
  }, []);

  const setExamplePromptError = useCallback((examplePromptError: boolean) => {
    setUIState(prev => ({ ...prev, examplePromptError }));
  }, []);

  const setRemainingTokens = useCallback((remainingTokens: number | null) => {
    setUIState(prev => ({ ...prev, remainingTokens }));
  }, []);

  const clearErrors = useCallback(() => {
    setUIState(prev => ({
      ...prev,
      promptError: false,
      examplePromptError: false,
    }));
  }, []);

  return {
    uiState,
    actions: {
      setIsLoadingArticle,
      setIsGeneratingAnswer,
      setIsLoadingTokens,
      setIsLoadingContest,
      setPromptError,
      setExamplePromptError,
      setRemainingTokens,
      clearErrors,
    },
  };
}
