import type { Meta, StoryObj } from '@storybook/react';
import ContestPostSection from '@components/section/ContestPostSection';
import { ContestPostItemProps, LeaderboardItemProps } from '@/types/itemType';

const meta: Meta<typeof ContestPostSection> = {
  title: 'Components/Section/ContestPostSection',
  component: ContestPostSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '대회 게시물 섹션 컴포넌트로 상세 내용과 리더보드를 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContestPostSection>;

const mockPost: ContestPostItemProps = {
  id: 1,
  title: 'AI 프롬프트 대회',
  content: '대회 상세 내용입니다...',
};

const mockLeaderboard: LeaderboardItemProps[] = Array.from({ length: 10 }, (_, i) => ({
  rank: i + 1,
  name: `참가자${i + 1}`,
  score: 1000 - i * 50,
  avatar: '/images/avatar.jpg',
}));

export const Default: Story = {
  args: {
    contestPostData: mockPost,
    leaderboardList: mockLeaderboard,
  },
};
