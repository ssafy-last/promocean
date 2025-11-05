// frontend/src/components/list/CommunityCommentList.tsx

import { CommunityCommentItemProps } from "@/types/itemType";
import CommunityCommentItem from "@/components/item/CommunityCommentItem";

/**
 * CommunityCommentList component
 * @description CommunityCommentList component is a community comment list component that displays the community comment list content
 * @returns {React.ReactNode}
 */
export default function CommunityCommentList( { communityCommentList }: { communityCommentList: CommunityCommentItemProps[] } ) {
  return (
    <div className="space-y-0">
      {communityCommentList.map((item, index) => (
        <CommunityCommentItem key={index} {...item} />
      ))}
    </div>
  )
}