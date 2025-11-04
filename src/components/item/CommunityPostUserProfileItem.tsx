// frontend/src/components/item/CommunityPostUserProfileItem.tsx

import Image from "next/image";

interface CommunityPostUserProfileItemProps {
  profileUrl?: string;
  author: string;
  createdAt: string;
}

/**
 * CommunityPostUserProfileItem component
 * @description CommunityPostUserProfileItem component is a community post user profile item component that displays the user profile and date
 * @returns {React.ReactNode}
 */
export default function CommunityPostUserProfileItem({ profileUrl, author, createdAt }: CommunityPostUserProfileItemProps) {
  return (
    <div className="flex flex-row items-end gap-4">
      {/* 프로필 이미지 */}
      {profileUrl ? (
        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={profileUrl}
            alt={author}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs flex-shrink-0">
          🐥
        </div>
      )}
      {/* 작성자 및 날짜 */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">{author}</span>
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
    </div>
  )
}

