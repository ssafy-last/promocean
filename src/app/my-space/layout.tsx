// frontend/src/app/layout.tsx

import MySpaceHeader from "@/components/layout/SpaceHeader";
import MySpaceTabs from "@/components/filter/MySpaceTabs";


export default function MyLayout({
    children
}: Readonly<{children: React.ReactNode}>){
        return(
            <div>
             <MySpaceHeader/>
             <MySpaceTabs/>
             {children}
            </div>
        )
}