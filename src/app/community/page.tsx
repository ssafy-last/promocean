// frontend/src/app/community/page.tsx

import CommunityHeader from "@/components/layout/CommunityHeader";
import CommunityTabs from "@/components/filter/CommunityTabs";
import CommunityBoardSection from "@/components/section/CommunityBoardSection";
import CommunityFloatingSection from "@/components/section/CommunityFloatingSection";
import CommunityFooter from "@/components/layout/CommunityFooter";
import { CommunityAPI } from "@/api/community";
import { Suspense } from "react";

/**
 * CommunityPage component
 * @description CommunityPage component is a community page component that displays the community page content
 * @returns {React.ReactNode}
 */
export default async function CommunityPage() {

  const { communityBoardList, popularPosts } = await CommunityAPI.getCommunityPageData();

  return (
    <div className="min-h-screen bg-gray-50">
      <CommunityHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <CommunityTabs />
      </Suspense>

      <div className="max-w-7xl pl-8 pr-4 py-8 flex flex-row gap-6 relative">
        
        {/* 왼쪽: 필터 + 게시글 */}
        <div className="flex-1 flex flex-col gap-6">
          <CommunityBoardSection communityBoardList={communityBoardList} />
          <CommunityFooter />
        </div>

        {/* 오른쪽: 플로팅 섹션 */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <CommunityFloatingSection popularPosts={popularPosts} />
        </div>
      </div>
    </div>
  );
}
