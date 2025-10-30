'use client';

// frontend/src/components/filter/LoginTabs.tsx

interface LoginTabsProps {
  activeTab: 'login' | 'signup';
  onTabChange: (tab: 'login' | 'signup') => void;
}

export default function LoginTabs({ activeTab, onTabChange }: LoginTabsProps) {
  return (
    <div className="flex space-x-8 mb-8">
      <button
        onClick={() => onTabChange('login')}
        className={`text-lg font-medium transition-colors ${
          activeTab === 'login'
            ? 'text-white border-b-2 border-white pb-2'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        로그인
      </button>
      <button
        onClick={() => onTabChange('signup')}
        className={`text-lg font-medium transition-colors ${
          activeTab === 'signup'
            ? 'text-white border-b-2 border-white pb-2'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        회원가입
      </button>
    </div>
  );
}