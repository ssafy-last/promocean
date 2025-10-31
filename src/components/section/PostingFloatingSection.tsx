'use client';

// frontend/src/components/section/PostingFloatingSection.tsx

import React from 'react'

export default function PostingFloatingSection() {
  return (
    <aside className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      <h3 className="text-sm font-semibold text-gray-800">작성 가이드</h3>
      <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
        <li>명확한 제목을 작성하세요.</li>
        <li>카테고리와 태그를 알맞게 설정하세요.</li>
        <li>커뮤니티 가이드를 준수하세요.</li>
      </ul>
    </aside>
  )
}


