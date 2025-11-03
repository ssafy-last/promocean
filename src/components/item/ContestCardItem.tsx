// frontend/src/components/item/ContestCardItem.tsx

import Image from 'next/image'
import Link from 'next/link'
import { ContestCardItemProps } from '@/types/itemType'

/**
 * ContestCardItem component
 * @description ContestCardItem component is a contest card item component that displays the contest card item content
 * @returns {React.ReactNode}
 */
export default function ContestCardItem({ id, title, image, participantCount, deadline, status, tags, startDate }: ContestCardItemProps) {
  const statusText = {
    SCHEDULED: '개최전',
    ONGOING: deadline ? `종료까지 D-${deadline}` : '진행중',
    VOTING: '투표중',
    FINISHED: '종료'
  }
  
  return (
    <Link href={`/contest/post/${id}`} className="block group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-primary/20">
        {/* Image Section */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Participant Badge */}
          <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
            {participantCount}명 참여중
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-text text-lg mb-2 line-clamp-2 transition-colors group-hover:text-primary">
            {title}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-sm text-gray-500 hover:text-primary transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* etc */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            {/* Status */}
            <span className={`text-xs font-medium ${
              status === 'ONGOING' ? 'text-primary' :
              status === 'VOTING' ? 'text-primary' :
              status === 'SCHEDULED' ? 'text-gray-500' :
              'text-gray-400'
            }`}>
              {statusText[status]}
            </span>

            {/* Date */}
            <span className="text-sm text-gray-500">{startDate}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

