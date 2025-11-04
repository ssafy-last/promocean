// frontend/src/components/section/CommunityLikeShareSection.tsx

import Heart from "@/components/icon/Heart";
import Share from "@/components/icon/Share";
import Square2Stack from "@/components/icon/Square2Stack";

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
      
      {/* TODO : 복사, 저장 용어 및 아이콘 정리하기*/}

      {/* 복사하기 */}
      <div className="flex items-center gap-1">
        <Square2Stack />
        <span className="text-sm">복사</span>
      </div>

      {/* 저장하기 */}
      <div className="flex items-center gap-1">
        <Share />
        <span className="text-sm">저장</span>
      </div>
    </div>
  )
}