'use client';

import { useRouter } from "next/navigation";

enum AlarmCategory {
    "TEAM_INVITATION" = 0,
    "CONTEST_NOTICE" = 1,
    "POST_REPLY" = 2,
}

// 시간을 사용자 친화적으로 표시하는 함수
function getRelativeTime(dateString: string): string {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now.getTime() - past.getTime();

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    // 1분 미만
    if (minutes < 1) return '방금 전';

    // n분 전 (60분 미만)
    if (minutes < 60) return `${minutes}분 전`;

    // n시간 전 (24시간 미만)
    if (hours < 24) return `${hours}시간 전`;

    // 날짜가 바뀌었지만 한 달 미만 - month/day 형식
    if (days < 30) {
        const month = past.getMonth() + 1;
        const day = past.getDate();
        return `${month}/${day}`;
    }

    // n달 전 (12개월 미만)
    if (months < 12) return `${months}달 전`;

    // n년 전
    return `${years}년 전`;
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
         router.push(`/community/${postId}`)
    }
    

    //팀초대 TEAM_INVITATION = 0,
    //대회 공지 CONTEST_NOTICE = 1
    //댓글 POST_REPLY = 2

    // [ ]안에 있는 문자 파싱 
    const messageHeading = message.split('[')[0];
    const messageParts = message.match(/\[(.*?)\]/g)?.map(part => part.replace(/[\[\]]/g, '')) || [];

    console.log("AlarmItem 메시지 헤딩:", messageHeading);
    console.log("AlarmItem 메시지 파싱:", messageParts);


    return(
        <button className={`flex flex-row items-center justify-between h-20 p-4 border-b w-full
            ${isRemove && isChecked
                ? 'bg-blue-50 border-blue-300 border-b-2'
                : 'border-gray-300 hover:bg-gray-200 hover:cursor-pointer active:bg-gray-300 active:border-primary active:border-b-2'
            }
            transition-colors duration-150
        `}
        onClick={handleItemClick}
        >
            {/* 메인 컨텐츠 영역 */}
            <div className="flex flex-col gap-1 flex-1 min-w-0 text-left">
                {/* 첫 번째 줄: 제목 + 시간 */}
                <div className="flex items-center justify-between gap-2">
                    <span className="text-base font-medium truncate flex-1">{messageHeading}</span>
                    <span className="text-xs text-gray-500 whitespace-nowrap shrink-0">{getRelativeTime(createdAt)}</span>
                </div>
                {/* 두 번째 줄: 내용 */}
                <div className="text-sm text-gray-400 truncate">
                    {messageParts.join(' ')}
                </div>
            </div>

            {/* 체크박스 영역 */}
            {isRemove && (
                <input
                    type="checkbox"
                    className="ml-3 size-5 accent-blue-500 cursor-pointer shrink-0"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            )}
        </button>
    )
}