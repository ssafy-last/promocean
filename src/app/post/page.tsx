'use client';

// frontend/src/app/post/page.tsx

import { useSearchParams } from "next/navigation";
import PostingFloatingSection from "@/components/section/PostingFloatingSection";
import PostingWriteSection from "@/components/section/PostingWriteSection";
import PostingFooter from "@/components/layout/PostingFooter";
import PostingMetaFormSection from "@/components/section/PostingMetaFormSection";

/**
 * PostPage component
 * @description PostPage component is a post page component that displays the post page content
 * @returns {React.ReactNode}
 */
export default function PostPage() {

  const searchParams = useSearchParams();
  const postType = searchParams.get("type"); // Todo: postType에 렌더링 다르게 할 예정입니다. (community, article, contest)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">게시글 작성</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* 글 작성 컨테이너 */}
          <div className="lg:col-span-2 space-y-4">
            <PostingMetaFormSection />

            {/* 사용 프롬프트 */}
            <PostingWriteSection />

            {/* 예시 질문 프롬프트 */}
            <PostingWriteSection />

            {/* 답변 프롬프트 */}
            <PostingWriteSection />

            {/* 프롬프트 작성 완료 버튼 */}
            <PostingFooter />
          </div>

          {/* 플로팅 컨테이너 */}
          <div className="lg:col-span-1">

            {/* 카테고리 선택 */}
            <PostingFloatingSection />

            {/* 프롬프트 타입 */}
            <PostingFloatingSection />
          </div>
        </div>
      </div>
    </div>
  );
}