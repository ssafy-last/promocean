'use client';

import { useRef, useEffect } from 'react';

export interface Emoticon {
  id: number;
  name: string;
  imageUrl: string;
}

interface EmoticonPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (emoticon: Emoticon) => void;
  selectedEmoticon: Emoticon | null;
  availableEmoticons: Emoticon[];
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

/**
 * EmoticonPicker component
 * @description 이모티콘 선택 모달 컴포넌트입니다.
 * @param isOpen - 모달 열림 상태
 * @param onClose - 모달 닫기 콜백
 * @param onSelect - 이모티콘 선택 콜백
 * @param selectedEmoticon - 현재 선택된 이모티콘
 * @param availableEmoticons - 사용 가능한 이모티콘 목록
 * @param buttonRef - 이모티콘 버튼 ref (외부 클릭 감지용)
 */
export default function EmoticonPicker({
  isOpen,
  onClose,
  onSelect,
  selectedEmoticon,
  availableEmoticons,
  buttonRef,
}: EmoticonPickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null);

  // 모달 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        pickerRef.current &&
        buttonRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={pickerRef}
      className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4 w-80"
    >
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">이모티콘 선택</h3>
        <p className="text-xs text-gray-500">최대 1개까지 선택할 수 있습니다</p>
      </div>

      {availableEmoticons.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-4xl mb-2">😢</p>
          <p className="text-sm text-gray-500">보유한 이모티콘이 없습니다</p>
          <a
            href="/auth/mypage/gacha"
            className="inline-block mt-3 text-xs text-primary hover:underline"
          >
            가챠샵에서 이모티콘 획득하기 →
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto">
          {availableEmoticons.map((emoticon) => (
            <button
              key={emoticon.id}
              type="button"
              onClick={() => onSelect(emoticon)}
              className={`
                aspect-square rounded-lg border-2 transition-all
                hover:bg-primary/10 hover:border-primary
                ${
                  selectedEmoticon?.id === emoticon.id
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200'
                }
              `}
              title={emoticon.name}
            >
              <span className="text-2xl">{emoticon.imageUrl}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
