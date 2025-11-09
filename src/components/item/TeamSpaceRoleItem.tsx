

export enum TeamSpaceRole {
    READ_ONLY = 10,
    EDIT = 20,
    OWNER = 30
}

export interface TeamSpaceRoleItemProps {
    member: string;
    index: number;
}



export default function TeamSpaceRoleItem({ member, index }: TeamSpaceRoleItemProps){

    return(
            <li key={index} className ="flex flex-row justify-between px-4 py-2">{member}
                <select name="" id="" className ="hover:bg-gray-200 p-1 border-gray-200
                outline-none
                rounded-md">
                    <option value={TeamSpaceRole.READ_ONLY}>읽기 허용</option>
                    <option value={TeamSpaceRole.EDIT}>편집 허용</option>
                    <option value={TeamSpaceRole.OWNER}>소유자</option>
                </select>
            </li>
    )
}