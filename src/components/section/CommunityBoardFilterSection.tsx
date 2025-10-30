// frontend/src/components/section/CommunityBoardFilterSection.tsx

import ComboBox from "@/components/filter/ComboBox";
import SearchBar from "@/components/filter/SearchBar";

/**
 * CommunityBoardFilterSection component
 * @description CommunityBoardFilterSection component is a community board filter section component that displays the community board filter section content
 * @returns {React.ReactNode}
 */
export default function CommunityBoardFilterSection() {
  return (
    <div className="flex flex-row items-center justify-end gap-3 w-full px-4 py-4 bg-gray-50 border-gray-200">
      <ComboBox />
      <SearchBar />
    </div>
  );
}