// frontend/src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "PromOcean",
  description: "프롬프트를 위한 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>

        {/* Todo: tailwind나 globals.css쪽에서 적용안돼서 방법 찾으면 해결 예정입니다. */}
        {/* Pretendard CDN — 100% 확실하게 적용됨 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="font-[Pretendard] bg-background text-text">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 bg-background">{children}</main>
        </div>
      </body>
    </html>
  );
}
