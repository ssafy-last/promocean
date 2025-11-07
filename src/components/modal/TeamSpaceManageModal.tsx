import TeamSpaceInsertionModalTabs from "../filter/TeamSpaceInsertionModalTabs";
import SpaceAddMemberItem from "../item/SpaceAddMemberItem";
import TeamSpaceRoleItem from "../item/TeamSpaceRoleItem";
import TeamSpaceRoleList from "../list/TeamSpaceRoleList";

export interface TeamSpacePageProps {
    modalTabState: "권한" | "초대";
    setModalTabState: (tab: "권한" | "초대") => void;
    memberListState: string[];
    setMemberListState: (members: string[]) => void;
}



export default function TeamSpaceManageModal({modalTabState, setModalTabState, memberListState, setMemberListState}: TeamSpacePageProps) {

    return(

             <div className="absolute w-100  min-h-90 h-120 z-20 top-8 right-8 py-4 px-4 bg-white rounded-md shadow-md text-black flex flex-col gap-4">
                
                <TeamSpaceInsertionModalTabs 
                    modalTabState={modalTabState}
                    setModalTabState={setModalTabState}/>

                <h2 className = "font-semibold text-2xl">{modalTabState}</h2>
                    



                {modalTabState === "권한" ?( 
                    <>                
                        <span className = "text-sm text-gray-500">나의 권한</span>
                        <TeamSpaceRoleItem member="정태승" index={-1}/>
                        <span className = "border-b border-gray-300 w-full"></span>
                        <TeamSpaceRoleList memberListState={memberListState}/>
                    </>
                ) : (
                    <>
                        <input type="text" 
                                placeholder="초대할 멤버의 닉네임 또는 이메일을 입력하세요." 
                                className = "w-full border border-gray-300 rounded-[10px] px-4 py-2"
                                onChange={(e) => {}}
                            />
                        <ul className = "flex flex-col gap-1">
                            <SpaceAddMemberItem email="mike415415@naver.com" name="정태승"/>

                        </ul>
                    
                    </>
                )}
            


              </div>

        
    )
}