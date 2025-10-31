import SpaceArchiveItem, { SpaceArchiveItemProps } from "../item/SpaceArchiveItem";


/**
 * SpaceArchiveList 컴포넌트의 props 타입 정의입니다.
 * isPinnedList : Pinned 아카이브 리스트 여부입니다.
 * archiveItemList : 아카이브 아이템 리스트입니다.
 * SpaceArchiveItemProps 타입의 배열로 구성되는데, 해당 타입에 대한 내용은 SpaceArchiveItem 컴포넌트에서 확인하실 수 있습니다.
 */
export interface SpaceArchiveListProps{
    isPinnedList? : boolean;
    archiveItemList? : SpaceArchiveItemProps[];
}


/**
 * SpaceArchiveList 컴포넌트
 * @param param0 SpaceArchiveListProps 의 분해 할당
 * @returns    {React.ReactNode}
 *
 * 마이 스페이스 및 팀 스페이스에서 아카이브 섹션의 카드 리스트 컴포넌트입니다.
 * 
 * isPinnedList를 통해 Pin이 걸린 아카이브인지 아닌지에 따라 모든 프롬프트 버튼이 노출될지 말지를 결정할 수 있습니다. 
 * 
 *   @example
 * <SpaceArchiveList isPinnedList={true} archiveItemList={[{title: "AI 챗봇", bgColor: "bg-blue-200"}, {title: "이미지 생성", bgColor: "bg-[#0949ad]"}]}/>
 */


export default function SpaceArchiveList({ isPinnedList, archiveItemList }: SpaceArchiveListProps){

    return(
        <div className="flex flex-row p-7 gap-4">
        
            { isPinnedList ? 
            <button className="w-40 h-60 relative bg-white rounded-[20px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] outline-2 outline-dodger-blue-11 overflow-hidden">
                <div className="left-[25px] top-[82px] absolute text-center justify-center text-black text-3xl font-medium leading-9">
                모든<br/>프롬프트
                </div>
            </button>
            : null
            }

            {
                archiveItemList?.map((item, index) => (
                    <SpaceArchiveItem
                        key={index}
                        title={item.title}
                        bgColor={item.bgColor}
                    />
                ))
            }
        </div>
    )
}