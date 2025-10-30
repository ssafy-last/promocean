// frontend/src/types/Item.ts

/**
 * PostCardItemProps interface
 * @description 메인 페이지에서 표시되는 포스트 카드 아이템 타입
 */
export interface PostCardItemProps {
  id: string
  title: string
  hashtags: string[]
  category: string
  likeCount: number
  commentCount: number
  image: string
}

/**
 * SidebarItemProps interface
 * @description 사이드바에서 표시되는 아이템 타입
 */
export interface SidebarItemProps {
  icon: React.ReactNode
  title: string
  href?: string
  onClick?: () => void
}

/**
 * CommunityBoardItemProps interface
 * @description 커뮤니티 게시판 아이템 타입
 */
export interface CommunityBoardItemProps {
  id: string
  title: string
  hashtags: string[]
  category: string
  likeCount: number
  commentCount: number
  image: string
  userImage?: string;    // 작성자 프로필 이미지
  userName: string;          // 작성자 이름
}

/**
 * CommunityFloatingItemProps interface
 * @description 커뮤니티 플로팅 아이템 타입 (인기글)
 */
export interface CommunityFloatingItemProps {
  id: string
  title: string
  hashtags: string[]
  image: string
  likeCount: number
  commentCount: number
}