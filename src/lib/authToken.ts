// frontend/src/lib/authToken.ts

export function setAuthToken(token: string) {
  // HttpOnly는 서버에서만 설정 가능. 프론트 개발 단계에서는 secure/samesite 설정만 적용.
  const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
  const cookie = `access_token=${encodeURIComponent(token)}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax${isSecure ? '; Secure' : ''}`;
  document.cookie = cookie;
}

export function getAuthToken(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|; )access_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function clearAuthToken() {
  document.cookie = 'access_token=; Path=/; Max-Age=0; SameSite=Lax';
}