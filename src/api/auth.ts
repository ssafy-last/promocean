// frontend/src/api/auth.ts

import { AuthResponse, LoginRequest, SignUpRequest, DuplicateCheckResponse } from '@/types/authType';
import { apiFetch } from '@/api/fetcher';

export const authAPI = {

  /**
   * 로그인 API
   * @page /auth/login?tab=login
   * @endpoint /api/v1/auth/login
   * @param credentials - 로그인 요청 데이터
   * @returns 로그인 응답 데이터
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return apiFetch<AuthResponse>(`/api/v1/auth/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * 회원가입 API
   * @page /auth/login?tab=signup
   * @endpoint /api/v1/members/join
   * @param userData - 회원가입 요청 데이터
   * @returns 회원가입 응답 데이터
   */
  async signUp(userData: SignUpRequest): Promise<AuthResponse> {
    return apiFetch<AuthResponse>(`/api/v1/members/join`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  /**
   * 중복확인 API (이메일 또는 닉네임)
   * @page /auth/login?tab=signup
   * @endpoint /api/v1/members?email=email&nickname=nickname
   * @param options - 중복확인 옵션 (email 또는 nickname 중 하나만 전달)
   * @returns 중복확인 응답 데이터
   */
  async checkDuplicate(options: { email?: string; nickname?: string }): Promise<DuplicateCheckResponse> {
    const params = new URLSearchParams();
    if (options.email) {
      params.set('email', options.email);
    }
    if (options.nickname) {
      params.set('nickname', options.nickname);
    }
    return apiFetch<DuplicateCheckResponse>(`/api/v1/members?${params.toString()}`, {
      method: 'GET',
    });
  },
};


