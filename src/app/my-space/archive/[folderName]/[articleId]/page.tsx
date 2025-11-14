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
export default function MySpaceArchiveArticlePage({ params }: SpaceArchiveArticlePageProps) {

    return (
      <div className="flex-1 flex flex-col gap-6 bg-white rounded-lg shadow-md">
        {/* 글 섹션 */}
        <MySpaceArchiveArticleSection  />
        {/* 구분선 */}
        <hr className="border-gray-200" />

      </div>
    );
  }
    // 404가 아닌 다른 에러는 error.tsx로 전

