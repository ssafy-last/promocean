// frontend/src/components/layout/CommunityHeader.tsx

"use client";

import React, { useState } from "react";
import PlusCircle from "../icon/PlusCircle";
import TeamSpaceManageModal from "../modal/TeamSpaceManageModal";

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

  const [isModalOpenState, setIsModalOpenState] = useState(false);
  const [modalTabState, setModalTabState] = useState<"권한" | "초대">("권한");  
  const [memberListState, setMemberListState] = useState<string[]>([
    "김철수",
    "이영희",
    "박민수",
    "최지우",
    "강다은",
    "이수민",
    "홍길동"
  ]);

  const handleModalOpen = () => {
    setIsModalOpenState(!isModalOpenState);
  }
  const handleModalClose = () => {
    setIsModalOpenState(false);
  }


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
          isTeamSpace && (
          <div className="relative flex flex-row gap-3">
            <button className ="
            cursor-pointer 
            p-2 
            rounded-md
            hover:bg-primary/40
            " onClick={handleModalOpen}>팀 관리</button>

            {isModalOpenState && (
              <TeamSpaceManageModal
                modalTabState={modalTabState}
                setModalTabState={setModalTabState}
                memberListState={memberListState}
                setMemberListState={setMemberListState}
              />
            )}
          </div>
          )
        }
        

      </div>
    </header>
  );
}