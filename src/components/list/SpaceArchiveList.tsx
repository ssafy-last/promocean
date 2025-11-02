'use client'

import { useEffect, useRef, useState } from "react";
import SpaceArchiveItem from "../item/SpaceArchiveItem";

interface SpaceArchiveListProps {
  isPinnedList?: boolean;
  archiveItemList?: { title: string; bgColor: string }[];
}

const interactiveBtnClasses = `
  w-40 h-60 relative rounded-[20px]
  shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] overflow-hidden
  transition-all duration-200 ease-in-out
  hover:-translate-y-1 hover:brightness-105 hover:shadow-lg
  active:translate-y-0 active:scale-95 active:shadow-sm
`;

export default function SpaceArchiveList({ isPinnedList, archiveItemList }: SpaceArchiveListProps) {
    const [isModalOpenState, setIsModalOpenState] = useState(false);
    const modalRef = useRef<HTMLDivElement | null> (null);
    
    const onOpenModal = () => {
        setIsModalOpenState(true);
    }

    useEffect(()=>{
        console.log("open state : ", isModalOpenState)
    },[isModalOpenState])

    return (
    <div className="flex flex-row p-7 gap-4">
      {isPinnedList ? (
        <button
          className={`${interactiveBtnClasses} bg-white outline-2 outline-dodger-blue-11`}
          aria-label="모든 프롬프트 보기"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-black text-3xl font-medium leading-9">
              모든<br />프롬프트
            </div>
          </div>
        </button>
      ) : (
        <button
          className={`${interactiveBtnClasses} bg-white outline-2 outline-dodger-blue-11`}
          aria-label="새 항목 추가"
        onClick={onOpenModal}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-black text-5xl font-medium leading-9">+</div>
          </div>
        </button>
      )}

      {archiveItemList?.map((item, index) => (
        <SpaceArchiveItem key={index} title={item.title} bgColor={item.bgColor} />
      ))}


      {isModalOpenState && (
        <div className="fixed flex inset-0 z-10 w-full h-full bg-black/40  backdrop-blur-xs justify-center items-center">
            <div className ="bg-white w-[300px] h-[450px] rounded-2xl p-5">
                <h1 className="text-3xl font-medium">모달창</h1>
            </div>
        </div>
        )
      }

 
    </div>
  );
}
