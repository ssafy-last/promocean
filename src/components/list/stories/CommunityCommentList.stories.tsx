import type { Meta, StoryObj } from '@storybook/react';
import CommunityCommentList from '@components/list/CommunityCommentList';
import { CommunityCommentItemProps } from '@/types/itemType';

const meta: Meta<typeof CommunityCommentList> = {
  title: 'Components/List/CommunityCommentList',
  component: CommunityCommentList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '커뮤니티 댓글 목록을 표시하는 리스트 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    communityCommentList: {
      description: '댓글 아이템 배열',
      table: {
        type: { summary: 'CommunityCommentItemProps[]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommunityCommentList>;

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
    content: '이 방법을 사용해봤는데 정말 효과적이었어요. 특히 마지막 팁이 큰 도움이 되었습니다.',
    likes: 8,
    isLiked: true,
  },
  {
    profileImage: '/images/profile3.jpg',
    nickname: '박민수',
    timestamp: '30분 전',
    content: '추가로 질문이 있는데요, 이 경우에는 어떻게 하면 좋을까요?',
    likes: 3,
    isLiked: false,
  },
];

// 기본 스토리
export const Default: Story = {
  args: {
    communityCommentList: mockComments,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 댓글 목록입니다.',
      },
    },
  },
};

// 빈 목록
export const EmptyList: Story = {
  args: {
    communityCommentList: [],
  },
  render: (args) => (
    <div>
      <CommunityCommentList {...args} />
      <div className="text-center py-8 text-gray-500">
        <p>아직 댓글이 없습니다.</p>
        <p className="text-sm mt-2">첫 댓글을 작성해보세요!</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '댓글이 없는 빈 목록입니다.',
      },
    },
  },
};

// 단일 댓글
export const SingleComment: Story = {
  args: {
    communityCommentList: [mockComments[0]],
  },
  parameters: {
    docs: {
      description: {
        story: '하나의 댓글만 있는 목록입니다.',
      },
    },
  },
};

// 많은 댓글
export const ManyComments: Story = {
  args: {
    communityCommentList: [
      ...mockComments,
      {
        profileImage: '/images/profile4.jpg',
        nickname: '정우성',
        timestamp: '15분 전',
        content: '좋은 글 잘 봤습니다!',
        likes: 5,
        isLiked: false,
      },
      {
        profileImage: '/images/profile5.jpg',
        nickname: '한지민',
        timestamp: '10분 전',
        content: '저도 이 방법으로 해결했어요. 감사합니다.',
        likes: 7,
        isLiked: true,
      },
      {
        profileImage: '/images/profile6.jpg',
        nickname: '서강준',
        timestamp: '5분 전',
        content: '혹시 다른 방법도 있을까요?',
        likes: 2,
        isLiked: false,
      },
      {
        profileImage: '/images/profile7.jpg',
        nickname: '장미란',
        timestamp: '방금',
        content: '완벽한 설명이네요!',
        likes: 1,
        isLiked: false,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '여러 댓글이 있는 목록입니다.',
      },
    },
  },
};

// 게시물 페이지 컨텍스트
export const WithinPostPage: Story = {
  args: {
    communityCommentList: mockComments,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto">
          {/* 게시물 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-full"></div>
              <div>
                <h3 className="font-semibold">홍길동</h3>
                <p className="text-sm text-gray-500">3시간 전</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3">AI 프롬프트 작성 가이드</h2>
            <p className="text-gray-700 mb-4">
              효과적인 AI 프롬프트를 작성하는 방법에 대해 공유합니다...
            </p>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>👍 24</span>
              <span>💬 {mockComments.length}</span>
              <span>🔖 12</span>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">
              댓글 {mockComments.length}개
            </h3>
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '게시물 페이지에서 사용되는 댓글 목록입니다.',
      },
    },
  },
};

// 긴 댓글 포함
export const WithLongComments: Story = {
  args: {
    communityCommentList: [
      {
        profileImage: '/images/profile1.jpg',
        nickname: '김철수',
        timestamp: '2시간 전',
        content:
          '이 글을 읽고 정말 많은 도움을 받았습니다. 특히 프롬프트 엔지니어링에 대한 부분이 인상 깊었는데요, 실제로 적용해보니 결과물의 품질이 현저히 향상되었습니다. 앞으로도 이런 유익한 정보 많이 공유해주시면 감사하겠습니다. 추가로 궁금한 점이 있는데, 특정 도메인에 특화된 프롬프트를 작성할 때는 어떤 점을 주의해야 할까요?',
        likes: 15,
        isLiked: true,
      },
      mockComments[1],
      mockComments[2],
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '긴 내용의 댓글이 포함된 목록입니다.',
      },
    },
  },
};

// 좋아요 많은 댓글
export const HighlyLikedComments: Story = {
  args: {
    communityCommentList: [
      {
        profileImage: '/images/profile1.jpg',
        nickname: '인기 댓글 작성자',
        timestamp: '1일 전',
        content: '정말 유용한 정보입니다! 모두에게 추천합니다.',
        likes: 156,
        isLiked: true,
      },
      {
        profileImage: '/images/profile2.jpg',
        nickname: '베스트 댓글러',
        timestamp: '12시간 전',
        content: '이 방법으로 문제를 해결했어요. 감사합니다!',
        likes: 89,
        isLiked: false,
      },
      ...mockComments,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '좋아요가 많은 인기 댓글들입니다.',
      },
    },
  },
};

// 스크롤 가능한 목록
export const ScrollableList: Story = {
  args: {
    communityCommentList: Array.from({ length: 20 }, (_, i) => ({
      profileImage: `/images/profile${(i % 7) + 1}.jpg`,
      nickname: `사용자${i + 1}`,
      timestamp: `${Math.floor(Math.random() * 24)}시간 전`,
      content: `댓글 내용 ${i + 1}: ${
        i % 3 === 0
          ? '좋은 정보 감사합니다!'
          : i % 3 === 1
          ? '정말 유용한 글이네요.'
          : '궁금한 점이 있는데요...'
      }`,
      likes: Math.floor(Math.random() * 50),
      isLiked: Math.random() > 0.5,
    })),
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">댓글 20개</h3>
        <div className="max-h-[500px] overflow-y-auto">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '스크롤이 필요한 많은 댓글 목록입니다.',
      },
    },
  },
};

// 모바일 뷰
export const MobileView: Story = {
  args: {
    communityCommentList: mockComments,
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm mx-auto bg-gray-50 min-h-screen p-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">댓글 {mockComments.length}</h3>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '모바일 환경에서의 댓글 목록입니다.',
      },
    },
  },
};

// 다크 모드
export const DarkMode: Story = {
  args: {
    communityCommentList: mockComments,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">댓글</h3>
          <div className="[&_*]:text-white">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: '다크 모드 환경에서의 댓글 목록입니다.',
      },
    },
  },
};

// 댓글 작성 폼과 함께
export const WithCommentForm: Story = {
  args: {
    communityCommentList: mockComments,
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">
          댓글 {mockComments.length}개
        </h3>

        {/* 댓글 작성 폼 */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <textarea
            placeholder="댓글을 입력하세요..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex justify-end mt-2">
            <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
              댓글 작성
            </button>
          </div>
        </div>

        {/* 댓글 목록 */}
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '댓글 작성 폼과 함께 표시되는 댓글 목록입니다.',
      },
    },
  },
};
