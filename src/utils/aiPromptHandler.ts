// frontend/src/utils/aiPromptHandler.ts

import { PromptAPI } from '@/api/prompt';
import { buildPromptFromLexical, extractTextFromLexical } from './lexicalUtils';
import { createLexicalResponse } from './lexicalConverter';

export interface TextPromptParams {
  usedPrompt: string;
  examplePrompt: string;
  isSubmissionType: boolean;
}

export interface ImagePromptParams {
  usedPrompt: string;
}

export interface AIPromptResult {
  success: boolean;
  data?: {
    answer?: string;
    imageUrl?: string;
    imageKey?: string;
  };
  error?: string;
}

/**
 * 텍스트 프롬프트 AI 생성
 */
export async function generateTextPrompt(params: TextPromptParams): Promise<AIPromptResult> {
  try {
    const { usedPrompt, examplePrompt, isSubmissionType } = params;

    let systemMessage: string;
    let userMessage: string;

    if (isSubmissionType) {
      // submission 타입일 때는 프롬프트만 사용
      const promptText = extractTextFromLexical(usedPrompt);
      systemMessage = promptText;
      userMessage = promptText;
    } else {
      // 일반 타입일 때는 기존대로
      const result = buildPromptFromLexical(usedPrompt, examplePrompt);
      systemMessage = result.systemMessage;
      userMessage = result.userMessage;
    }

    // PromptAPI를 통해 백엔드 호출
    const response = await PromptAPI.postTextPrompt({
      prompt: systemMessage,
      exampleQuestion: userMessage,
    });

    // Lexical JSON 형식으로 변환
    const lexicalAnswer = createLexicalResponse(response.exampleAnswer || '');

    console.log('AI 텍스트 응답:', response.exampleAnswer);

    return {
      success: true,
      data: {
        answer: JSON.stringify(lexicalAnswer),
      },
    };
  } catch (error) {
    console.error('AI 텍스트 생성 요청 실패:', error);
    return {
      success: false,
      error: 'AI 텍스트 응답 생성에 실패했습니다.',
    };
  }
}

/**
 * 이미지 프롬프트 AI 생성
 */
export async function generateImagePrompt(params: ImagePromptParams): Promise<AIPromptResult> {
  try {
    const { usedPrompt } = params;

    const { systemMessage } = buildPromptFromLexical(usedPrompt);
    console.log('시스템 메시지:', systemMessage);

    const response = await PromptAPI.postImagePrompt({
      prompt: systemMessage,
    });

    console.log('AI 이미지 생성 응답:', response);

    const url = response.cloudfrontUrl;
    const key = response.key;

    // 키가 없으면 에러
    if (!key || key.trim() === '') {
      console.error('이미지 키가 없음:', response);
      return {
        success: false,
        error: '이미지 생성에 실패했습니다. 키가 없습니다.',
      };
    }

    console.log('AI 이미지 생성 성공:', { url, key, response });

    return {
      success: true,
      data: {
        imageUrl: url,
        imageKey: key,
      },
    };
  } catch (error) {
    console.error('AI 이미지 생성 요청 실패:', error);
    return {
      success: false,
      error: 'AI 이미지 응답 생성에 실패했습니다.',
    };
  }
}
