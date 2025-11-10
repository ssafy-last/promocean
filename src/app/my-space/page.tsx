'use client'

import { useEffect, useState } from "react";
import MySpaceTabs from "@/components/filter/MySpaceTabs";
import SearchBar from "@/components/filter/SearchBar";
import SpaceArchiveItem from "@/components/item/SpaceArchiveItem";
import MySpaceHeader from "@/components/layout/SpaceHeader";
import SpaceCardHeader from "@/components/layout/SpaceCardHeader";
import SpaceArchiveList from "@/components/list/SpaceArchiveList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection";
import { useAuthStore } from "@/store/authStore";
import { SpaceAPI } from "@/api/space";

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

  //부분적 구독을 하고 싶으면 이런 구문을 쓰자.
  const personalSpaceId = useAuthStore((state)=>state.user?.personalSpaceId);
  

  useEffect(() => {
    const fetchData = async () => {
      try {

        const mySpaceArchiveRes = await SpaceAPI.getMySpaceArchiveFoldersData(personalSpaceId);
        
        if(mySpaceArchiveRes){ 
          return;
        }

          console.log("data!! ", mySpaceArchiveRes);

        //TODO :  가져온 response 를 pinned 와 none pinned로 나누어 리스트를 연결해야 합니다.

        // const mySpaceData = await mySpaceArchiveRes.json() as MySpaceArchiveDataResponse;
        // console.log("data ", mySpaceData);
        const pinned : SpaceArchiveData[] = [];
        const normal: SpaceArchiveData[] = [];
        setPinnedItemListState(pinned || []);
        setArchiveItemListState(normal || []);
        setIsLoadingState(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setIsLoadingState(false);
      }
    };

    fetchData();
  }, [personalSpaceId]);

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
            isTeamSpace={false}
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
            isTeamSpace={false}
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