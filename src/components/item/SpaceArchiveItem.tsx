"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Bookmark from "../icon/Bookmark";

export interface SpaceArchiveItemProps {
    title: string;
    bgColor : string;
}

export default function SpaceArchiveItem({ title, bgColor }: SpaceArchiveItemProps) {

    const router = useRouter();
    const [isPinnedState, setIsPinnedState] = useState(false);

    const handleArchiveRoute = () => {
        console.log(`${title} 아카이브 아이템 클릭됨`);
        router.push('/my-space/archive/' + encodeURIComponent(title));
    }

    const handlePinnedClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation(); // 이벤트 전파 방지
        setIsPinnedState(!isPinnedState);
        console.log(`${title} 아카이브 폴더 pinned 설정 클릭됨`);
    }
return (
    <button
        className={`
            w-40 h-60 relative ${bgColor} rounded-[10px]
            shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] overflow-hidden
            transition-all duration-200 ease-in-out
            hover:-translate-y-1 hover:brightness-105 hover:shadow-lg
            active:translate-y-0 active:scale-95 active:shadow-sm
        `}
        onClick={handleArchiveRoute}
    >
        <div className="w-full h-20 p-2.5 left-0 top-40 absolute bg-white inline-flex justify-center items-center">
            <div className="text-center justify-center text-(--text-color) text-2xl font-medium leading-9">
                {title}
            </div>
        </div>

        <div className="w-6 h-6 absolute top-[0.8rem] right-[0.8rem]" onClick={(e) => e.stopPropagation()}>
            <label className="relative block w-6 h-6 cursor-pointer">
                <input
                    type="checkbox"
                    checked={isPinnedState}
                    className="absolute opacity-0 w-7 h-7 cursor-pointer"
                    aria-label={`${title} 아카이브 폴더 pinned 설정`}
                    onChange={handlePinnedClick}
                />
                <Bookmark 
                    className={`w-7 h-7 transition-all duration-200
                                ${isPinnedState 
                                    ? 'fill-yellow-400 stroke-yellow-500' 
                                    : 'fill-none stroke-gray-800'
                                }`}
                />
            </label>
        </div>
    </button>
);
}