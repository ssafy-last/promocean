// frontend/src/components/list/CommunityBoardList.tsx

import CommunityBoardItem from '@/components/item/CommunityBoardItem'
import { CommunityBoardItemProps } from '@/types/itemType'

interface CommunityBoardListProps {
  communityBoardList: CommunityBoardItemProps[]
}

export default function CommunityBoardList({ communityBoardList }: CommunityBoardListProps) {
  return (
    <div className="flex flex-col divide-y divide-gray-100 space-y-4">
      {communityBoardList.map((item) => (
        <CommunityBoardItem
          key={item.id}
          {...item}
        />
      ))}
    </div>
  )
}