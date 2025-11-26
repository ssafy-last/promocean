// frontend/src/utils/alarmDeletionHandler.ts

import { AlarmItemProps } from '@/components/item/AlarmItem';
import { deleteAlarm, deleteAllAlarms } from '@/api/alarm';

/**
 * 알람 삭제 결과
 */
export interface AlarmDeletionResult {
  success: boolean;
  deletedCount: number;
  remainingAlarms?: AlarmItemProps[];
  error?: string;
}

/**
 * 선택된 알람들을 삭제
 * @param selectedAlarmIds - 삭제할 알람 ID 집합
 * @param alarmList - 현재 알람 목록
 * @returns 삭제 결과
 */
export async function deleteSelectedAlarms(
  selectedAlarmIds: Set<number>,
  alarmList: AlarmItemProps[]
): Promise<AlarmDeletionResult> {
  if (selectedAlarmIds.size === 0) {
    console.log('삭제할 알람이 선택되지 않았습니다.');
    return {
      success: false,
      deletedCount: 0,
      error: '삭제할 알람이 선택되지 않았습니다.',
    };
  }

  try {
    // 전체 선택된 경우 전체 삭제 API 호출
    if (selectedAlarmIds.size === alarmList.length) {
      console.log('🗑️ 전체 알람 삭제 중...');
      await deleteAllAlarms();
      console.log('✅ 전체 알람 삭제 완료');

      return {
        success: true,
        deletedCount: alarmList.length,
        remainingAlarms: [],
      };
    }

    // 개별 삭제 - Promise.all로 병렬 처리
    console.log(`🗑️ ${selectedAlarmIds.size}개의 알람 삭제 중...`);
    const deletePromises = Array.from(selectedAlarmIds).map((alarmId) => deleteAlarm(alarmId));

    await Promise.all(deletePromises);
    console.log('✅ 선택된 알람 삭제 완료');

    // 삭제된 알람을 제외한 목록 생성
    const remainingAlarms = alarmList.filter((alarm) => !selectedAlarmIds.has(alarm.alarmId));

    return {
      success: true,
      deletedCount: selectedAlarmIds.size,
      remainingAlarms,
    };
  } catch (error) {
    console.error('❌ 알람 삭제 실패:', error);
    return {
      success: false,
      deletedCount: 0,
      error: error instanceof Error ? error.message : '알람 삭제에 실패했습니다.',
    };
  }
}

/**
 * 전체 선택/해제 토글 처리
 * @param currentSelectedIds - 현재 선택된 알람 ID 집합
 * @param alarmList - 전체 알람 목록
 * @returns 업데이트된 선택 상태
 */
export function toggleAllAlarmSelection(
  currentSelectedIds: Set<number>,
  alarmList: AlarmItemProps[]
): Set<number> {
  if (currentSelectedIds.size === alarmList.length) {
    // 모두 선택된 상태 -> 전체 해제
    return new Set();
  } else {
    // 일부만 선택되거나 아무것도 선택 안 됨 -> 전체 선택
    return new Set(alarmList.map((alarm) => alarm.alarmId));
  }
}

/**
 * 개별 알람 선택 토글
 * @param alarmId - 토글할 알람 ID
 * @param currentSelectedIds - 현재 선택된 알람 ID 집합
 * @returns 업데이트된 선택 상태
 */
export function toggleAlarmSelection(
  alarmId: number,
  currentSelectedIds: Set<number>
): Set<number> {
  const newSet = new Set(currentSelectedIds);
  if (newSet.has(alarmId)) {
    newSet.delete(alarmId);
  } else {
    newSet.add(alarmId);
  }
  return newSet;
}
