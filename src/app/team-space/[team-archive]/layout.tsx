import SpaceHeader from "@/components/layout/SpaceHeader";
import TeamSpaceHeader from "@/components/layout/TeamSpaceHeader";

interface TeamDetailLayoutProps {
    params : { 'team-archive' : string },
    children : React.ReactNode
    
}

export default function TeamSpaceArchiveLayout({
    params,
    children
}: Readonly<TeamDetailLayoutProps>){

    const teamName = decodeURIComponent(params['team-archive']);

        return(
            <div>
             <TeamSpaceHeader nickname={teamName}/>
             {children}
            </div>
        )
}