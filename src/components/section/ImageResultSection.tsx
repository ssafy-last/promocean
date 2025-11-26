// frontend/src/components/post/ImageResultSection.tsx

import React from 'react';
import Image from 'next/image';
import { Upload } from 'lucide-react';

interface ImageResultSectionProps {
  title: string;
  generatedImageUrl: string;
  uploadedImageUrl: string;
  onRemoveGenerated: () => void;
  onRemoveUploaded: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputId?: string;
}

/**
 * 이미지 결과 섹션 컴포넌트
 * AI 생성 이미지, 업로드된 이미지, 업로드 UI를 표시
 */
export default function ImageResultSection({
  title,
  generatedImageUrl,
  uploadedImageUrl,
  onRemoveGenerated,
  onRemoveUploaded,
  onImageUpload,
  inputId = 'image-upload',
}: ImageResultSectionProps) {
  const hasImage = generatedImageUrl || uploadedImageUrl;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>

      {/* AI 생성 이미지가 있는 경우 표시 */}
      {generatedImageUrl && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">AI 생성 이미지</p>
            <button
              type="button"
              onClick={onRemoveGenerated}
              className="text-xs text-red-600 hover:text-red-700"
            >
              제거
            </button>
          </div>
          <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-300">
            <Image
              src={generatedImageUrl}
              alt="AI 생성 이미지"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 800px"
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* 업로드된 이미지가 있는 경우 표시 */}
      {uploadedImageUrl && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">업로드된 이미지</p>
            <button
              type="button"
              onClick={onRemoveUploaded}
              className="text-xs text-red-600 hover:text-red-700"
            >
              제거
            </button>
          </div>
          <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-300">
            <Image
              src={uploadedImageUrl}
              alt="업로드된 이미지"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 800px"
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* 이미지가 없을 때만 업로드 UI 표시 */}
      {!hasImage && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <label htmlFor={inputId} className="cursor-pointer flex flex-col items-center">
            <Upload className="w-12 h-12 text-gray-400 mb-3" />
            <span className="text-sm font-medium text-gray-700 mb-1">
              이미지를 업로드하거나
            </span>
            <span className="text-xs text-gray-500">
              AI 생성 버튼을 눌러 이미지를 생성하세요
            </span>
            <input
              id={inputId}
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* 이미지가 있을 때 추가 업로드 버튼 */}
      {hasImage && (
        <div className="mt-4">
          <label
            htmlFor={`${inputId}-additional`}
            className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md cursor-pointer transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            다른 이미지 업로드
            <input
              id={`${inputId}-additional`}
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
}
