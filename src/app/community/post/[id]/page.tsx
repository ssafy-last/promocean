// frontend/src/app/community/post/[id]/page.tsx

import CommunityHeader from "@/components/layout/CommunityHeader";
import CommunityFloatingSection from "@/components/section/CommunityFloatingSection";
import CommunityPostDetailSection from "@/components/section/CommunityPostDetailSection";
import CommunityHashtagSection from "@/components/section/CommunityHashtagSection";
import CommunityLikeShareSection from "@/components/section/CommunityLikeShareSection";
import CommunityCommentSection from "@/components/section/CommunityCommentSection";
import { CommunityFloatingItemProps, CommunityPostItemProps, HashtagItemProps } from "@/types/itemType";

/**
 * CommunityPostPage component
 * @description CommunityPostPage component is a community post page component that displays the community post page content
 * @returns {React.ReactNode}
 */
export default async function CommunityPostPage() {

  // Todo : 실제 API와 연동하기
  // 커뮤니티 화면  글 상세보기 화면에서 공통 레이아웃이므로 인기글 데이터를 공통으로 사용할 수 있습니다.
  // 추후 변경 예정
  const popularPostsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/PopularPost.json`,
    { cache: "no-store" }
  );
  const popularPosts: CommunityFloatingItemProps[] = await popularPostsRes.json();

  // Todo: 실제 API와 연동하기
  const communityPostDetailRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/CommunityPostDetailData.json`,
    { cache: "no-store" }
  );
  const communityPostData: CommunityPostItemProps = await communityPostDetailRes.json();
  const hashtagList: HashtagItemProps[] = communityPostData.tags.map(tag => ({ tag }));

  return (
    <div className="min-h-screen bg-gray-50">
      <CommunityHeader />
      <div className="max-w-7xl pl-8 pr-4 py-8 flex flex-row gap-6 relative">
        
        {/* 왼쪽: 글 및 댓글 섹션 */}
        <div className="flex-1 flex flex-col gap-6">

          {/* 글 섹션 */}
          <CommunityPostDetailSection />

          {/* 해시태그 섹션 */}
          <CommunityHashtagSection hashtagList={hashtagList} />

          {/* 좋아요 및 스크랩 섹션 */}
          <CommunityLikeShareSection likeCount={communityPostData.likeCnt} />

          {/* 댓글 섹션 */}
          <CommunityCommentSection />
        </div>

        {/* 오른쪽: 플로팅 섹션 */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <CommunityFloatingSection popularPosts={popularPosts} />
        </div>

      </div>
    </div>
  );
}
