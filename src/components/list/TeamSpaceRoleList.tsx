import TeamSpaceRoleItem from "../item/TeamSpaceRoleItem";



export interface TeamSpaceRoleListProps {
    memberListState: string[];
}


export default function TeamSpaceRoleList({ memberListState }: TeamSpaceRoleListProps){

    return(

            <ul className ="flex flex-col gap-3 w-full py-2 [&>li]:rounded-md [&>li]:px-2 [&>li:hover]:bg-gray-100
                overflow-y-scroll max-h-60">

                    {memberListState.map((member, index) => (
                        <TeamSpaceRoleItem key={index} member={member} index={index} />
                    ))}

                </ul>


    )

}