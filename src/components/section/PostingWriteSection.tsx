'use client';

import React from 'react';
import LexicalEditor from '@/components/editor/LexicalEditor';

interface PostingWriteSectionProps {
  title?: string;
  placeholder?: string;
  onChange: (content: string) => void;
}

export default function PostingWriteSection({
  title,
  placeholder = '내용을 입력하세요...',
  onChange,
}: PostingWriteSectionProps) {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-6">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <LexicalEditor onChange={onChange} placeholder={placeholder} />
    </section>
  );
}