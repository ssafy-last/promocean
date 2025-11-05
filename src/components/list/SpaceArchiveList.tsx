'use client'

import { useEffect, useState } from "react";
import SpaceArchiveItem from "../item/SpaceArchiveItem";
import SpaceArchiveAddModal from "../modal/SpaceArchiveAddModal";
import { SpaceArchiveData } from "@/app/my-space/page";

/**
 * SpaceArchiveListProps 인터페이스
 * @isPinnedList: Pinned 리스트인지 여부
 * 
 * @archiveItemList: 일반 아카이브 리스트
 * @pinnedItemList: 핀된 아카이브 리스트
 * 
 */

export interface SpaceArchiveListProps {
  isPinnedList?: boolean;
  archiveItemList?: SpaceArchiveData[];
  pinnedItemList?: SpaceArchiveData[];
}

const interactiveBtnClasses = `
  w-40 h-60 relative rounded-[20px]
  shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] overflow-hidden
  transition-all duration-200 ease-in-out
  hover:-translate-y-1 hover:brightness-105 hover:shadow-lg
  active:translate-y-0 active:scale-95 active:shadow-sm
`;

export default function SpaceArchiveList({ isPinnedList, archiveItemList, pinnedItemList }: SpaceArchiveListProps) {
    const [isModalOpenState, setIsModalOpenState] = useState(false);
    const [shouldRenderModalState, setShouldRenderModalState] = useState(false);
    
    const [archiveItemListState, setArchiveItemListState] = useState<SpaceArchiveData[] | undefined>(archiveItemList);
    const [pinnedItemListState, setPinnedItemListState] = useState<SpaceArchiveData[] | undefined>(pinnedItemList);

    const onOpenAddModal = () => {
        setShouldRenderModalState(true);
        // DOM에 마운트된 후 애니메이션 시작을 위해 약간의 지연
        setTimeout(() => {
            setIsModalOpenState(true);
        }, 10);
    };

    const onCloseAddModal = () => {
        setIsModalOpenState(false);
        // 애니메이션이 끝난 후 DOM에서 제거
        setTimeout(() => {
            setShouldRenderModalState(false);
        }, 300); // transition duration과 동일하게 설정
    };

    useEffect(() => {
        console.log("open state : ", isModalOpenState);
    }, [isModalOpenState]);

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
                    onClick={onOpenAddModal}
                >
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-black text-5xl font-medium leading-9">+</div>
                    </div>
                </button>
            )}

            
            {
            isPinnedList === false ? 
                archiveItemListState?.map((item, index) => (
                    <SpaceArchiveItem key={index} title={item.title} bgColor={item.bgColor} 
                    archiveItemListState={archiveItemListState} 
                    setArchiveItemListState={setArchiveItemListState} 
                    pinnedItemListState={pinnedItemListState} 
                    setPinnedItemListState={setPinnedItemListState}
                    />
                ))
                :
                pinnedItemListState?.map((item, index) => (
                    <SpaceArchiveItem key={index} title={item.title} bgColor={item.bgColor} 
                    archiveItemListState={archiveItemListState} 
                    setArchiveItemListState={setArchiveItemListState} 
                    pinnedItemListState={pinnedItemListState} 
                    setPinnedItemListState={setPinnedItemListState} />
                ))
            }

            {shouldRenderModalState && (
                <SpaceArchiveAddModal isOpen={isModalOpenState} onCloseAddModal={onCloseAddModal} />
            )}
        </div>
    );
}