// frontend/src/components/modal/SidebarAlarmModal.tsx

import { useSidebar } from '@/contexts/SidebarContext';
import { AlarmItemProps } from '../item/AlarmItem';
import { useState, useRef, useCallback, useEffect } from 'react';
import AlarmList from '../list/AlarmList';
import AlarmModalHeader from '../layout/AlarmModalHeader';
import AlarmModalSmallHeader from '../layout/AlarmModalSmallHeader';
import { useAlarmSSE } from '@/hooks/useAlarmSSE';
import {
  deleteSelectedAlarms,
  toggleAllAlarmSelection,
  toggleAlarmSelection,
} from '@/utils/alarmDeletionHandler';

export interface SidebarAlarmModalProps {
  alarmListState: AlarmItemProps[];
  setAlarmListState: React.Dispatch<React.SetStateAction<AlarmItemProps[]>>;
  isAlarm: boolean;
  setIsAlarm: (isAlarm: boolean) => void;
  setHasNewAlarm: (hasNew: boolean) => void;
  alarmButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

export default function SidebarAlarmModal({
  alarmListState = [],
  setAlarmListState,
  isAlarm,
  setIsAlarm,
  setHasNewAlarm,
  alarmButtonRef,
}: SidebarAlarmModalProps) {
  const { isCollapsed } = useSidebar();

  // 리사이즈 관련 상태
  const [width, setWidth] = useState(384); // 기본값 24rem = 384px
  const [isResizingState, setIsResizingState] = useState(false);
  const [isRemoveModeState, setIsRemoveModeState] = useState(false);
  const [showText, setShowText] = useState(true); // 텍스트 표시 여부
  const showTextTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 개별 알람 선택 상태 관리 (alarmId를 key로 사용)
  const [selectedAlarms, setSelectedAlarms] = useState<Set<number>>(new Set());

  const resizeRef = useRef<HTMLDivElement>(null);
  const isResizingRef = useRef(false);

  const MIN_WIDTH = 240; // 15rem
  const MAX_WIDTH = 448; // 28rem

  // 리사이즈 핸들러
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizingRef.current = true;
    setIsResizingState(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizingRef.current || !resizeRef.current) return;

    const containerLeft = resizeRef.current.getBoundingClientRect().left;
    const newWidth = e.clientX - containerLeft;

    // 최소/최대 폭 제한
    if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
      setWidth(newWidth);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizingRef.current = false;
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

  // 삭제 모드 토글
  const handleRemoveClick = () => {
    console.log('알림 삭제 클릭됨');
    setIsRemoveModeState(!isRemoveModeState);
    // 삭제 모드 해제 시 선택 상태 초기화
    if (isRemoveModeState) {
      setSelectedAlarms(new Set());
    }
  };

  // 전체 선택/해제 토글
  const handleRemoveAllClick = () => {
    const newSelection = toggleAllAlarmSelection(selectedAlarms, alarmListState);
    setSelectedAlarms(newSelection);
  };

  // 개별 알람 선택 토글
  const handleAlarmToggle = (alarmId: number) => {
    const newSelection = toggleAlarmSelection(alarmId, selectedAlarms);
    setSelectedAlarms(newSelection);
  };

  // 선택된 알람 삭제
  const handleDeleteSelectedAlarms = async () => {
    const result = await deleteSelectedAlarms(selectedAlarms, alarmListState);

    if (result.success) {
      // 상태 업데이트
      if (result.remainingAlarms !== undefined) {
        setAlarmListState(result.remainingAlarms);
      }
      setSelectedAlarms(new Set());
      setIsRemoveModeState(false);
    } else {
      alert(result.error || '알람 삭제 중 오류가 발생했습니다.');
    }
  };

  // SSE 연결 설정
  useAlarmSSE(setAlarmListState, setHasNewAlarm, isAlarm);

  // isAlarm 변경 시 텍스트 표시/숨김 처리
  useEffect(() => {
    // 기존 timeout 정리
    if (showTextTimeoutRef.current) {
      clearTimeout(showTextTimeoutRef.current);
      showTextTimeoutRef.current = null;
    }

    if (isAlarm) {
      // 열릴 때: transition이 끝난 후 텍스트 표시
      showTextTimeoutRef.current = setTimeout(() => {
        setShowText(true);
        showTextTimeoutRef.current = null;
      }, 200);
    } else {
      // 닫힐 때: 즉시 텍스트 숨김
      showTextTimeoutRef.current = setTimeout(() => {
        setShowText(false);
        showTextTimeoutRef.current = null;
      }, 0);
    }

    return () => {
      if (showTextTimeoutRef.current) {
        clearTimeout(showTextTimeoutRef.current);
        showTextTimeoutRef.current = null;
      }
    };
  }, [isAlarm]);

  // 바깥 클릭 감지
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAlarm) return;

    const handleClickOutside = (e: MouseEvent) => {
      // 알림 버튼 클릭은 무시
      if (alarmButtonRef?.current && alarmButtonRef.current.contains(e.target as Node)) {
        return;
      }

      // 모달 외부를 클릭했는지 확인
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsAlarm(false);
      }
    };

    // 약간의 지연을 두고 이벤트 리스너 등록 (모달이 열리는 클릭과 충돌 방지)
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAlarm, setIsAlarm, alarmButtonRef]);

  // transition 완료 핸들러
  const handleTransitionEnd = useCallback((e: React.TransitionEvent) => {
    if (e.propertyName === 'width') {
      // 필요시 처리
    }
  }, []);

  return (
    <div
      ref={(node) => {
        if (modalRef) modalRef.current = node;
        if (resizeRef) resizeRef.current = node;
      }}
      onTransitionEnd={handleTransitionEnd}
      className={`
       fixed ${isCollapsed ? 'left-16' : 'left-52'}
       ${isAlarm ? 'p-2' : 'p-0'}
       h-screen
       flex flex-col z-50
       overflow-hidden shrink-0
        bg-[#fdfdfc]
        border-r border-gray-200
       `}
      style={{
        width: isAlarm ? `${width}px` : '0px',
        transition: isResizingState ? 'none' : 'width 200ms, padding 200ms',
      }}
    >
      {showText && (
        <>
          <AlarmModalHeader handleRemoveClick={handleRemoveClick} />

          <AlarmModalSmallHeader
            isRemoveModeState={isRemoveModeState}
            selectedAlarms={selectedAlarms}
            alarmListState={alarmListState}
            handleRemoveAllClick={handleRemoveAllClick}
            handleDeleteClick={handleDeleteSelectedAlarms}
          />
        </>
      )}

      {showText && (
        <AlarmList
          alarmListState={alarmListState}
          isRemove={isRemoveModeState}
          selectedAlarms={selectedAlarms}
          onAlarmToggle={handleAlarmToggle}
        />
      )}

      {/* 리사이즈 핸들 */}
      {isAlarm && (
        <div
          onMouseDown={handleMouseDown}
          className={`
                        absolute top-0 right-0 w-2 h-full z-100
                        cursor-ew-resize hover:bg-primary
                        transition-colors duration-150
                        ${isResizingState ? 'bg-primary' : 'bg-transparent'}
                    `}
        />
      )}
    </div>
  );
}
