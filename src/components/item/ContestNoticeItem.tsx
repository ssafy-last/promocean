// frontend/src/components/item/ContestNoticeItem.tsx

import { ContestNoticeItemProps } from "@/types/itemType";
import { formatKoreanDate } from "@/utils/formatDate";

/**
 * ContestNoticeItem component
 * @description ContestNoticeItem component is a contest notice item component that displays the contest notice item content
 * @returns {React.ReactNode}
 */
export default function ContestNoticeItem({ noticeId, title, createdAt, updatedAt }: ContestNoticeItemProps) {
  const isUpdated = createdAt !== updatedAt;
  
  return (
    <div className="py-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer rounded-lg px-3 -mx-3">
      <div className="flex flex-col gap-2">
        {/* 제목 */}
        <h3 className="font-semibold text-gray-900 text-base hover:text-primary transition-colors">
          {title}
        </h3>
        
        {/* 날짜 정보 */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>작성일: {formatKoreanDate(createdAt)}</span>
          {isUpdated && (
            <>
              <span className="text-gray-300">|</span>
              <span>수정일: {formatKoreanDate(updatedAt)}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}