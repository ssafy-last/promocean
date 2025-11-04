// frontend/src/components/item/CommunityCommentItem.tsx

import Image from "next/image";
import { CommunityCommentItemProps } from "@/types/itemType";

/**
 * CommunityCommentItem component
 * @description CommunityCommentItem component is a community comment item component that displays the community comment item content
 * @returns {React.ReactNode}
 */
export default function CommunityCommentItem( { author, profileUrl, content, createdAt }: CommunityCommentItemProps ) {
  return (
    <div className="py-4 border-b border-gray-200 last:border-b-0">
      <div className="flex gap-3">
        {/* 프로필 이미지 */}
        <div className="flex-shrink-0">
          {profileUrl ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={profileUrl}
                alt={author}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm flex-shrink-0">
              🐥
            </div>
          )}
        </div>

        {/* 댓글 내용 */}
        <div className="flex-1 min-w-0">
          {/* 작성자 정보 */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-gray-900 text-sm">{author}</span>
            <span className="text-xs text-gray-500">
              {new Date(createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          
          {/* 댓글 텍스트 */}
          <p className="text-gray-700 text-sm whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    </div>
  )
}