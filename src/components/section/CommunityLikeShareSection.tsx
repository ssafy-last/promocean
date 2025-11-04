// frontend/src/components/section/CommunityLikeShareSection.tsx

import Heart from "@/components/icon/Heart";
import Share from "@/components/icon/Share";

/**
 * CommunityLikeShareSection component
 * @description CommunityLikeShareSection component is a community like share section component that displays the community like share section content
 * @returns {React.ReactNode}
 */
export default function CommunityLikeShareSection( { likeCount }: { likeCount: number } ) {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="flex items-center gap-1">
        <Heart />
        <span className="text-sm">{likeCount}</span>
      </div>
      <Share />
    </div>
  )
}