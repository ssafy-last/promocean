// frontend/src/api/fetcher.ts

import { getAuthToken } from '@/lib/authToken';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

/**
 * API 호출 함수 래퍼 함수입니다.
 * @param input - 요청 URL
 * @param init - 요청 초기 설정
 * @returns 응답
 */
export async function apiFetch<T = unknown>(input: string, init: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? getAuthToken() : null;

  const headers = new Headers(init.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const isFormData = typeof FormData !== 'undefined' && init.body instanceof FormData;
  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(
    input.startsWith('http') ? input : `${BASE_URL}${input}`,
    { ...init, headers }
  );

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json().catch(() => ({}))
    : await response.text().catch(() => '');

  if (!response.ok) {
    const message = typeof payload === 'string' ? payload : (payload?.message || '요청이 실패했습니다.');
    throw new Error(`${response.status} ${message}`);
  }

  return payload as T;
}