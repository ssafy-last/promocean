// frontend/src/components/list/CommunityFloatingList.tsx

import CommunityFloatingItem from '@/components/item/CommunityFloatingItem'
import { CommunityFloatingItemProps } from '@/types/item'

interface CommunityFloatingListProps {
  popularPosts: CommunityFloatingItemProps[]
}

export default function CommunityFloatingList({ popularPosts }: CommunityFloatingListProps) {
  return (
    <div className="space-y-0">
      {popularPosts.map((item) => (
        <CommunityFloatingItem
          key={item.id}
          {...item}
        />
      ))}
    </div>
  )
}