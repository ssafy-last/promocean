// frontend/src/app/page.tsx

import HeroSection from "@/components/section/HeroSection";
import PostCardSection from "@/components/section/PostCardSection";
import { PostCardItemProps, CommunityFloatingItemProps } from "@/types/itemType";
import { CommunityAPI } from "@/api/community";

/**
 * Home component
 * @description Home component is a home component that displays the home page content
 * @returns {React.ReactNode}
 */
export default async function Home() {

  const { popularPosts: popularPostsRaw } = await CommunityAPI.getPopularPosts();
  
  // TODO : API 만들어야함?
  // CommunityFloatingItemProps를 PostCardItemProps로 변환
  const popularPosts: PostCardItemProps[] = (popularPostsRaw as CommunityFloatingItemProps[]).map(item => ({
    ...item,
    category: "AI", // 기본값 또는 실제 category 값
  }));

  return (
    <>
      <HeroSection />

      <PostCardSection
        postSectionTitle="인기 프롬프트"
        postCardList={popularPosts}
      />

      <PostCardSection
        postSectionTitle="추천 프롬프트"
        postCardList={popularPosts}
      />
    </>
  );
}