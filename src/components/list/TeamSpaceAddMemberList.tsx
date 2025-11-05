import SpaceAddMemberItem, { SpaceAddMemberItemProps } from "../item/SpaceAddMemberItem";


export interface SpaceAddMemberListProps{
    searchSpaceMemberListState: SpaceAddMemberItemProps[];
}



export default function TeamSpaceAddMemberList({ searchSpaceMemberListState }: SpaceAddMemberListProps){

    return(
        <div className ="overflow-y-scroll w-[600px] h-[300px] border border-t-0 border-gray-300 rounded-[10px] p-2.5 gap-2.5">
            {searchSpaceMemberListState.map((member) => (
                <SpaceAddMemberItem key={member.email} name={member.name} email={member.email} />
            ))}
        </div>
    )
}