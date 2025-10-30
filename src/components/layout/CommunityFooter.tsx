// frontend/src/components/layout/CommunityFooter.tsx

/**
 * CommunityFooter component
 * @description CommunityFooter component is a community footer component that displays the community footer content
 * @returns {React.ReactNode}
 */
export default function CommunityFooter() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="join border border-gray-300 rounded-lg overflow-hidden">

        {/* ◀ 이전 */}
        <button className="join-item btn bg-white text-text border-gray-300 hover:bg-gray-100">
          «
        </button>

        {/* Todo: 동적으로 페이지 번호 변경해야합니다. */}
        {/* 페이지 번호 */}
        <button className="join-item btn bg-primary text-white border-primary hover:bg-primary/90">
          1
        </button>
        <button className="join-item btn bg-white text-text border-gray-300 hover:bg-gray-100">
          2
        </button>
        <button className="join-item btn bg-white text-text border-gray-300 hover:bg-gray-100">
          3
        </button>
        <button className="join-item btn bg-white text-text border-gray-300 hover:bg-gray-100">
          4
        </button>

        {/* ▶ 다음 */}
        <button className="join-item btn bg-white text-text border-gray-300 hover:bg-gray-100">
          »
        </button>
      </div>
    </div>
  );
}
