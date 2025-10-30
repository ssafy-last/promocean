// frontend/src/components/section/CommunityFloatingSection.tsx

import CommunityFloatingList from '@/components/list/CommunityFloatingList'
import { CommunityFloatingItemProps } from '@/types/itemType'

interface CommunityFloatingSectionProps {
  popularPosts: CommunityFloatingItemProps[]
}

/**
 * CommunityFloatingSection component
 * @description CommunityFloatingSection component is a community floating section component that displays the community floating section content
 * @returns {React.ReactNode}
 * @param {CommunityFloatingSectionProps} props - The props for the CommunityFloatingSection component
 */
export default function CommunityFloatingSection({ popularPosts }: CommunityFloatingSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Section Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-text mb-2">인기글</h2>
        <p className="text-sm text-gray-600">많은 사람들이 관심을 가진 글들</p>
      </div>
      
      {/* Popular Posts List */}
      <CommunityFloatingList popularPosts={popularPosts} />
    </div>
  )
}