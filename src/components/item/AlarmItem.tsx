
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
        <div className = "h-24 border-b border-gray-300 hover:bg-gray-200"> 
            <h2>{message}</h2>
            
            <p>{createdAt}</p>

        </div>
    )
}