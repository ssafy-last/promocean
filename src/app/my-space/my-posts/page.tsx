// frontend/src/app/my-space/archive/[folder]/page.tsx

import MySpaceTabs from "@/components/filter/MySpaceTabs";
import SpaceArchiveBoardItem, { SpaceArchiveBoardItemProps } from "@/components/item/SpaceArchiveBoardItem";
import SpaceArchiveBoardList from "@/components/list/SpaceArchiveBoardList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection";


export default async function MySpaceMyPostPage() {
  const TitleName = "내가 쓴 글";


    const mySpaceBoardRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/CommunityBoardData.json`,
    { cache: "no-store" }
  );
  const mySpaceBoardList: SpaceArchiveBoardItemProps[] = await mySpaceBoardRes.json();

  return (

    <div className="min-h-screen bg-gray-50">

      <div className="flex justify-start max-w-6xl px-4 py-3 text-[40px] font-bold text-gray-900">
        <h1 className="text-[40px] font-bold text-gray-900">{TitleName}</h1>
      </div>

      <div className="flex justify-end-safe">
        <div className="shrink-0 min-w-[380px]">
          <MySpaceArchiveFilterSection buttonMode="write"/>
        </div>
      </div>

      <SpaceArchiveBoardList 
        mySpaceBoardList={mySpaceBoardList}
        />

    </div>

  );
}
