// frontend/src/app/contest/[postId]/page.tsx

import ContestHeader from "@/components/layout/ContestHeader";
import ContestPostSection from "@/components/section/ContestPostSection";
import ContestInfoSection from "@/components/section/ContestInfoSection";
import { ContestAPI } from "@/api/contest";

interface ContestPostPageProps {
  params: Promise<{ postId: string }>;
}

/**
 * ContestPostPage component
 * @description 대회 상세 게시글 페이지 (mock → 실제 API 전환 예정)
 * @returns {React.ReactNode}
 */
export default async function ContestPostPage({ params }: ContestPostPageProps) {
  const { postId: postIdStr } = await params;
  const postId = parseInt(postIdStr, 10);

  const {
    contestPostData,
    leaderboardList,
    contestInfoData,
    contestInfoTitles,
    contestNoticeList,
    contestSubmissionList,
  } = await ContestAPI.getContestPostPageData(postId);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* TODO : /contest 상위 layout.tsx로 이동 고려 */}
      <ContestHeader />

      <div className="max-w-7xl pl-8 pr-4 py-8 flex flex-row gap-6 relative">
        {/* 왼쪽: 게시글 섹션 */}
        <div className="flex-1 flex flex-col gap-6 bg-white rounded-lg shadow-md">
          <ContestPostSection
            contestPostData={contestPostData}
            leaderboardList={leaderboardList}
            ContestNoticeList={contestNoticeList}
            contestSubmissionList={contestSubmissionList}
          />
        </div>

        {/* 오른쪽: 플로팅 정보 섹션 */}
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
