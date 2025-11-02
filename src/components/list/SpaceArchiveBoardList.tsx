import SpaceArchiveBoardItem, { SpaceArchiveBoardItemProps } from "../item/SpaceArchiveBoardItem"



export interface SpaceArchiveBoardListProps{
    mySpaceBoardList : SpaceArchiveBoardItemProps[]
}



export default function SpaceArchiveBoardList({mySpaceBoardList} : SpaceArchiveBoardListProps){

        return(
        <div className="flex flex-col px-4 gap-2">
        {
            mySpaceBoardList?.map((item, index) => (
                <SpaceArchiveBoardItem
                    key={index}
                    id={item.id}
                    category={item.category}
                    title={item.title}
                    hashtags={item.hashtags}
                    image={item.image}
                />
            ))
        }
        </div>
        )
}