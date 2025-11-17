import XCircle from "../icon/XCircle";
import { AlarmItemProps } from "../item/AlarmItem";


export interface AlarmModalSmallHeaderProps {
    
    isRemoveModeState: boolean;
    selectedAlarms: Set<number>;
    alarmListState: AlarmItemProps[];
    handleRemoveAllClick: () => void;
}


export default function AlarmModalSmallHeader({
    isRemoveModeState,
    selectedAlarms,
    alarmListState,
    handleRemoveAllClick
}: AlarmModalSmallHeaderProps) {
    return(
        <div  className = "flex justify-between items-center pb-2">
                        <h3 className='text-sm pb-4'> 알림 내용 </h3>
                        {  isRemoveModeState &&
                        <div className = "flex gap-4 justify-center items-center">
                        <button onClick={handleRemoveAllClick} className="text-sm text-red-500 hover:text-red-700
                        active:text-red-900 flex items-center">
                            {selectedAlarms.size === alarmListState.length ? '전체 해제' : '전체 선택'}
                        </button>
                        
                        <button className ="w-8 h-8 flex justify-center items-center">
                            <XCircle className="size-6 stroke-red-500 hover:stroke-red-700 active:stroke-red-900" />
                        </button>
        
                        </div>
                        }
        </div>
    )
}