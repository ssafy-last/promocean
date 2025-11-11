import TeamSpaceTeamChoiceItem, { TeamSpaceChoiceItemProps } from "../item/TeamSpaceTeamChoiceItem"


export interface TeamSpaceTeamChoiceListProps {
    teamSpaceTeamChoiceList : TeamSpaceChoiceItemProps[]
}


export default function TeamSpaceTeamChoiceList({teamSpaceTeamChoiceList} : TeamSpaceTeamChoiceListProps){
        
    return(
          <div className="flex-1 px-5 grid grid-cols-4 auto-rows-max gap-x-7 gap-y-10">
                {
                    teamSpaceTeamChoiceList?.map((item, index) => (
                        <TeamSpaceTeamChoiceItem

                            key={index}
                            image={item.image}
                            title={item.title}
                            description={item.description}
                        />
                    ))
                }
          </div>

    )
}