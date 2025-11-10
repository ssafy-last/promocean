// frontend/src/app/community/page.tsx

import CommunityTabs from "@/components/filter/CommunityTabs";
import CommunityBoardSection from "@/components/section/CommunityBoardSection";
import CommunityFooter from "@/components/layout/CommunityFooter";
import { CommunityAPI } from "@/api/community";
import { Suspense } from "react";

/**
 * CommunityPage component
 * @description CommunityPage component is a community page component that displays the community page content
 * @returns {React.ReactNode}
 */
export default async function CommunityPage() {
  const { communityBoardList } = await CommunityAPI.getCommunityBoardList();

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CommunityTabs />
      </Suspense>

      <CommunityBoardSection communityBoardList={communityBoardList} />
      <CommunityFooter />
    </>
  );
}
