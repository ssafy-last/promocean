import SpaceScrapBoardItem, { SpaceScrapBoardItemProps } from "../item/SpaceScrapBoardItem";


export interface  SpaceScrapBoardListProps{
    itemList : SpaceScrapBoardItemProps[];
}


export default function SpaceScrapBoardList({itemList} : SpaceScrapBoardListProps){

    return (
        <div className="flex flex-col px-4 gap-2">
          {

            itemList?.map((item, index) => (
                <SpaceScrapBoardItem
                    key={index}
                    id = {item.id}
                    title = {item.title}
                    userName = {item.userName}
                    userImage={item.userImage}
                    category={item.category}
                    commentCount={item.commentCount}
                    hashtags={item.hashtags}
                    image={item.image}
                    likeCount={item.likeCount}
                />
            ))

          }
        
        </div>
        
    )

    
}