// frontend/src/app/community/page.tsx

import CommunityHeader from "@/components/layout/CommunityHeader";
import CommunityTabs from "@/components/filter/CommunityTabs";
import CommunityBoardSection from "@/components/section/CommunityBoardSection";
import CommunityFloatingSection from "@/components/section/CommunityFloatingSection";
import CommunityFooter from "@/components/layout/CommunityFooter";
import { CommunityBoardItemProps, CommunityFloatingItemProps } from "@/types/item";

export default async function CommunityPage() {
  // 커뮤니티 게시판 데이터 fetch
  const communityBoardRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/CommunityBoardData.json`,
    { cache: "no-store" }
  );

  // 인기글 데이터 fetch
  const popularPostsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/PopularPost.json`,
    { cache: "no-store" }
  );

  const communityBoardList: CommunityBoardItemProps[] = await communityBoardRes.json();
  const popularPosts: CommunityFloatingItemProps[] = await popularPostsRes.json();

  return (
    <div className="min-h-screen bg-gray-50">
      <CommunityHeader />
      <CommunityTabs />

      <div className="max-w-7xl pl-8 pr-4 py-8 flex flex-row gap-6 relative">
        
        {/* 왼쪽: 필터 + 게시글 */}
        <div className="flex-1 flex flex-col gap-6">
          <CommunityBoardSection communityBoardList={communityBoardList} />
        </div>

        {/* 오른쪽: 플로팅 섹션 */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <CommunityFloatingSection popularPosts={popularPosts} />
        </div>
      </div>
        <CommunityFooter />
    </div>
  );
}
