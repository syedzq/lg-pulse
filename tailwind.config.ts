import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#22c55e',
          hover: '#16a34a',
        }
      },
    },
  },
  safelist: [
    'bg-[#22c55e]',
    'hover:bg-[#16a34a]',
  ],
  plugins: [],
} satisfies Config;
