

  // frontend/src/app/layout.tsx
  
  import type { Metadata } from "next";
  import Sidebar from "@/components/layout/Sidebar";
  import { SidebarProvider } from "@/contexts/SidebarContext";
  import MySpaceHeader from "@/components/layout/SpaceHeader";
  import MySpaceTabs from "@/components/filter/MySpaceTabs";
import TeamSpaceHeader from "@/components/layout/TeamSpaceHeader";
  
  
  export default function TeamLayout({
      children
  }: Readonly<{children: React.ReactNode}>){
          return(
              <div>
                <TeamSpaceHeader 
                nickname={name||"팀 이름"} 
                coverImageUrl={coverImageUrl} 
                spaceId={spaceId}/>
               {children}
              </div>
          )
  }