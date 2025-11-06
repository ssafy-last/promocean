import type { Meta, StoryObj } from '@storybook/react';
import CommunityFloatingSection from '@components/section/CommunityFloatingSection';
import { CommunityFloatingItemProps } from '@/types/itemType';

const meta: Meta<typeof CommunityFloatingSection> = {
  title: 'Components/Section/CommunityFloatingSection',
  component: CommunityFloatingSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '인기 게시물 목록을 표시하는 플로팅 섹션 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommunityFloatingSection>;

const mockPopularPosts: CommunityFloatingItemProps[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  rank: i + 1,
  title: `인기 게시물 ${i + 1}`,
  views: Math.floor(Math.random() * 5000),
}));

export const Default: Story = {
  args: {
    popularPosts: mockPopularPosts,
  },
};
