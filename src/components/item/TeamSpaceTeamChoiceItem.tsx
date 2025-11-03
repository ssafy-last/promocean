'use client';

import { useRouter } from "next/navigation";

export interface TeamSpaceTeamChoiceItemProps {
    // Define props here if needed in the future
    image?: string;
    title?: string;
    description?: string;
}


export default function TeamSpaceTeamChoiceItem({
    image,
    title,
    description
} : TeamSpaceTeamChoiceItemProps) {

    const router = useRouter();
    const handleClick = () => {
        console.log("TeamSpaceTeamChoiceItem clicked");
        router.push('/team-space/'+title);
    }
    return(
           <button className="group flex flex-col h-60 rounded-2xl bg-primary hover:bg-primary/90 overflow-hidden transition-all duration-300 ease-out
           border-gray-400 
            hover:shadow-2xs
            hover:border-3
            hover:-translate-y-1 
            active:translate-y-0 
            active:shadow-md"
            
            onClick={handleClick}
            >
            {/* 이미지 영역 */}
            <image 
            className="shrink-0 h-32 flex justify-center items-center bg-accent text-white transition-all duration-300 
            group-hover:h-40">
                {image}
            </image>

            {/* 텍스트 영역 */}
            <div className="flex flex-col text-left items-start px-5 py-3 gap-1 flex-1 min-w-0 overflow-hidden">
                <div className="font-semibold text-2xl line-clamp-1 w-full wrap-break-words transition-colors group-hover:text-primary-foreground">
                {title}
                </div>
                
                <div className="text-xs leading-tight line-clamp-2 w-full wrap-break-words transition-opacity 
                group-hover:opacity-0">
                    {description}
                </div>
            </div>
    </button>
    )
}