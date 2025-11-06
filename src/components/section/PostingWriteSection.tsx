'use client';

import React, { useState } from 'react';
import LexicalEditor from '@/components/editor/LexicalEditor';

interface PostingWriteSectionProps {
  title?: string;
  placeholder?: string;
}

export default function PostingWriteSection({
  title,
  placeholder = '내용을 입력하세요...',
}: PostingWriteSectionProps) {
  const [contentState, setContentState] = useState('');

  const handleContentChange = (content: string) => {
    setContentState(content);
  };

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-6">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <LexicalEditor onChange={handleContentChange} placeholder={placeholder} />
    </section>
  );
}