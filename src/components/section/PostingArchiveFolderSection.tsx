'use client';

import React from "react";

export interface PostingArchiveFolderSectionProps {
  selectedFolder: string;
  onFolderChange: (folder: string) => void;
  folders?: string[];
  isReadOnly?: boolean;
}

/**
 * PostingArchiveFolderSection component
 * @description 아카이브 폴더 선택 섹션 컴포넌트
 * @returns {React.ReactNode}
 */
export default function PostingArchiveFolderSection({
  selectedFolder,
  onFolderChange,
  folders = [],
  isReadOnly = false
}: PostingArchiveFolderSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">아카이브 폴더</h3>

      <div className="space-y-2">
        {isReadOnly ? (
          // URL에서 폴더가 지정된 경우 (읽기 전용)
          <div className="px-4 py-3 bg-gray-100 rounded-lg border border-gray-300">
            <p className="text-sm text-gray-600 mb-1">선택된 폴더</p>
            <p className="font-medium text-gray-800">{selectedFolder}</p>
          </div>
        ) : (
          // 폴더 선택 가능한 경우
          <select
            value={selectedFolder}
            onChange={(e) => onFolderChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          >
            <option value="">폴더를 선택하세요</option>
            {folders.map((folder, index) => (
              <option key={index} value={folder}>
                {folder}
              </option>
            ))}
          </select>
        )}
      </div>

      {!isReadOnly && (
        <p className="text-xs text-gray-500 mt-2">
          게시글을 저장할 아카이브 폴더를 선택하세요
        </p>
      )}
    </div>
  );
}
