import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  base: '/mechanisms/router/dist/',
  plugins: [react()],
});
