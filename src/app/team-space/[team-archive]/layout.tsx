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
    const teamName = decodeURIComponent(resolvedParams['team-archive']);

        return(
            <div>
             <TeamSpaceHeader nickname={teamName}/>
             {children}
            </div>
        )
}