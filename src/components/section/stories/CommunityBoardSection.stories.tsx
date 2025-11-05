import type { Meta, StoryObj } from '@storybook/react';
import CommunityBoardSection from '@components/section/CommunityBoardSection';
import { CommunityBoardItemProps } from '@/types/itemType';

const meta: Meta<typeof CommunityBoardSection> = {
  title: 'Components/Section/CommunityBoardSection',
  component: CommunityBoardSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '커뮤니티 게시판 섹션으로 필터와 게시물 목록을 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommunityBoardSection>;

const mockBoards: CommunityBoardItemProps[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  thumbnail: `/images/board${i + 1}.jpg`,
  category: ['AI', '개발', '디자인'][i % 3],
  title: `게시물 제목 ${i + 1}`,
  description: `게시물 설명 ${i + 1}`,
  author: `작성자${i + 1}`,
  likes: Math.floor(Math.random() * 100),
  comments: Math.floor(Math.random() * 50),
}));

export const Default: Story = {
  args: {
    communityBoardList: mockBoards,
  },
};

export const FewItems: Story = {
  args: {
    communityBoardList: mockBoards.slice(0, 3),
  },
};
