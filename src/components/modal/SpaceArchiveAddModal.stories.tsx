import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SpaceArchiveAddModal from './SpaceArchiveAddModal';

// Wrapper 컴포넌트 - 모달 상태 관리를 위한 컨트롤러
function InteractiveWrapper() {
  const [isOpenState, setIsOpenState] = useState(true);

  const handleCloseModal = () => {
    setIsOpenState(false);
    // 재오픈을 위해 약간의 딜레이 후 다시 열기
    setTimeout(() => setIsOpenState(true), 300);
  };

  return (
    <div>
      <button 
        onClick={() => setIsOpenState(true)}
        className="btn btn-primary"
      >
        모달 열기
      </button>
      <SpaceArchiveAddModal 
        isOpen={isOpenState}
        onCloseAddModal={handleCloseModal}
      />
    </div>
  );
}

// 애니메이션 테스트용 컴포넌트
function AnimationTestWrapper() {
  const [isOpenState, setIsOpenState] = useState(false);

  return (
    <div className="p-4">
      <div className="flex gap-4">
        <button 
          onClick={() => setIsOpenState(true)}
          className="btn btn-primary"
        >
          모달 열기
        </button>
        <button 
          onClick={() => setIsOpenState(false)}
          className="btn btn-secondary"
        >
          모달 닫기
        </button>
      </div>
      <SpaceArchiveAddModal 
        isOpen={isOpenState}
        onCloseAddModal={() => setIsOpenState(false)}
      />
    </div>
  );
}

const meta: Meta<typeof SpaceArchiveAddModal> = {
  title: 'Components/SpaceArchiveAddModal',
  component: SpaceArchiveAddModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '카테고리를 추가하기 위한 모달 컴포넌트입니다. 배경색 선택, 사진 업로드, 제목 및 설명 입력 기능을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달의 열림/닫힘 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onCloseAddModal: {
      action: 'closed',
      description: '모달을 닫을 때 호출되는 콜백 함수',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SpaceArchiveAddModal>;

// 기본 스토리 - 모달 열림 상태
export const Default: Story = {
  args: {
    isOpen: true,
    onCloseAddModal: () => console.log('Modal closed'),
  },
  parameters: {
    docs: {
      description: {
        story: '기본 상태의 카테고리 추가 모달입니다.',
      },
    },
  },
};

// 모달 닫힘 상태
export const Closed: Story = {
  args: {
    isOpen: false,
    onCloseAddModal: () => console.log('Modal closed'),
  },
  parameters: {
    docs: {
      description: {
        story: '닫힌 상태의 모달입니다. 화면에 표시되지 않습니다.',
      },
    },
  },
};

// 인터랙티브 스토리 - 열기/닫기 가능
export const Interactive: Story = {
  render: () => <InteractiveWrapper />,
  parameters: {
    docs: {
      description: {
        story: '버튼을 클릭하여 모달을 열고 닫을 수 있는 인터랙티브 예시입니다.',
      },
    },
  },
};

// 애니메이션 테스트용
export const AnimationTest: Story = {
  render: () => <AnimationTestWrapper />,
  parameters: {
    docs: {
      description: {
        story: '모달의 열림/닫힘 애니메이션을 테스트할 수 있습니다.',
      },
    },
  },
};