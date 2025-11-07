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
  const payload = contentType.includes('application/json')
    ? await response.json().catch(() => ({}))
    : await response.text().catch(() => '');

  // 에러 처리
  if (!response.ok) {
    const message =
      typeof payload === 'string'
        ? payload
        : payload?.message || '요청이 실패했습니다.';
    throw new Error(`${response.status} ${message}`);
  }

  return payload as T;
}
