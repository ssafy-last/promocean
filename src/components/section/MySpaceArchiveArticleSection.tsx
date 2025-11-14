// frontend/src/components/section/CommunityPostDetailSection.tsx

import Image from "next/image";
import { CommunityPostItemProps, HashtagItemProps } from "@/types/itemType";
import CommunityHashtagSection from "@/components/section/CommunityHashtagSection";
import CommunityPostUserProfileItem from "@/components/item/CommunityPostUserProfileItem";
import CommunityPostCategoryTypeBadges from "@/components/item/CommunityPostCategoryTypeBadges";
import { ArticleData } from "@/types/apiTypes/space";


export interface SpaceArchiveArticleSectionProps {
    articleData : ArticleData;
    hashtagList : HashtagItemProps[];

}




/**
 * 마이 스페이스의 아카이브 글 상세 섹션 컴포넌트
 * @description MySpaceArchiveArticleSection component is a my space archive article detail section component that displays the my space archive article detail section content
 * @returns {React.ReactNode}
 */
export default function MySpaceArchiveArticleSection( { articleData, hashtagList } : SpaceArchiveArticleSectionProps ) {

  return (
    <div className="p-8">
      
      {/* 메타 데이터 섹션 */}
      <div className="flex flex-col gap-3 border-b border-gray-200 pb-5">

        {/* 제목 */}
        <div className="mb-3">
          <h1 className="text-3xl font-bold text-gray-900">
            {articleData.title}
          </h1>
        </div>
        
        {/* 해시태그, 카테고리/타입 및 사용자 정보 */}
        <div className="flex items-end justify-between">
          {/* 왼쪽: 해시태그, 카테고리/타입 */}
          <div className="flex flex-col gap-4">
            <CommunityHashtagSection hashtagList={hashtagList} />
            {/* <CommunityPostCategoryTypeBadges
              category={articleData.category}
              type={articleData.type}
            /> */}
          </div>

          {/* 오른쪽: 사용자 정보 및 날짜 */}
          {/* <CommunityPostUserProfileItem
            profileUrl={articleData.fileUrl}
            author={articleData.author}
            createdAt={articleData.updatedAt}
          /> */}
        </div>
      </div>
      
      {/* 게시글 내용 */}
      <div className="mt-8 space-y-6">
        {/* 설명 */}
        {articleData.description && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">설명</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{articleData.description}</p>
          </div>
        )}

        {/* 프롬프트 */}
        {articleData.prompt && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-1">프롬프트</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{articleData.prompt}</p>
          </div>
        )}

        {/* 샘플 질문/답변 */}
        {(articleData.sampleQuestion || articleData.sampleAnswer) && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">예시</h2>
            {articleData.sampleQuestion && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-sm font-medium text-blue-900 mb-1">질문</h3>
                <p className="text-gray-700">{articleData.sampleQuestion}</p>
              </div>
            )}
            {articleData.sampleAnswer && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="text-sm font-medium text-green-900 mb-1">답변</h3>
                <p className="text-gray-700">{articleData.sampleAnswer}</p>
              </div>
            )}
          </div>
        )}

        {/* 이미지 */}
        {articleData.fileUrl && (
          <div className="flex flex-row items-center justify-center">
            <div className="relative w-full max-w-2xl aspect-video overflow-hidden">
              <Image
                src={articleData.fileUrl}
                alt="첨부 이미지"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}