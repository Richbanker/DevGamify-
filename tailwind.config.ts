import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
} satisfies Config
