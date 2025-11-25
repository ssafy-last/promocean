'use client';

// frontend/src/components/filter/LoginTabs.tsx

interface LoginTabsProps {
  activeTab: 'login' | 'signup';
  onTabChange: (tab: 'login' | 'signup') => void;
}

export default function LoginTabs({ activeTab, onTabChange }: LoginTabsProps) {
  return (
    <div className="relative flex space-x-8 mb-8">
      <button
        onClick={() => onTabChange('login')}
        className={`text-[15px] font-medium transition-colors ${
          activeTab === 'login'
            ? 'text-primary border-b-2 border-primary'
            : 'text-text/60 hover:text-primary'
        }`}
      >
        로그인
      </button>
      <button
        onClick={() => onTabChange('signup')}
        className={`text-[15px] font-medium transition-colors ${
          activeTab === 'signup'
            ? 'text-primary border-b-2 border-primary'
            : 'text-text/60 hover:text-primary'
        }`}
      >
        회원가입
      </button>
      <div className ="absolute inset-0 border-b border-b-primary w-fit"></div>
    </div>
  );
}