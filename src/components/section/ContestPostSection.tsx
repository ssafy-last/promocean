'use client';

// frontend/src/components/section/ContestPostSection.tsx

import { useSearchParams } from "next/navigation";

/**
 * ContestPostSection component
 * @description ContestPostSection component is a contest post section component that displays the contest post section content
 * @returns {React.ReactNode}
 */
export default function ContestPostSection() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'detail';

  const sectionContent = {
    detail: {
      title: "대회 상세",
      content: "대회 상세 내용이 여기에 표시됩니다."
    },
    participants: {
      title: "참여 목록",
      content: "참여 목록이 여기에 표시됩니다."
    },
    leaderboard: {
      title: "리더보드",
      content: "리더보드가 여기에 표시됩니다."
    }
  };

  const { title, content } = sectionContent[currentTab as keyof typeof sectionContent] || sectionContent.detail;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
      <div className="prose max-w-none">
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
}