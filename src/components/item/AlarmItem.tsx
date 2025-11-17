
export interface AlarmItemProps {
    alarmId: number;
    message: string;
    category:string;
    createdAt : string;
    spaceId? : number;
    contestId? :number;
    noticeId? : number;
    postId? :number;
    replyId? : number;
    isRemove?: boolean;
    isChecked?: boolean;
    onToggle?: (alarmId: number) => void;
}



export default function AlarmItem(
{
    alarmId,
    message,
    category,
    createdAt,
    spaceId,
    contestId,
    noticeId,
    postId,
    replyId,
    isRemove = false,
    isChecked = false,
    onToggle,

}: AlarmItemProps,
) {

    const handleCheckboxChange = () => {
        if (onToggle) {
            onToggle(alarmId);
        }
    }


    return(
        <div >
        <button className = "flex flex-col items-start justify-between h-24 p-2  border-b border-gray-300 hover:bg-gray-200 hover:cursor-pointer active:bg-gray-300 active:border-primary active:border-b-2 w-full  group-checked:bg-gray-300">
            <h4 className = "text-base">{message}</h4>

            {isRemove?
            <input
                type="checkbox"
                className="self-end size-5 group-checked:bg-primary"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            :
            <div className ="w-full flex justify-between">
                <div></div>
                <div className = "flex flex-col items-end">
                <p className = "text-sm">{category}</p>
                <p className = "text-xs">{createdAt}</p>
                </div>
            </div>
            }
        </button>
        </div>
    )
}