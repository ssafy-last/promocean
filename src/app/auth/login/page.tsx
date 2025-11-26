'use client';

// frontend/src/app/auth/login/page.tsx

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, Suspense } from 'react';
import LoginTabs from "@/components/filter/LoginTabs";
import SignInForm from "@/components/form/SignInForm";
import SignUpForm from "@/components/form/SignUpForm";

function LoginPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL 쿼리 파라미터에서 탭 상태 읽기
  const activeTab = useMemo(() => {
    const tab = searchParams.get('tab');
    return tab === 'signup' ? 'signup' : 'login';
  }, [searchParams]);

  // 탭 변경 시 URL 업데이트
  const handleTabChange = (tab: 'login' | 'signup') => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-background overflow-hidden" >
      {/* 로그인 폼 컨테이너 */}

          {/* 탭 */}          
          <div className='flex flex-row gap-2 w-9/12 min-w-[800px] bg-[#FDFDFC] h-10/12 min-h-[600px] shadow-2xl p-2'>
            <div className='relative flex  w-10/14 min-w-[440px]'>
                <div className={`absolute inset-0 bg-[url('/assets/login_bg.png')] bg-cover saturate-150 bg-center rounded transition-all duration-300
                  ${activeTab === 'login' ? 'opacity-100' : "opacity-0"}`}></div>
                <div className={`absolute inset-0 bg-[url('/assets/signup_bg.png')] bg-cover saturate-150 bg-center rounded transition-all duration-300
                  ${activeTab === 'signup' ? ' opacity-100' : "opacity-0"}`}></div>
            </div>
         
          {/* 폼 내용 */}
              <div className="w-4/14 min-w-[340px] px-8 py-12" >
                <LoginTabs activeTab={activeTab} onTabChange={handleTabChange} />
                {activeTab === 'login' ? <SignInForm /> : <SignUpForm />}
              </div>
          </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">로딩 중...</div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}
