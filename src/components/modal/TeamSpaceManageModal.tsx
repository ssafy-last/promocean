import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TeamSpaceInsertionModalTabs from "../filter/TeamSpaceInsertionModalTabs";
import SpaceAddMemberItem from "../item/SpaceAddMemberItem";
import TeamSpaceRoleItem from "../item/TeamSpaceRoleItem";
import TeamSpaceRoleList from "../list/TeamSpaceRoleList";
import ImageChoiceButton from "../button/ImageChoiceButton";
import SpaceAPI, { SpaceParticipants } from "@/api/space";
import { UploadAPI } from "@/api/upload";
import { SpaceRole, TeamSpaceRole } from "@/enum/TeamSpaceRole";
import { Space } from "lucide-react";

export interface TeamSpacePageProps {
    spaceId? : number;
    isModalOpenState: boolean;
    handleModalClose: () => void;
    modalTabState: "권한" | "초대" | "수정" | "삭제";
    setModalTabState: (tab: "권한" | "초대" | "수정" | "삭제") => void;
    memberListState: SpaceParticipants[];
    ownerMemberState?: SpaceParticipants | null;
    setMemberListState: (members: SpaceParticipants[]) => void;
    teamName?: string;

}



export default function TeamSpaceManageModal( { spaceId, isModalOpenState, handleModalClose, modalTabState, setModalTabState, memberListState, ownerMemberState, setMemberListState, teamName = "팀 스페이스"}: TeamSpacePageProps) {
    console.log("spaceId in TeamSpaceManageModal:", spaceId);
    const router = useRouter();

    const [addMemberListState, setAddMemberListState] = useState<SpaceParticipants[]>([]);
    const [emailInputState, setEmailInputState] = useState("");
    // 수정 탭 state
    const [editSpaceImageState, setEditSpaceImageState] = useState<File | null>(null);
    const [editSpaceNameState, setEditSpaceNameState] = useState(teamName);
    // 삭제 탭 state
    const [deleteInputState, setDeleteInputState] = useState("");
    const deleteConfirmText = `${teamName}를 삭제 하겠습니다`;
    const isDeleteValid = deleteInputState === deleteConfirmText;

    const handleDeleteTeam = async () => {
        console.log("handle " ,spaceId);
        if (isDeleteValid) {
   
            const res = await SpaceAPI.deleteTeamSpace(spaceId!);
            console.log("Res ",res);
            //handleModalClose();
            alert(`${teamName}이 삭제되었습니다`);

            router.push('/team-space');
        }
    };

    const handleInsertionTeam = async () => {

        const s3res =await UploadAPI.getImagesS3Upload(editSpaceImageState ? editSpaceImageState.name : "default.png");
        console.log("s3Res ", s3res);

        const presignedUrl = s3res?.presignedUrl;
        const key = s3res?.key;

        if(s3res && editSpaceImageState) {

            // 이미지가 있을 때만 업로드 진행
            const uploadS3Res = await UploadAPI.uploadImageToS3({
                presignedUrl : presignedUrl!,
                file : editSpaceImageState
            });

            // 업로드 성공 시에만 팀 스페이스 정보 업데이트
            const patchRes = await SpaceAPI.patchTeamSpace(spaceId!, {
                name: editSpaceNameState,
                spaceCoverPath : key!
            });

            alert(`${teamName}이 수정되었습니다`);
            handleModalClose();
        }
        else{
            console.log("No image to upload, just update name");
            handleModalClose();
        }
    }

    // 이메일 입력 후 엔터 키 처리
    const handleEmailKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && emailInputState.trim()) {
            e.preventDefault();

            // 이미 추가된 이메일인지 확인
            const isDuplicate = addMemberListState.some(m => m.email === emailInputState.trim());
            if (isDuplicate) {
                alert("이미 추가된 이메일입니다.");
                return;
            }

            // 새 멤버 추가 (임시 데이터)
            const newMember: SpaceParticipants = {
                participantId: Date.now(), // 임시 ID
                nickname: "제인도",
                email: emailInputState.trim(),
                role: "READ_ONLY",
                profileUrl: ""
            };

            setAddMemberListState(prev => [...prev, newMember]);
            setEmailInputState(""); // 입력창 초기화
        }
    };

    // 멤버 권한 변경
    const handleMemberRoleChange = (email: string, newRole: TeamSpaceRole) => {
        setAddMemberListState(prev =>
            prev.map(member =>
                member.email === email
                    ? { ...member, role: newRole === TeamSpaceRole.READ_ONLY ? "READ_ONLY" : "EDIT" }
                    : member
            )
        );
    };

    // 멤버 제거
    const handleRemoveMember = (email: string) => {
        setAddMemberListState(prev => prev.filter(member => member.email !== email));
    };

    // 초대하기 버튼 클릭
    const handleInviteTeamMembers = async () => {
        if (addMemberListState.length === 0) {
            alert("초대할 멤버를 추가해주세요.");
            return;
        }

        console.log("Inviting members:", addMemberListState);

        // ParticipantReqs 형식으로 변환
        const inviteData = {
            participantReqs: addMemberListState.map(member => ({
                email: member.email,
                role: member.role === "READ_ONLY" ? TeamSpaceRole.READ_ONLY : TeamSpaceRole.EDIT
            }))
        };

        try {
            const res = await SpaceAPI.postSpaceParticipantInvite(spaceId!, inviteData);

            if (!res) {
                console.error("Failed to invite members");
                alert("멤버 초대에 실패했습니다.");
                return;
            }

            console.log("Invite res", res);
            alert("멤버 초대가 완료되었습니다.");

            // 멤버 목록 업데이트
            const updateRes = await SpaceAPI.getSpaceParticipants(spaceId!);
            setMemberListState(updateRes.participants);

            // 초대 목록 초기화 및 모달 닫기
            setAddMemberListState([]);
            setEmailInputState("");
            handleModalClose();
        } catch (error) {
            console.error("Error inviting members:", error);
            alert("멤버 초대 중 오류가 발생했습니다.");
        }
    }


    return(
        <>
            {/* 오버레이 - 바깥쪽 클릭 감지 */}
            <div
                className="fixed inset-0 bg-black/30 z-10"
                onClick={handleModalClose}
            />

            {/* 모달 */}
            <div className="absolute w-100 max-h-[90vh] z-20 top-8 right-8 bg-white rounded-md shadow-md text-black flex flex-col">
                <div className="py-4 px-4">
                    <TeamSpaceInsertionModalTabs
                        modalTabState={modalTabState}
                        setModalTabState={setModalTabState}/>
                </div>

                <div className=" overflow-y-auto py-1 px-4 flex flex-col gap-2">

                <div className = {`font-semibold text-2xl ${modalTabState === "삭제" ? "text-red-500" : ""}`}>{modalTabState}</div>

                {modalTabState === "권한" ? (
                    <>
                        <span className = "text-sm text-gray-500">나의 권한</span>
                        <TeamSpaceRoleItem member={ownerMemberState!} index={-1}/>
                        <span className = "border-b border-gray-300 w-full"></span>
                        <TeamSpaceRoleList memberListState={memberListState}/>
                    </>
                ) : modalTabState === "초대" ? (
                    <>
                        <input
                            type="email"
                            placeholder="초대할 멤버의 이메일을 입력하고 Enter를 누르세요"
                            className="w-full border border-gray-300 rounded-[10px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            value={emailInputState}
                            onChange={(e) => setEmailInputState(e.target.value)}
                            onKeyPress={handleEmailKeyPress}
                        />

                        {addMemberListState && addMemberListState.length > 0 ? (
                            <div className="flex flex-col gap-2">
                                <p className="text-sm text-gray-500">초대 대상 ({addMemberListState.length}명)</p>
                                <ul className="flex flex-col gap-1 max-h-56 overflow-y-scroll">
                                    {addMemberListState.map((member) => (
                                        <SpaceAddMemberItem
                                            key={member.email}
                                            member={member}
                                            isMinusButton={true}
                                            showRoleDropdown={true}
                                            onRoleChange={handleMemberRoleChange}
                                            onRemove={handleRemoveMember}
                                        />
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 gap-3">
                                <svg
                                    className="w-14 h-14 text-gray-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                <div className="text-center">
                                    <p className="text-gray-600 font-medium mb-1">초대할 멤버를 추가하세요</p>
                                    <p className="text-gray-400 text-sm">이메일을 입력하고 Enter를 누르세요</p>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-row justify-center gap-8 py-2 w-full">
                            <button
                                type="button"
                                className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                                onClick={handleModalClose}
                            >
                                취소하기
                            </button>
                            <button
                                type="button"
                                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                onClick={handleInviteTeamMembers}
                                disabled={addMemberListState.length === 0}
                            >
                                초대하기
                            </button>
                        </div>

                    </>
                ) : modalTabState === "수정" ? (
                    <>
                        {/* 수정 탭 */}
                        <div className="flex flex-col gap-4">
                            {/* 커버 이미지 섹션 */}
                            <ImageChoiceButton setSpaceImageState={setEditSpaceImageState} />

                            {/* 팀 스페이스 이름 섹션 */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    팀 스페이스 이름
                                </label>
                                <input
                                    type="text"
                                    value={editSpaceNameState}
                                    onChange={(e) => setEditSpaceNameState(e.target.value)}
                                    placeholder="팀 스페이스 이름을 입력하세요"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                />
                            </div>

                            {/* 버튼 섹션 */}
                            <div className="flex flex-row justify-center gap-6 py-2 w-full">
                                <button
                                    type="button"
                                    className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                                    onClick={handleModalClose}
                                >
                                    취소하기
                                </button>
                                <button
                                    type="button"
                                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-colors"
                                    onClick={() => {
                                        // TODO: API 호출하여 팀 스페이스 정보 업데이트
                                        // console.log("Team space update:", {
                                        //     spaceId,
                                        //     name: editSpaceNameState,
                                        //     image: null
                                        // });
                                        handleInsertionTeam();
                                        handleModalClose();
                                    }}
                                >
                                    저장하기
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* 삭제 탭 */}
                        <div className="flex flex-col gap-4">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-red-700 text-sm font-medium mb-2">⚠️ 경고</p>
                                <p className="text-red-600 text-sm">
                                    팀 스페이스를 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    다음 문구를 정확히 입력해주세요:
                                </label>
                                <div className="bg-gray-100 px-3 py-2 rounded-md">
                                    <code className="text-sm font-mono text-gray-800">{deleteConfirmText}</code>
                                </div>
                            </div>

                            <input
                                type="text"
                                value={deleteInputState}
                                onChange={(e) => setDeleteInputState(e.target.value)}
                                placeholder="위 문구를 정확히 입력하세요"
                                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition-all
                                    ${isDeleteValid
                                        ? 'border-red-500 focus:ring-red-500 bg-red-50'
                                        : 'border-gray-300 focus:ring-gray-400'
                                    }`}
                            />

                            <div className="flex flex-col gap-2 mt-4">
                                <button
                                    type="button"
                                    onClick={handleDeleteTeam}
                                    disabled={!isDeleteValid}
                                    className={`w-full px-4 py-3 rounded-lg font-medium transition-all
                                        ${isDeleteValid
                                            ? 'bg-red-500 text-white hover:bg-red-600 active:scale-95'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    팀 스페이스 삭제
                                </button>
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    </>
                )}
                </div>
            </div>
        </>
    )
}