// frontend/src/components/list/ContestNoticeList.tsx

import { ContestNoticeItemProps } from "@/types/itemType";
import ContestNoticeItem from "@/components/item/ContestNoticeItem";

/**
 * ContestNoticeList component
 * @description ContestNoticeList component is a contest notice list component that displays the contest notice list content
 * @returns {React.ReactNode}
 */
export default function ContestNoticeList({ ContestNoticeList }: { ContestNoticeList: ContestNoticeItemProps[] }) {
  if (!ContestNoticeList || ContestNoticeList.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>등록된 공지사항이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border-gray-200 overflow-hidden">
      {ContestNoticeList.map((item) => (
        <ContestNoticeItem key={item.noticeId} {...item} />
      ))}
    </div>
  )
}