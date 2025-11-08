// frontend/src/components/list/CommunityBoardList.tsx

import CommunityBoardItem from '@/components/item/CommunityBoardItem'
import { CommunityBoardItemProps } from '@/types/itemType'

interface CommunityBoardListProps {
  communityBoardList: CommunityBoardItemProps[]
}

/**
 * CommunityBoardList component
 * @description CommunityBoardList component is a community board list component that displays the community board list content
 * @returns {React.ReactNode}
 */
export default function CommunityBoardList({ communityBoardList }: CommunityBoardListProps) {
  return (
    <div className="flex flex-col divide-y divide-gray-100 space-y-4">
      {communityBoardList.map((item) => (
        <CommunityBoardItem
          key={item.postId}
          {...item}
        />
      ))}
    </div>
  )
}