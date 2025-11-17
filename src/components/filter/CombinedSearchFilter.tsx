"use client";

// frontend/src/components/filter/CombinedSearchFilter.tsx

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ChevronDown from "@/components/icon/ChevronDown";
import MagnifyingGlass from "@/components/icon/MagnifyingGlass";
import Funnel from "@/components/icon/Funnel";

/**
 * CombinedSearchFilter component
 * @description 드롭다운과 검색바가 통합된 컴포넌트입니다.
 * @param {CombinedSearchFilterProps} props - The props for the CombinedSearchFilter component
 * @returns {React.ReactNode}
*/
export default function CombinedSearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // search Parmas, sorter Parmas
  const searchOptions = ["전체", "제목", "작성자", "내용", "태그"];
  const sorterOptions = {"latest": "최신순", "oldest": "오래된 순", "popular": "인기순"};

  const [selectedSorter, setSelectedSorter] = useState(searchParams.get("sorter") || "latest");
  const [isSorterOpen, setIsSorterOpen] = useState(false);
  const [selected, setSelected] = useState("전체");
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  // 쿼리 파라미터로 라우팅
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // 기존 쿼리 파라미터 가져오기
    const category = searchParams.get("category");
    
    // 새로운 쿼리 파라미터 구성
    const params = new URLSearchParams();
    
    // category 유지
    if (category) {
      params.set("category", category);
    }
    
    // sorter 추가
    if (selectedSorter) {
      params.set("sorter", selectedSorter);
    }
    
    // 검색 파라미터 추가 (전체가 아닐 때만)
    if (selected !== "전체" && keyword.trim()) {
      switch (selected) {
        case "제목":
          params.set("title", keyword.trim());
          break;
        case "작성자":
          params.set("author", keyword.trim());
          break;
        case "태그":
          params.set("tag", keyword.trim());
          break;
      }
    }

    // page는 1로 리셋 (검색 시 첫 페이지로)
    params.set("page", "1");

    router.push(`/community?${params.toString()}`);
  };

  return (
    <div className="relative max-w-lg">
      <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden h-8">
        {/* 왼쪽: 정렬 필터 */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsSorterOpen((prev) => !prev)}
            className="flex items-center justify-between w-24 px-3 py-1 text-xs hover:bg-gray-50 border-r border-gray-300 h-full"
          >
            <span>{selectedSorter ? sorterOptions[selectedSorter as keyof typeof sorterOptions] : "최신순"}</span>
            <Funnel className="size-4" />
          </button>
        </div>
        {/* 중앙: 드롭다운 */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center justify-between w-24 px-3 py-1 text-xs hover:bg-gray-50 border-r border-gray-300 h-full"
          >
            <span>{selected}</span>
            <ChevronDown className="size-4"/>
          </button>
        </div>

        {/* 오른쪽: 검색바 */}
        <form
          onSubmit={handleSearch}
          className="flex items-center flex-grow px-3 py-1 h-full"
        >
          <input
            type="text"
            placeholder="검색어 입력"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-grow text-xs bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="cursor-pointer"
            aria-label="검색"
          >
            <MagnifyingGlass className="size-4" />
          </button>
        </form>
      </div>

      {/* 정렬 필터 드롭다운 메뉴 */}
      {isSorterOpen && (
        <ul className="absolute left-0 top-full mt-1 w-24 border border-gray-200 bg-white rounded-md shadow-md z-10">
          {Object.entries(sorterOptions).map(([key, value]) => (
            <li
              key={key}
              onClick={() => {
                setSelectedSorter(key);
                setIsSorterOpen(false);
                // 정렬 변경 시 즉시 라우팅
                const params = new URLSearchParams();
                const category = searchParams.get("category");
                if (category) params.set("category", category);
                params.set("sorter", key);
                params.set("page", "1");
                router.push(`/community?${params.toString()}`);
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
        <ul className="absolute left-24 top-full mt-1 w-24 border border-gray-200 bg-white rounded-md shadow-md z-10">
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

