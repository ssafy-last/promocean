import MySpaceTabs from "@/components/filter/MySpaceTabs";
import SearchBar from "@/components/filter/SearchBar";
import SpaceArchiveItem from "@/components/item/SpaceArchiveItem";
import MySpaceHeader from "@/components/layout/MySpaceHeader";
import SpaceCardHeader from "@/components/layout/SpaceCardHeader";
import SpaceArchiveList from "@/components/list/SpaceArchiveList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection";

export interface SpaceArchiveData{
  title:string,
  bgColor :string
}

// frontend/src/app/my-space/page.tsx
export default async function MySpacePage() {
  

  const mySpaceArchiveRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/MySpaceArchiveData.json`,
    { cache: "no-store" }
  );

  const mySpaceData = await mySpaceArchiveRes.json();
  console.log("data ",mySpaceData)

  const MockPinnedSpaceArchiveItemList = mySpaceData.pinned;
  const MockFolderSpaceArchiveItemList = mySpaceData.normal;

  // const MockPinnedSpaceArchiveItemList = [
  //   {title: "AI 챗봇", bgColor: "bg-blue-200"},
  //   {title: "이미지 생성", bgColor: "bg-[#0949ad]"},
  //   {title: "스파팸", bgColor: "bg-green-200"},
  //   {title: "카드 이름", bgColor: "bg-red-200"},
  //   {title: "바보", bgColor: "bg-purple-200"},
  // ]


  // const MockFolderSpaceArchiveItemList = [
  //   {title: "문서 작성", bgColor: "bg-yellow-200"},
  //   {title: "코드 생성", bgColor: "bg-pink-200"},
  //   {title: "데이터 분석", bgColor: "bg-teal-200"},
  //   {title: "프로젝트 관리", bgColor: "bg-indigo-200"},
  //   {title: "학습 도우미", bgColor: "bg-lime-200"},
  // ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-end-safe">
        <div className="shrink-0 min-w-[380px]">
          <MySpaceArchiveFilterSection/>
        </div>
      </div>

      <div className="flex justify-start p-4 w-full">
        <div className="w-full">
          <SpaceCardHeader title="Pinned"/>
          <SpaceArchiveList isPinnedList={true} archiveItemList={MockPinnedSpaceArchiveItemList}/>
        </div>
      </div>

      <div className="flex justify-start p-4 w-full">
        <div className="w-full">
          <SpaceCardHeader title="Folder"/>
          <SpaceArchiveList isPinnedList={false} archiveItemList={MockFolderSpaceArchiveItemList}/>
        </div>
      </div>
    </div>
  );
}