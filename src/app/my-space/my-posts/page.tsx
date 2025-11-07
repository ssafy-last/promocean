// frontend/src/app/my-space/archive/[folder]/page.tsx

import MySpaceTabs from "@/components/filter/MySpaceTabs";
import { SpaceArchiveBoardItemProps } from "@/components/item/SpaceArchiveBoardItem";
import { SpaceBoardHeader } from "@/components/layout/SpaceBoardHeader";
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

      <SpaceBoardHeader titleName={TitleName} description="지금까지 내가 쓴 글을 볼 수 있습니다." />

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
