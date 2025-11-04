'use client';
import { useRef, useState } from "react";
import TeamSpaceAddButton from "../button/TeamSpaceAddButton";
import SearchBar from "../filter/SearchBar";
import { TeamSpaceTeamChoiceItemProps } from "../item/TeamSpaceTeamChoiceItem"
import TeamSpaceTeamChoiceList, { TeamSpaceTeamChoiceListProps } from "../list/TeamSpaceTeamChoiceLlist"

export interface TeamSpaceChoiceSectionProps {
    teamSpaceTeamChoiceList : TeamSpaceTeamChoiceItemProps[];
}


export default function TeamSpaceChoiceSection({teamSpaceTeamChoiceList}: TeamSpaceChoiceSectionProps){

    const [isModalState, setIsModalState] = useState(false);

    return(

        <div className="min-h-screen bg-gray-50 py-5 px-4 flex flex-col">
        <div className="flex flex-row justify-between items-center mb-5">
          <TeamSpaceAddButton isModalRef={isModalState} setIsModalRef={setIsModalState}/>
          <SearchBar/>
        </div>
        {/* 팀 스페이스 아이템들 */}
        <TeamSpaceTeamChoiceList teamSpaceTeamChoiceList={teamSpaceTeamChoiceList} />
        
            {
                isModalState && (
                    <div
                    className={`fixed flex inset-0 z-10 w-full h-full bg-black/40 backdrop-blur-xs justify-center items-center
                    transition-opacity duration-300 ease-out
                    ${isModalState ? 'opacity-100' : 'opacity-0'}`}
                 >
                        <div className="flex flex-col bg-white p-10 rounded-lg w-fit justify-between h-[680px]">
                            <div className="flex flex-col gap-3">
                                <h2 className="text-4xl font-semibold mb-4">팀 스페이스 생성</h2>
                                {/* 팀 스페이스 생성 폼 내용 */}
                            
                                <input type="text" placeholder="팀 스페이스 이름을 입력하세요" className = "w-[600px] border border-gray-300 rounded-[10px] p-3"/>
                                <div>
                                    <div className ="flex flex-row gap-2 justify-end-safe py-1 px-2">
                                        
                                    </div>
                                    <input type="text" placeholder="팀원 닉네임 또는 이메일을 입력하세요" className = "w-[600px] border border-gray-300 rounded-[10px] p-3"/>
                                    
                                    <div className ="overflow-y-scroll w-[600px] h-[300px] border border-t-0 border-gray-300 rounded-[10px] p-2.5 gap-2.5">
                                        
                                        <div className ="flex flex-row px-4 py-1 gap-3 items-center hover:bg-current/5 active:bg-current/10">
                                            <div className = "rounded-full bg-gray-200 border w-10 h-10"></div>
                                            <div>
                                                <span className="font-medium text-lg">홍길동</span>
                                                <p className="text-gray-400">홍길동@example.com</p>
                                            </div>
                                        </div>
                
            

                                    </div>
                                    
                                </div>
                            </div>

                            <div>
                                <label className="text-3xl text-gray-300 block mb-2 font-medium text-center">아직 검색한 팀원이 없어요</label>
                            </div>

                            <div className="flex flex-row gap-8 justify-center-safe w-full">
                                <button className="px-5 py-3 items-center justify-center bg-gray-300 rounded-4xl w-40"
                                onClick={() => setIsModalState(false)}
                                >등록 취소</button>
                                <input type="submit" value={"생성하기"}
                                className="px-5 py-3 items-center justify-center bg-primary text-white rounded-4xl w-40"/>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>

    )
}