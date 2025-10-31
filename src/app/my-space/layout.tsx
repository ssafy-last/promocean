// frontend/src/app/layout.tsx

import type { Metadata } from "next";
import Sidebar from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";
import MySpaceHeader from "@/components/layout/MySpaceHeader";


export default function MyLayout({
    children
}: Readonly<{children: React.ReactNode}>){
 
        return(
            <div>
             <MySpaceHeader nickname="홍길동둥"/>
             {children}
            </div>
        )
}