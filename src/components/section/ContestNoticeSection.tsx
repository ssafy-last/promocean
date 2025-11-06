// frontend/src/components/section/ContestNoticeSection.tsx

import { ContestNoticeItemProps } from "@/types/itemType";
import ContestNoticeListComponent from "@/components/list/ContestNoticeList";

/**
 * ContestNoticeSection component
 * @description ContestNoticeSection component is a contest notice section component that displays the contest notice section content
 * @returns {React.ReactNode}
 */
export default function ContestNoticeSection({ ContestNoticeList }: { ContestNoticeList: ContestNoticeItemProps[] }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">공지사항</h2>
      <ContestNoticeListComponent ContestNoticeList={ContestNoticeList} />
    </div>
  )
}