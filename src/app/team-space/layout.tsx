// frontend/src/app/layout.tsx

import MySpaceHeader from "@/components/layout/SpaceHeader";


export default function TeamLayout({
    children
}: Readonly<{children: React.ReactNode}>){
        return(
            <div>
             <MySpaceHeader nickname="홍길동"/>
             {children}
            </div>
        )
}