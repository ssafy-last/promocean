

export interface SpaceAddMemberItemProps {
    name : string,
    email : string
    isMinusButton? :boolean;
    handleMemberClick?: (memberName: string) => void;
}



export default function SpaceAddMemberItem({name, email, handleMemberClick, isMinusButton=true}: SpaceAddMemberItemProps){

    return(
        <button 
        type="button"
        className ="flex flex-row w-full justify-between px-4 py-1 gap-3 items-center hover:bg-current/5 
        rounded-md"
        onClick={()=>{handleMemberClick?.(name)}}
        >
            <div className="flex gap-3 items-center justify-center-safe">
            <div className = "rounded-full bg-gray-200 border w-10 h-10"></div>
            <div className = "text-left">
                <span className="font-medium text">{name}</span>
                <p className="text-sm text-gray-400">{email}</p>
            </div>
            </div>

            {isMinusButton && ( 
            <div className = "flex flex-col">
            <button className="flex bg-primary rounded-full size-5 text-white justify-center items-center hover:bg-primary/70 active:bg-primary/100"
            onClick={(e)=>{e.preventDefault()}}>-</button>
            </div>
            )}
        </button>
    )

}