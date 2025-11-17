import AlarmItem, { AlarmItemProps } from "../item/AlarmItem";

export interface AlarmListProps {
    alarmListState : AlarmItemProps[];
}


export default function AlarmList({
    alarmListState
}: AlarmListProps) {
    return(
             <div className = "flex flex-col">
                    {alarmListState.map((alarmItem, index) => (
                        <AlarmItem
                            key={index}
                            message={alarmItem.message}
                            category={alarmItem.category}
                            createdAt={alarmItem.createdAt}
                        />
                    ))}
                       
            </div>
    )

}