// frontend/src/components/item/CommunityHashtagItem.tsx

/**
 * CommunityHashtagItem component
 * @description CommunityHashtagItem component is a community hashtag item component that displays the community hashtag item content
 * @returns {React.ReactNode}
 */
export default function CommunityHashtagItem( { tag }: { tag: string } ) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs text-gray-500 bg-gray-100 hover:bg-primary hover:text-white transition-colors cursor-pointer">
      #{tag}
    </span>
  )
}