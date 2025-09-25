import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: { reporter: ['text', 'lcov'], include: ['src/**/*.{ts,tsx}'] },
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['node_modules/**', 'e2e/**'],
  },
})
