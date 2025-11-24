// frontend/src/utils/typeMapper.ts

/**
 * 프롬프트 타입 매핑
 * 다양한 형식의 타입 값을 'text' | 'image'로 변환
 */
export function mapPromptType(type: string | number): 'text' | 'image' {
  const typeMap: { [key: string]: 'text' | 'image' } = {
    "TEXT": "text",
    "IMAGE": "image",
    "text": "text",
    "image": "image",
    "이미지": "image",
    "텍스트": "text",
    "1": "text",  // PromptType.TEXT = 1
    "2": "image", // PromptType.IMAGE = 2
  };

  // 문자열 또는 숫자를 문자열로 변환하여 매핑
  const mappedType = typeMap[String(type)] || typeMap[String(type).toUpperCase()];

  // 매핑되지 않고 숫자 타입인 경우 추가 처리
  if (!mappedType && typeof type === 'number') {
    return type === 2 ? 'image' : 'text';
  }

  return mappedType || 'text';
}

/**
 * 카테고리 타입 매핑 (API 응답 -> UI)
 */
export function mapCategoryFromApi(category: string): string {
  const categoryMap: { [key: string]: string } = {
    "WORK": "work",
    "DEV": "dev",
    "DESIGN": "design",
    "JOB": "job",
    "EDU": "edu",
    "LIFE": "life",
    "ETC": "etc",
  };

  return categoryMap[category] || "work";
}
