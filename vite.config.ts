import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: './',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  build: {
    outDir: 'deploy',
    emptyOutDir: true,
  },
});