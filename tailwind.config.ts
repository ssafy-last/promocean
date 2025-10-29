// frontend/tailwind.config.ts
import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5c94f7",      // PromOcean 메인 컬러
        secondary: "#a6fbfc",    // 서브 컬러
        background: "#fdfdfc",   // 배경색
        text: "#343434",         // 텍스트
        "dark-mode": "#213477",  // 다크모드 대비
      },
    },
  },
  plugins: [daisyui], // ✅ ESM import 버전
  // ⛔ 주의: Tailwind v4 타입 정의에는 `daisyui` 필드가 포함 안 되어 있음
  // 따라서 아래는 별도 주석형 config 객체로 작성
} satisfies Config;

// DaisyUI 테마를 따로 export 해도 OK (v4에서는 별도 config로 처리됨)
export const daisyuiThemes = {
  themes: [
    {
      promeocean: {
        primary: "#5c94f7",
        secondary: "#a6fbfc",
        accent: "#4b7cf7",
        neutral: "#343434",
        "base-100": "#fdfdfc",
        info: "#93e3ff",
        success: "#36d399",
        warning: "#fbbd23",
        error: "#f87272",
      },
    },
    "light",
  ],
};

export default config;
