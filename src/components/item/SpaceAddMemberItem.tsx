

export interface SpaceAddMemberItemProps {
    name : string,
    email : string

}



export default function SpaceAddMemberItem({name, email}: SpaceAddMemberItemProps){

    return(
        <div className ="flex flex-row px-4 py-1 gap-3 items-center hover:bg-current/5 active:bg-current/10">
            <div className = "rounded-full bg-gray-200 border w-10 h-10"></div>
            <div>
                <span className="font-medium text-lg">{name}</span>
                <p className="text-gray-400">{email}</p>
            </div>
        </div>
    )

}