// frontend/src/components/post/TokenDisplay.tsx

import React from 'react';

interface TokenDisplayProps {
  remainingTokens: number | null;
  isLoading: boolean;
}

/**
 * AI 토큰 잔량 표시 컴포넌트
 */
export default function TokenDisplay({ remainingTokens, isLoading }: TokenDisplayProps) {
  return (
    <div className="sticky top-0 z-50 bg-gray-50 pt-4 pb-2">
      <div className="max-w-7xl mx-auto px-4 flex justify-end">
        <div className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">AI 토큰</span>
          </div>
          <div className="h-5 w-px bg-gray-300"></div>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-gray-500">로딩 중...</span>
            </div>
          ) : remainingTokens !== null ? (
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-bold text-primary">{remainingTokens.toLocaleString()}</span>
              <span className="text-sm text-gray-500">개 남음</span>
            </div>
          ) : (
            <span className="text-sm text-gray-500">조회 실패</span>
          )}
        </div>
      </div>
    </div>
  );
}
