import type { Meta, StoryObj } from '@storybook/react';
import CommunityCommentSection from '@components/section/CommunityCommentSection';
import { CommunityCommentItemProps } from '@/types/itemType';

const meta: Meta<typeof CommunityCommentSection> = {
  title: 'Components/Section/CommunityCommentSection',
  component: CommunityCommentSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '댓글 목록과 댓글 작성 폼을 포함하는 섹션 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommunityCommentSection>;

const mockComments: CommunityCommentItemProps[] = [
  {
    profileImage: '/images/profile1.jpg',
    nickname: '김철수',
    timestamp: '2시간 전',
    content: '정말 유용한 정보네요! 감사합니다.',
    likes: 12,
    isLiked: false,
  },
  {
    profileImage: '/images/profile2.jpg',
    nickname: '이영희',
    timestamp: '1시간 전',
    content: '이 방법을 사용해봤는데 정말 효과적이었어요.',
    likes: 8,
    isLiked: true,
  },
];

export const Default: Story = {
  args: {
    communityCommentList: mockComments,
  },
};

export const ManyComments: Story = {
  args: {
    communityCommentList: Array.from({ length: 10 }, (_, i) => ({
      profileImage: `/images/profile${(i % 5) + 1}.jpg`,
      nickname: `사용자${i + 1}`,
      timestamp: `${i + 1}시간 전`,
      content: `댓글 내용 ${i + 1}`,
      likes: Math.floor(Math.random() * 50),
      isLiked: Math.random() > 0.5,
    })),
  },
};

export const NoComments: Story = {
  args: {
    communityCommentList: [],
  },
};
