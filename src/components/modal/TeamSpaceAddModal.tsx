import { useState } from "react";
import Image from "next/image";
import { SpaceAddMemberItemProps } from "../item/SpaceAddMemberItem";
import TeamSpaceAddMemberList from "../list/TeamSpaceAddMemberList";
import TeamSpaceTeamChoiceLabelList from "../list/TeamSpaceTeamChoiceLabelList";
import { TeamSpaceChoiceItemProps } from "../item/TeamSpaceTeamChoiceItem";
import { TeamSpaceRole } from "../item/TeamSpaceRoleItem";

export interface SelectedMember {
    name: string;
    email: string;
    role: TeamSpaceRole;
}


export interface TeamSpaceAddModalProps{
    //추가 필요시 여기에 작성
    isModalState: boolean;
    setIsModalState: (state: boolean) => void;
    teamSpaceTeamChoiceList?: TeamSpaceChoiceItemProps[];
    setTeamSpaceTeamChoiceList: (list: TeamSpaceChoiceItemProps[]) => void;
}



export default function TeamSpaceAddModal({isModalState, setIsModalState, teamSpaceTeamChoiceList, setTeamSpaceTeamChoiceList}: TeamSpaceAddModalProps){

    const [isMemberExistState, setIsMemberExistState] = useState(false);
    const [searchSpaceMemberListState, setSearchSpaceMemberListState] = useState<SpaceAddMemberItemProps[]>([])
    const [selectedMembersState, setSelectedMembersState] = useState<Map<string, SelectedMember>>(new Map());
    const [spaceNameState, setSpaceNameState] = useState("");
    const [spaceNameErrorState, setSpaceNameErrorState] = useState(false);
    const [spaceImageState, setSpaceImageState] = useState<File | null>(null);
    const [spaceImagePreviewState, setSpaceImagePreviewState] = useState<string | null>(null);
    
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


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSpaceImageState(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setSpaceImagePreviewState(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(spaceNameState.trim() === ""){
            setSpaceNameErrorState(true);
            return;
        }
        // 여기에 팀 스페이스 생성 로직 추가
        console.log("팀 스페이스 생성:", {
            name: spaceNameState,
            image: spaceImageState,
            members: Array.from(selectedMembersState.values())
        });

        setTeamSpaceTeamChoiceList([
            ...teamSpaceTeamChoiceList!,
            {
            image : spaceImagePreviewState || "/images/default_space_image.png",
            title : spaceNameState,
            description : "새로 생성된 팀 스페이스입니다."
            }])

        // 생성 후 모달 닫기
        setIsModalState(false);
    }
        
    return(
            <div
                className={`fixed flex inset-0 z-10 w-full h-full bg-black/40 backdrop-blur-xs justify-center items-center
                transition-opacity duration-300 ease-out
                ${isModalState ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => setIsModalState(false)}
                >
                    <form 
                        onSubmit={handleSubmit} 
                        className={`flex flex-col bg-white p-10 rounded-lg w-1/3 justify-between h-[680px]
                            transition-all duration-300 ease-out
                            ${isModalState ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        
                        <div className="flex flex-col gap-3">
                            <h2 className="text-3xl font-bold pb-2">팀 스페이스 생성</h2>
                            {/* 팀 스페이스 생성 폼 내용 */}


                            {/* 이미지 첨부 */}
                            <div className = "w-full">
                                <label className="flex text-sm font-medium text-gray-700 py-2">
                                    팀 스페이스 이미지
                                </label>
                                <div className="flex items-center gap-4 w-full h-32">
                                    <label className="cursor-pointer w-full h-full">

                                    {spaceImagePreviewState ? (
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={spaceImagePreviewState}
                                                alt="Preview"
                                                width={80}
                                                height={80}
                                                className="w-full h-full rounded-lg object-cover border border-gray-300"
                                            />
                                            <button
                                                type="button"
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                                onClick={(s) => {
                            
                                                    s.preventDefault();
                                                    setSpaceImageState(null);
                                                    setSpaceImagePreviewState(null);
                                                }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-200">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>            
                            </div>


                            {/* 팀 스페이스 이름 및 팀원 추가 */}

                            <div className = "flex">
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
                                <div className="relative">
                                <input type="text"
                                    placeholder="팀원 닉네임 또는 이메일을 입력하세요"
                                    className = "w-full border border-gray-300 rounded-[10px] p-3"
                                    onKeyDown={(e)=>{
                                              if(e.key === '\n' || e.key === 'Enter'){
                                            console.log("zz");
                                        }
                                    }}
                                />

                                {isMemberExistState &&
                                    <TeamSpaceAddMemberList
                                    searchSpaceMemberListState={searchSpaceMemberListState}
                                    selectedMembersState={selectedMembersState}
                                    setSelectedMembersState={setSelectedMembersState} />
                                }
                                </div>

                                <TeamSpaceTeamChoiceLabelList
                                    selectedMembersState={selectedMembersState}
                                    setSelectedMembersState={setSelectedMembersState}
                                />

                            </div>
                        </div>

        
                        
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