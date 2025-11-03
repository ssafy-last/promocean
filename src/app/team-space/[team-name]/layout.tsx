import SpaceHeader from "@/components/layout/SpaceHeader";

interface TeamDetailLayoutProps {
    params : { 'team-name' : string },
    children : React.ReactNode
    
}

export default function TeamDetailLayout({
    params,
    children
}: Readonly<TeamDetailLayoutProps>){

    const teamName = decodeURIComponent(params['team-name']);

        return(
            <div>
             <SpaceHeader nickname={teamName}/>
             {children}
            </div>
        )
}