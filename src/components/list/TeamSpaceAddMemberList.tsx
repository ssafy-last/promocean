import SpaceAddMemberItem, { SpaceAddMemberItemProps } from "../item/SpaceAddMemberItem";


export interface SpaceAddMemberListProps{
    searchSpaceMemberListState: SpaceAddMemberItemProps[];
    selectedMemberSetState: Set<string>;
    setSelectedMemberSetState: (members: Set<string>) => void;
}



export default function TeamSpaceAddMemberList({ searchSpaceMemberListState, selectedMemberSetState, setSelectedMemberSetState }: SpaceAddMemberListProps){

    const handleMemberClick = (memberName: string) => {
        const updatedSet = new Set(selectedMemberSetState);
        if (updatedSet.has(memberName)) {
            updatedSet.delete(memberName); //이미 선택된 항목이면 다시 눌러서 제거 가능하게 하려는 거임
        } else {
            updatedSet.add(memberName);    //새로 선택된 항목이면 당연히 추가
        }
        setSelectedMemberSetState(updatedSet);
    };

    return(
        <div className ="overflow-y-scroll w-[600px] h-[300px] border border-t-0 border-gray-300 rounded-[10px] p-2.5 gap-2.5">
            {searchSpaceMemberListState.map((member) => (
                <SpaceAddMemberItem key={member.email} name={member.name} email={member.email} handleMemberClick={handleMemberClick} />
            ))}
        </div>
    )
}