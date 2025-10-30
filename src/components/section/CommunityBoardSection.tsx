// frontend/src/components/section/CommunityBoardSection.tsx

import CommunityBoardFilterSection from "@/components/section/CommunityBoardFilterSection";
import CommunityBoardList from '@/components/list/CommunityBoardList'
import { CommunityBoardItemProps } from '@/types/itemType'

interface CommunityBoardSectionProps {
  communityBoardList: CommunityBoardItemProps[]
}

/**
 * CommunityBoardSection component
 * @description CommunityBoardSection component is a community board section component that displays the community board section content
 * @param {CommunityBoardSectionProps} props - The props for the CommunityBoardSection component
 * @returns {React.ReactNode}
 */
export default function CommunityBoardSection({ communityBoardList }: CommunityBoardSectionProps) {
  return (
  <div className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-bold text-text mb-2">커뮤니티 게시판</h2>
            <p className="text-gray-800">다양한 주제의 프롬프트를 확인해보세요</p>
          </div>

          {/* 오른쪽 필터 영역 최소 크기 조정 */}
          <div className="flex-shrink-0 min-w-[380px]">
            <CommunityBoardFilterSection />
          </div>
        </div>
        
        {/* Community Board Grid */}
        <CommunityBoardList communityBoardList={communityBoardList} />
      </div>
    </div>
  )
}