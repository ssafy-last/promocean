// frontend/src/app/community/[postId]/page.tsx

import CommunityPostDetailSection from "@/components/section/CommunityPostDetailSection";
import CommunityLikeShareSection from "@/components/section/CommunityLikeShareSection";
import CommunityCommentSection from "@/components/section/CommunityCommentSection";
import { CommunityPostItemProps, HashtagItemProps, CommunityCommentItemProps } from "@/types/itemType";
import { CommunityAPI } from "@/api/community";

interface CommunityPostPageProps {
  params: Promise<{ postId: string }>;
}

/**
 * CommunityPostPage component
 * @description 커뮤니티 상세 게시글 화면입니다.
 * @returns {React.ReactNode}
 */
export default async function CommunityPostPage({ params }: CommunityPostPageProps) {
  const { postId: postIdStr } = await params;
  const postId = parseInt(postIdStr, 10);

  try {
    const { communityPostDetailData } = await CommunityAPI.getCommunityPostDetailData(postId);

    const hashtagList: HashtagItemProps[] = communityPostDetailData.tags.map(tag => ({ tag }));
    
    const communityPostData: CommunityPostItemProps = {
      postId: communityPostDetailData.postId,
      author: communityPostDetailData.author,
      profileUrl: communityPostDetailData.profileUrl,
      title: communityPostDetailData.title,
      description: communityPostDetailData.description,
      category: communityPostDetailData.category,
      prompt: communityPostDetailData.prompt,
      type: communityPostDetailData.type,
      sampleQuestion: communityPostDetailData.sampleQuestion,
      sampleAnswer: communityPostDetailData.sampleAnswer,
      fileUrl: communityPostDetailData.fileUrl,
      createdAt: communityPostDetailData.createdAt,
    };
    
    const communityCommentList: CommunityCommentItemProps[] = communityPostDetailData.replies.map(item => ({
      author: item.author,
      profileUrl: item.profileUrl,
      content: item.content,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return (
      <div className="flex-1 flex flex-col gap-6 bg-white rounded-lg shadow-md">
        {/* 글 섹션 */}
        <CommunityPostDetailSection communityPostData={communityPostData} hashtagList={hashtagList} />

        {/* 좋아요 및 스크랩 섹션 */}
        <CommunityLikeShareSection likeCount={communityPostDetailData.likeCnt}/>

        {/* 구분선 */}
        <hr className="border-gray-200" />

        {/* 댓글 섹션 */}
        <CommunityCommentSection communityCommentList={communityCommentList} postId={postId} />
      </div>
    );
  } catch (error) {
    // 404 에러 처리
    if (error instanceof Error && error.message.includes('404')) {
      const { notFound } = await import('next/navigation');
      notFound();
    }
    // 404가 아닌 다른 에러는 error.tsx로 전달
    throw error;
  }
}
