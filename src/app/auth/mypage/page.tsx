'use client';

// frontend/src/app/auth/mypage/page.tsx

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import MypageHeader from '@/components/layout/MypageHeader';
import ProfileEditTab from '@/components/mypage/ProfileEditTab';
import WithdrawalTab from '@/components/mypage/WithdrawalTab';
import EmoticonTab from '@/components/mypage/EmoticonTab';

type TabType = 'profile' | 'emoticon' | 'withdrawal';

export default function MyPage() {
  const router = useRouter();
  const { user, isLoggedIn, hasHydrated } = useAuthStore();
  const store = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  useEffect(() => {
    console.log("store: ", store);
    console.log("isLoggedIn: ", isLoggedIn, "user: ", user);
    if(!hasHydrated) {
      return;
    }


    if (!isLoggedIn) {

      router.push('/auth/login?tab=login');
      return;
    }
  }, [isLoggedIn, user, router]);

  if (!isLoggedIn || !user) {
    return null;
  }

  const tabs = [
    { id: 'profile' as TabType, label: '프로필 수정' },
    { id: 'emoticon' as TabType, label: '내 활동' },
    { id: 'withdrawal' as TabType, label: '회원 탈퇴' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MypageHeader />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* 탭 헤더 */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-1 py-4 px-6 text-center font-medium text-sm transition-colors
                    ${
                      activeTab === tab.id
                        ? 'border-b-2 border-primary text-primary bg-primary/5'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {!hasHydrated ? (
            <div className="p-8">
              {activeTab === 'profile' && <ProfileEditTab />}
              {activeTab === 'emoticon' && <EmoticonTab />}
              {activeTab === 'withdrawal' && <WithdrawalTab />}
            </div>
          ) : (
            <div className="p-8">로딩 중...</div>
          )
          }
        </div>
      </div>
    </div>
  );
}
