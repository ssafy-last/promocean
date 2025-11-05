// frontend/src/types/Item.ts

import React from 'react'

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

/**
 * PostingFloatingItemProps interface
 * @description 게시글 작성 플로팅 아이템 타입 (카테고리 등)
 */
export interface PostingFloatingItemProps {
  id: string
  icon: React.ReactNode
  label: string
  value: string
  checked?: boolean
}

/**
 * ContestCardItemProps interface
 * @description 대회 카드 아이템 타입
 */
export interface ContestCardItemProps {
  id: string
  title: string
  image: string
  participantCount: number
  deadline?: string
  status: 'SCHEDULED' | 'ONGOING' | 'VOTING' | 'FINISHED' // 백엔드 ENUM과 동일하게
  tags: string[]
  startDate: string
}

/**
 * ContestInfoItemProps interface
 * @description 대회 정보 아이템 타입 - 내용만 받음 (title은 Section에서 props로 전달)
 */
export interface ContestInfoItemProps {
  content: string | React.ReactNode
}

/**
 * ContestPostItemProps interface
 * @description 대회 게시글 아이템 타입
 */
export interface ContestPostItemProps {
  contestId: number
  author: string
  profileUrl?: string
  title: string
  content: string
  type: string
  status: string
  startAt: string
  endAt: string
  voteEndAt: string
  createdAt: string
  updatedAt: string
}

/**
 * LeaderboardItemProps interface
 * @description 리더보드 아이템 타입
 */
export interface LeaderboardItemProps {
  rank: number
  nickName: string
  voteCount: number
  lastSubmit: string
}

/**
 * CommunityPostItemProps interface
 * @description rptl커뮤니티 게시글 아이템 타입 (글 상세보기 화면, API와 동일하게 생성했습니다)
 */
export interface CommunityPostItemResponse {
  postId: number
  author: string
  profileUrl: string
  title: string
  description: string
  category: string
  prompt: string
  type: string
  sampleQuestion: string
  sampleAnswer: string
  fileUrl?: string
  tags: string[]
  likeCnt: number
  createdAt: string
  replies: {
    author: string
    profileUrl: string
    content: string
    createdAt: string
  }[]
}

/**
 * CommunityPostItemProps interface
 * @param postId: 게시글 ID
 * @param author: 작성자
 * @param profileUrl: 작성자 프로필 이미지
 * @param title: 게시글 제목
 * @param description: 게시글 설명
 * @param category: 게시글 카테고리
 * @param prompt: 게시글 프롬프트
 * @param type: 게시글 타입
 * @param sampleQuestion: 게시글 샘플 질문
 * @param sampleAnswer: 게시글 샘플 답변
 * @param fileUrl: 게시글 첨부 파일 URL (클라우드 프론트에서 제공하는 URL)
 * @param tags: 게시글 해시태그
 * @param likeCnt: 게시글 좋아요 수
 * @param createdAt: 게시글 작성일시
 * @param replies: 게시글 댓글 목록
 * @description 커뮤니티 게시글 아이템 타입
 */
export interface CommunityPostItemProps {
  postId: number
  author: string
  profileUrl: string
  title: string
  description: string
  category: string
  prompt: string
  type: string
  sampleQuestion: string
  sampleAnswer: string
  fileUrl?: string
  createdAt: string
}

/**
 * HashtagItemProps interface
 * @description 해시태그 아이템 타입
 */
export interface HashtagItemProps {
  tag: string
}

/**
 * CommunityCommentItemProps interface
 * @description 커뮤니티 댓글 아이템 타입
 * @param author: 작성자
 * @param profileUrl: 작성자 프로필 이미지
 * @param content: 댓글 내용
 * @param createdAt: 댓글 작성일시
 */
export interface CommunityCommentItemProps {
  author: string
  profileUrl: string
  content: string
  createdAt: string
}

/**
 * NoticeItemProps interface
 * @description 공지사항 아이템 타입
 */
export interface ContestNoticeItemProps {
  noticeId: number
  title: string
  createdAt: string
  updatedAt: string
}

/**
 * ContestNoticeDetailItemProps interface
 * @description 대회 공지사항 상세 아이템 타입
 */
export interface ContestNoticeDetailItemProps {
  contestId: number
  author: string
  profileUrl: string
  title: string
  content: string
  type: string
  status: string
  startAt: string
  endAt: string
  voteEndAt: string
  createdAt: string
  updatedAt: string
}

/**
 * ContestSubmissionItemProps interface
 * @description 대회 제출 목록 아이템 타입
 */
export interface ContestSubmissionItemProps {
  submissionId: number
  author: string
  profileUrl: string
  description: string
  type: string
  submissionUrl: string
  voteCnt: number
}