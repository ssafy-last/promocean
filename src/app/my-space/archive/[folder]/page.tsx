// frontend/src/app/my-space/archive/[folder]/page.tsx

import MySpaceTabs from "@/components/filter/MySpaceTabs";
import SpaceArchiveBoardItem, { SpaceArchiveBoardItemProps } from "@/components/item/SpaceArchiveBoardItem";
import SpaceArchiveBoardList from "@/components/list/SpaceArchiveBoardList";
import SpaceArchiveList from "@/components/list/SpaceArchiveList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection";


export interface MySpaceArchiveFolderPageProps {
  params : { folder : string }

}


export default async function MySpaceArchiveFolderPage({ params }: MySpaceArchiveFolderPageProps) {
  const folderName = decodeURIComponent(params.folder);
  // decodeURIComponent : URL에 인코딩된 문자열을 원래 문자열로 디코딩하는 함수
  // 예를 들어, "AI%20챗봇"이라는 제목은 "AI 챗봇"으로 디코딩됩니다. 
  // encodeURIComponent를 쓴 문자열에 대해선 꼭 해줘야 함.

    const mySpaceBoardRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/CommunityBoardData.json`,
    { cache: "no-store" }
  );
  const mySpaceBoardList: SpaceArchiveBoardItemProps[] = await mySpaceBoardRes.json();

  return (

    <div className="min-h-screen bg-gray-50">

      <div className="flex justify-start max-w-6xl px-4 py-3 text-[40px] font-bold text-gray-900">
        <h1 className="text-[40px] font-bold text-gray-900">{folderName}</h1>
      </div>

      <div className="flex justify-end-safe">
        <div className="shrink-0 min-w-[380px]">
          <MySpaceArchiveFilterSection/>
        </div>
      </div>

      <SpaceArchiveBoardList 
        mySpaceBoardList={mySpaceBoardList}
        />

    </div>

  );
}
