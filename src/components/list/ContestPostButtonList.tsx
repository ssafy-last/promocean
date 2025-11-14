// frontend/src/components/list/ContestPostButtonList.tsx

'use client';

import { useParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import ContestPostModal from "@/components/modal/ContestPostModal";
import { ContestPostItemProps } from "@/types/itemType";

interface ContestPostButtonListProps {
  author: string;
  contestPostData?: ContestPostItemProps;
}

/**
 * ContestPostButtonList component
 * @description 컨테스트 글 수정 버튼을 포함하는 컴포넌트입니다.
 * @returns {React.ReactNode}
 */
export default function ContestPostButtonList({ author, contestPostData }: ContestPostButtonListProps) {
  
  const { isLoggedIn, user } = useAuthStore();
  const params = useParams();
  const contestId = Number(params.contestId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 작성자와 로그인한 사용자가 일치할 때만 버튼 표시
  if (!isLoggedIn || !user || user.nickname !== author) {
    return null;
  }

  const handleUpdatePost = () => {
    setIsModalOpen(true);
  }

  return (
    <>
      <div className="flex flex-row items-center justify-end gap-2">
        <button
          className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          onClick={handleUpdatePost}
        >
          수정
        </button>
        <button
          className="text-xs text-red-500 hover:text-red-700 transition-colors"
          // onClick={handleDeletePost}
        >
          삭제
        </button>
      </div>
      {isModalOpen && (
        <ContestPostModal
          contestId={contestId}
          onClose={() => setIsModalOpen(false)}
          initialData={contestPostData}
        />
      )}
    </>
  )
}
