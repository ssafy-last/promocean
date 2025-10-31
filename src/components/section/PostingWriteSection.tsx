'use client';

// frontend/src/components/section/PostingWriteSection.tsx

import React, { useState } from 'react'

export default function PostingWriteSection() {
  const [content, setContent] = useState('')

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
        className="w-full h-64 resize-y px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </section>
  )
}


