// frontend/src/app/community/page.tsx

import CommunityBoardSection from "@/components/section/CommunityBoardSection";
import CommunityFooter from "@/components/layout/CommunityFooter";
import { CommunityAPI } from "@/api/community";

/**
 * CommunityPage component
 * @description CommunityPage component is a community page component that displays the community page content
 * @returns {React.ReactNode}
 */
export default async function CommunityPage() {
  const { communityBoardList } = await CommunityAPI.getCommunityBoardList();

  return (
    <>
      <CommunityBoardSection communityBoardList={communityBoardList} />
      <CommunityFooter />
    </>
  );
}
