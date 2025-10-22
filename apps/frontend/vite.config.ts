import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // Ensure correct asset URLs when hosted under /<repo>/ on GitHub Pages
  base: process.env.BASE_PATH || (process.env.GITHUB_PAGES ? '/hacheviajes/' : '/'),
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: true,
    port: 5173
  }
});
