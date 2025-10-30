// frontend/src/api/auth.ts

import { AuthResponse, LoginRequest, SignUpRequest } from '@/types/authType';
import { apiFetch } from '@/api/fetcher';

// Todo : environment variable 사용
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const authAPI = {

  /**
   * 로그인 API
   * @param credentials - 로그인 요청 데이터
   * @returns 로그인 응답 데이터
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {

    const response = await fetch('/mock/AuthResponse.json', { cache: 'no-store' });
    const data = await response.json();
    return data;
    
    // Todo : 목데이터에서 실제 데이터로 변경 필요.
    // return apiFetch<AuthResponse>(`/api/v1/auth/login`, {
    //   method: 'POST',
    //   body: JSON.stringify(credentials),
    // });
  },

  /**
   * 회원가입 API
   * @param userData - 회원가입 요청 데이터
   * @returns 회원가입 응답 데이터
   */
  async signUp(userData: SignUpRequest): Promise<AuthResponse> {
    return apiFetch<AuthResponse>(`/api/v1/members/join`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
};


