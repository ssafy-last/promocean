import SpaceHeader from "@/components/layout/SpaceHeader";

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
             <SpaceHeader nickname={teamName}/>
             {children}
            </div>
        )
}