// frontend/src/components/section/CommunityPostDetailSection.tsx

import Image from "next/image";
import { CommunityPostItemProps } from "@/types/itemType";

/**
 * CommunityPostDetailSection component
 * @description CommunityPostDetailSection component is a community post detail section component that displays the community post detail section content
 * @returns {React.ReactNode}
 */
export default function CommunityPostDetailSection( { communityPostData }: { communityPostData: CommunityPostItemProps } ) {

  console.log(communityPostData.fileUrl);
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">

      {/* TODO : 레이아웃 변경 예정 */}
      <div className="flex flex-col gap-4">
        {/* 제목 */}
        <h1 className="text-3xl font-bold text-gray-900">
          {communityPostData.title}
        </h1>

        {/* 메타 정보: 카테고리, 타입, 작성일시 */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
            {communityPostData.category}
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
            {communityPostData.type}
          </span>
          <span className="text-gray-500">
            {new Date(communityPostData.createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>


        {/* 사용자 정보 */}
        <div className="flex items-center gap-2">
          {communityPostData.profileUrl ? (
            <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={communityPostData.profileUrl}
                alt={communityPostData.author}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs flex-shrink-0">
              🐥
            </div>
          )}
          <span className="text-sm font-medium text-gray-700">{communityPostData.author}</span>
        </div>

        {/* 구분선 */}
        <hr className="border-gray-200" />
      </div>

      
      {/* 게시글 내용 */}
      <div className="mt-8 space-y-6">
        {/* 설명 */}
        {communityPostData.description && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">설명</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{communityPostData.description}</p>
          </div>
        )}

        {/* 프롬프트 */}
        {communityPostData.prompt && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">프롬프트</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{communityPostData.prompt}</p>
          </div>
        )}

        {/* 샘플 질문/답변 */}
        {(communityPostData.sampleQuestion || communityPostData.sampleAnswer) && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">예시</h2>
            {communityPostData.sampleQuestion && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-sm font-medium text-blue-900 mb-1">질문</h3>
                <p className="text-gray-700">{communityPostData.sampleQuestion}</p>
              </div>
            )}
            {communityPostData.sampleAnswer && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="text-sm font-medium text-green-900 mb-1">답변</h3>
                <p className="text-gray-700">{communityPostData.sampleAnswer}</p>
              </div>
            )}
          </div>
        )}

        {/* 이미지 */}
        {communityPostData.fileUrl && (
          <div className="border-t border-gray-200 pt-6">
            <div className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={communityPostData.fileUrl}
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