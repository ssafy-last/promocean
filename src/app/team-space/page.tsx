import SearchBar from "@/components/filter/SearchBar";
import PlusCircle from "@/components/icon/PlusCircle";
import { TeamSpaceTeamChoiceItemProps } from "@/components/item/TeamSpaceTeamChoiceItem";
import SpaceHeader from "@/components/layout/SpaceHeader";
import TeamSpaceTeamChoiceList from "@/components/list/TeamSpaceTeamChoiceLlist";

// frontend/src/app/team-space/page.tsx
export default async function TeamSpacePage() {
  
  const teamSpaceArchiveRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/TeamSpaceData.json`,
    { cache: "no-store" }
  );

  const teamSpcaeTeamChoiceList : TeamSpaceTeamChoiceItemProps[] = await teamSpaceArchiveRes.json();
  

  return (
    <div>
        <SpaceHeader nickname="홍길동"/>
        
        <div className="min-h-screen bg-gray-50 py-5 px-4 flex flex-col">
        <div className="flex flex-row justify-between items-center mb-5">
        <button className="flex flex-row gap-1 font-medium text-2xl hover:text-primary transition-colors">
          <PlusCircle/>
          팀 생성
        </button>
        <SearchBar/>
        </div>
    {/* 팀 스페이스 아이템들 */}
      <TeamSpaceTeamChoiceList teamSpaceTeamChoiceList={teamSpcaeTeamChoiceList} />
      </div>

</div>
  );
}
