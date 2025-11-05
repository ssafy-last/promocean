// frontend/src/app/contest/post/[id]/page.tsx

import ContestHeader from "@/components/layout/ContestHeader";
import ContestPostTabs from "@/components/filter/ContestPostTabs";
import ContestPostSection from "@/components/section/ContestPostSection";
import ContestInfoSection from "@/components/section/ContestInfoSection";
import { ContestInfoItemProps, ContestPostItemProps, LeaderboardItemProps } from "@/types/itemType";

/**
 * ContestPostPage component
 * @description ContestPostPage component is a contest post page component that displays the contest post page content
 * @returns {React.ReactNode}
 */
export default async function ContestPostPage() {

  // Todo : 실제 API와 연동하기, 대회 상세 게시글 조회
  const contestPostResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/ContestPostItem.json`,
    { cache: "no-store" }
  ).then(res => res.json()).catch(() => ({}));

  const contestPostData: ContestPostItemProps = contestPostResponse;

  // TODO: 실제 API와 연동하기
  const leaderboardResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/LeaderboardItem.json`,
    { cache: "no-store" }
  ).then(res => res.json()).catch(() => ({}));

  const leaderboardList: LeaderboardItemProps[] = leaderboardResponse.Leaderboard || [];

  // TODO: 실제 API와 연동하기
  const contestInfoResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/ContestInfoItem.json`,
    { cache: "no-store" }
  ).then(res => res.json()).catch(() => ({ items: [] }));

  const contestInfoData: ContestInfoItemProps[] = contestInfoResponse.items || [];
  const contestInfoTitles = ["대회 정보", "상금 유형", "참여 통계", "해시태그"];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* TODO : /contest에서 공통 레이아웃으로 설정? */}
      {/* 컨테스트 헤더 */}
      <ContestHeader />
      
      <div className="max-w-7xl pl-8 pr-4 py-8 flex flex-row gap-6 relative">

        {/* 왼쪽: 게시글 섹션 */}
        <div className="flex-1 flex flex-col gap-6 bg-white rounded-lg shadow-md">
          <ContestPostSection 
            contestPostData={contestPostData}
            leaderboardList={leaderboardList}
          />
        </div>

        {/* 오른쪽: 플로팅 섹션 */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <ContestInfoSection 
            titles={contestInfoTitles}
            items={contestInfoData}
          />
        </div>
      </div>
    </div>
  );
}
