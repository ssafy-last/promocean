import { useSidebar } from "@/contexts/SidebarContext";
import AlarmItem from "../item/AlarmItem";
import { DeleteIcon } from "lucide-react";
import TrashDeleteIcon from "../icon/TrashDeleteIcon";
import { useState } from "react";
import AlarmList from "../list/AlarmList";


export interface SidebarAlarmModalProps {
    isAlarm: boolean;
    setIsAlarm: (isAlarm:boolean) => void;
}


export default function SidebarAlarmModal({
    
    isAlarm,
    setIsAlarm

}: SidebarAlarmModalProps) {

    const { isCollapsed } = useSidebar();

    const [alarmListState, setAlarmListState] =  useState([
        {
            message: "새로운 댓글이 달렸습니다.",
            category: '스페이스',
            createdAt: '2020-01-01 12:00',
        },
        {
            message: "새로운 댓글이 달렸습니다.",
            category: '스페이스',
            createdAt: '2020-01-01 12:00',
        },
    ])


    return(
    <div className ={`
       fixed ${ isCollapsed ? 'left-16' : 'left-64'}  
       ${ isAlarm ? 'w-84' : 'w-0'} ${ isAlarm ? 'p-2' : 'p-0'}
       h-screen 
       flex flex-col transition-all  duration-200 z-50
       overflow-hidden shrink-0
        bg-[#fdfdfc] 
        border-r border-gray-200

       ` }>
 
            <div className ="flex justify-between items-center">
            <h2 className ="text-xl py-3"> 알림함 </h2>
             <button className = "hover:bg-gray-200 w-8 h-8 rounded-sm flex justify-center items-center">
                <TrashDeleteIcon className="size-5"/>
                </button> 
            </div>
           <h3 className='text-sm pb-4'> 알림 내용 </h3>
 
            <AlarmList alarmListState={alarmListState}/>
 
 
       </div>
    );

}