'use client';

// frontend/src/components/section/CommunityBoardFilterSection.tsx

import ComboBox from "@/components/filter/ComboBox";
import SearchBar from "@/components/filter/SearchBar";
import { useRouter } from "next/navigation";

/**
 * MySpaceArchiveFilterSectionProps 인터페이스
 * @description MySpaceArchiveFilterSection component의 props입니다.
 *
 * @property { "search" | "write" } buttonMode - 필터 섹션의 버튼 모드를 지정합니다.
 * - search : 카테고리 검색 버튼을 나타냅니다.
 * - write : 글 쓰기 버튼을 나타냅니다.
 */
export interface MySpaceArchiveFilterSectionProps{
  buttonMode : "search" | "write"
}


/**
 *  MySpaceArchiveFilterSection 컴포넌트
 * @description CommunityBoardFilterSection component is a community board filter section component that displays the community board filter section content
 * @returns {React.ReactNode}
 */
export default function MySpaceArchiveFilterSection({buttonMode} : MySpaceArchiveFilterSectionProps) {

  const router = useRouter();
  const handleArchiveSearch = () => {
    console.log("카테고리 검색 클릭");
  }

  const handleArchiveBoardWrite = () =>{
    console.log("글 쓰기");
  }

  return (
    <div className="flex flex-row items-center justify-end gap-3 w-full px-4 py-4 bg-gray-50 border-gray-200">
      <ComboBox />
      <SearchBar />

      {/* Todo: 게시글 작성 컴포넌트 분리 */}
      <button
        type="button"
        className="px-4 py-2 rounded-md bg-primary text-white font-medium hover:brightness-110 active:brightness-95 transition-colors"
        onClick={buttonMode=="search" ? handleArchiveSearch : handleArchiveBoardWrite}
      >
        {buttonMode == "search" ? "카테고리 검색" : "글 쓰기"}
      </button>
    </div>
  );
}