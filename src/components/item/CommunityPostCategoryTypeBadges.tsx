// frontend/src/components/item/CommunityPostCategoryTypeBadges.tsx

import Tag from "@/components/icon/Tag";

interface CommunityPostCategoryTypeBadgesProps {
  category: string;
  type: string;
}

/**
 * CommunityPostCategoryTypeBadges component
 * @description CommunityPostCategoryTypeBadges component displays category and type badges with a tag icon
 * @returns {React.ReactNode}
 */
export default function CommunityPostCategoryTypeBadges({ category, type }: CommunityPostCategoryTypeBadgesProps) {
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="flex flex-row items-center gap-1">
        <Tag />
        <span className="text-gray-500">카테고리</span>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
          {category}
        </span>
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
          {type}
        </span>
      </div>
    </div>
  )
}

