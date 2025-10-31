'use client';

// frontend/src/components/section/PostingMetaFormSection.tsx

import React, { useState } from 'react'

export default function PostingMetaFormSection() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('community')
  const [tags, setTags] = useState('')

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      <div>
        <label className="block text-sm text-gray-700 mb-2">제목</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-2">카테고리</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="community">커뮤니티</option>
            <option value="dev">개발</option>
            <option value="design">디자인</option>
            <option value="ai">AI</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">태그</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="#태그, #쉼표로, #구분"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </section>
  )
}


