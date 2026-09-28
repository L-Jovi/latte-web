// Draft’s fbjs dependency expects the Node-style global name in its browser bundle.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  base: './',
  define: { global: 'globalThis' },
  plugins: [react()],
});
