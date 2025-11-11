'use client';

// frontend/src/components/filter/CommunityTabs.tsx

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CommunityTabs() {
  const categories = [
    { name: "전체", tab: "all" },
    { name: "업무", tab: "work" },
    { name: "개발", tab: "dev" },
    { name: "디자인", tab: "design" },
    { name: "교육", tab: "edu" },
    { name: "마케팅", tab: "marketing" },
    { name: "창작", tab: "creation" },
    { name: "데이터", tab: "data" },
    { name: "생활", tab: "life" },
    { name: "AI", tab: "ai" },
  ];

  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'all';

  return (
    <nav className="border-b border-gray-200 bg-white w-full">
      <ul className="flex space-x-6 px-8">
        {categories.map((cat) => {
          const href = `/community?tab=${cat.tab}`;
          const isActive = currentTab === cat.tab;
          return (
            <li key={cat.name}>
              <Link
                href={href}
                className={`inline-block py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {cat.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}