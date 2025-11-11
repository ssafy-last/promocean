'use client';
import { useEffect, useState } from "react";
import TeamSpaceAddButton from "../button/TeamSpaceAddButton";
import SearchBar from "../filter/SearchBar";
import { TeamSpaceChoiceItemProps } from "../item/TeamSpaceTeamChoiceItem"
import TeamSpaceTeamChoiceList from "../list/TeamSpaceTeamChoiceLlist"
import TeamSpaceAddModal from "../modal/TeamSpaceAddModal";
import { SpaceAPI } from "@/api/space";

export interface TeamSpaceChoiceSectionProps {
    teamSpaceChoiceList : TeamSpaceChoiceItemProps[];
}


export default function TeamSpaceChoiceSection({teamSpaceChoiceList}: TeamSpaceChoiceSectionProps){
    
    useEffect(()=>{
        console.log("팀 스페이스 리스트 ", teamSpaceChoiceList);
        const fetchData = async () => {
            try {
                const res = await SpaceAPI.getTeamSpaceList();
                console.log("팀 스페이스 리스트 재조회 ", res);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }

        };
        fetchData();
    }, []);




    const [isModalOpenState, setIsModalOpenState] = useState(false);
    const [shouldRenderModalState, setShouldRenderModalState] = useState(false);

    const [teamSpaceTeamChoiceListState, setTeamSpaceTeamChoiceListState] = useState<TeamSpaceChoiceItemProps[]>(teamSpaceChoiceList);

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