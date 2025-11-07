'use client'

import { useEffect, useState } from "react";
import MySpaceTabs from "@/components/filter/MySpaceTabs";
import SearchBar from "@/components/filter/SearchBar";
import SpaceArchiveItem from "@/components/item/SpaceArchiveItem";
import MySpaceHeader from "@/components/layout/SpaceHeader";
import SpaceCardHeader from "@/components/layout/SpaceCardHeader";
import SpaceArchiveList from "@/components/list/SpaceArchiveList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection";

export interface SpaceArchiveData {
  title: string;
  bgColor: string;
  isPinned: boolean;
}

/**
 * MySpaceArchiveDataResponse 인터페이스
 * @property {SpaceArchiveData[]} pinned - Pinned 항목들의 배열
 * @property {SpaceArchiveData[]} normal - Normal 항목들의 배열
 * 
 * (이런 식으로 dto를 묶어서 관리하는 게 항상 더 좋아요)
 * */
export interface MySpaceArchiveDataResponse{
  pinned: SpaceArchiveData[];
  normal: SpaceArchiveData[];
}



export default function MySpacePage() {
  const [archiveItemListState, setArchiveItemListState] = useState<SpaceArchiveData[]>([]);
  const [pinnedItemListState, setPinnedItemListState] = useState<SpaceArchiveData[]>([]);
  const [isLoadingState, setIsLoadingState] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        //TODO : 백엔드 API 연결 후 수정 필요
        const mySpaceArchiveRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/MySpaceArchiveData.json`,
          { cache: "no-store" }
        );

        const mySpaceData = await mySpaceArchiveRes.json() as MySpaceArchiveDataResponse;
        console.log("data ", mySpaceData);

        setPinnedItemListState(mySpaceData.pinned || []);
        setArchiveItemListState(mySpaceData.normal || []);
        setIsLoadingState(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setIsLoadingState(false);
      }
    };

    fetchData();
  }, []);

  if (isLoadingState) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-end-safe">
        <div className="shrink-0 min-w-[380px]">
          <MySpaceArchiveFilterSection buttonMode="search" />
        </div>
      </div>

      <div className="flex justify-start p-4 w-full">
        <div className="w-full">
          <SpaceCardHeader title="Pinned" />
          <SpaceArchiveList 
            isPinnedList={true}
            archiveItemListState={archiveItemListState}
            setArchiveItemListState={setArchiveItemListState}
            pinnedItemListState={pinnedItemListState}
            setPinnedItemListState={setPinnedItemListState}
          />
        </div>
      </div>

      <div className="flex justify-start p-4 w-full">
        <div className="w-full">
          <SpaceCardHeader title="Folder" />
          <SpaceArchiveList 
            isPinnedList={false}
            archiveItemListState={archiveItemListState}
            setArchiveItemListState={setArchiveItemListState}
            pinnedItemListState={pinnedItemListState}
            setPinnedItemListState={setPinnedItemListState}
          />
        </div>
      </div>
    </div>
  );
}