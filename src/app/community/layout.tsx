// frontend/src/app/community/layout.tsx

import CommunityHeader from "@/components/layout/CommunityHeader";
import CommunityFloatingSection from "@/components/section/CommunityFloatingSection";
import CommunityTabs from "@/components/filter/CommunityTabs";
import { CommunityAPI } from "@/api/community";
import { Suspense } from "react";

/**
 * CommunityLayout component
 * @description CommunityLayout component is a community layout component that displays the community layout content
 * @returns {React.ReactNode}
 */
export default async function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 인기글 데이터 가져오기
  const { popularPosts } = await CommunityAPI.getPopularPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <CommunityHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <CommunityTabs />
      </Suspense>
      
      <div className="max-w-7xl pl-8 pr-4 pt-8 pb-8 flex flex-row gap-6 relative">
        {/* 왼쪽: 페이지 컨텐츠 */}
        <div className="flex-1 flex flex-col gap-6">
          {children}
        </div>

        {/* 오른쪽: 플로팅 섹션 (인기글) */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <CommunityFloatingSection popularPosts={popularPosts} />
        </div>
      </div>
    </div>
  );
}
