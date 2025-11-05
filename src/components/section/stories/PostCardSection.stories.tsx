import type { Meta, StoryObj } from '@storybook/react';
import PostCardSection from '@components/section/PostCardSection';
import { PostCardItemProps } from '@/types/itemType';

const meta: Meta<typeof PostCardSection> = {
  title: 'Components/Section/PostCardSection',
  component: PostCardSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '포스트 카드 목록을 표시하는 섹션 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    postSectionTitle: {
      description: '섹션 제목',
      control: 'text',
    },
    postCardList: {
      description: '포스트 카드 아이템 배열',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PostCardSection>;

const mockPosts: PostCardItemProps[] = [
  {
    id: 1,
    title: 'ChatGPT 프롬프트 작성 가이드',
    author: '김개발',
    likes: 142,
    comments: 23,
    views: 1250,
    thumbnail: '/images/post1.jpg',
    category: 'AI',
  },
  {
    id: 2,
    title: 'Midjourney로 멋진 이미지 만들기',
    author: '이디자인',
    likes: 98,
    comments: 15,
    views: 856,
    thumbnail: '/images/post2.jpg',
    category: '디자인',
  },
  {
    id: 3,
    title: 'Claude를 활용한 코드 리뷰',
    author: '박코더',
    likes: 76,
    comments: 12,
    views: 642,
    thumbnail: '/images/post3.jpg',
    category: '개발',
  },
];

export const Default: Story = {
  args: {
    postSectionTitle: '인기 게시물',
    postCardList: mockPosts,
  },
};

export const ManyPosts: Story = {
  args: {
    postSectionTitle: '최신 게시물',
    postCardList: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: `게시물 제목 ${i + 1}`,
      author: `작성자${i + 1}`,
      likes: Math.floor(Math.random() * 200),
      comments: Math.floor(Math.random() * 50),
      views: Math.floor(Math.random() * 2000),
      thumbnail: '/images/default.jpg',
      category: ['AI', '디자인', '개발'][i % 3],
    })),
  },
};

export const EmptyState: Story = {
  args: {
    postSectionTitle: '추천 게시물',
    postCardList: [],
  },
};
