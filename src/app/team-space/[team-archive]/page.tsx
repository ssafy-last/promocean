'use client'

import { useEffect, useState } from "react";
import SpaceCardHeader from "@/components/layout/SpaceCardHeader";
import SpaceArchiveList from "@/components/list/SpaceArchiveList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection";
import { SpaceArchiveData } from "@/app/my-space/page";

export default function TeamSpaceArchivePage() {
  const [archiveItemListState, setArchiveItemListState] = useState<SpaceArchiveData[]>([]);
  const [pinnedItemListState, setPinnedItemListState] = useState<SpaceArchiveData[]>([]);
  const [isLoadingState, setIsLoadingState] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mySpaceArchiveRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/MySpaceArchiveData.json`,
          { cache: "no-store" }
        );

        const mySpaceData = await mySpaceArchiveRes.json();
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
          <MySpaceArchiveFilterSection buttonMode="search"/>
        </div>
      </div>

      <div className="flex justify-start p-4 w-full">
        <div className="w-full">
          <SpaceCardHeader title="Pinned"/>
          <SpaceArchiveList 
            isPinnedList={true}
            isTeamSpace={true}
            archiveItemListState={archiveItemListState}
            setArchiveItemListState={setArchiveItemListState}
            pinnedItemListState={pinnedItemListState}
            setPinnedItemListState={setPinnedItemListState}
          />
        </div>
      </div>

      <div className="flex justify-start p-4 w-full">
        <div className="w-full">
          <SpaceCardHeader title="Folder"/>
          <SpaceArchiveList 
            isPinnedList={false}
            isTeamSpace={true}
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