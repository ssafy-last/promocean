'use client';

// frontend/src/components/filter/LoginTabs.tsx

interface LoginTabsProps {
  activeTab: 'login' | 'signup';
  onTabChange: (tab: 'login' | 'signup') => void;
}

export default function LoginTabs({ activeTab, onTabChange }: LoginTabsProps) {
  return (
    <div className="relative flex gap-5 mb-12">
      <button
        onClick={() => onTabChange('login')}
        className={`text-[15px] font-medium transition-colors w-14 text-left z-2 ${
          activeTab === 'login'
            ? 'text-primary'
            : 'text-text/60 hover:text-primary'
        }`}
      >
        로그인
      </button>
      <button
        onClick={() => onTabChange('signup')}
        className={`text-[15px] font-medium transition-colors w-14 text-left z-2 ${
          activeTab === 'signup'
            ? 'text-primary'
            : 'text-text/60 hover:text-primary'
        }`}
      >
        회원가입
      </button>

      <div className ={`absolute inset-0 border-b-3 border-b-primary w-15 py-3 transition-[translate] duration-300 ${
          activeTab === 'signup'
            ? 'text-primary border-b-2 border-primary translate-x-[120%]'
            : 'text-text/60 hover:text-primary translate-x-[-15%]'
        }`}></div>

    </div>
  );
}