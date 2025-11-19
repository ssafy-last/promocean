// frontend/src/components/list/PostCardList.tsx

import PostCardItem from '@/components/item/PostCardItem'
import { CommunityFloatingItemProps } from '@/types/itemType'

interface PostCardListProps {
  posts: (CommunityFloatingItemProps & { category: string })[]
}

/**
 * PostCardList component
 * @description 인기 프롬프트용 무한 롤링 리스트
 * @returns {React.ReactNode}
 */
export default function PostCardList({ posts }: PostCardListProps) {
  if (!posts.length) return null

  const duplicatedPosts = [...posts, ...posts]

  return (
    <div className="group/postcard relative overflow-hidden border border-gray-100/80 bg-white/50 p-6 ">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-white to-transparent" />

      <div className="overflow-hidden">
        <div className="flex w-max gap-4 animate-marquee group-hover/postcard:[animation-play-state:paused]">
          {duplicatedPosts.map((post, index) => (
            <PostCardItem key={`${post.postId}-${index}`} {...post} />
          ))}
        </div>
      </div>
    </div>
  )
}
