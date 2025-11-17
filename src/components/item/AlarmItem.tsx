'use client';

import { useRouter } from "next/navigation";

enum AlarmCategory {
    "TEAM_INVITATION" = 0,
    "CONTEST_NOTICE" = 1,
    "POST_REPLY" = 2,
}


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

    //console.log("AlarmItem 렌더링:", { postId, replyId, spaceId, contestId, noticeId });

    const router = useRouter();
    const handleCheckboxChange = () => {
        if (onToggle) {
            onToggle(alarmId);
        }
    }

    const handleItemClick = () =>{
        if(isRemove) return;
         router.push(`/commuity/${postId}`)
    }

    //팀초대 TEAM_INVITATION = 0,
    //대회 공지 CONTEST_NOTICE = 1
    //댓글 POST_REPLY = 2


    return(
        <div >
        <button className={`
            flex flex-col items-start justify-between h-20 p-2 border-b w-full
            ${isRemove && isChecked
                ? 'bg-blue-50 border-blue-300 border-b-2'
                : 'border-gray-300 hover:bg-gray-200 hover:cursor-pointer active:bg-gray-300 active:border-primary active:border-b-2'
            }
            transition-colors duration-150
        `}
        onClick={handleItemClick}
        >
            <h4 className = "text-base">{message}</h4>

            {isRemove?
            <input
                type="checkbox"
                className="self-end size-5 accent-blue-500 cursor-pointer"
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