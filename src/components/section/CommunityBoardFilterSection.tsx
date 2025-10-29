// frontend/src/components/section/CommunityBoardFilterSection.tsx

import ComboBox from '@/components/filter/ComboBox'
import SearchBar from '@/components/filter/SearchBar'

export default function CommunityBoardFilterSection() {
  return (
    <div className="flex flex-row gap-4">
      <ComboBox />
      <SearchBar />
    </div>
  );
}