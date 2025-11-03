// frontend/src/app/contest/page.tsx

import ContestHeroSection from "@/components/section/ContestHeroSection";
import ContestCardSection from "@/components/section/ContestCardSection";
import { ContestCardItemProps } from "@/types/itemType";

export default async function ContestPage() {
  // TODO: 실제 API와 연동하기
  const contestRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/ContestCard.json`,
    { cache: "no-store" }
  );

  const contestCardList: ContestCardItemProps[] = await contestRes.json().catch(() => []);

  return (
    <div className="min-h-screen bg-gray-50">
      <ContestHeroSection />
      <ContestCardSection contestCardList={contestCardList} />
    </div>
  );
}
