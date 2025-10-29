// frontend/src/components/list/CommunityBoardList.tsx

import CommunityBoardItem from '@/components/item/CommunityBoardItem'
import { CommunityBoardItemProps } from '@/types/item'

interface CommunityBoardListProps {
  communityBoardList: CommunityBoardItemProps[]
}

export default function CommunityBoardList({ communityBoardList }: CommunityBoardListProps) {
  return (
    <div className="flex flex-col divide-y divide-gray-100">
      {communityBoardList.map((item) => (
        <CommunityBoardItem
          key={item.id}
          {...item}
        />
      ))}
    </div>
  )
}