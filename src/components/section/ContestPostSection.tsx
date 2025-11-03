'use client';

// frontend/src/components/section/ContestPostSection.tsx

import { useSearchParams } from "next/navigation";
import { ContestPostItemProps, LeaderboardItemProps } from "@/types/itemType";
import LeaderboardList from "@/components/list/LeaderboardList";

/**
 * ContestPostSectionProps interface
 * @description ContestPostSection component props
 */
export interface ContestPostSectionProps {
  contestPostData: ContestPostItemProps
  leaderboardList: LeaderboardItemProps[]
}

/**
 * ContestPostSection component
 * @description ContestPostSection component is a contest post section component that displays the contest post section content
 * @returns {React.ReactNode}
 */
export default function ContestPostSection({ contestPostData, leaderboardList }: ContestPostSectionProps) {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'detail';

  const title = currentTab === 'detail' ? '대회상세' : '리더보드';

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {title}
      </h1>
      
      {currentTab === 'detail' && (
        <div className="prose max-w-none">
          {/* 대회 상세 내용 */}
          <div className="text-gray-700 whitespace-pre-wrap">{contestPostData.content}</div>
        </div>
      )}

      {currentTab === 'leaderboard' && (
        // 대회 리더 보드
        <LeaderboardList leaderboardList={leaderboardList} />
      )}
    </div>
  );
}