// frontend/src/app/page.tsx

import HeroSection from "@/components/section/HeroSection";
import PostCardSection from "@/components/section/PostCardSection";
import { PostCardItemProps, CommunityFloatingItemProps } from "@/types/itemType";
import { PostAPI } from "@/api/community";

/**
 * Home component
 * @description Home component is a home component that displays the home page content
 * @returns {React.ReactNode}
 */
export default async function Home() {

  const { popularPosts: popularPostsRaw } = await PostAPI.getPopular();
  
  // TODO : API 만들어야함?
  const popularPosts: PostCardItemProps[] = popularPostsRaw.map(item => ({
    postId: item.postId,
    title: item.title,
    hashtags: item.tags,
    category: "AI",
    likeCount: item.likeCnt,
    commentCount: item.replyCnt,
    image: item.fileUrl || "",
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