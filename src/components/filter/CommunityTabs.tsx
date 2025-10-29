'use client';

// frontend/src/components/filter/CommunityTabs.tsx

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CommunityTabs() {
  const categories = [
    { name: "전체", href: "/community" },
    { name: "업무", href: "/community/work" },
    { name: "개발", href: "/community/dev" },
    { name: "디자인", href: "/community/design" },
    { name: "교육", href: "/community/edu" },
    { name: "마케팅", href: "/community/marketing" },
    { name: "창작", href: "/community/creation" },
    { name: "데이터", href: "/community/data" },
    { name: "생활", href: "/community/life" },
    { name: "AI", href: "/community/ai" },
  ];
  
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <ul className="flex space-x-6 px-8">
        {categories.map((cat) => {
          const isActive = pathname === cat.href;
          return (
            <li key={cat.name}>
              <Link
                href={cat.href}
                className={`inline-block py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#5c94f7] border-b-2 border-[#5c94f7]"
                    : "text-gray-600 hover:text-[#5c94f7]"
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