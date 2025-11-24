// frontend/src/constants/postFormConstants.tsx

import { PostingFloatingItemProps } from '@/types/itemType';

/**
 * SVG 아이콘 생성 유틸리티 함수
 */
const createIcon = (iconPath: string) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
  </svg>
);

/**
 * 카테고리 아이콘 SVG 경로
 */
const CATEGORY_ICON_PATHS = {
  work: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
  dev: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  design: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  job: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  edu: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  life: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  etc: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
};

/**
 * 프롬프트 타입 아이콘 SVG 경로
 */
const PROMPT_TYPE_ICON_PATHS = {
  text: "M4 6h16M4 10h16M4 14h8M4 18h8",
  image: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
};

/**
 * 커뮤니티 카테고리 목록
 * 게시글 작성 시 선택할 수 있는 카테고리
 */
export const CATEGORY_ITEMS: PostingFloatingItemProps[] = [
  {
    id: "work",
    icon: createIcon(CATEGORY_ICON_PATHS.work),
    label: "업무",
    value: "work",
  },
  {
    id: "dev",
    icon: createIcon(CATEGORY_ICON_PATHS.dev),
    label: "개발",
    value: "dev",
  },
  {
    id: "design",
    icon: createIcon(CATEGORY_ICON_PATHS.design),
    label: "디자인/창작",
    value: "design",
  },
  {
    id: "job",
    icon: createIcon(CATEGORY_ICON_PATHS.job),
    label: "취업",
    value: "job",
  },
  {
    id: "edu",
    icon: createIcon(CATEGORY_ICON_PATHS.edu),
    label: "교육",
    value: "edu",
  },
  {
    id: "life",
    icon: createIcon(CATEGORY_ICON_PATHS.life),
    label: "일상",
    value: "life",
  },
  {
    id: "etc",
    icon: createIcon(CATEGORY_ICON_PATHS.etc),
    label: "기타",
    value: "etc",
  },
];

/**
 * 프롬프트 타입 목록
 * 텍스트 또는 이미지 프롬프트 선택
 */
export const PROMPT_TYPE_ITEMS: PostingFloatingItemProps[] = [
  {
    id: "text",
    icon: createIcon(PROMPT_TYPE_ICON_PATHS.text),
    label: "텍스트",
    value: "text",
  },
  {
    id: "image",
    icon: createIcon(PROMPT_TYPE_ICON_PATHS.image),
    label: "이미지",
    value: "image",
  },
];

/**
 * 카테고리 값 타입
 */
export type CategoryValue = 'work' | 'dev' | 'design' | 'job' | 'edu' | 'life' | 'etc';

/**
 * 프롬프트 타입 값 타입
 */
export type PromptTypeValue = 'text' | 'image';
