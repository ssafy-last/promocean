// frontend/src/components/layout/CommunityBoardItem.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CommunityBoardItemProps } from "@/types/itemType";
import Heart from "@/components/icon/Heart";
import ChatBubbleBottomCenterText from "@/components/icon/ChatBubbleBottomCenterText";

/**
 * CommunityBoardItem component
 * @description CommunityBoardItem component is a community board item component that displays the community board item content
 * @returns {React.ReactNode}
 */
export default function CommunityBoardItem({ id, title, hashtags, category, likeCount, commentCount, image, userImage, userName }: CommunityBoardItemProps) {
  return (
    <Link
      href={`/community/post/${id}`}
      className="flex items-start justify-between w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-4 gap-4"
    >
      {/* 왼쪽 : 이미지 영역 */}
      <div className="relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-gray-100">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>
      
      {/* 중앙 : 게시글 정보 영역 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 제목 */}
        <h3 className="font-bold text-text text-base mb-4 line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* 카테고리 + 해시태그 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
            {category}
          </span>
          <div className="flex flex-wrap gap-1 text-sm text-gray-500 truncate">
            {hashtags.map((tag, idx) => (
              <span
                key={idx}
                className="hover:text-primary cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 오른쪽 : 유저 정보 및 아이콘 영역 */}
      <div className="flex flex-row items-center justify-between text-gray-600 flex-shrink-0 gap-4 self-end">
        {/* 유저 정보 */}
        <div className="flex items-center gap-2">
          {userImage ? (
            <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={userImage}
                alt={userName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs flex-shrink-0">
              🐥 // Todo : 디폴트 이미지로 변경하기 (GPT 생성)
            </div>
          )}
          <span className="text-sm font-medium text-gray-700">{userName}</span>
        </div>

        {/* 아이콘들 (좋아요/댓글) */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 hover:text-red-500 transition-colors">
            <Heart />
            <span className="text-sm">{likeCount}</span>
          </div>
          <div className="flex items-center gap-1 hover:text-primary transition-colors">
            <ChatBubbleBottomCenterText />
            <span className="text-sm">{commentCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
