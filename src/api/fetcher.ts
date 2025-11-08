// frontend/src/api/fetcher.ts

import { getAuthToken } from '@/lib/authToken';

// 환경 변수 기반 기본 URL 설정
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

/**
 * API 요청 공통 래퍼 (fetch 기반)
 * - BASE_URL 자동 prepend
 * - Authorization 헤더 자동 추가
 * - FormData 감지 및 Content-Type 예외 처리
 * - JSON 자동 직렬화 / 역직렬화
 * - 에러 통합 처리
 */
export async function apiFetch<T = unknown>(
  input: string,
  init: RequestInit = {}
): Promise<T> {
  // 토큰 가져오기 (클라이언트 전용)
  const token = typeof window !== 'undefined' ? getAuthToken() : null;

  // 헤더 병합
  const headers = new Headers(init.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);

  // FormData가 아닐 때만 Content-Type 설정
  const isFormData =
    typeof FormData !== 'undefined' && init.body instanceof FormData;
  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // URL 자동 처리
  const url = input.startsWith('http') ? input : `${BASE_URL}${input}`;

  // fetch 요청
  const response = await fetch(url, {
    ...init,
    headers,
  });

  // 응답 파싱 (JSON 우선, 실패 시 text로 fallback)
  const contentType = response.headers.get('content-type') || '';
  let payload: unknown;
  
  try {
    if (contentType.includes('application/json')) {
      payload = await response.json();
    } else {
      const textPayload = await response.text();
      // HTML 응답인 경우 (404 페이지 등) 감지
      if (textPayload.trim().startsWith('<!DOCTYPE') || textPayload.trim().startsWith('<html')) {
        if (response.status === 404) {
          throw new Error('404 요청한 리소스를 찾을 수 없습니다.');
        }
        throw new Error(`${response.status} 서버 에러가 발생했습니다.`);
      }
      payload = textPayload;
    }
  } catch (error) {
    // 이미 Error 객체인 경우 그대로 throw
    if (error instanceof Error) {
      throw error;
    }
    payload = {};
  }

  // 에러 처리
  if (!response.ok) {
    let errorMessage = '요청이 실패했습니다.';
    
    if (typeof payload === 'string') {
      // HTML이 아닌 텍스트 응답만 사용
      if (!payload.trim().startsWith('<!DOCTYPE') && !payload.trim().startsWith('<html')) {
        errorMessage = payload || errorMessage;
      }
    } else if (payload && typeof payload === 'object') {
      // API 응답 구조: { message: string | null, data: ... }
      const payloadObj = payload as Record<string, unknown>;
      if ('message' in payloadObj && typeof payloadObj.message === 'string' && payloadObj.message) {
        errorMessage = payloadObj.message;
      }
    }
    
    // 404 에러인 경우 더 명확한 메시지
    if (response.status === 404) {
      errorMessage = '요청한 리소스를 찾을 수 없습니다.';
    }
    
    throw new Error(`${response.status} ${errorMessage}`);
  }

  return payload as T;
}
