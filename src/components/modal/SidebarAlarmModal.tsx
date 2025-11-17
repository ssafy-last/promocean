import { useSidebar } from "@/contexts/SidebarContext";
import AlarmItem, { AlarmItemProps } from "../item/AlarmItem";
import { DeleteIcon } from "lucide-react";
import TrashDeleteIcon from "../icon/TrashDeleteIcon";
import { useState, useRef, useCallback, useEffect } from "react";
import AlarmList from "../list/AlarmList";
import AlarmModalHeader from "../layout/AlarmModalHeader";
import XCircle from "../icon/XCircle";
import AlarmModalSmallHeader from "../layout/AlarmModalSmallHeader";


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

    // 개별 알람 선택 상태 관리 (alarmId를 key로 사용)
    const [selectedAlarms, setSelectedAlarms] = useState<Set<number>>(new Set());

    const resizeRef = useRef<HTMLDivElement>(null);

    const MIN_WIDTH = 240; // 15rem
    const MAX_WIDTH = 448; // 28rem

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
        // 삭제 모드 해제 시 선택 상태 초기화
        if (isRemoveModeState) {
            setSelectedAlarms(new Set());
        }
    };

    const handleRemoveAllClick = () => {
        // 전체 선택/해제 토글
        if (selectedAlarms.size === alarmListState.length) {
            // 모두 선택된 상태 -> 전체 해제
            setSelectedAlarms(new Set());
        } else {
            // 일부만 선택되거나 아무것도 선택 안 됨 -> 전체 선택
            setSelectedAlarms(new Set(alarmListState.map(alarm => alarm.alarmId)));
        }
    };

    const handleAlarmToggle = (alarmId: number) => {
        setSelectedAlarms(prev => {
            const newSet = new Set(prev);
            if (newSet.has(alarmId)) {
                newSet.delete(alarmId);
            } else {
                newSet.add(alarmId);
            }
            return newSet;
        });
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
       ` }
       style={{
        width: isAlarm ? `${width}px` : '0px',
        transition: isResizingState ? 'none' : 'width 200ms, padding 200ms'
       }}
       >
 
             <AlarmModalHeader handleRemoveClick={handleRemoveClick}/>

             <AlarmModalSmallHeader
                isRemoveModeState={isRemoveModeState}
                selectedAlarms={selectedAlarms}
                alarmListState={alarmListState}
                handleRemoveAllClick={handleRemoveAllClick}
             />

            <AlarmList
                alarmListState={alarmListState}
                isRemove={isRemoveModeState}
                selectedAlarms={selectedAlarms}
                onAlarmToggle={handleAlarmToggle}
            />

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