'use client';

// frontend/src/components/form/SignUpForm.tsx

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/api/auth';
import { setAuthToken } from '@/lib/authToken';


export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 비밀번호 확인
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {

      const response = await authAPI.signUp({ email, password, nickname });
      
      // API 응답 검증
      if (response.data) {
        // 성공: data가 있는 경우
        const user = {
          email: response.data.email,
          nickname: response.data.nickname,
          profileUrl: response.data.profileUrl,
        };
        // 서버가 Set-Cookie로 내려주는 것이 베스트.
        // 프론트 개발 환경에서는 응답에서 받은 토큰을 쿠키에 저장.
        const token = 'mock-jwt-token';
        setAuthToken(token);
        login(user, token);
        
        // 회원가입 성공 시 메인 페이지로 이동
        router.push('/');
      } else {
        // 실패: data가 null인 경우
        throw new Error(response.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert(error instanceof Error ? error.message : '회원가입에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 제목 */}
      <h1 className="text-3xl font-bold text-white mb-8">회원가입</h1>
      
      {/* 이메일 입력 */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          이메일
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          비밀번호
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 비밀번호 확인 입력 */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          비밀번호 확인
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          required
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 닉네임 입력 */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          닉네임
        </label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Nickname"
          required
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 회원가입 버튼 */}
      <button 
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        Sign Up
      </button>
    </form>
  );
}