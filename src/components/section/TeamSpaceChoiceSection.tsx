'use client';
import { useEffect, useRef, useState } from "react";
import TeamSpaceAddButton from "../button/TeamSpaceAddButton";
import SearchBar from "../filter/SearchBar";
import { TeamSpaceTeamChoiceItemProps } from "../item/TeamSpaceTeamChoiceItem"
import TeamSpaceTeamChoiceList, { TeamSpaceTeamChoiceListProps } from "../list/TeamSpaceTeamChoiceLlist"
import SpaceAddMemberItem, { SpaceAddMemberItemProps } from "../item/SpaceAddMemberItem";
import TeamSpaceTeamChoiceLabelItem from "../item/TeamSpaceTeamChoiceLabelItem";
import TeamSpaceAddModal from "../modal/TeamSpaceAddModal";

export interface TeamSpaceChoiceSectionProps {
    teamSpaceTeamChoiceList : TeamSpaceTeamChoiceItemProps[];
}


export default function TeamSpaceChoiceSection({teamSpaceTeamChoiceList}: TeamSpaceChoiceSectionProps){

    const [isModalState, setIsModalState] = useState(false);

    const [teamSpaceTeamChoiceListState, setTeamSpaceTeamChoiceListState] = useState<TeamSpaceTeamChoiceItemProps[]>(teamSpaceTeamChoiceList);

    

    return(
        <div className="min-h-screen bg-gray-50 py-5 px-4 flex flex-col">
        <div className="flex flex-row justify-between items-center mb-5">
          <TeamSpaceAddButton isModalRef={isModalState} setIsModalRef={setIsModalState}/>
          <SearchBar/>
        </div>
        {/* 팀 스페이스 아이템들 */}
        <TeamSpaceTeamChoiceList teamSpaceTeamChoiceList={teamSpaceTeamChoiceListState} />
        
            {
                isModalState && (
                    <>
                        <TeamSpaceAddModal isModalState={isModalState} setIsModalState={setIsModalState}
                        teamSpaceTeamChoiceList={teamSpaceTeamChoiceListState}
                        setTeamSpaceTeamChoiceList={setTeamSpaceTeamChoiceListState}
                        />
                    </>
                )
            }
        </div>

    )
}