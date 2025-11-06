"use client";

// frontend/src/app/contest/post/[id]/@modal/(.)submission/[submissionId]/page.tsx

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import Image from "next/image";
import UserSimpleProfile from "@/components/etc/UserSimpleProfile";

/**
 * ContestSubmissionDetailData interface
 * @description ContestSubmissionDetailData interface is a contest submission detail data interface that displays the contest submission detail data
 * @returns {React.ReactNode}
 */
interface ContestSubmissionDetailData {
  submissionId: number;
  author: string;
  profileUrl: string;
  description: string;
  prompt: string;
  type: string;
  result: string;
  updatedAt: string;
}

/**
 * 대회 상세 페이지 산출물 모달
 * @description 대회 상세 페이지에서 산출물을 조회하는 경우 나오는 모달입니다.
 * @returns {React.ReactNode}
 */
export default function ContestSubmissionModal({ params }: { params: Promise<{ submissionId: string }> }) {
  const router = useRouter();
  const { submissionId } = use(params);
  const [submissionData, setSubmissionData] = useState<ContestSubmissionDetailData | null>(null);

  useEffect(() => {
    const fetchSubmissionDetail = async () => {
      try {
        // TODO: 실제 API와 연동하기
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/ContestSubmissionDetailData.json`, { cache: "no-store" });
        const data = await response.json();
        setSubmissionData(data);
      } catch (error) {
        console.error("산출물 상세 정보를 불러오는데 실패했습니다:", error);
      }
    };

    fetchSubmissionDetail();
  }, [submissionId]);

  const isText = submissionData?.type === "텍스트" ? true : false;

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
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {submissionData?.description || "산출물"}
          </h2>
        </div>

        {/* 본문 내용 */}
        {!submissionData ? (
          <div className="text-center py-8 text-gray-500">
            산출물을 불러올 수 없습니다.
          </div>
        ) : (
          <>
            {/* 작성자 정보 */}
            <div className="flex items-center justify-between mb-6 min-w-0">
              <div className="flex-shrink-0">
                <UserSimpleProfile
                  profileUrl={submissionData.profileUrl}
                  nickname={submissionData.author}
                  imageSize="md"
                  textSize="sm"
                  showName={true}
                />
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                {/* 타입 배지 */}
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                  {submissionData.type}
                </span>
                {/* 업데이트 날짜 */}
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  <span>업데이트 날짜: {submissionData.updatedAt ?? 0}</span>
                </div>
              </div>
            </div>

            {/* 텍스트 or 이미지 */}
            {!isText ? (
              <div className="mb-6 flex items-center justify-center">
                <div className="relative w-full max-w-2xl aspect-video overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={submissionData.result}
                    alt={submissionData.description}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ) : (
              <div className="mb-6 flex items-center justify-center">
                <div className="relative w-full max-w-2xl aspect-video overflow-hidden rounded-lg bg-gray-100">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {submissionData.result}
                  </p>
                </div>
              </div>
            )}

            {/* 내용 */}
            <div className="prose max-w-none mb-6">
              <div className="text-gray-700 whitespace-pre-wrap">
                {submissionData.description}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
