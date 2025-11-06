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
    <section className="flex flex-col gap-1 border-gray-200 rounded-lg py-4 px-2">

      <LexicalEditor onChange={onChange} placeholder={placeholder} title={title} />
    </section>
  );
}