'use client';
import { useState } from "react";
import TeamSpaceAddButton from "../button/TeamSpaceAddButton";
import SearchBar from "../filter/SearchBar";
import { TeamSpaceTeamChoiceItemProps } from "../item/TeamSpaceTeamChoiceItem"
import TeamSpaceTeamChoiceList from "../list/TeamSpaceTeamChoiceLlist"
import TeamSpaceAddModal from "../modal/TeamSpaceAddModal";

export interface TeamSpaceChoiceSectionProps {
    teamSpaceTeamChoiceList : TeamSpaceTeamChoiceItemProps[];
}


export default function TeamSpaceChoiceSection({teamSpaceTeamChoiceList}: TeamSpaceChoiceSectionProps){

    const [isModalOpenState, setIsModalOpenState] = useState(false);
    const [shouldRenderModalState, setShouldRenderModalState] = useState(false);

    const [teamSpaceTeamChoiceListState, setTeamSpaceTeamChoiceListState] = useState<TeamSpaceTeamChoiceItemProps[]>(teamSpaceTeamChoiceList);

    const onOpenModal = () => {
        setShouldRenderModalState(true);
        // DOM에 마운트된 후 애니메이션 시작을 위해 약간의 지연
        setTimeout(() => {
            setIsModalOpenState(true);
        }, 10);
    };

    const onCloseModal = () => {
        setIsModalOpenState(false);
        // 애니메이션이 끝난 후 DOM에서 제거
        setTimeout(() => {
            setShouldRenderModalState(false);
        }, 300); // transition duration과 동일하게 설정
    };

    return(
        <div className="min-h-screen bg-gray-50 py-5 px-4 flex flex-col">
            <div className="flex flex-row justify-between items-center mb-5">
                <TeamSpaceAddButton 
                    isModalRef={isModalOpenState} 
                    setIsModalRef={onOpenModal}
                />
                <SearchBar/>
            </div>
            {/* 팀 스페이스 아이템들 */}
            <TeamSpaceTeamChoiceList teamSpaceTeamChoiceList={teamSpaceTeamChoiceListState} />
            
            {shouldRenderModalState && (
                <TeamSpaceAddModal 
                    isModalState={isModalOpenState} 
                    setIsModalState={onCloseModal}
                    teamSpaceTeamChoiceList={teamSpaceTeamChoiceListState}
                    setTeamSpaceTeamChoiceList={setTeamSpaceTeamChoiceListState}
                />
            )}
        </div>
    )
}