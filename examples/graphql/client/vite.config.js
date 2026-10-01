import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  // Relative, like the other apps, so the built page also works on GitHub Pages
  // under /latte-web/.
  base: './',
});
