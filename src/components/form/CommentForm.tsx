'use client';

// frontend/src/components/form/CommentForm.tsx

import { useState } from 'react';

/**
 * CommentForm component
 * @description CommentForm component is a comment form component that displays the comment form content
 * @returns {React.ReactNode}
 */
export default function CommentForm() {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 댓글 작성 로직 구현
    setComment('');
  };

  return (
    <div className="mb-6 pb-6 border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400 text-sm"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!comment.trim()}
            className="px-6 py-2 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
          >
            댓글 작성
          </button>
        </div>
      </form>
    </div>
  )
}