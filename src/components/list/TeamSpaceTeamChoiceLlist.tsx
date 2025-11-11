import TeamSpaceTeamChoiceItem, { TeamSpaceChoiceItemProps } from "../item/TeamSpaceTeamChoiceItem"


export interface TeamSpaceTeamChoiceListProps {
    teamSpaceTeamChoiceList : TeamSpaceChoiceItemProps[]
}


export default function TeamSpaceTeamChoiceList({teamSpaceTeamChoiceList} : TeamSpaceTeamChoiceListProps){
    console.log("팀 스페이스 리스트 in list ", teamSpaceTeamChoiceList);
    return(
          <div className="flex-1 px-5 grid grid-cols-4 auto-rows-max gap-x-7 gap-y-10">
                {
                    teamSpaceTeamChoiceList?.map((item, index) => (
                        <TeamSpaceTeamChoiceItem

                            key={index}
                            spaceCoverUrl={item.spaceCoverUrl}
                            name={item.name}
                            description={item.description}
                            participantCnt={item.participantCnt}
                            spaceId={item.spaceId}
                        />
                    ))
                }
          </div>

    )
}