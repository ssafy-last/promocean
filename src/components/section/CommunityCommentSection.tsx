// frontend/src/components/section/CommunityCommentSection.tsx

import { CommunityCommentItemProps } from "@/types/itemType";
import CommunityCommentList from "@/components/list/CommunityCommentList";
import CommentForm from "@/components/form/CommentForm";

/**
 * CommunityCommentSection component
 * @description CommunityCommentSection component is a community comment section component that displays the community comment section content
 * @returns {React.ReactNode}
 */
export default function CommunityCommentSection( { communityCommentList }: { communityCommentList: CommunityCommentItemProps[] } ) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          댓글 작성
        </h3>
        <CommentForm />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          댓글 {communityCommentList.length}개
        </h3>
        <CommunityCommentList communityCommentList={communityCommentList} />
      </div>
    </div>
  )
}