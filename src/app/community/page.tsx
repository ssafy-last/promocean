// frontend/src/app/community/page.tsx

import CommunityHeader from '@/components/layout/CommunityHeader'
import CommunityTabs from '@/components/filter/CommunityTabs'
import CommunityBoardFilterSection from '@/components/section/CommunityBoardFilterSection'
import CommunityBoardSection from '@/components/section/CommunityBoardSection'
import CommunityFloatingSection from '@/components/section/CommunityFloatingSection'
import CommunityFooter from '@/components/layout/CommunityFooter'

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <CommunityHeader />
        <CommunityTabs />
        <CommunityBoardFilterSection />
        <CommunityBoardSection />
        <CommunityFloatingSection />
        <CommunityFooter />
      </div>
    </div>
  );
}
