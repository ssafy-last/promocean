// frontend/src/app/community/[postId]/page.tsx

import { HashtagItemProps} from "@/types/itemType";

import SpaceAPI from "@/api/space";
import { ArticleData } from "@/types/apiTypes/space";
import MySpaceArchiveArticleSection from "@/components/section/MySpaceArchiveArticleSection";
import { cookies } from "next/headers";

interface SpaceArchiveArticlePageProps {
  params: Promise<{ articleId: string }>;
}

/**
 * SpaceArchiveArticlePage component
 * @description 스페이스의 아카이브 글 상세 페이지입니다.
 * @returns {React.ReactNode}
 */
export default async function TeamSpaceArchiveArticlePage({ params }: SpaceArchiveArticlePageProps) {
  const {  articleId : articleParams } = await params;
  const articleId = parseInt(articleParams, 10);
  const spaceId =  Number(await (await cookies()).get("spaceId")?.value) || -1;

  try {
    const articleData : ArticleData | null = await SpaceAPI.getArchiveArticleDetail(spaceId, articleId);

    const hashtagList: HashtagItemProps[] = articleData!.tags.map((tag: string) => ({ tag }));
    
  

    return (
      <div className="flex-1 flex flex-col gap-6 bg-white rounded-lg shadow-md">
        {/* 글 섹션 */}
        <MySpaceArchiveArticleSection />
        {/* 구분선 */}
        <hr className="border-gray-200" />

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
