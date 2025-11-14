// frontend/src/app/contest/[postId]/@modal/(.)notice/[noticeId]/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import CommunityPostUserProfileItem from "@/components/item/CommunityPostUserProfileItem";
import { ContestAPI } from "@/api/contest";
import { ContestNoticeDetailData } from "@/types/itemType";
import { useAuthStore } from "@/store/authStore";

/**
 * 대회 상세 페이지 공지사항 모달
 * @description 대회 상세 페이지에서 공지 사항을 조회하는 경우 나오는 모달입니다.
 * @returns {React.ReactNode}
 */
export default function ContestNoticeModal({ params }: { params: Promise<{ contestId: number, noticeId: number }> }) {
  
  const router = useRouter();
  const { contestId, noticeId } = use(params);
  const { isLoggedIn, user } = useAuthStore();
  const [noticeData, setNoticeData] = useState<ContestNoticeDetailData | null>(null);
  const [contestAuthor, setContestAuthor] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const [noticeResult, contestResult] = await Promise.all([
        ContestAPI.getContestNoticeDetailData(contestId, noticeId),
        ContestAPI.getContestDetailData(contestId),
      ]);
      setNoticeData(noticeResult.noticeData);
      setContestAuthor(contestResult.contestData.author);
      setEditTitle(noticeResult.noticeData.title);
      setEditContent(noticeResult.noticeData.content);
    };
    fetchData();
  }, [contestId, noticeId]);

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    if (noticeData) {
      setEditTitle(noticeData.title);
      setEditContent(noticeData.content);
    }
    setIsEditing(false);
  };

  const handleEditSave = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    try {
      await ContestAPI.updateContestNotice(contestId, noticeId, editTitle, editContent);
      const { noticeData: updatedNotice } = await ContestAPI.getContestNoticeDetailData(contestId, noticeId);
      setNoticeData(updatedNotice);
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error('공지사항 수정 실패:', error);
      alert('공지사항 수정에 실패했습니다.');
    }
  };

  const handleDeleteNotice = async () => {
    if (!confirm('정말 이 공지사항을 삭제하시겠습니까?')) {
      return;
    }
    try {
      await ContestAPI.deleteContestNotice(contestId, noticeId);
      router.refresh();
      router.back();
    } catch (error) {
      console.error('공지사항 삭제 실패:', error);
      alert('공지사항 삭제에 실패했습니다.');
    }
  };

  // 공지사항 작성자는 대회 작성자와 동일하다고 가정
  const isAuthor = isLoggedIn && user && contestAuthor && user.nickname === contestAuthor;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      onClick={() => router.back()}
    >
      {/* 반투명 오버레이*/}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 모달 본문 */}
      <div
        className="relative bg-white p-6 rounded-xl shadow-xl w-[90vw] max-w-[800px] max-h-[80vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {!noticeData ? (
          <>
            {/* 헤더 - 데이터 없을 때 */}
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">공지사항</h2>
            </div>

            {/* 에러 메시지 */}
            <div className="text-center py-8 text-gray-500">
              공지사항을 불러올 수 없습니다.
            </div>
          </>
        ) : (
          <>
            {/* 헤더 - 제목 */}
            <div className="mb-6 pb-4 border-gray-200 flex flex-col justify-between items-start gap-4">
              <div className="flex flex-row items-center justify-between w-full">
                {isEditing ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="flex-1 text-2xl font-bold text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="제목을 입력하세요"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900">
                    {noticeData.title}
                  </h2>
                )}
                
                {/* 수정/삭제 버튼 */}
                {isAuthor && (
                  <div className="flex flex-row items-center gap-2">
                    {isEditing ? (
                      <>
                        <button
                          className="text-xs text-gray-500 hover:text-gray-700 transition-colors cursor-pointer px-3 py-1 border border-gray-300 rounded"
                          onClick={handleEditCancel}
                        >
                          취소
                        </button>
                        <button
                          className="text-xs text-white bg-primary hover:bg-primary/90 transition-colors cursor-pointer px-3 py-1 rounded"
                          onClick={handleEditSave}
                        >
                          저장
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-xs text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                          onClick={handleEditStart}
                        >
                          수정
                        </button>
                        <button
                          className="text-xs text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                          onClick={handleDeleteNotice}
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {/* 작성자 정보 */}
              {!isEditing && contestAuthor && (
                <CommunityPostUserProfileItem
                  profileUrl={noticeData.profileUrl || ''}
                  author={contestAuthor}
                  createdAt={noticeData.createdAt}
                />
              )}
            </div>

            {/* 내용 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              {isEditing ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full min-h-[300px] text-gray-700 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                  placeholder="내용을 입력하세요"
                />
              ) : (
                <div className="prose max-w-none">
                  <div className="text-gray-700 whitespace-pre-wrap">
                    {noticeData.content}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
