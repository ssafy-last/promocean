

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
                    <option value="10">읽기만 허용</option>
                    <option value="20">편집 허용</option>
                    <option value="30">소유자</option>
                </select>
            </li>
    )
}