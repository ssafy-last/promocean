// frontend/src/components/section/CommunityBoardFilterSection.tsx

import CombinedSearchFilter from "@/components/filter/CombinedSearchFilter";
import { CommunityBoardItemProps } from "@/types/itemType";

interface CommunityBoardFilterSectionProps {
  onSearchResult?: (result: CommunityBoardItemProps[]) => void;
}

/**
 * CommunityBoardFilterSection component
 * @description 커뮤니티 게시글 검색 필터 컴포넌트
 * @param {CommunityBoardFilterSectionProps} props - 검색 결과 처리를 위한 콜백 함수
 * @returns {React.ReactNode}
 */
export default function CommunityBoardFilterSection({ onSearchResult }: CommunityBoardFilterSectionProps) {

  return (
    <div className="flex flex-row items-center justify-end gap-3 w-full px-4 py-4 bg-gray-50 border-gray-200">
      <CombinedSearchFilter onSearchResult={onSearchResult} />
    </div>
  );
}