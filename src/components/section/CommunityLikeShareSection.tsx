// frontend/src/components/section/CommunityLikeShareSection.tsx

import Heart from "@/components/icon/Heart";
import Bookmark from "@/components/icon/Bookmark";
import ArrayDownTray from "@/components/icon/ArrayDownTray";

/**
 * CommunityLikeShareSection component
 * @description CommunityLikeShareSection component is a community like share section component that displays the community like share section content
 * @returns {React.ReactNode}
 */
export default function CommunityLikeShareSection( { likeCount }: { likeCount: number } ) {
  return (
    <div className="flex flex-row items-center justify-center gap-8">

      {/* 좋아요, 댓글 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Heart />
          <span className="text-sm">{likeCount}</span>
        </div>
      </div>
      
      {/* 스크랩하기 */}
      <div className="flex items-center gap-1">
        <Bookmark className="size-6" />
        <span className="text-sm">스크랩</span>
      </div>

      {/* 아카이브하기 */}
      <div className="flex items-center gap-1">
        <ArrayDownTray />
        <span className="text-sm">아카이브</span>
      </div>
    </div>
  )
}