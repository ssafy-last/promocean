import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
  },
  eslint: {
  ignoreDuringBuilds: true,  // 빌드 시 ESLint 무시
  },
  reactCompiler: true,
  output: 'export',
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },      
      {
        protocol: 'https',
        hostname: 'i.namu.wiki',
        port: '',
        pathname: '/i/**', // 특정 경로만 허용
      },
    ],
  },
};

export default nextConfig;
