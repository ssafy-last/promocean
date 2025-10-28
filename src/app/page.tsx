// frontend/src/app/page.tsx

import HeroSection from "@/components/section/HeroSection";
import PostCardSection from "@/components/section/PostCardSection";
import { PostCardItemProps } from "@/types/item";

/**
 * Home component
 * @description Home component is a home component that displays the home page content
 * @returns {React.ReactNode}
 */
export default async function Home() {

  // Todo : 실제 API와 연동하기
  const [popularRes, recommendedRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/PopularPost.json`, {
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/QNAPost.json`, {
      cache: "no-store",
    }),
  ]);

  const [popularPosts, recommendedPosts]: [PostCardItemProps[], PostCardItemProps[]] =
    await Promise.all([popularRes.json(), recommendedRes.json()]);

  return (
    <>
      <HeroSection />

      <PostCardSection
        postSectionTitle="인기 프롬프트"
        postCardList={popularPosts}
      />

      <PostCardSection
        postSectionTitle="추천 프롬프트"
        postCardList={recommendedPosts}
      />
    </>
  );
}