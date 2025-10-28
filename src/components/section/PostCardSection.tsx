// frontend/src/components/section/PostCardSection.tsx

import PostCardList from '@/components/list/PostCardList'
import { PostCardItemProps } from '@/types/item'

interface PostSectionType {
  postSectionTitle : string
  postCardList : PostCardItemProps[]
}
/**
 * PostCardSection component
 * @description PostCardSection component is a post card section component that displays the post card section content
 * @returns {React.ReactNode}
 */
export default function PostCardSection({postSectionTitle, postCardList }: PostSectionType) {

  return (
    <div className="py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-text mb-2">{postSectionTitle}</h2>
        </div>
        
        {/* Post Cards Grid */}
        <PostCardList posts={postCardList} />

      </div>
    </div>
  )
}

