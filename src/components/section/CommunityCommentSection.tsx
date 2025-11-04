// frontend/src/components/section/CommunityCommentSection.tsx

import { CommunityCommentItemProps } from "@/types/itemType";
import CommunityCommentList from "@/components/list/CommunityCommentList";
import CommentForm from "@/components/form/CommentForm";
import ChatBubbleBottomCenterText from "@/components/icon/ChatBubbleBottomCenterText";

/**
 * CommunityCommentSection component
 * @description CommunityCommentSection component is a community comment section component that displays the community comment section content
 * @returns {React.ReactNode}
 */
export default function CommunityCommentSection( { communityCommentList }: { communityCommentList: CommunityCommentItemProps[] } ) {
  return (
    <div className="p-8 flex flex-col gap-6">

      {/* 댓글 목록 섹션 */}
      <div>
        <div className="flex flex-row items-center gap-2 mb-2">
          <ChatBubbleBottomCenterText />
          <h3 className="text-xl font-semibold text-gray-900">
            댓글 {communityCommentList.length}개
          </h3>
        </div>
        <CommunityCommentList communityCommentList={communityCommentList} />
      </div>

      {/* 댓글 작성 섹션 */}
      <div>
        <div className="flex flex-row items-center gap-2 mb-4">
          <ChatBubbleBottomCenterText />
          <h3 className="text-xl font-semibold text-gray-900">
            댓글 작성
          </h3>
        </div>
        <CommentForm />
      </div>
    </div>
  )
}