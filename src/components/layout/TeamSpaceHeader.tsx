// frontend/src/components/layout/TeamSpaceHeader.tsx

"use client";

import React, { useEffect, useState } from "react";
import TeamSpaceManageModal from "../modal/TeamSpaceManageModal";
import TeamSpaceMyMenuModal from "../modal/TeamSpaceMyMenuModal";
import SpaceAPI, { SpaceParticipants } from "@/api/space";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";

/**
 * TeamSpaceHeaderProps 인터페이스
 * @property {string} nickname - 사용자 닉네임
 * @property {string} [description] - 설명 텍스트
 */
export interface TeamSpaceHeaderProps {
    nickname: string;
    description?: string;
    spaceId? : number;
    coverImageUrl? :string;
}

/**
 * 팀 스페이스 헤더 컴포넌트
 * 팀 관리 모달을 열 수 있는 기능이 포함되어 있습니다.
 *
 * @param param0 - TeamSpaceHeaderProps 객체의 분해 할당
 * @property nickname - 사용자 닉네임
 * @property description - 헤더 부연 설명 텍스트
 *
 * @returns {JSX.Element} 팀 스페이스 헤더 컴포넌트
 */
export default function TeamSpaceHeader(
  {nickname, description, spaceId, coverImageUrl}: TeamSpaceHeaderProps) {

  console.log("coverImageUrl", coverImageUrl);  
  const [isModalOpenState, setIsModalOpenState] = useState(false);
  const [isMyMenuModalOpen, setIsMyMenuModalOpen] = useState(false);
  const [modalTabState, setModalTabState] = useState<"멤버" | "초대" | "수정" | "삭제">("멤버");
  const [memberListState, setMemberListState] = useState<SpaceParticipants[]>([]);
  const [ownerMemberState, setOwnerMemberState] = useState<SpaceParticipants | null>(null);
  const [currentUserSpaceNickname, setCurrentUserSpaceNickname] = useState<string>(nickname);
  const authStore = useAuthStore();
  const username = authStore.user?.nickname;
  const userEmail = authStore.user?.email;
  const userNickname = authStore.user?.nickname;


  // console.log("spaceId in TeamSpaceHeader:", spaceId);
  const handleModalOpen = () => {
    setIsModalOpenState(!isModalOpenState);
  }
  const handleModalClose = () => {
    setIsModalOpenState(false);
  }

  const handleMyMenuOpen = () => {
    setIsMyMenuModalOpen(!isMyMenuModalOpen);
  }
  const handleMyMenuClose = () => {
    setIsMyMenuModalOpen(false);
  }

  useEffect(()=>{
    const fetchItem = async () =>{  
      if(!spaceId) return;
      try {
        const res = await SpaceAPI.getSpaceParticipants(spaceId);
        const participants: SpaceParticipants[] =  res.participants;


        const owner = participants.find(participant => participant.email=== userEmail) || null;
        if (owner) {
          participants.splice(participants.indexOf(owner), 1); // 소유자 제외
          setCurrentUserSpaceNickname(owner.nickname); // 현재 사용자의 팀 스페이스 별명 설정
        }

        setOwnerMemberState(owner);
        setMemberListState(participants);
     }
      catch (error) {
        console.error("Failed to fetch space participants:", error);
      }
    }
    fetchItem();
  },[spaceId])


  return (
    <header className="relative w-full">
      {/* 상단 영역 - 전체 너비 */}
      <div className="absolute bg-cover bg-center bg-no-repeat w-full h-full opacity-90"
          style={{backgroundImage: `url(${coverImageUrl})`}}
      />
      <div className="absolute w-full h-full backdrop-blur-none hover:backdrop-blur-xs transition-all duration-300"/>

      <div className ="flex flex-row justify-between items-center text-white px-8 py-12 w-full h-full">
        <div className = "z-1">
            <h1 className="flex text-4xl font-semibold">{nickname}의 팀 스페이스</h1>
            <p className="text-white/80 text-sm">{description}</p>
        </div>

        <div className="relative flex flex-row gap-3">
          <button className="cursor-pointer p-2 rounded-md bg-primary hover:bg-primary/40" onClick={handleMyMenuOpen}>내 메뉴</button>
          <button className="cursor-pointer p-2 rounded-md bg-primary hover:bg-primary/40" onClick={handleModalOpen}>팀 관리</button>

          {isMyMenuModalOpen && (
            <TeamSpaceMyMenuModal
              spaceId={spaceId}
              isModalOpenState={isMyMenuModalOpen}
              handleModalClose={handleMyMenuClose}
              currentNickname={currentUserSpaceNickname}
              teamName={`${nickname} 님의 팀 스페이스`}
            />
          )}

          {isModalOpenState && (
            <TeamSpaceManageModal
              spaceId ={spaceId}
              isModalOpenState={isModalOpenState}
              handleModalClose={handleModalClose}
              modalTabState={modalTabState}
              setModalTabState={setModalTabState}
              memberListState={memberListState}
              ownerMemberState={ownerMemberState}
              setMemberListState={setMemberListState}
            />
          )}
        </div>
      </div>
    </header>
  );
}
