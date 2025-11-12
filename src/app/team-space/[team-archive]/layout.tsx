import SpaceHeader from "@/components/layout/SpaceHeader";
import TeamSpaceHeader from "@/components/layout/TeamSpaceHeader";

interface TeamDetailLayoutProps {
    params : Promise<{ 'team-archive' : string }>,
    children : React.ReactNode

}

export default async function TeamSpaceArchiveLayout({
    params,
    children
}: Readonly<TeamDetailLayoutProps>){

    const resolvedParams = await params;
    const spaceId = Number(resolvedParams['team-archive']);
    console.log("teamName in layout:", spaceId);
        return(
            <div>
             <TeamSpaceHeader nickname={"팀 네임"} spaceId={spaceId}/>
             {children}
            </div>
        )
}