// frontend/src/app/layout.tsx

import type { Metadata } from "next";
import Sidebar from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";
import MySpaceHeader from "@/components/layout/MySpaceHeader";


export default function MyLayout({
    children
}: Readonly<{children: React.ReactNode}>){
 
        return(
            <html lang="ko">

             <body className="font-[Pretendard] bg-background text-text" suppressHydrationWarning>
             <MySpaceHeader nickname="홍길동둥"/>
             {children}
           </body>
    
        </html>

        )
}