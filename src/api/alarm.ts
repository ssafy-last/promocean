// frontend/src/api/alarm.ts

import { BASE_URL } from '@/api/fetcher';
import { getAuthToken } from '@/lib/authToken';

export interface AlarmEvent {
  id?: string;
  event?: string;
  data: string;
}

export type AlarmEventHandler = (event: AlarmEvent) => void;

// MessageEvent 타입 확장 (lastEventId는 MessageEvent에 이미 string으로 정의되어 있음)
interface MessageEventWithLastEventId extends MessageEvent<string> {
  readonly lastEventId: string;
}

/**
 * SSE(Server-Sent Events)를 사용한 알람 연결
 * EventSource는 Last-Event-ID 헤더를 자동으로 관리합니다.
 * 수동으로 Last-Event-ID를 설정하려면 connectAlarmSSEWithFetch를 사용하세요.
 * @param onMessage - 알람 메시지를 받았을 때 실행할 콜백 함수
 * @param onError - 에러가 발생했을 때 실행할 콜백 함수
 * @returns EventSource 객체 (연결 해제를 위해)
 */
export function connectAlarmSSE(
  onMessage: AlarmEventHandler,
  onError?: (error: Event) => void
): EventSource {
  const token = getAuthToken();

  if (!token) {
    throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
  }

  // EventSource는 GET 요청만 가능하므로 token을 쿼리 파라미터로 전달
  const url = `${BASE_URL}/api/v1/alarms/connect?token=${encodeURIComponent(token)}`;

  const eventSource = new EventSource(url);

  eventSource.onmessage = (event: MessageEvent) => {
    try {
      onMessage({
        id: (event as MessageEventWithLastEventId).lastEventId,
        data: event.data,
      });
    } catch (error) {
      console.error('알람 메시지 처리 중 에러:', error);
    }
  };

  eventSource.onerror = (error: Event) => {
    console.error('SSE 연결 에러:', error);
    if (onError) {
      onError(error);
    }
  };

  return eventSource;
}

/**
 * fetch API를 사용한 SSE 연결 (Last-Event-ID 헤더 설정 가능)
 * @param onMessage - 알람 메시지를 받았을 때 실행할 콜백 함수
 * @param onError - 에러가 발생했을 때 실행할 콜백 함수
 * @param lastEventId - 마지막으로 받은 이벤트 ID (재연결 시 사용)
 * @returns abort 함수 (연결 해제를 위해)
 */
export async function connectAlarmSSEWithFetch(
  onMessage: AlarmEventHandler,
  onError?: (error: Error) => void,
  lastEventId?: string
): Promise<{ abort: () => void }> {
  const token = getAuthToken();

  if (!token) {
    throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
  }

  const url = `${BASE_URL}/api/v1/alarms/connect?token=${encodeURIComponent(token)}`;
  const abortController = new AbortController();

  const headers: HeadersInit = {
    'Accept': 'text/event-stream',
    'Cache-Control': 'no-cache',
  };

  if (lastEventId) {
    headers['Last-Event-ID'] = lastEventId;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      signal: abortController.signal,
    });

    if (!response.ok) {
      throw new Error(`SSE 연결 실패: ${response.status} ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error('응답 body가 없습니다.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    // 스트림 읽기
    const readStream = async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          let currentEvent: Partial<AlarmEvent> = { data: '' };

          for (const line of lines) {
            if (line.startsWith('id:')) {
              currentEvent.id = line.substring(3).trim();
            } else if (line.startsWith('event:')) {
              currentEvent.event = line.substring(6).trim();
            } else if (line.startsWith('data:')) {
              const data = line.substring(5).trim();
              currentEvent.data = currentEvent.data
                ? `${currentEvent.data}\n${data}`
                : data;
            } else if (line === '') {
              // 빈 줄은 이벤트의 끝을 의미
              if (currentEvent.data) {
                onMessage(currentEvent as AlarmEvent);
                currentEvent = { data: '' };
              }
            }
          }
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('스트림 읽기 에러:', error);
          if (onError) {
            onError(error);
          }
        }
      }
    };

    readStream();

  } catch (error) {
    if (error instanceof Error && error.name !== 'AbortError') {
      console.error('SSE 연결 에러:', error);
      if (onError) {
        onError(error);
      }
    }
  }

  return {
    abort: () => abortController.abort(),
  };
}

/**
 * 알람 연결 해제
 * @param eventSource - connectAlarmSSE로 생성한 EventSource 객체
 */
export function disconnectAlarmSSE(eventSource: EventSource): void {
  eventSource.close();
}
