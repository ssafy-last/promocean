// frontend/src/components/item/CommunityFloatingItem.tsx

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CommunityFloatingItemProps } from '@/types/item'
import Heart from '../icon/Heart'
import ChatBubbleBottomCenterText from '../icon/ChatBubbleBottomCenterText'

export default function CommunityFloatingItem({ id, title, hashtags, image, likeCount, commentCount }: CommunityFloatingItemProps) {
  return (
    <Link href={`/community/${id}`} className="block group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-primary/20">
        {/* Image Section */}
        <div className="relative w-full h-32 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <div className="p-3">
          {/* Title */}
          <h3 className="font-semibold text-text text-sm mb-2 line-clamp-2 transition-colors group-hover:text-primary">
            {title}
          </h3>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {hashtags.map((tag, index) => (
              <span
                key={index}
                className="text-xs text-gray-500 hover:text-primary transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3">
            {/* Likes */}
            <div className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
              <Heart />
              <span className="text-xs font-medium">{likeCount}</span>
            </div>

            {/* Comments */}
            <div className="flex items-center gap-1 text-gray-500 hover:text-primary transition-colors">
              <ChatBubbleBottomCenterText />
              <span className="text-xs font-medium">{commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}