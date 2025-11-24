// frontend/src/utils/alarmMessageParser.ts

import { AlarmItemProps } from '@/components/item/AlarmItem';
import { AlarmEvent } from '@/api/alarm';

/**
 * SSE 메시지 파싱 결과
 */
export interface ParsedAlarmResult {
  success: boolean;
  data?: AlarmItemProps;
  error?: string;
  isConnectionMessage?: boolean;
}

/**
 * 알람 카테고리별 필수 필드 검증
 */
export function validateAlarmByCategory(alarmData: any): boolean {
  if (!alarmData.category || alarmData.alarmId === undefined) {
    return false;
  }

  // 카테고리별 필수 필드 확인
  switch (alarmData.category) {
    case 'POST_REPLY':
      return alarmData.postId !== undefined && alarmData.replyId !== undefined;
    case 'CONTEST_NOTICE':
      return alarmData.contestId !== undefined && alarmData.noticeId !== undefined;
    case 'TEAM_INVITATION':
      return alarmData.spaceId !== undefined;
    default:
      return false;
  }
}

/**
 * JSON 이중 인코딩 처리를 위한 파싱
 */
export function parseDoubleEncodedJSON(data: string): any {
  try {
    let parsedData = JSON.parse(data);
    console.log('✅ 1차 파싱된 데이터:', parsedData);

    // 이중 인코딩 체크: 파싱 결과가 문자열이면 한번 더 파싱
    if (typeof parsedData === 'string') {
      console.log('🔄 이중 인코딩 감지, 2차 파싱 시도');
      parsedData = JSON.parse(parsedData);
      console.log('✅ 2차 파싱된 데이터:', parsedData);
    }

    return parsedData;
  } catch (error) {
    console.error('❌ JSON 파싱 실패:', error);
    throw error;
  }
}

/**
 * SSE 알람 메시지를 파싱하고 검증
 * @param event - SSE 이벤트
 * @returns 파싱된 알람 데이터 또는 에러
 */
export function parseAlarmMessage(event: AlarmEvent): ParsedAlarmResult {
  console.log('🔔 알람 핸들러 호출됨:', event);

  try {
    // SSE 연결 확인 메시지는 무시
    if (event.data === 'EventStream Created') {
      console.log('✅ SSE 연결 확인 메시지 수신');
      return {
        success: true,
        isConnectionMessage: true,
      };
    }

    // 서버에서 보낸 데이터 파싱
    console.log('📦 파싱 전 데이터:', event.data);
    console.log('📦 파싱 전 데이터 타입:', typeof event.data);

    // JSON 파싱 (이중 인코딩 처리)
    const parsedData = parseDoubleEncodedJSON(event.data);

    // 중첩된 데이터 구조 처리: 실제 알람 데이터는 data 필드 안에 있을 수 있음
    const alarmData = parsedData.data || parsedData;
    console.log('✅ 최종 파싱된 데이터:', alarmData);
    console.log('✅ category:', alarmData.category);

    // 유효성 검증: 빈 객체 체크
    if (!alarmData || typeof alarmData !== 'object' || Object.keys(alarmData).length === 0) {
      console.warn('⚠️ 빈 객체 또는 유효하지 않은 데이터 무시:', alarmData);
      return {
        success: false,
        error: '빈 객체 또는 유효하지 않은 데이터',
      };
    }

    // 카테고리별 필수 필드 확인
    if (!validateAlarmByCategory(alarmData)) {
      console.error('❌ 필수 필드가 누락된 알람:', alarmData);
      return {
        success: false,
        error: '필수 필드 누락',
      };
    }

    // 새 알람 객체 생성
    const newAlarm: AlarmItemProps = {
      alarmId: alarmData.alarmId,
      message: alarmData.message,
      category: alarmData.category,
      createdAt: alarmData.createdAt || new Date().toISOString(),
      spaceId: alarmData.spaceId,
      contestId: alarmData.contestId,
      noticeId: alarmData.noticeId,
      postId: alarmData.postId,
      replyId: alarmData.replyId,
    };

    console.log('➕ 알람 추가:', newAlarm);

    return {
      success: true,
      data: newAlarm,
    };
  } catch (error) {
    console.error('❌ 알람 데이터 파싱 실패:', error);
    console.error('원본 데이터:', event.data);
    return {
      success: false,
      error: error instanceof Error ? error.message : '알람 파싱 실패',
    };
  }
}
