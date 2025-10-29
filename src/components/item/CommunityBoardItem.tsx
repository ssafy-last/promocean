// frontend/src/components/layout/CommunityBoardItem.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CommunityBoardItemProps } from "@/types/item";
import Heart from "@/components/icon/Heart";
import ChatBubbleBottomCenterText from "@/components/icon/ChatBubbleBottomCenterText";

export default function CommunityBoardItem({
  id,
  title,
  hashtags,
  category,
  likeCount,
  commentCount,
  image,
  userImage,
  userName,
}: CommunityBoardItemProps) {
  return (
    <Link
      href={`/community/${id}`}
      className="flex items-center justify-between w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-4"
    >
      {/* ✅ LEFT : 이미지 + 텍스트 */}
      <div className="flex items-start gap-4 min-w-0">
        {/* 썸네일 */}
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

        {/* 텍스트 영역 */}
        <div className="flex flex-col min-w-0">
          {/* 제목 */}
          <h3 className="font-bold text-text text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">
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
      </div>

      {/* ✅ RIGHT : 좋아요, 댓글, 유저정보 */}
      <div className="flex flex-col items-end justify-between h-full text-gray-600">
        {/* 좋아요/댓글 */}
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-1 hover:text-red-500 transition-colors">
            <Heart />
            <span className="text-sm">{likeCount}</span>
          </div>
          <div className="flex items-center gap-1 hover:text-primary transition-colors">
            <ChatBubbleBottomCenterText />
            <span className="text-sm">{commentCount}</span>
          </div>
        </div>

        {/* 유저 */}
        <div className="flex items-center gap-2">
          {userImage ? (
            <Image
              src={userImage}
              alt={userName}
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
          ) : (
            <span>🐥</span>
          )}
          <span className="text-sm font-medium text-gray-700">{userName}</span>
        </div>
      </div>
    </Link>
  );
}
