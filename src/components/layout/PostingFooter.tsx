'use client';

// frontend/src/components/layout/PostingFooter.tsx

import React from 'react'
import { useRouter } from 'next/navigation'

export default function PostingFooter() {
  const router = useRouter()

  const handleCancel = () => {
    router.back()
  }

  const handleSubmit = () => {
    // TODO: 작성 API 연동
    alert('임시 저장/제출 로직 연결 예정')
  }

  return (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        onClick={handleCancel}
        className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
      >
        취소
      </button>
      <button
        type="button"
        onClick={handleSubmit}
        className="px-4 py-2 rounded-md bg-primary text-white hover:brightness-110 active:brightness-95 transition-colors"
      >
        작성 완료
      </button>
    </div>
  )
}


