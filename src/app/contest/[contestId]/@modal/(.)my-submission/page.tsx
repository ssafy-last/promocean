// frontend/src/app/contest/[contestId]/@modal/(.)my-submission/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { ContestAPI } from "@/api/contest";
import { ContestSubmissionItemProps } from "@/types/itemType";
import CommunityPostUserProfileItem from "@/components/item/CommunityPostUserProfileItem";
import { useAuthStore } from "@/store/authStore";

/**
 * 대회 내 산출물 모달
 * @description 대회 상세 페이지에서 내 산출물을 조회하는 모달입니다.
 * @returns {React.ReactNode}
 */
export default function ContestMySubmissionModal({ params }: { params: Promise<{ contestId: number }> }) {
  
  const router = useRouter();
  const { contestId } = use(params);
  const { user } = useAuthStore();
  const [submissionData, setSubmissionData] = useState<ContestSubmissionItemProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMySubmission = async () => {
      try {
        const { contestMySubmissionItem } = await ContestAPI.getContestMySubmissionItem(contestId);
        setSubmissionData(contestMySubmissionItem);
      } catch (error) {
        // 404 에러는 산출물이 없는 것으로 처리
        if (error instanceof Error && error.message.includes('404')) {
          setSubmissionData(null);
        } else {
          console.error('산출물 조회 실패:', error);
          setSubmissionData(null);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchMySubmission();
  }, [contestId]);

  // 수정 버튼 클릭 시 실행되는 함수
  const handleUpdateSubmission = async () => {
    if (!submissionData) return;
    // TODO: 수정 구현하기
    console.log('수정하기', submissionData.submissionId);
  };

  // 삭제 버튼 클릭 시 실행되는 함수
  const handleDeleteSubmission = async () => {
    if (!submissionData) return;
    
    if (!confirm('정말 이 산출물을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await ContestAPI.deleteContestSubmission(contestId, submissionData.submissionId);
      router.back();
      router.refresh();
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('산출물 삭제에 실패했습니다.');
    }
  };

  const isAuthor = user && submissionData && user.nickname === submissionData.author;

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
        {isLoading ? (
          <>
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">내 산출물</h2>
            </div>
            <div className="text-center py-8 text-gray-500">
              로딩 중...
            </div>
          </>
        ) : !submissionData ? (
          <>
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">내 산출물</h2>
            </div>
            <div className="text-center py-8 text-gray-500">
              제출된 산출물이 없습니다.
            </div>
          </>
        ) : (
          <>
            {/* 헤더 */}
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">내 산출물</h2>
            </div>

            {/* 작성자 정보 */}
            <div className="mb-6">
              <CommunityPostUserProfileItem
                profileUrl={submissionData.profileUrl}
                author={submissionData.author}
                createdAt=""
              />
            </div>

            {/* 산출물 정보 */}
            <div className="mb-6 space-y-4">
              {/* 설명 */}
              {submissionData.description && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">설명</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{submissionData.description}</p>
                  </div>
                </div>
              )}

              {/* 타입 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">타입</h3>
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {submissionData.type}
                </span>
              </div>

              {/* 투표 수 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">투표 수</h3>
                <span className="text-base text-gray-900 font-medium">{submissionData.voteCnt}표</span>
              </div>

              {/* 제출 URL */}
              {submissionData.submissionUrl && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">제출 링크</h3>
                  <a
                    href={submissionData.submissionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline break-all"
                  >
                    {submissionData.submissionUrl}
                  </a>
                </div>
              )}
            </div>

            {/* 수정/삭제 버튼 */}
            {isAuthor && (
              <div className="flex flex-row items-center justify-center gap-2 w-full mt-6 pt-6 border-t border-gray-200">
                <button
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
                  onClick={handleUpdateSubmission}
                >
                  수정하기
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors cursor-pointer"
                  onClick={handleDeleteSubmission}
                >
                  삭제하기
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

