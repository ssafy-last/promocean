// frontend/src/components/layout/CommunityHeader.tsx

"use client";

import React from "react";
import PlusCircle from "../icon/PlusCircle";

/**
 * CommunityHeader component
 * @description CommunityHeader component is a community header component that displays the community header content
 * @returns {React.ReactNode}
 */
/**
 * SpaceHeaderProps 인터페이스
 * @property {string} nickname - 사용자 닉네임
 * @property {boolean} [isTeamSpace] - 팀 스페이스 여부
 * @property {string} [description] - 설명 텍스트 
 */
export interface SpaceHeaderProps {
    nickname: string;
    isTeamSpace?: boolean;
    description?: string;
}

/**
 * 스페이스 페이지의 헤더 컴포넌트
 * 팀스페이스, 개인 스페이스 모두의 헤더를 관리할 수 있습니다.
 * 
 * @param param0  - SpaceHeaderProps 객체의 분해 할당
 * @property nickname - 사용자 닉네임
 * @property isTeamSpace - 팀 스페이스 여부
 * @property description - 헤더 부연 설명 텍스트
 * 
 * isTeamSpace가 true이면 '팀 스페이스', false이거나 undefined이면 '마이 스페이스'로 표시됩니다.
 *
 * @returns {JSX.Element} 헤더 컴포넌트
 */
export default function SpaceHeader(
  {nickname, isTeamSpace = false, description}: SpaceHeaderProps) {
  return (
    <header className="w-full">
      {/* 상단 영역 - 전체 너비 */}
      <div className="flex flex-row justify-between items-center bg-primary text-white px-8 py-6 w-full">
        <div>
          <h1 className="text-3xl font-semibold">{nickname} 님의 
            {isTeamSpace ? ' 팀 스페이스' : ' 마이 스페이스'}</h1>
          <p className="text-white/80 text-sm">{description}</p>
        </div>

        {
          isTeamSpace &&(
            <div className="flex flex-row gap-3">
            <button className ="cursor-pointer" onClick={() => {}}>관리</button>
            <button className ="cursor-pointer" onClick={() => {}}>초대</button>
            </div>
          )
        }
        
      </div>
    </header>
  );
}