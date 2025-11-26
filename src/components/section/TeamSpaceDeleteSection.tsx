// frontend/src/components/section/TeamSpaceDeleteSection.tsx

import { useState } from 'react';

export interface TeamSpaceDeleteSectionProps {
  teamName: string;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

/**
 * 팀 스페이스 삭제 섹션
 * 확인 문구 입력으로 안전하게 삭제 처리
 */
export default function TeamSpaceDeleteSection({
  teamName,
  onDelete,
  onCancel,
}: TeamSpaceDeleteSectionProps) {
  const [deleteInput, setDeleteInput] = useState('');
  const deleteConfirmText = `${teamName}를 삭제 하겠습니다`;
  const isDeleteValid = deleteInput === deleteConfirmText;

  const handleDeleteClick = async () => {
    if (isDeleteValid) {
      await onDelete();
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* 경고 메시지 */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700 text-sm font-medium mb-2">⚠️ 경고</p>
        <p className="text-red-600 text-sm">
          팀 스페이스를 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
        </p>
      </div>

      {/* 확인 문구 안내 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          다음 문구를 정확히 입력해주세요:
        </label>
        <div className="bg-gray-100 px-3 py-2 rounded-md">
          <code className="text-sm font-mono text-gray-800">{deleteConfirmText}</code>
        </div>
      </div>

      {/* 확인 문구 입력 */}
      <input
        type="text"
        value={deleteInput}
        onChange={(e) => setDeleteInput(e.target.value)}
        placeholder="위 문구를 정확히 입력하세요"
        className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition-all
          ${
            isDeleteValid
              ? 'border-red-500 focus:ring-red-500 bg-red-50'
              : 'border-gray-300 focus:ring-gray-400'
          }`}
      />

      {/* 버튼을 하단에 고정하기 위한 spacer */}
      <div className="flex-1"></div>

      {/* 버튼 섹션 */}
      <div className="flex flex-row justify-center gap-8 py-2 w-full">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
        >
          취소하기
        </button>
        <button
          type="button"
          onClick={handleDeleteClick}
          disabled={!isDeleteValid}
          className={`px-6 py-2 rounded-md font-medium transition-all
            ${
              isDeleteValid
                ? 'bg-red-500 text-white hover:bg-red-600 active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
}
