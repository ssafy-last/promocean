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
                    key={item.postId}
                    postId={item.postId}
                    author={item.author}
                    profileUrl={item.profileUrl}
                    title={item.title}
                    type={item.type}
                    description={item.description}
                    category={item.category}
                    tags={item.tags}
                    likeCnt={item.likeCnt}
                    replyCnt={item.replyCnt}
                    image={item.image}
                />
            ))

          }
        
        </div>
        
    )

    
}