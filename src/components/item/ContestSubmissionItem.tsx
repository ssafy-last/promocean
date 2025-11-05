// frontend/src/components/item/ContestSubmissionItem.tsx

import Image from "next/image";
import { ContestSubmissionItemProps } from "@/types/itemType";
import Heart from "@/components/icon/Heart";

/**
 * ContestSubmissionItem component
 * @description ContestSubmissionItem component is a contest submission item component that displays the contest submission item content
 * @returns {React.ReactNode}
 */
export default function ContestSubmissionItem({ submissionId, author, profileUrl, description, type, submissionUrl, voteCnt }: ContestSubmissionItemProps) {
  const isValidProfileUrl = profileUrl && 
    profileUrl !== "..." && 
    profileUrl.trim() !== "" && 
    (profileUrl.startsWith("http") || profileUrl.startsWith("/") || profileUrl.startsWith("data:"));

  return (
    <div className="flex items-start justify-between w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-4 gap-4">
      {/* 왼쪽 : 이미지 영역 */}
      <div className="relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-gray-100">
        {submissionUrl ? (
          <Image
            src={submissionUrl}
            alt={description}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>
      
      {/* 중앙 : 게시글 정보 영역 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Description (Title) */}
        <h3 className="font-bold text-text text-base mb-4 line-clamp-1 group-hover:text-primary transition-colors">
          {description}
        </h3>

        {/* Type Badge */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
            {type}
          </span>
        </div>
      </div>

      {/* 오른쪽 : 유저 정보 및 아이콘 영역 */}
      <div className="flex flex-row items-center justify-between text-gray-600 flex-shrink-0 gap-4 self-end">
        {/* 유저 정보 */}
        <div className="flex items-center gap-2">
          {isValidProfileUrl ? (
            <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
              <Image src={profileUrl} alt={author} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs flex-shrink-0">
              🐥
            </div>
          )}
          <span className="text-sm font-medium text-gray-700">{author}</span>
        </div>

        {/* 아이콘들 (투표 수) */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 transition-colors">
            <Heart />
            <span className="text-sm">{voteCnt}</span>
          </div>
        </div>
      </div>
    </div>
  )
}