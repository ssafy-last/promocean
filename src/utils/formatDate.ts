// frontend/src/utils/formatDate.ts

/**
 * 문자열을 안전하게 Date 객체로 변환
 */
export function parseDate(dateStr?: string): Date | null {
  if (!dateStr) return null;

  // T가 없는 경우 (ex. 2025-10-28)
  if (!dateStr.includes("T")) {
    dateStr = `${dateStr}T00:00:00`;
  }

  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * YYYY년 MM월 DD일 형식 (날짜만)
 * ex) 2025년 10월 28일
 */
export function formatKoreanDate(dateStr?: string): string {
  const date = parseDate(dateStr);
  if (!date) return "-";

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * YYYY년 MM월 DD일 오전 HH:MM 형식 (날짜 + 시간)
 * ex) 2025년 10월 28일 오전 11:41
 */
export function formatKoreanDateTime(dateStr?: string): string {
  const date = parseDate(dateStr);
  if (!date) return "-";

  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
