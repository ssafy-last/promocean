'use client';

// frontend/src/components/filter/CommunityTabs.tsx

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function MySpaceTabs() {
  const categories = [
    { name: "아카이브", tab: "archive", href:"/archive" },
    { name: "스크랩", tab: "scrap", href :"/scrap" },

  ];

  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'all';

  return (
    <nav className="border-b border-gray-200 bg-white py-2">
      <ul className="flex space-x-6 px-8">
        {categories.map((cat) => {
          const href = `/my-space/${cat.href}`;
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