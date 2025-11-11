import SpaceAPI, { GetTeamSpaceListResponse } from "@/api/space";
import TeamSpaceAddButton from "@/components/button/TeamSpaceAddButton";
import SearchBar from "@/components/filter/SearchBar";
import { TeamSpaceChoiceItemProps } from "@/components/item/TeamSpaceTeamChoiceItem";
import SpaceHeader from "@/components/layout/SpaceHeader";
import TeamSpaceTeamChoiceList from "@/components/list/TeamSpaceTeamChoiceLlist";
import TeamSpaceChoiceSection from "@/components/section/TeamSpaceChoiceSection";


// frontend/src/app/team-space/page.tsx
export default async function TeamSpacePage() {

  // const teamSpaceArchiveRes = await SpaceAPI.getTeamSpaceList();

   const teamSpaceChoiceList : TeamSpaceChoiceItemProps[] = [] ;
  // teamSpaceArchiveRes?.spaces || [];
  
  return (
    <div>
        <SpaceHeader nickname="홍길동" isTeamSpace={true}/>
        <TeamSpaceChoiceSection teamSpaceChoiceList={teamSpaceChoiceList}/>
    </div>
  );
}
