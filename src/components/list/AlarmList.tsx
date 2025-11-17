import AlarmItem, { AlarmItemProps } from "../item/AlarmItem";

export interface AlarmListProps {
    alarmListState : AlarmItemProps[];
    isRemove?: boolean;
    removeToggle?: boolean;

}


export default function AlarmList({
    alarmListState,
    isRemove = false,
    removeToggle = false,
}: AlarmListProps) {
    return(
             <div className = "flex flex-col">
                    {alarmListState.map((alarmItem, index) => (
                        <AlarmItem
                            key={index}
                            alarmId={alarmItem.alarmId}
                            message={alarmItem.message}
                            category={alarmItem.category}
                            createdAt={alarmItem.createdAt}
                            isRemove={isRemove}
                            removeToggle={removeToggle}
                        />
                    ))}
                       
            </div>
    )

}