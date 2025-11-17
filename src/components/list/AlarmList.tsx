import AlarmItem, { AlarmItemProps } from "../item/AlarmItem";

export interface AlarmListProps {
    alarmListState : AlarmItemProps[];
    isRemove?: boolean;
    selectedAlarms?: Set<number>;
    onAlarmToggle?: (alarmId: number) => void;
}


export default function AlarmList({
    alarmListState,
    isRemove = false,
    selectedAlarms = new Set(),
    onAlarmToggle,
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
                            isChecked={selectedAlarms.has(alarmItem.alarmId)}
                            onToggle={onAlarmToggle}
                        />
                    ))}

            </div>
    )

}