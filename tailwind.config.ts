// frontend/tailwind.config.ts

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5c94f7',
        secondary: '#a6fbfc',
        background: '#fdfdfc',
        text: '#343434',
        'dark-mode': '#213477',
      },
    },
  },
  plugins: [],
}

export default config
