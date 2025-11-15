// frontend/src/app/contest/[contestId]/@modal/(.)my-submission/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { ContestAPI } from "@/api/contest";
import { ContestSubmissionItemProps } from "@/types/itemType";
import CommunityPostUserProfileItem from "@/components/item/CommunityPostUserProfileItem";

/**
 * 대회 내 산출물 모달
 * @description 대회 상세 페이지에서 내 산출물을 조회하는 모달입니다.
 * @returns {React.ReactNode}
 */
export default function ContestMySubmissionModal({ params }: { params: Promise<{ contestId: number }> }) {
  
  const router = useRouter();
  const { contestId } = use(params);
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
          </>
        )}
      </div>
    </div>
  );
}

