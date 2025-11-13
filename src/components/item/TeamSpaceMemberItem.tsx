import SpaceAPI, { SpaceParticipants } from "@/api/space";
import { ChangeSpaceRoleToValue, SpaceRole, TeamSpaceRole } from "@/enum/TeamSpaceRole";
import { useSpaceStore } from "@/store/spaceStore";
import Image from "next/image";


export interface TeamSpaceMemberItemProps {
    member: SpaceParticipants;
    index: number;
    currentUserEmail?: string;
    onDelete?: (participantId: number) => void;
}



export default function TeamSpaceMemberItem({ member, index, currentUserEmail, onDelete }: TeamSpaceMemberItemProps){

    const spaceId = useSpaceStore((state) => state.currentSpace?.spaceId);

    console.log("Rendering TeamSpaceMemberItem for member:", member.role);

    const handleRoleChange = async(event: React.ChangeEvent<HTMLSelectElement>) => {
        // Handle role change logic here
        console.log(`멤버 ${member.nickname}의 역할이 ${event.target.value}로 변경되었습니다.`);
        
        const res = await SpaceAPI.patchSpaceParticipantRole(spaceId!, {
            email: member.email,
            role : ChangeSpaceRoleToValue(event.target.value as SpaceRole) 
        });
        
        console.log(res?.message);

        

    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onDelete) {
            onDelete(member.participantId);
        }
    };

    // 자기 자신인지 확인
    const isSelf = currentUserEmail && member.email === currentUserEmail;

    return(
            <li key={index} className ="flex flex-row justify-between px-2 py-2 items-center">

                <div className ="flex flex-row items-center gap-3">
                <Image
                    src={member.profileUrl || "/default-profile.png"}
                    alt="프로필 이미지"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                />

                <div className="flex flex-col">
                    <div>{member.nickname}</div>
                    <div className="text-sm text-gray-500">{member.email}</div>
                </div>
                </div>

                <div className="flex items-center gap-2">
                    <select name="" id=""
                    value ={ChangeSpaceRoleToValue(member.role)}
                    onChange={handleRoleChange}
                    className ="hover:bg-gray-200 p-1 border-gray-200
                    outline-none
                    rounded-md">
                        <option value={TeamSpaceRole.READ_ONLY}>읽기 허용</option>
                        <option value={TeamSpaceRole.EDIT}>편집 허용</option>
                        <option value={TeamSpaceRole.OWNER}>소유자</option>
                    </select>

                    {!isSelf && (
                        <button
                            type="button"
                            className="flex bg-red-500 rounded-full size-6 text-white justify-center items-center hover:bg-red-600 active:bg-red-700 cursor-pointer transition-colors"
                            onClick={handleDeleteClick}
                        >
                            -
                        </button>
                    )}
                </div>
            </li>
    )
}
