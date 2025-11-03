// frontend/src/components/layout/CommunityHeader.tsx

"use client";

import React from "react";

/**
 * CommunityHeader component
 * @description CommunityHeader component is a community header component that displays the community header content
 * @returns {React.ReactNode}
 */

export interface SpaceHeaderProps {
    nickname: string;
}

export default function SpaceHeader({nickname}: SpaceHeaderProps) {
  return (
    <header className="w-full">
      {/* 상단 영역 - 전체 너비 */}
      <div className="flex items-center bg-primary text-white px-8 py-6 w-full">
        <div className="w-20 h-20 bg-white/90 rounded-full mr-6"></div>
        <div>
          <h1 className="text-3xl font-semibold">{nickname} 님의 스페이스</h1>
          <p className="text-white/80 text-sm">나만의 프롬프트 세계를 만들어요!</p>
        </div>
      </div>
    </header>
  );
}
