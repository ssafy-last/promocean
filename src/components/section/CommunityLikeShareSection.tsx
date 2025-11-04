// frontend/src/components/section/CommunityLikeShareSection.tsx

import Heart from "@/components/icon/Heart";
import Share from "@/components/icon/Share";
import ChatBubbleBottomCenterText from "@/components/icon/ChatBubbleBottomCenterText";

/**
 * CommunityLikeShareSection component
 * @description CommunityLikeShareSection component is a community like share section component that displays the community like share section content
 * @returns {React.ReactNode}
 */
export default function CommunityLikeShareSection( { likeCount , commentCount }: { likeCount: number, commentCount: number } ) {
  return (
    <div className="flex flex-row items-center justify-between">
      {/* 왼쪽: 좋아요, 댓글 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Heart />
          <span className="text-sm">{likeCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <ChatBubbleBottomCenterText />
          <span className="text-sm">{commentCount}</span>
        </div>
      </div>
      
      {/* 오른쪽: 공유하기 */}
      <div>
        <div className="flex items-center gap-1">
          <Share />
          <span className="text-sm">공유</span>
        </div>
      </div>
    </div>
  )
}