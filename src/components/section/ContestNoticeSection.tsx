// frontend/src/components/section/ContestNoticeSection.tsx

import { ContestNoticeItemProps } from "@/types/itemType";
import ContestNoticeListComponent from "@/components/list/ContestNoticeList";
import ContestNoticeButtonSection from "@/components/section/ContestNoticeButtonSection";

/**
 * ContestNoticeSection component
 * @description ContestNoticeSection component is a contest notice section component that displays the contest notice section content
 * @returns {React.ReactNode}
 */
export default function ContestNoticeSection({ ContestNoticeList }: { ContestNoticeList: ContestNoticeItemProps[] }) {
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">공지사항</h2>
        <ContestNoticeButtonSection />
      </div>
      <ContestNoticeListComponent ContestNoticeList={ContestNoticeList} />
    </div>
  )
}