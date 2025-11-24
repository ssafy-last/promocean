// frontend/src/hooks/useImageManagement.ts

import { useState, useCallback } from 'react';

export interface ImageState {
  generatedImageUrl: string;
  generatedImageKey: string;
  uploadedImageUrl: string;
  uploadedImageKey: string;
}

export interface ImageActions {
  setGeneratedImage: (url: string, key: string) => void;
  setUploadedImage: (url: string, key: string) => void;
  setGeneratedImageUrl: (url: string) => void;
  setGeneratedImageKey: (key: string) => void;
  setUploadedImageUrl: (url: string) => void;
  setUploadedImageKey: (key: string) => void;
  clearGeneratedImage: () => void;
  clearUploadedImage: () => void;
  clearAllImages: () => void;
}

const initialState: ImageState = {
  generatedImageUrl: '',
  generatedImageKey: '',
  uploadedImageUrl: '',
  uploadedImageKey: '',
};

/**
 * 이미지 관리 커스텀 훅
 * AI 생성 이미지와 업로드 이미지를 관리합니다.
 */
export function useImageManagement() {
  const [imageState, setImageState] = useState<ImageState>(initialState);

  const setGeneratedImage = useCallback((url: string, key: string) => {
    setImageState(prev => ({
      ...prev,
      generatedImageUrl: url,
      generatedImageKey: key,
    }));
  }, []);

  const setUploadedImage = useCallback((url: string, key: string) => {
    setImageState(prev => ({
      ...prev,
      uploadedImageUrl: url,
      uploadedImageKey: key,
    }));
  }, []);

  const clearGeneratedImage = useCallback(() => {
    setImageState(prev => ({
      ...prev,
      generatedImageUrl: '',
      generatedImageKey: '',
    }));
  }, []);

  const clearUploadedImage = useCallback(() => {
    setImageState(prev => ({
      ...prev,
      uploadedImageUrl: '',
      uploadedImageKey: '',
    }));
  }, []);

  const setGeneratedImageUrl = useCallback((url: string) => {
    setImageState(prev => ({ ...prev, generatedImageUrl: url }));
  }, []);

  const setGeneratedImageKey = useCallback((key: string) => {
    setImageState(prev => ({ ...prev, generatedImageKey: key }));
  }, []);

  const setUploadedImageUrl = useCallback((url: string) => {
    setImageState(prev => ({ ...prev, uploadedImageUrl: url }));
  }, []);

  const setUploadedImageKey = useCallback((key: string) => {
    setImageState(prev => ({ ...prev, uploadedImageKey: key }));
  }, []);

  const clearAllImages = useCallback(() => {
    setImageState(initialState);
  }, []);

  return {
    imageState,
    actions: {
      setGeneratedImage,
      setUploadedImage,
      setGeneratedImageUrl,
      setGeneratedImageKey,
      setUploadedImageUrl,
      setUploadedImageKey,
      clearGeneratedImage,
      clearUploadedImage,
      clearAllImages,
    },
  };
}
