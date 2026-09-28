import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['tests/apps/**/*.test.{js,jsx,ts,tsx}'],
    setupFiles: ['./tests/apps/setup.js'],
  },
});
