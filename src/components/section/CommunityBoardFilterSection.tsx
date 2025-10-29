// frontend/src/components/section/CommunityBoardFilterSection.tsx

import ComboBox from "@/components/filter/ComboBox";
import SearchBar from "@/components/filter/SearchBar";

export default function CommunityBoardFilterSection() {
  return (
    <div className="flex flex-row items-center justify-end gap-3 w-full px-4 py-4 bg-gray-50 border-b border-gray-200">
      <ComboBox />
      <SearchBar />
    </div>
  );
}