"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CommunityBoardItemProps } from "@/types/itemType";
import Heart from "@/components/icon/Heart";
import ChatBubbleBottomCenterText from "@/components/icon/ChatBubbleBottomCenterText";

export interface SpaceScrapItemProps extends CommunityBoardItemProps {
}

/**
 * SpaceScrapItem component
 * @description 스크랩 페이지의 카드 형태 아이템 컴포넌트
 * 핀터레스트/인스타그램 스타일의 그리드 카드로 표시됩니다.
 * @returns {React.ReactNode}
 */
export default function SpaceScrapItem({
    id,
    title,
    hashtags,
    category,
    likeCount,
    commentCount,
    image,
    userImage,
    userName
}: SpaceScrapItemProps) {
    return (
        <Link
            href={`/community/${id}`}
            className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl
                transition-all duration-300 overflow-hidden border border-gray-100
                hover:-translate-y-1 active:translate-y-0"
        >
            {/* 썸네일 이미지 영역 */}
            <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}

                {/* 카테고리 배지 - 이미지 위 좌측 상단 */}
                <div className="absolute top-3 left-3">
                    <span className="bg-white/95 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                        {category}
                    </span>
                </div>

                {/* 좋아요/댓글 - 이미지 위 우측 하단 */}
                <div className="absolute bottom-3 right-3 flex items-center gap-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <div className="flex items-center gap-1 text-white">
                        <Heart className="w-4 h-4 fill-white" />
                        <span className="text-xs font-medium">{likeCount}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white">
                        <ChatBubbleBottomCenterText className="w-4 h-4" />
                        <span className="text-xs font-medium">{commentCount}</span>
                    </div>
                </div>
            </div>

            {/* 컨텐츠 영역 */}
            <div className="flex flex-col p-4 gap-3">
                {/* 제목 */}
                <h3 className="font-bold text-text text-base line-clamp-2 group-hover:text-primary transition-colors min-h-[3rem]">
                    {title}
                </h3>

                {/* 해시태그 */}
                <div className="flex flex-wrap gap-1.5">
                    {hashtags.slice(0, 3).map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-xs text-gray-600 hover:text-primary cursor-pointer transition-colors"
                        >
                            #{tag}
                        </span>
                    ))}
                    {hashtags.length > 3 && (
                        <span className="text-xs text-gray-400">
                            +{hashtags.length - 3}
                        </span>
                    )}
                </div>

                {/* 작성자 정보 */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    {userImage ? (
                        <Image
                            src={userImage}
                            alt={userName}
                            width={28}
                            height={28}
                            className="rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                            <span className="text-sm">🐥</span>
                        </div>
                    )}
                    <span className="text-sm font-medium text-gray-700 truncate">
                        {userName}
                    </span>
                </div>
            </div>
        </Link>
    );
}
