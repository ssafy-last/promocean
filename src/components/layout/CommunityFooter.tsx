'use client';

import { useRouter, useSearchParams } from "next/navigation";

/**
 * CommunityFooter component
 * @description 게시물 페이지네이션과 게시글 작성 버튼을 포함하는 컴포넌트입니다.
 * @returns {React.ReactNode}
 */
export default function CommunityFooter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  // TODO : 시작, 끝 범위에 대한 예외처리가 필요합니다.
  const PAGE_GROUP_SIZE = 5;
  const currentPageGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);
  const startPage = currentPageGroup * PAGE_GROUP_SIZE + 1;

  const params = {
    page: currentPage,
    ...Object.fromEntries(
      ["category", "sorter", "author", "title", "tag"]
        .map((key) => [key, searchParams.get(key)])
        .filter(([_, value]) => value)
    ),
  };

  const handleWritePost = () => {
    router.push("/post?type=community");
  };

  const handlePageChange = (page: number) => {
    const newParams = { ...params, page };
    router.push(`/community?${new URLSearchParams(newParams).toString()}`);
  };

  const handleNextPage = () => {
    const nextPage = startPage + PAGE_GROUP_SIZE;
    handlePageChange(nextPage);
  };

  const handlePreviousPage = () => {
    const previousPage = startPage - PAGE_GROUP_SIZE;
    handlePageChange(previousPage < 1 ? 1 : previousPage);
  };

  return (
    <div className="flex flex-row items-center py-8 relative">
      {/* 페이지네이션 - 중앙 */}
      <div className="flex-1 flex justify-center py-4">
        <div className="join overflow-hidden rounded-lg border border-gray-300">
          {/* 이전 */}
          <button
            className="join-item btn bg-background text-text hover:bg-gray-100 rounded-none border-none"
            onClick={handlePreviousPage}
          >
            «
          </button>

          {/* 페이지 번호 */}
          {Array.from({ length: PAGE_GROUP_SIZE }, (_, index) => startPage + index).map(
            (pageNum) => (
              <input
                key={pageNum}
                type="radio"
                name="page"
                aria-label={pageNum.toString()}
                className={`join-item btn btn-square bg-background text-text hover:bg-gray-100 border-none ${
                  pageNum === currentPage
                    ? "btn-active bg-primary text-white rounded-md"
                    : "rounded-none"
                }`}
                onClick={() => handlePageChange(pageNum)}
              />
            )
          )}

          {/* 다음 */}
          <button
            className="join-item btn bg-background text-text hover:bg-gray-100 rounded-none border-none"
            onClick={handleNextPage}
          >
            »
          </button>
        </div>
      </div>

      {/* 게시글 작성 버튼 - 오른쪽 */}
      <div className="absolute right-8">
        <button
          type="button"
          className="px-4 py-2 rounded-md bg-primary text-white font-medium hover:brightness-110 active:brightness-95 transition-colors"
          onClick={handleWritePost}
        >
          게시글 작성
        </button>
      </div>
    </div>
  );
}
