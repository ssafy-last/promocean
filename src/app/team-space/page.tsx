import SearchBar from "@/components/filter/SearchBar";
import PlusCircle from "@/components/icon/PlusCircle";
import { TeamSpaceTeamChoiceItemProps } from "@/components/item/TeamSpaceTeamChoiceItem";
import SpaceHeader from "@/components/layout/SpaceHeader";
import TeamSpaceTeamChoiceList from "@/components/list/TeamSpaceTeamChoiceLlist";

// frontend/src/app/team-space/page.tsx
export default function TeamSpacePage() {
  const teamSpcaeTeamChoiceList : TeamSpaceTeamChoiceItemProps[] =[
    //임시 데이터
    {
      image: "/images/team-space/team1.png",
      title: "팀 스페이스 1",
      description: "팀 스페이스 1 설명입니다."
    },
    {
      image: "/images/team-space/team2.png",
      title: "팀 스페이스 2",
      description: "팀 스페이스 2 설명입니다."
    },
    {
      image: "/images/team-space/team3.png",
      title: "팀 스페이스 3",
      description: "팀 스페이스 3 설명입니다."
    },
    {
      image: "/images/team-space/team4.png",
      title: "팀 스페이스 4",
      description: "팀 스페이스 4 설명입니다."
    },
    {
      image: "/images/team-space/team1.png",
      title: "팀 스페이스 5",
      description: "팀 스페이스 5 설명입니다."
    },
    {
      image: "/images/team-space/team2.png",
      title: "팀 스페이스 6",
      description: "팀 스페이스 6 설명입니다."
    },
    ];
  

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
