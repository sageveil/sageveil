import { defineConfig } from 'vite';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/tools/scripts',
  plugins: [],
  test: {
    name: 'tools-scripts',
    watch: false,
    globals: true,
    environment: 'node',
    include: ['*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      include: ['*.{ts,tsx,js,jsx,mjs,cjs,mts,cts}'],
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
}));
