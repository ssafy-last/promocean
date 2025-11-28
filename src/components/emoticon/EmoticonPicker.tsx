'use client';

import { EmojiCategory, EmojiItem } from '@/api/gacha';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

export interface Emoticon {
  id: number;
  imageUrl: string;
}

interface EmoticonPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (emoticon: EmojiItem) => void;
  selectedEmoticon: EmojiItem | null;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  gachaList: EmojiCategory[];
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
  buttonRef,  
  gachaList,
}: EmoticonPickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null);
  const [pickCategoryState, setPickCategoryState] = useState<number>(0);
  const [currentEmoticonsState, setCurrentEmoticonsState] = useState<EmojiItem[]>( []);

  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentEmoticonsState(gachaList[0]?.emojis || []);
  },[gachaList])

  const handleCategoryClick = (index: number) => {
    setPickCategoryState(index);
    setCurrentEmoticonsState(gachaList[index].emojis);
  }



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
      className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4 w-140"
    >
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">이모티콘 선택</h3>
        <p className="text-xs text-gray-500">최대 1개까지 선택할 수 있습니다</p>
      </div>
      <div className ={`relative flex flex-row border-b  border-b-gray-300`}>
        {
          gachaList.map((category, index) => (
                 <button key={index} className = "hover:bg-gray-200 py-1 px-2 w-24"
                 onClick={()=>handleCategoryClick(index)}>{category.categoryName}</button>
          ))
        }

      </div>
      <div className ="h-2"></div>
      {currentEmoticonsState.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-4xl mb-2">😢</p>
          <p className="text-sm text-gray-500">보유한 이모티콘이 없습니다</p>
          <a
            href="/gacha"
            className="inline-block mt-3 text-xs text-primary hover:underline"
          >
            가챠샵에서 이모티콘 획득하기 →
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-8 gap-2 min-h-48 max-h-92 overflow-y-auto">

          {currentEmoticonsState.map((emoticon, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onSelect(emoticon)}
              className={`
                aspect-square rounded-lg border-2 transition-all
                hover:bg-primary/10 hover:border-primary
                ${
                  selectedEmoticon?.emojiId === emoticon.emojiId
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200'
                }
              `}
            >
     
                <Image
                  src={emoticon.imageUrl}
                  alt={`Emoticon ${emoticon.emojiId}`}
                  width={48}
                  height={48}
                  className="mx-auto  "
                />
              </button>
 
            
          ))}


        </div>
      )}
    </div>
  );
}
