import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)'],
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
  plugins: [],
} satisfies Config;
