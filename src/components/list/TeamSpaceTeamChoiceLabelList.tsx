import TeamSpaceTeamChoiceLabelItem from "../item/TeamSpaceTeamChoiceLabelItem";



export interface TeamSpaceTeamChoiceLabelListProps{
    //추가 필요시 여기에 작성
    labelNameList : string[];
    selectedMemberSetState?: Set<string>;
    setSelectedMemberSetState?: (members: Set<string>) => void;
}

export default function TeamSpaceTeamChoiceLabelList({ labelNameList, selectedMemberSetState, setSelectedMemberSetState }: TeamSpaceTeamChoiceLabelListProps){
    return(
           <>
           {labelNameList.map((memberEmail) => (
               <TeamSpaceTeamChoiceLabelItem key={memberEmail} labelName={memberEmail} selectedMemberSetState={selectedMemberSetState} setSelectedMemberSetState={setSelectedMemberSetState} />
           ))}
           </>
    )
}