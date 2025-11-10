// frontend/src/app/contest/page.tsx

import ContestHeroSection from "@/components/section/ContestHeroSection";
import ContestCardSection from "@/components/section/ContestCardSection";
import { ContestCardItemProps } from "@/types/itemType";
import { ContestAPI } from "@/api/contest";

export default async function ContestPage() {

  const { contestCardList }: { contestCardList: ContestCardItemProps[] } = await ContestAPI.getContestCardList(0, 10, "", "", "", "");

  return (
    <div className="min-h-screen bg-gray-50">
      <ContestHeroSection />
      <ContestCardSection contestCardList={contestCardList} />
    </div>
  );
}
