

export interface SpaceAddMemberItemProps {
    name : string,
    email : string
    handleMemberClick?: (memberName: string) => void;
}



export default function SpaceAddMemberItem({name, email, handleMemberClick}: SpaceAddMemberItemProps){

    return(
        <button 
        type="button"
        className ="flex flex-row w-full px-4 py-1 gap-3 items-center hover:bg-current/5 active:bg-current/10
        rounded-md"
        onClick={()=>{handleMemberClick?.(name)}}
        >
            <div className = "rounded-full bg-gray-200 border w-10 h-10"></div>
            <div className = "text-left">
                <span className="font-medium text">{name}</span>
                <p className="text-sm text-gray-400">{email}</p>
            </div>
        </button>
    )

}