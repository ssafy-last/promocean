"use client";

// frontend/src/components/filter/CombinedSearchFilter.tsx

import { useState } from "react";
import ChevronDown from "@/components/icon/ChevronDown";
import MagnifyingGlass from "@/components/icon/MagnifyingGlass";
import Funnel from "@/components/icon/Funnel";
import { CommunityAPI } from "@/api/community";
import { useSearchParams } from "next/navigation";
import { CommunityBoardItemProps } from "@/types/itemType";

interface CombinedSearchFilterProps {
  onSearchResult?: (result: CommunityBoardItemProps[]) => void;
}

/**
 * CombinedSearchFilter component
 * @description 드롭다운과 검색바가 통합된 컴포넌트입니다.
 * @param {CombinedSearchFilterProps} props - The props for the CombinedSearchFilter component
 * @returns {React.ReactNode}
*/
export default function CombinedSearchFilter({ onSearchResult }: CombinedSearchFilterProps) {

  // search Parmas, sorter Parmas
  const searchOptions = ["전체", "제목", "작성자", "내용", "태그"];
  const sorterOptions = {"latest": "최신순", "oldest": "오래된 순", "popular": "인기순"};
  const searchParams = useSearchParams();


  const [selectedSorter, setSelectedSorter] = useState(searchParams.get("sorter") || "latest");
  const [isSorterOpen, setIsSorterOpen] = useState(false);
  const [selected, setSelected] = useState("전체");
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  // 전체 -> author title tag 적용 x
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // 쿼리 파라미터에서 category 가져오기
    const category = searchParams.get("category") || undefined;

    // API 호출 파라미터 구성 (page, size는 API에서 디폴트값으로 처리)
    const params: {
      category?: string;
      sorter?: string;
      author?: string;
      title?: string;
      tag?: string;
    } = {};

    // category가 있으면 추가
    if (category) {
      params.category = category;
    }

    // sorter가 선택되어 있으면 추가
    if (selectedSorter) {
      params.sorter = selectedSorter;
    }

    // 전체 조회가 아닐 때만 검색 파라미터 추가
    if (selected !== "전체" && keyword.trim()) {
      switch (selected) {
        case "제목":
          params.title = keyword.trim();
          break;
        case "작성자":
          params.author = keyword.trim();
          break;
        case "태그":
          params.tag = keyword.trim();
          break;
      }
    }

    CommunityAPI.getCommunityBoardList(params).then((res) => {
      if (onSearchResult) {
        onSearchResult(res.communityBoardList);
      }
    });
  };

  return (
    <div className="relative">
      <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden">
        {/* 왼쪽: 정렬 필터 */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsSorterOpen((prev) => !prev)}
            className="flex items-center justify-between w-28 px-3 py-2 text-sm hover:bg-gray-50 border-r border-gray-300"
          >
            <span>{selectedSorter ? sorterOptions[selectedSorter as keyof typeof sorterOptions] : "최신순"}</span>
            <Funnel />
          </button>
        </div>
        {/* 중앙: 드롭다운 */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center justify-between w-28 px-3 py-2 text-sm hover:bg-gray-50 border-r border-gray-300"
          >
            <span>{selected}</span>
            <ChevronDown />
          </button>
        </div>

        {/* 오른쪽: 검색바 */}
        <form
          onSubmit={handleSearch}
          className="flex items-center flex-grow px-3 py-2"
        >
          <input
            type="text"
            placeholder="검색어 입력"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-grow text-sm bg-transparent focus:outline-none ml-2"
          />
          <button
            type="submit"
            className="cursor-pointer"
            aria-label="검색"
          >
            <MagnifyingGlass />
          </button>
        </form>
      </div>

      {/* 정렬 필터 드롭다운 메뉴 */}
      {isSorterOpen && (
        <ul className="absolute left-0 top-full mt-1 w-28 border border-gray-200 bg-white rounded-md shadow-md z-10">
          {Object.entries(sorterOptions).map(([key, value]) => (
            <li
              key={key}
              onClick={() => {
                setSelectedSorter(key);
                setIsSorterOpen(false);
              }}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                key === selectedSorter ? "text-primary" : "text-gray-700"
              }`}
            >
              {value}
            </li>
          ))}
        </ul>
      )}

      {/* 검색 옵션 드롭다운 메뉴 */}
      {isOpen && (
        <ul className="absolute left-28 top-full mt-1 w-28 border border-gray-200 bg-white rounded-md shadow-md z-10">
          {searchOptions.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                setSelected(opt);
                setIsOpen(false);
              }}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                opt === selected ? "text-primary" : "text-gray-700"
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

