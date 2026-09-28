import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  // The router matches absolute paths, so GitHub Pages builds add the site prefix.
  base: `${process.env.LATTE_PAGES_BASE ?? '/'}mechanisms/router/dist/`,
  plugins: [react()],
});
