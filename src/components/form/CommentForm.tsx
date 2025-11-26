'use client';

// frontend/src/components/form/CommentForm.tsx

import { useState, useRef, useEffect } from 'react';
import { ReplyAPI } from '@/api/community';

interface CommentFormProps {
  postId: number;
  onSuccess?: () => void;
}

interface Emoticon {
  id: number;
  name: string;
  imageUrl: string;
}

/**
 * CommentForm component
 * @description 댓글 작성에 사용되는 폼 컴포넌트입니다.
 * @returns {React.ReactNode}
 */
export default function CommentForm({ postId, onSuccess }: CommentFormProps) {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmoticonPicker, setShowEmoticonPicker] = useState(false);
  const [selectedEmoticon, setSelectedEmoticon] = useState<Emoticon | null>(null);
  const emoticonButtonRef = useRef<HTMLButtonElement>(null);
  const emoticonPickerRef = useRef<HTMLDivElement>(null);

  // 임시 이모티콘 데이터 (추후 사용자가 보유한 이모티콘 API로 대체)
  const availableEmoticons: Emoticon[] = [
    { id: 1, name: '웃는 얼굴', imageUrl: '😊' },
    { id: 2, name: '하트', imageUrl: '❤️' },
    { id: 3, name: '박수', imageUrl: '👏' },
    { id: 4, name: '별', imageUrl: '⭐' },
    { id: 5, name: '불', imageUrl: '🔥' },
    { id: 6, name: '트로피', imageUrl: '🏆' },
    { id: 7, name: '좋아요', imageUrl: '👍' },
    { id: 8, name: '생각', imageUrl: '🤔' },
    { id: 9, name: '파티', imageUrl: '🎉' },
    { id: 10, name: '왕관', imageUrl: '👑' },
  ];

  // 모달 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showEmoticonPicker &&
        emoticonPickerRef.current &&
        emoticonButtonRef.current &&
        !emoticonPickerRef.current.contains(event.target as Node) &&
        !emoticonButtonRef.current.contains(event.target as Node)
      ) {
        setShowEmoticonPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmoticonPicker]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: 추후 이모티콘 ID도 함께 전송
      // await ReplyAPI.create(postId, comment.trim(), selectedEmoticon?.id);
      await ReplyAPI.create(postId, comment.trim());
      setComment('');
      setSelectedEmoticon(null);
      onSuccess?.();
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmoticonSelect = (emoticon: Emoticon) => {
    setSelectedEmoticon(emoticon);
    setShowEmoticonPicker(false);
  };

  const handleRemoveEmoticon = () => {
    setSelectedEmoticon(null);
  };

  return (
    <div className="mb-6 pb-6 border-gray-200">
      {/* 이모티콘 버튼 */}
      <div className="flex justify-end border border-gray-300 rounded-t-lg relative">
        <button
          ref={emoticonButtonRef}
          type="button"
          onClick={() => setShowEmoticonPicker(!showEmoticonPicker)}
          className="hover:bg-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors flex items-center gap-2"
        >
          😊 이모티콘
        </button>

        {/* 이모티콘 피커 모달 */}
        {showEmoticonPicker && (
          <div
            ref={emoticonPickerRef}
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
                    onClick={() => handleEmoticonSelect(emoticon)}
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
        )}
      </div>

      <form onSubmit={handleSubmit} >
        {/* 선택된 이모티콘 미리보기 */}
        {selectedEmoticon && (
          <div className="border-l border-r border-gray-300 border-t-0 rounded-b-none bg-gray-50 px-3 py-1.5">
            <div className="flex items-center">
              <div className="flex items-center gap-1 bg-white border border-gray-200 px-1 py-1">
                <span className="text-3xl">{selectedEmoticon.imageUrl}</span>
              </div>
              <button
                type="button"
                onClick={handleRemoveEmoticon}
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="이모티콘 제거"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
          rows={4}
          className={`
            w-full px-4 py-3 border border-gray-300 resize-none
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            placeholder-gray-400 text-sm
            ${selectedEmoticon ? 'rounded-t-none rounded-b-lg' : 'rounded-bl-lg rounded-br-lg'}
          `}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!comment.trim() || isSubmitting}
            className="px-4 py-2 bg-primary hover:bg-blue-600 text-xs text-white font-medium rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
          >
            {isSubmitting ? '작성 중...' : '댓글 작성'}
          </button>
        </div>
      </form>
    </div>
  );
}