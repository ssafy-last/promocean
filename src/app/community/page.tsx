// frontend/src/app/community/page.tsx

import CommunityHeader from '@/components/layout/CommunityHeader'
import CommunityTabs from '@/components/filter/CommunityTabs'
import CommunityBoardFilterSection from '@/components/section/CommunityBoardFilterSection'
import CommunityBoardSection from '@/components/section/CommunityBoardSection'
import CommunityFloatingSection from '@/components/section/CommunityFloatingSection'
import CommunityFooter from '@/components/layout/CommunityFooter'
import { CommunityBoardItemProps } from '@/types/item'

export default async function CommunityPage() {
  // 목 데이터 fetch
  const communityBoardRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/CommunityBoardData.json`, {
    cache: "no-store",
  });
  
  const communityBoardList: CommunityBoardItemProps[] = await communityBoardRes.json();

  return (
    <div className="min-h-screen bg-gray-50">
      <CommunityHeader />
      <CommunityTabs />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <CommunityBoardFilterSection />
        <CommunityBoardSection communityBoardList={communityBoardList} />
        <CommunityFloatingSection />
        <CommunityFooter />
      </div>
    </div>
  );
}
