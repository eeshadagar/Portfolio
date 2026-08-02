import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  /**
   * Serving from a custom domain (eesha.codes) or a user GitHub Pages site,
   * so the base is root. If you ever deploy to `user.github.io/repo-name`,
   * change this to '/repo-name/'.
   */
  base: '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          // Keep the animation engine in its own chunk so the shell ships fast.
          motion: ['framer-motion'],
        },
      },
    },
  },
});
