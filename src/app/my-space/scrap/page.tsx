import { SpaceScrapBoardItemProps } from "@/components/item/SpaceScrapBoardItem";
import SpaceScrapBoardList from "@/components/list/SpaceScrapBoardList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection"

// frontend/src/app/my-space/scrap/[id]/page.tsx
export default async function MySpaceScrapPage() {
  // 커뮤니티 게시판 데이터 fetch
  const communityBoardRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/CommunityBoardData.json`,
    { cache: "no-store" }
  );
  const spaceScrapBoardList: SpaceScrapBoardItemProps[] = await communityBoardRes.json();

return (

    <div className="min-h-screen bg-gray-50">
  
      <div className="flex justify-start max-w-6xl px-4 py-3 text-[40px] font-bold text-gray-900">
        <h1 className="text-[40px] font-bold text-gray-900">스크랩</h1>
      </div>
      <MySpaceArchiveFilterSection buttonMode="search"/>

      <SpaceScrapBoardList itemList={spaceScrapBoardList}/>
    </div>

  );
}
