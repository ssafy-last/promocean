"use client";

import { useState } from "react";
import SpaceScrapItem from "../item/SpaceScrapItem";
import { SpaceScrapBoardItemProps } from "../item/SpaceScrapBoardItem";


export interface  SpaceScrapBoardListProps{
    itemList : SpaceScrapBoardItemProps[];
}


export default function SpaceScrapBoardList({itemList} : SpaceScrapBoardListProps){
    const [scrapList, setScrapList] = useState(itemList);

    const handleScrapToggle = (id: string) => {
        // 해당 id를 가진 아이템을 리스트에서 제거
        setScrapList(prevList => prevList.filter(item => item.id !== id));
        console.log(`게시물 ID ${id} 스크랩 해제됨`);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8 py-6">
          {
            scrapList?.map((item, index) => (
                <SpaceScrapItem
                    key={item.id}
                    id = {item.id}
                    title = {item.title}
                    userName = {item.userName}
                    userImage={item.userImage}
                    category={item.category}
                    tags={item.tags}
                    likeCnt={item.likeCnt}
                    replyCnt={item.replyCnt}
                    image={item.image}
                    likeCount={item.likeCount}
                    onScrapToggle={handleScrapToggle}
                />
            ))
          }
        </div>
    )
}