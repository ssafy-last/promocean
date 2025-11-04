

export interface TeamSpaceTeamChoiceLabelItemProps{
    //추가 필요시 여기에 작성
    labelName : string;
}


export default function TeamSpaceTeamChoiceLabelItem({ labelName } : TeamSpaceTeamChoiceLabelItemProps){
    return(
        <div className = "flex flex-row gap-2 items-center rounded-[10px] px-2.5 py-1.5 hover:bg-gray-300/10">
            <div className = "flex flex-row gap-0.5">
            <div className = "w-5 h-5 rounded-[10px] bg-gray-300"/>
            <span className = "text-[14px] font-light">{labelName}</span>
            </div>
            <button className = "text-[14px] font-light"> X </button>
        </div>
    )
}