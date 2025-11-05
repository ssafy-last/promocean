'use client'

import { useState } from "react";
import SpaceArchiveItem from "../item/SpaceArchiveItem";
import SpaceArchiveAddModal from "../modal/SpaceArchiveAddModal";
import { SpaceArchiveData } from "@/app/my-space/page";

export interface SpaceArchiveListProps {
  isPinnedList?: boolean;
  archiveItemListState: SpaceArchiveData[];
  setArchiveItemListState: (newState: SpaceArchiveData[]) => void;
  pinnedItemListState: SpaceArchiveData[];
  setPinnedItemListState: (newState: SpaceArchiveData[]) => void;
}

const interactiveBtnClasses = `
  w-40 h-60 relative rounded-[20px]
  shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] overflow-hidden
  transition-all duration-200 ease-in-out
  hover:-translate-y-1 hover:brightness-105 hover:shadow-lg
  active:translate-y-0 active:scale-95 active:shadow-sm
`;

export default function SpaceArchiveList({ 
    isPinnedList, 
    archiveItemListState,
    setArchiveItemListState,
    pinnedItemListState,
    setPinnedItemListState
}: SpaceArchiveListProps) {
    const [isModalOpenState, setIsModalOpenState] = useState(false);
    const [shouldRenderModalState, setShouldRenderModalState] = useState(false);

    const onOpenAddModal = () => {
        setShouldRenderModalState(true);
        setTimeout(() => {
            setIsModalOpenState(true);
        }, 10);
    };

    const onCloseAddModal = () => {
        setIsModalOpenState(false);
        setTimeout(() => {
            setShouldRenderModalState(false);
        }, 300);
    };

    const displayList = isPinnedList ? pinnedItemListState : archiveItemListState;

    return (
        <div className="flex flex-wrap flex-row p-7 gap-4">
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
                    onClick={onOpenAddModal}
                >
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-black text-5xl font-medium leading-9">+</div>
                    </div>
                </button>
            )}

            {displayList.map((item) => (
                <SpaceArchiveItem 
                    key={item.title}
                    title={item.title} 
                    bgColor={item.bgColor} 
                    isPinned={item.isPinned}
                    archiveItemListState={archiveItemListState} 
                    setArchiveItemListState={setArchiveItemListState} 
                    pinnedItemListState={pinnedItemListState} 
                    setPinnedItemListState={setPinnedItemListState}
                />
            ))}

            {shouldRenderModalState && (
                <SpaceArchiveAddModal isOpen={isModalOpenState} onCloseAddModal={onCloseAddModal} />
            )}
        </div>
    );
}