// frontend/src/app/community/post/[id]/page.tsx

import CommunityHeader from "@/components/layout/CommunityHeader";
import CommunityFloatingSection from "@/components/section/CommunityFloatingSection";
import CommunityPostDetailSection from "@/components/section/CommunityPostDetailSection";
import CommunityLikeShareSection from "@/components/section/CommunityLikeShareSection";
import CommunityCommentSection from "@/components/section/CommunityCommentSection";
import { CommunityPostItemProps, HashtagItemProps, CommunityCommentItemProps } from "@/types/itemType";
import { CommunityAPI } from "@/api/community";

interface CommunityPostPageProps {
  params: Promise<{ id: string }>;
}

/**
 * CommunityPostPage component
 * @description CommunityPostPage component is a community post page component that displays the community post page content
 * @returns {React.ReactNode}
 */
export default async function CommunityPostPage({ params }: CommunityPostPageProps) {
  const { id } = await params;
  const postId = parseInt(id);

  const { popularPosts } = await CommunityAPI.getPopularPosts();
  const { communityPostDetailData } = await CommunityAPI.getCommunityPostDetailData(postId);

  const hashtagList: HashtagItemProps[] = communityPostDetailData.tags.map(tag => ({ tag }));
  const communityPostData: CommunityPostItemProps = communityPostDetailData;
  const communityCommentList: CommunityCommentItemProps[] = communityPostDetailData.replies.map(item => ({
    author: item.author,
    profileUrl: item.profileUrl,
    content: item.content,
    createdAt: item.createdAt,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <CommunityHeader />
      <div className="max-w-7xl pl-8 pr-4 py-8 flex flex-row gap-6 relative">
        
        {/* 왼쪽: 글 및 댓글 섹션 */}
        <div className="flex-1 flex flex-col gap-6 bg-white rounded-lg shadow-md">

          {/* 글 섹션 */}
          <CommunityPostDetailSection communityPostData={communityPostData} hashtagList={hashtagList} />

          {/* 좋아요 및 스크랩 섹션 */}
          <CommunityLikeShareSection likeCount={communityPostDetailData.likeCnt}/>

          {/* 구분선 */}
          <hr className="border-gray-200" />

          {/* 댓글 섹션 */}
          <CommunityCommentSection communityCommentList={communityCommentList} />
        </div>

        {/* 오른쪽: 플로팅 섹션 */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <CommunityFloatingSection popularPosts={popularPosts} />
        </div>

      </div>
    </div>
  );
}
