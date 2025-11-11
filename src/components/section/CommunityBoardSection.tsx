'use client';

// frontend/src/components/section/CommunityBoardSection.tsx

import { useState } from "react";
import CommunityBoardFilterSection from "@/components/section/CommunityBoardFilterSection";
import CommunityBoardList from '@/components/list/CommunityBoardList'
import { CommunityBoardItemProps } from '@/types/itemType'
import { useRouter } from "next/navigation";

interface CommunityBoardSectionProps {
  communityBoardList: CommunityBoardItemProps[]
}

/**
 * CommunityBoardSection component
 * @description CommunityBoardSection component is a community board section component that displays the community board section content
 * @param {CommunityBoardSectionProps} props - The props for the CommunityBoardSection component
 * @returns {React.ReactNode}
 */
export default function CommunityBoardSection({ communityBoardList: initialCommunityBoardList }: CommunityBoardSectionProps) {
  const [communityBoardList, setCommunityBoardList] = useState<CommunityBoardItemProps[]>(initialCommunityBoardList);

  const router = useRouter();
  const handleWritePost = () => {
    router.push("/post?type=community");
  }

  const handleSearchResult = (result: CommunityBoardItemProps[]) => {
    setCommunityBoardList(result);
  }

  return (
  <div className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 게시글 목록 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-bold text-text mb-2">커뮤니티</h2>
            <p className="text-gray-800">다양한 주제의 프롬프트를 확인해보세요</p>
          </div>

          {/* 필터/검색*/}
          <div className="flex-shrink-0 min-w-[380px]">
            <CommunityBoardFilterSection onSearchResult={handleSearchResult} />
          </div>
        </div>
        
          {/* 게시글 목록 */}
          <CommunityBoardList communityBoardList={communityBoardList} />

          {/* 게시글 작성 버튼 */}
          <div className="flex justify-end py-6">
            <button
            type="button"
            className="px-4 py-2 rounded-md bg-primary text-white font-medium hover:brightness-110 active:brightness-95 transition-colors"
            onClick={handleWritePost}
          >
              게시글 작성
            </button>
        </div>
      </div>
    </div>
  )
}