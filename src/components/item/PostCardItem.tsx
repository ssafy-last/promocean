// frontend/src/components/item/PostCardItem.tsx

import Image from 'next/image'
import Link from 'next/link'
import { CommunityFloatingItemProps } from '@/types/itemType'
import Heart from '../icon/Heart'
import ChatBubbleBottomCenterText from '../icon/ChatBubbleBottomCenterText'
import IconCount from '../etc/IconCount'
import { getPostImageUrl } from '@/utils/imageUtils'

/**
 * PostCardItem component
 * @description PostCardItem component is a post card item component that displays the post card item content
 * @returns {React.ReactNode}
 */
export default function PostCardItem({ postId, title, tags, category, likeCnt, replyCnt, fileUrl }: CommunityFloatingItemProps & { category: string }) {
  const imgUrl = getPostImageUrl(fileUrl, postId);
  const displayedTags = tags.slice(0, 3);
  const hiddenTagCount = tags.length - displayedTags.length;

  return (
    <Link href={`/community/${postId}`} className="block h-full group focus-visible:outline-none">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
        {/* Image Section */}
        <div className="relative w-full h-52 overflow-hidden">
          <Image
            src={imgUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/30 to-black/70 opacity-0 transition-opacity duration-500 group-hover:opacity-40" />

          {/* Category Badge */}
          <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary shadow-md backdrop-blur">
            {category}
          </span>

          {/* Floating Stats */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-gray-900/70 px-3 py-1.5 text-white shadow-lg backdrop-blur">
            <IconCount
              icon={<Heart className="size-4 fill-none stroke-white" />}
              count={likeCnt}
              textClassName="text-[11px] font-semibold text-white"
            />
            <span className="h-3 w-px bg-white/30" />
            <IconCount
              icon={<ChatBubbleBottomCenterText className="size-4 fill-none stroke-white" />}
              count={replyCnt}
              textClassName="text-[11px] font-semibold text-white"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col gap-4 p-5">
          <h3 className="text-lg font-semibold text-text transition-colors group-hover:text-primary line-clamp-2">
            {title}
          </h3>

          {/* Hashtags */}
          <div className="flex min-h-7 flex-wrap gap-2">
            {displayedTags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 transition-colors group-hover:bg-primary/10 group-hover:text-primary"
              >
                #{tag}
              </span>
            ))}
            {hiddenTagCount > 0 && (
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-400">
                +{hiddenTagCount}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 text-sm">
            <span className="font-medium text-gray-600">지금 인기글 보기</span>
            <span className="flex items-center gap-1 text-primary">
              <span className="text-xs font-semibold tracking-[0.2em]">GO</span>
              <svg
                className="size-4"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 4l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
