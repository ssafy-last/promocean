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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-background"
        style={{margin: 0, padding: 0}}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 bg-background">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
