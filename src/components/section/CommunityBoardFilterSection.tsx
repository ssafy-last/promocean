// frontend/src/components/section/CommunityBoardFilterSection.tsx

import CombinedSearchFilter from "@/components/filter/CombinedSearchFilter";

/**
 * CommunityBoardFilterSection component
 * @description 커뮤니티 게시글 검색 필터 컴포넌트
 * @returns {React.ReactNode}
 */
export default function CommunityBoardFilterSection() {
  return (
    <div className="flex flex-row items-center justify-end gap-3 w-full px-4 py-4 bg-gray-50 border-gray-200">
      <CombinedSearchFilter />
    </div>
  );
}