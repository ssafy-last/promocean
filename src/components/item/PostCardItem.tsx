// frontend/src/components/item/PostCardItem.tsx

import Image from 'next/image'
import Link from 'next/link'
import { PostCardItemProps } from '@/types/item'

/**
 * PostCardItem component
 * @description PostCardItem component is a post card item component that displays the post card item content
 * @returns {React.ReactNode}
 */
export default function PostCardItem({ id, title, hashtags, category, likeCount, commentCount, image }: PostCardItemProps) {
  return (
    <Link href={`/post/${id}`} className="block group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-primary/20">
        {/* Image Section */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
              {category}
            </span>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-text text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {/* Hashtags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {hashtags.map((tag, index) => (
              <span 
                key={index}
                className="text-sm text-gray-500 hover:text-primary transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Likes */}
              <div className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{likeCount}</span>
              </div>
              
              {/* Comments */}
              <div className="flex items-center gap-1 text-gray-500 hover:text-primary transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-sm font-medium">{commentCount}</span>
              </div>
            </div>
            
            {/* View More */}
            <div className="text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              자세히 보기 →
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}