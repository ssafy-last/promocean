"use client";

// frontend/src/app/contest/post/[id]/@modal/notice/[noticeId]/page.tsx

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { formatKoreanDate } from "@/utils/formatDate";
import UserSimpleProfile from "@/components/etc/UserSimpleProfile";

/**
 * ContestNoticeDetailData interface
 * @description ContestNoticeDetailData interface is a contest notice detail data interface that displays the contest notice detail data
 * @returns {React.ReactNode}
 */
interface ContestNoticeDetailData {
  noticeId: number;
  contestId: number;
  author: string;
  profileUrl: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 대회 상세 페이지 공지사항 모달
 * @description 대회 상세 페이지에서 공지 사항을 조회하는 경우 나오는 모달입니다.
 * @returns {React.ReactNode}
 */
export default function ContestNoticeModal({
  params,
}: {
  params: Promise<{ noticeId: string }>;
}) {
  const router = useRouter();
  const { noticeId } = use(params);
  const [noticeData, setNoticeData] = useState<ContestNoticeDetailData | null>(null);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        // TODO: 실제 API와 연동하기
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/ContestNoticeDetailData.json`, { cache: "no-store" });
        const data = await response.json();
        setNoticeData(data);
      } catch (error) {
        console.error("공지사항 상세 정보를 불러오는데 실패했습니다:", error);
      }
    };

    fetchNoticeDetail();
  }, [noticeId]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      onClick={() => router.back()}
    >
      {/* 반투명 오버레이*/}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 모달 본문 */}
      <div
        className="relative bg-white p-6 rounded-xl shadow-xl w-[600px] max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {noticeData?.title || "공지사항"}
          </h2>
        </div>

        {/* 본문 내용 */}
        {!noticeData ? (
          <div className="text-center py-8 text-gray-500">
            공지사항을 불러올 수 없습니다.
          </div>
        ) : (
          <>
            {/* 작성자 정보 */}
            <div className="flex items-center justify-between mb-6">
              <UserSimpleProfile
                profileUrl={noticeData.profileUrl}
                nickname={noticeData.author}
                imageSize="md"
                textSize="sm"
                showName={true}
              />
              <div className="text-sm text-gray-500">
                <span>
                  작성일: {formatKoreanDate(noticeData.createdAt)}
                </span>
                {noticeData.createdAt !== noticeData.updatedAt && (
                  <>
                    <span className="mx-2 text-gray-300">|</span>
                    <span>
                      수정일: {formatKoreanDate(noticeData.updatedAt)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* 내용 */}
            <div className="prose max-w-none mb-6">
              <div className="text-gray-700 whitespace-pre-wrap">
                {noticeData.content}
              </div>
            </div>

            {/* 닫기 버튼 */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                onClick={() => router.back()}
              >
                닫기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
