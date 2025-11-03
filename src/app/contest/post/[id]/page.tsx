// frontend/src/app/contest/post/[id]/page.tsx

import ContestHeader from "@/components/layout/ContestHeader";
import ContestPostTabs from "@/components/filter/ContestPostTabs";
import ContestPostSection from "@/components/section/ContestPostSection";

/**
 * ContestPostPage component
 * @description ContestPostPage component is a contest post page component that displays the contest post page content
 * @returns {React.ReactNode}
 */
export default function ContestPostPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContestHeader />
      <ContestPostTabs />
      <ContestPostSection />
      <ContestFloatingSection />
    </div>
  );
}
