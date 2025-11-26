'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * AuthGuard component
 * @description 인증이 필요한 페이지를 보호하는 컴포넌트입니다.
 * 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트됩니다.
 * @param children - 보호할 컴포넌트
 * @param redirectTo - 리다이렉트할 경로 (기본값: '/auth/login?tab=login')
 */
export default function AuthGuard({ children, redirectTo = '/auth/login?tab=login' }: AuthGuardProps) {
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydration 처리
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isLoggedIn || !user) {
      router.push(redirectTo);
    }
  }, [isHydrated, isLoggedIn, user, router, redirectTo]);

  // 인증 확인 중이거나 로그인하지 않은 경우 아무것도 렌더링하지 않음
  if (!isHydrated || !isLoggedIn || !user) {
    return null;
  }

  return <>{children}</>;
}
