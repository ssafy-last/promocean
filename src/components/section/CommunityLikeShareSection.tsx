'use client';

// frontend/src/components/section/CommunityLikeShareSection.tsx

import Heart from "@/components/icon/Heart";
import Bookmark from "@/components/icon/Bookmark";
import ArrayDownTray from "@/components/icon/ArrayDownTray";
import { CommunityAPI } from "@/api/community";
import { useState } from "react";

/**
 * CommunityLikeShareSection component
 * @description 좋아요, 스크랩, 아카이브 섹션입니다.
 * @returns {React.ReactNode}
 */
export default function CommunityLikeShareSection({ likeCnt: initialLikeCnt, isLiked: initialIsLiked, postId 
}: { 
  likeCnt: number; 
  isLiked: boolean; 
  postId: number;
}) {
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [likeCnt, setLikeCnt] = useState<number>(initialLikeCnt);
  
  // 좋아요 함수
  const handleLikeClick = async () => {
    if (isLiked) return;

    try {
      await CommunityAPI.createPostLike(postId);
      setIsLiked(true);
      setLikeCnt(prev => prev + 1);
    } catch (error) {
      if (!(error instanceof Error)) return;

      const errorMessage = error.message;

      switch (errorMessage) {
        case '인증되지 않은 회원입니다':
          alert('로그인이 필요합니다.');
          break;
        case '이미 좋아요를 누른 게시글입니다.':
          setIsLiked(true);
          break;
        case '게시글을 찾을 수 없습니다':
          alert('게시글을 찾을 수 없습니다.');
          break;
        default:
          alert(errorMessage);
          break;
      }
    }
  };

  return (
    <div className="flex flex-row items-center justify-center gap-8">
      {/* 좋아요 */}
      <button
        onClick={handleLikeClick}
        disabled={isLiked}
        className="flex items-center gap-1 hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLiked ? (
          <Heart className="size-6 fill-red-500 stroke-red-500" />
        ) : (
          <Heart className="size-6 fill-none stroke-gray-500" />
        )}
        <span className="text-sm">{likeCnt}</span>
      </button>
      
      {/* 스크랩하기 */}
      <div className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity">
        <Bookmark className="w-4 h-4 stroke-gray-500" />
        <span className="text-sm">스크랩</span>
      </div>

      {/* 아카이브하기 */}
      <div className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity">
        <ArrayDownTray className="w-4 h-4 stroke-gray-500" />
        <span className="text-sm">아카이브</span>
      </div>
    </div>
  );
}