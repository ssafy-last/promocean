import { useRef } from "react";


export interface TeamSpaceTeamChoiceLabelItemProps{
    //추가 필요시 여기에 작성
    labelName : string;
    selectedMemberSetState?: Set<string>;
    setSelectedMemberSetState?: (members: Set<string>) => void;

}


export default function TeamSpaceTeamChoiceLabelItem({ labelName, selectedMemberSetState, setSelectedMemberSetState }: TeamSpaceTeamChoiceLabelItemProps){
    

    const handleDelete = () => {
        console.log("삭제 버튼 클릭됨");
        if(!selectedMemberSetState || !setSelectedMemberSetState) return;
        const updatedSet = new Set(selectedMemberSetState);
        if (updatedSet.has(labelName)) {
            updatedSet.delete(labelName); //이미 선택된 항목이면 다시 눌러서 제거 가능하게 하려는 거임
        }
        setSelectedMemberSetState(updatedSet);
    };
    
    return(
        <div className = "flex flex-row gap-2 items-center rounded-[10px] px-2.5  hover:bg-gray-300/10">
            <div className = "flex flex-row gap-0.5">
            <div className = "w-5 h-5 rounded-[10px] bg-gray-300"/>
            <span className = "text-[14px] font-light">{labelName}</span>
            </div>
            <button className = "text-[14px] font-light"
            onClick={handleDelete}
            > X </button>
        </div>
    )
}