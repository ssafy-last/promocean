// frontend/src/components/section/TeamSpaceEditSection.tsx

import { useState } from 'react';
import ImageChoiceButton from '../button/ImageChoiceButton';

export interface TeamSpaceEditSectionProps {
  teamName: string;
  onSave: (name: string, imageFile: File | null) => Promise<void>;
  onCancel: () => void;
}

/**
 * 팀 스페이스 수정 섹션
 * 팀 이름과 커버 이미지를 수정
 */
export default function TeamSpaceEditSection({
  teamName,
  onSave,
  onCancel,
}: TeamSpaceEditSectionProps) {
  const [editSpaceImage, setEditSpaceImage] = useState<File | null>(null);
  const [editSpaceName, setEditSpaceName] = useState(teamName);

  const handleSaveClick = async () => {
    await onSave(editSpaceName, editSpaceImage);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* 커버 이미지 섹션 */}
      <ImageChoiceButton setSpaceImageState={setEditSpaceImage} />

      {/* 팀 스페이스 이름 섹션 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">팀 스페이스 이름</label>
        <input
          type="text"
          value={editSpaceName}
          onChange={(e) => setEditSpaceName(e.target.value)}
          placeholder="팀 스페이스 이름을 입력하세요"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>

      {/* 버튼을 하단에 고정하기 위한 spacer */}
      <div className="flex-1"></div>

      {/* 버튼 섹션 */}
      <div className="flex flex-row justify-center gap-8 py-2 w-full">
        <button
          type="button"
          className="bg-gray-200 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
          onClick={onCancel}
        >
          취소하기
        </button>
        <button
          type="button"
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/80 transition-colors"
          onClick={handleSaveClick}
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
