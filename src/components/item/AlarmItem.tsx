
export interface AlarmItemProps {
    message: string;
    category:string;
    createdAt : string;
    spaceId? : number;
    contestId? :number;
    noticeId? : number;
    postId? :number;
    replyId? : number;
}



export default function AlarmItem(
{
    message,
    category,
    createdAt,
    spaceId,
    contestId,
    noticeId,
    postId,
    replyId
}: AlarmItemProps

) {

    return(
        <div className = "h-24 p-2  border-b border-gray-300 hover:bg-gray-200"> 
            <h4 className = "text-base">{message}</h4>

            <div>
            <p className = "text-sm">{category}</p>
            <p className = "text-xs">{createdAt}</p>
            </div>
        </div>
    )
}