import { useSidebar } from "@/contexts/SidebarContext";
import AlarmItem, { AlarmItemProps } from "../item/AlarmItem";
import { DeleteIcon } from "lucide-react";
import TrashDeleteIcon from "../icon/TrashDeleteIcon";
import { useState, useRef, useCallback, useEffect } from "react";
import AlarmList from "../list/AlarmList";
import AlarmModalHeader from "../layout/AlarmModalHeader";
import XCircle from "../icon/XCircle";
import AlarmModalSmallHeader from "../layout/AlarmModalSmallHeader";
import { connectAlarmSSE, disconnectAlarmSSE, AlarmEvent } from "@/api/alarm";


export interface SidebarAlarmModalProps {
    alarmListState: AlarmItemProps[];
    setAlarmListState: (list: AlarmItemProps[]) => void;
    isAlarm: boolean;
    setIsAlarm: (isAlarm:boolean) => void;
}


export default function SidebarAlarmModal({
    alarmListState = [],
    setAlarmListState,
    isAlarm,
    setIsAlarm

}: SidebarAlarmModalProps) {

    const { isCollapsed } = useSidebar();


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

    // SSE 연결 설정
    useEffect(() => {
        let eventSource: EventSource | null = null;

        const handleAlarmMessage = (event: AlarmEvent) => {
            console.log('🔔 알람 핸들러 호출됨:', event);

            try {
                // 서버에서 보낸 데이터 파싱 (JSON 형식으로 가정)
                console.log('📦 파싱 전 데이터:', event.data);
                const alarmData = JSON.parse(event.data);
                console.log('✅ 파싱된 데이터:', alarmData);

                // 새 알람을 목록에 추가
                const newAlarm: AlarmItemProps = {
                    alarmId: alarmData.alarmId || Date.now(), // 고유 ID
                    message: alarmData.message || '새로운 알림이 도착했습니다.',
                    category: alarmData.category || '알림',
                    createdAt: alarmData.createdAt || new Date().toISOString(),
                    spaceId: alarmData.spaceId,
                    contestId: alarmData.contestId,
                    noticeId: alarmData.noticeId,
                    postId: alarmData.postId,
                    replyId: alarmData.replyId,
                };

                console.log('➕ 알람 추가:', newAlarm);
                setAlarmListState((prev : AlarmItemProps[]) => {
                    const updated = [newAlarm, ...prev];
                    console.log('📋 업데이트된 알람 목록:', updated);
                    return updated;
                });
            } catch (error) {
                console.error('❌ 알람 데이터 파싱 실패:', error);
                console.error('원본 데이터:', event.data);
            }
        };

        const handleAlarmError = (error: Event) => {
            console.error('⚠️ SSE 연결 오류 (핸들러):', error);
        };

        try {
            // SSE 연결 시작
            eventSource = connectAlarmSSE(handleAlarmMessage, handleAlarmError);
            console.log('🚀 알람 SSE 연결 시작');
            console.log('📡 연결 상태:', eventSource.readyState);
            console.log('🌐 연결 URL:', eventSource.url);
        } catch (error) {
            console.error('❌ SSE 연결 실패:', error);
        }

        // 컴포넌트 언마운트 시 연결 해제
        return () => {
            if (eventSource) {
                console.log('🔌 알람 SSE 연결 해제');
                disconnectAlarmSSE(eventSource);
            }
        };
    }, []); // 빈 배열: 컴포넌트 마운트 시 한 번만 실행



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