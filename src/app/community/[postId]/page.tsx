// frontend/src/app/community/[postId]/page.tsx

import CommunityHeader from "@/components/layout/CommunityHeader";
import CommunityFloatingSection from "@/components/section/CommunityFloatingSection";
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
 * @description CommunityPostPage component is a community post page component that displays the community post page content
 * @returns {React.ReactNode}
 */
export default async function CommunityPostPage({ params }: CommunityPostPageProps) {
  const { postId: postIdStr } = await params;
  const postId = parseInt(postIdStr);

  try {
    const [popularPostsResult, postDetailResult] = await Promise.allSettled([
      CommunityAPI.getPopularPosts(),
      CommunityAPI.getCommunityPostDetailData(postId),
    ]);

    // 게시글 상세 조회 실패 시 404 처리
    if (postDetailResult.status === 'rejected') {
      const error = postDetailResult.reason as Error;
      
      if (error.message.includes('404')) {
        // notFound()를 호출하면 not-found.tsx가 렌더링됨
        const { notFound } = await import('next/navigation');
        notFound();
      }
      throw error;
    }

    const { popularPosts } = popularPostsResult.status === 'fulfilled' 
      ? popularPostsResult.value 
      : { popularPosts: [] };
    const { communityPostDetailData } = postDetailResult.value;

    const hashtagList: HashtagItemProps[] = communityPostDetailData.tags.map(tag => ({ tag }));
    
    // API 응답의 profile을 profileUrl로 변환하여 컴포넌트에서 사용
    const communityPostData: CommunityPostItemProps = {
      postId: communityPostDetailData.postId,
      author: communityPostDetailData.author,
      profileUrl: communityPostDetailData.profile,
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
      profileUrl: item.profile,
      content: item.content,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
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
  } catch (error) {
    // 404가 아닌 다른 에러는 error.tsx로 전달
    throw error;
  }
}
