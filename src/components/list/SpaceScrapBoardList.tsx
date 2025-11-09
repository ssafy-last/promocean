import SpaceScrapItem from "../item/SpaceScrapItem";
import { SpaceScrapBoardItemProps } from "../item/SpaceScrapBoardItem";


export interface  SpaceScrapBoardListProps{
    itemList : SpaceScrapBoardItemProps[];
}


export default function SpaceScrapBoardList({itemList} : SpaceScrapBoardListProps){

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8 py-6">
          {
            itemList?.map((item, index) => (
                <SpaceScrapItem
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