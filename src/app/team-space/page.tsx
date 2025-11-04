import TeamSpaceAddButton from "@/components/button/TeamSpaceAddButton";
import SearchBar from "@/components/filter/SearchBar";
import { TeamSpaceTeamChoiceItemProps } from "@/components/item/TeamSpaceTeamChoiceItem";
import SpaceHeader from "@/components/layout/SpaceHeader";
import TeamSpaceTeamChoiceList from "@/components/list/TeamSpaceTeamChoiceLlist";
import TeamSpaceChoiceSection from "@/components/section/TeamSpaceChoiceSection";


// frontend/src/app/team-space/page.tsx
export default async function TeamSpacePage() {

  const teamSpaceArchiveRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/TeamSpaceData.json`,
    { cache: "no-store" }
  );

  const teamSpaceTeamChoiceList : TeamSpaceTeamChoiceItemProps[] = await teamSpaceArchiveRes.json();

  return (
    <div>
        <SpaceHeader nickname="홍길동"/>
        <TeamSpaceChoiceSection teamSpaceTeamChoiceList={teamSpaceTeamChoiceList}/>
    </div>
  );
}
