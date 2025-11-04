import type { Meta, StoryObj } from '@storybook/react';
import SpaceScrapBoardList from '@components/list/SpaceScrapBoardList';
import { SpaceScrapBoardItemProps } from '@components/item/SpaceScrapBoardItem';

const meta: Meta<typeof SpaceScrapBoardList> = {
  title: 'Components/List/SpaceScrapBoardList',
  component: SpaceScrapBoardList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '스페이스 스크랩 게시판 리스트 컴포넌트입니다. 스크랩한 게시글 목록을 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SpaceScrapBoardList>;

const mockScrapList: SpaceScrapBoardItemProps[] = [
  {
    id: 1,
    title: 'ChatGPT 프롬프트 모음집',
    userName: '프롬프트마스터',
    userImage: 'https://i.pravatar.cc/150?img=1',
    category: '개발',
    commentCount: 15,
    hashtags: ['ChatGPT', '프롬프트', 'AI'],
    image: 'https://picsum.photos/seed/scrap1/400/300',
    likeCount: 234,
  },
  {
    id: 2,
    title: 'UI 디자인 프롬프트',
    userName: '디자이너김',
    userImage: 'https://i.pravatar.cc/150?img=2',
    category: '디자인',
    commentCount: 8,
    hashtags: ['UI', 'UX', '디자인'],
    image: 'https://picsum.photos/seed/scrap2/400/300',
    likeCount: 189,
  },
  {
    id: 3,
    title: '업무 자동화 프롬프트',
    userName: '효율왕',
    userImage: 'https://i.pravatar.cc/150?img=3',
    category: '업무',
    commentCount: 23,
    hashtags: ['자동화', '업무', '생산성'],
    image: 'https://picsum.photos/seed/scrap3/400/300',
    likeCount: 412,
  },
  {
    id: 4,
    title: '마케팅 카피 생성기',
    userName: '마케터이',
    userImage: 'https://i.pravatar.cc/150?img=4',
    category: '마케팅',
    commentCount: 12,
    hashtags: ['마케팅', '카피', '광고'],
    image: 'https://picsum.photos/seed/scrap4/400/300',
    likeCount: 156,
  },
  {
    id: 5,
    title: '코드 리뷰 프롬프트',
    userName: '개발자박',
    userImage: 'https://i.pravatar.cc/150?img=5',
    category: '개발',
    commentCount: 19,
    hashtags: ['코드리뷰', '개발', '프로그래밍'],
    image: 'https://picsum.photos/seed/scrap5/400/300',
    likeCount: 287,
  },
];

// 기본 스토리
export const Default: Story = {
  args: {
    itemList: mockScrapList,
  },
};

// 적은 스크랩
export const FewScraps: Story = {
  args: {
    itemList: mockScrapList.slice(0, 2),
  },
  parameters: {
    docs: {
      description: {
        story: '스크랩이 2개만 있는 경우입니다.',
      },
    },
  },
};

// 단일 스크랩
export const SingleScrap: Story = {
  args: {
    itemList: [mockScrapList[0]],
  },
  parameters: {
    docs: {
      description: {
        story: '스크랩이 1개만 있는 경우입니다.',
      },
    },
  },
};

// 빈 리스트
export const EmptyList: Story = {
  args: {
    itemList: [],
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">스크랩한 게시글이 없습니다</p>
          <p className="text-sm">마음에 드는 게시글을 스크랩해보세요!</p>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '스크랩이 없는 빈 상태입니다.',
      },
    },
  },
};

// 이미지 없는 스크랩
export const NoImages: Story = {
  args: {
    itemList: mockScrapList.map((item) => ({ ...item, image: undefined })),
  },
  parameters: {
    docs: {
      description: {
        story: '이미지가 없는 스크랩들입니다.',
      },
    },
  },
};

// 많은 해시태그
export const ManyHashtags: Story = {
  args: {
    itemList: [
      {
        ...mockScrapList[0],
        hashtags: [
          'ChatGPT',
          '프롬프트',
          'AI',
          '개발',
          '자동화',
          '효율',
          '생산성',
          'GPT-4',
        ],
      },
      ...mockScrapList.slice(1, 3),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '해시태그가 많은 게시글입니다.',
      },
    },
  },
};

// 인기 스크랩
export const PopularScraps: Story = {
  args: {
    itemList: mockScrapList.map((item) => ({
      ...item,
      likeCount: Math.floor(Math.random() * 1000) + 500,
      commentCount: Math.floor(Math.random() * 100) + 50,
    })),
  },
  parameters: {
    docs: {
      description: {
        story: '좋아요와 댓글이 많은 인기 스크랩들입니다.',
      },
    },
  },
};

// 실제 페이지 컨텍스트
export const WithinMySpacePage: Story = {
  args: {
    itemList: mockScrapList,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-white border-b border-gray-200 py-6 px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold">내 스페이스</h1>
            <p className="text-gray-600 mt-2">스크랩한 게시글을 관리하세요</p>
          </div>
        </div>

        {/* 탭 */}
        <div className="bg-white border-b border-gray-200 px-8">
          <div className="max-w-6xl mx-auto flex gap-4">
            <button className="px-4 py-3 text-gray-600 hover:text-gray-900">아카이브</button>
            <button className="px-4 py-3 border-b-2 border-primary text-primary font-medium">
              스크랩
            </button>
          </div>
        </div>

        {/* 필터 */}
        <div className="bg-white border-b border-gray-200 py-4 px-8">
          <div className="max-w-6xl mx-auto flex gap-2">
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">전체</button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
              개발
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
              디자인
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
              마케팅
            </button>
          </div>
        </div>

        {/* 리스트 */}
        <div className="max-w-6xl mx-auto py-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
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
        story: '실제 마이 스페이스 페이지의 스크랩 탭에서의 사용 예시입니다.',
      },
    },
  },
};
