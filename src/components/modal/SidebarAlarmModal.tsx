import { useSidebar } from "@/contexts/SidebarContext";
import AlarmItem, { AlarmItemProps } from "../item/AlarmItem";
import { DeleteIcon } from "lucide-react";
import TrashDeleteIcon from "../icon/TrashDeleteIcon";
import { useState, useRef, useCallback, useEffect } from "react";
import AlarmList from "../list/AlarmList";
import AlarmModalHeader from "../layout/AlarmModalHeader";


export interface SidebarAlarmModalProps {
    isAlarm: boolean;
    setIsAlarm: (isAlarm:boolean) => void;
}


export default function SidebarAlarmModal({

    isAlarm,
    setIsAlarm

}: SidebarAlarmModalProps) {

    const { isCollapsed } = useSidebar();

    const [alarmListState, setAlarmListState]   =  useState<AlarmItemProps[]>([
        {
            alarmId:1,
            message: "새로운 댓글이 달렸습니다.",
            category: '스페이스',
            createdAt: '2020-01-01 12:00',
        },
        {
            alarmId:2,
            message: "새로운 댓글이 달렸습니다.",
            category: '스페이스',
            createdAt: '2020-01-01 12:00',
        },
    ])

    // 리사이즈 관련 상태
    const [width, setWidth] = useState(384); // 기본값 24rem = 384px
    const [isResizingState, setIsResizingState] = useState(false);
    const [isRemoveModeState, setIsRemoveModeState] = useState(false);
    const [removeToggleState, setRemoveToggleState] = useState(false);

    const resizeRef = useRef<HTMLDivElement>(null);

    const MIN_WIDTH = 240; // 15rem
    const MAX_WIDTH = 384; // 24rem

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizingState(true);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isResizingState || !resizeRef.current) return;

        const containerLeft = resizeRef.current.getBoundingClientRect().left;
        const newWidth = e.clientX - containerLeft;

        // 최소/최대 폭 제한
        if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
            setWidth(newWidth);
        }
    }, [isResizingState]);

    const handleMouseUp = useCallback(() => {
        setIsResizingState(false);
    }, []);

    // 마우스 이벤트 리스너 등록
    useEffect(() => {
        if (isResizingState) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isResizingState, handleMouseMove, handleMouseUp]);

    const handleRemoveClick = () => {
        // 알림 삭제 로직 구현
        console.log("알림 삭제 클릭됨");
        setIsRemoveModeState(!isRemoveModeState);
    };

    const handleRemoveAllClick = () => {    
        // 전체 알림 삭제 로직 구현
        console.log("전체 알림 삭제 클릭됨", removeToggleState);
        setRemoveToggleState(!removeToggleState);


    };



    return(
    <div
        ref={resizeRef}
        className ={`
       fixed ${ isCollapsed ? 'left-16' : 'left-64'}
       ${ isAlarm ? 'p-2' : 'p-0'}
       h-screen
       flex flex-col z-50
       overflow-hidden shrink-0
        bg-[#fdfdfc]
        border-r border-gray-200
        ${isAlarm ? '' : 'transition-all duration-200'}
       ` }
       style={{
        width: isAlarm ? `${width}px` : '0px',
        transition: isResizingState ? 'none' : isAlarm ? 'none' : 'width 200ms'
       }}
       >
 
             <AlarmModalHeader handleRemoveClick={handleRemoveClick}/>

             <div  className = "flex justify-between items-center ">
                <h3 className='text-sm pb-4'> 알림 내용 </h3>
                {  isRemoveModeState &&
                <button onClick={handleRemoveAllClick} className="text-sm text-red-500 hover:text-red-700
                active:text-red-900 flex items-center">
                    전체 삭제 {isRemoveModeState}
                </button>
                }
            </div>

            <AlarmList alarmListState={alarmListState} isRemove={isRemoveModeState}
            removeToggle={removeToggleState}/>

            {/* 리사이즈 핸들 */}
            {isAlarm && (
                <div
                    onMouseDown={handleMouseDown}
                    className={`
                        absolute top-0 right-0 w-1 h-full
                        cursor-ew-resize hover:bg-blue-500
                        transition-colors duration-150
                        ${isResizingState ? 'bg-blue-500' : 'bg-transparent'}
                    `}
                />
            )}

       </div>
    );

}