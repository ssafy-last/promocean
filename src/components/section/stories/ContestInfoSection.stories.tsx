import type { Meta, StoryObj } from '@storybook/react';
import ContestInfoSection from '@components/section/ContestInfoSection';
import { ContestInfoItemProps } from '@/types/itemType';

const meta: Meta<typeof ContestInfoSection> = {
  title: 'Components/Section/ContestInfoSection',
  component: ContestInfoSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '대회 정보를 표시하는 섹션 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContestInfoSection>;

const mockItems: ContestInfoItemProps[] = [
  { label: '대회 기간', value: '2024-01-01 ~ 2024-12-31' },
  { label: '참가 인원', value: '256명' },
  { label: '상금', value: '500만원' },
];

export const Default: Story = {
  args: {
    titles: ['대회 정보'],
    items: mockItems,
  },
};
