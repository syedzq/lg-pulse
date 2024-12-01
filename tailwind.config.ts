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
        },
        'brand': {
          50: '#EDF7F0',
          100: '#D8EEDF',
          200: '#B5DEC2',
          300: '#8ECCA2',
          400: '#6BBD85',
          500: '#4AA567',
          600: '#3C8653',
          700: '#2C633D',
          800: '#1E432A',
          900: '#0E2014',
          950: '#08120B',
        },
      },
    },
  },
  safelist: [
    'bg-[#22c55e]',
    'hover:bg-[#16a34a]',
  ],
  plugins: [],
} satisfies Config;
