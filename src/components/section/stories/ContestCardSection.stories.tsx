import type { Meta, StoryObj } from '@storybook/react';
import ContestCardSection from '@components/section/ContestCardSection';
import { ContestCardItemProps } from '@/types/itemType';

const meta: Meta<typeof ContestCardSection> = {
  title: 'Components/Section/ContestCardSection',
  component: ContestCardSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '프롬프트 대회 카드 목록을 표시하는 섹션 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContestCardSection>;

const mockContests: ContestCardItemProps[] = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: `프롬프트 대회 ${i + 1}`,
  description: `대회 설명 ${i + 1}`,
  prize: `${(i + 1) * 100}만원`,
  deadline: '2024-12-31',
  participants: Math.floor(Math.random() * 500),
  thumbnail: '/images/contest.jpg',
}));

export const Default: Story = {
  args: {
    contestCardList: mockContests,
  },
};
