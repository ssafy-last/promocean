// frontend/src/components/section/CommunityBoardSection.tsx

import CommunityBoardList from '@/components/list/CommunityBoardList'
import { CommunityBoardItemProps } from '@/types/item'

interface CommunityBoardSectionProps {
  communityBoardList: CommunityBoardItemProps[]
}

export default function CommunityBoardSection({ communityBoardList }: CommunityBoardSectionProps) {
  return (
  <div className="py-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text mb-2">커뮤니티 게시판</h2>
          <p className="text-gray-600">다양한 주제의 프롬프트를 확인해보세요</p>
        </div>
        
        {/* Community Board Grid */}
        <CommunityBoardList communityBoardList={communityBoardList} />
      </div>
    </div>
  )
}