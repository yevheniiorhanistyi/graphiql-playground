import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    watch: false,
    globals: true,
    setupFiles: 'tests/setup.ts',
    environment: 'jsdom',
    css: true,
    coverage: {
      enabled: true,
      all: true,
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['.next/*', 'next.config.js', 'src/constants/*', 'src/interfaces/*', 'src/types/*'],
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
});
