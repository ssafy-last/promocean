import { useState } from "react";
import TeamSpaceTeamChoiceLabelItem from "../item/TeamSpaceTeamChoiceLabelItem";
import SpaceAddMemberItem, { SpaceAddMemberItemProps } from "../item/SpaceAddMemberItem";
import TeamSpaceAddMemberList from "../list/TeamSpaceAddMemberList";
import TeamSpaceTeamChoiceList from "../list/TeamSpaceTeamChoiceLlist";
import TeamSpaceTeamChoiceLabelList from "../list/TeamSpaceTeamChoiceLabelList";


export interface TeamSpaceAddModalProps{
    //추가 필요시 여기에 작성
    isModalState: boolean;
    setIsModalState: (state: boolean) => void;
}



export default function TeamSpaceAddModal({isModalState, setIsModalState}: TeamSpaceAddModalProps){

    const [isMemberExistState, setIsMemberExistState] = useState(false);
    const [searchSpaceMemberListState, setSearchSpaceMemberListState] = useState<SpaceAddMemberItemProps[]>([])
    const [selectedMemberSetState, setSelectedMemberSetState] = useState<Set<string>>(new Set());
    const [spaceNameState, setSpaceNameState] = useState("");
    const [spaceNameErrorState, setSpaceNameErrorState] = useState(false);
    
    const mockMemberList : SpaceAddMemberItemProps[] =[
        {name : "홍길동", email : "hong@example.com"},
        {name : "김철수", email : "kim@example.com"},
        {name : "이영희", email : "lee@example.com"},
        {name : "박영수", email : "park@example.com"},
        {name : "정민수", email : "choi@example.com"},
        {name : "장미란", email : "jang@example.com"},
        {name : "오세훈", email : "oh@example.com"},
        {name : "한지민", email : "han@example.com"},
        {name : "서강준", email : "seo@example.com"},
        {name : "정우성", email : "jung@example.com"},
    ]

    const handleMemberSearch = (query : string) => {
        if(query.trim() === ""){
            setSearchSpaceMemberListState([]);
            setIsMemberExistState(false);
            return;
        }
        const filteredMembers = mockMemberList.filter((member) =>
            member.name.includes(query) || member.email.includes(query)
        );
        console.log("filteredMembers ",filteredMembers, " query : ", query);

        if(filteredMembers.length > 0) setIsMemberExistState(true);
        else setIsMemberExistState(false);
    
        setSearchSpaceMemberListState([...filteredMembers]);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if(spaceNameState.trim() === ""){
            setSpaceNameErrorState(true);
            return;
        }
        
        // 여기에 팀 스페이스 생성 로직 추가
        console.log("팀 스페이스 생성:", {
            name: spaceNameState,
            members: Array.from(selectedMemberSetState)
        });
        
        // 생성 후 모달 닫기
        setIsModalState(false);
    }
        
    return(
            <div
                className={`fixed flex inset-0 z-10 w-full h-full bg-black/40 backdrop-blur-xs justify-center items-center
                transition-opacity duration-300 ease-out
                ${isModalState ? 'opacity-100' : 'opacity-0'}`}
                >
                    <form onSubmit={handleSubmit} className="flex flex-col bg-white p-10 rounded-lg w-1/3 justify-between h-[680px]">
                        
                        <div className="flex flex-col gap-3">
                            <h2 className="text-4xl font-bold pb-4">팀 스페이스 생성</h2>
                            {/* 팀 스페이스 생성 폼 내용 */}
                        
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="팀 스페이스 이름을 입력하세요" 
                                    className={`w-full border rounded-[10px] p-3 ${
                                        spaceNameErrorState ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    value={spaceNameState}
                                    onChange={(e) => {
                                        setSpaceNameState(e.target.value);
                                        if(spaceNameErrorState) setSpaceNameErrorState(false);
                                    }}
                                />
                                {spaceNameErrorState && (
                                    <p className="text-red-500 text-sm mt-1">팀 스페이스 이름을 입력해주세요</p>
                                )}
                            </div>
                            
                            <div>
                         
                                {
                                    <TeamSpaceTeamChoiceLabelList
                                        labelNameList={Array.from(selectedMemberSetState)}
                                        selectedMemberSetState={selectedMemberSetState}
                                        setSelectedMemberSetState={setSelectedMemberSetState}
                                    />
                                }
                         

                                <div className="relative">
                                <input type="text" 
                                    placeholder="팀원 닉네임 또는 이메일을 입력하세요" 
                                    className = "w-full border border-gray-300 rounded-[10px] p-3"
                                    onChange={(e) => handleMemberSearch(e.target.value)}
                                />
                                
                                {isMemberExistState &&
                                    <TeamSpaceAddMemberList 
                                    searchSpaceMemberListState={searchSpaceMemberListState} 
                                    selectedMemberSetState={selectedMemberSetState} 
                                    setSelectedMemberSetState={setSelectedMemberSetState} />
                                }
                                </div>
                            </div>
                        </div>

                        { !isMemberExistState &&
                            <div>
                                <label className="text-3xl text-gray-300 block mb-2 font-medium text-center">아직 검색한 팀원이 없어요</label>
                            </div>
                        }
                        
                        <div className="flex flex-row gap-8 justify-center-safe w-full">
                            <button 
                                type="button"
                                className="px-5 py-3 items-center justify-center bg-gray-200 rounded-4xl w-40
                                hover:bg-gray-300 active:bg-gray-400"
                                onClick={() => setIsModalState(false)}
                            >
                                등록 취소
                            </button>
                            <input 
                                type="submit" 
                                value={"생성하기"}
                                className="px-5 py-3 items-center justify-center bg-primary text-white rounded-4xl w-40
                                hover:bg-primary/90 active:bg-primary/80 cursor-pointer"
                            />
                        </div>
                    </form>
                </div>
    )
}