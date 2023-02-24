import Vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vitest/config';

const r = (p: string) => resolve(__dirname, p);

export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      imports: ["vue", "@vueuse/core"],
      dts: false,
      vueTemplate: true
    }),
  ],
  optimizeDeps: {
    disabled: true,
  },
  test: {
    clearMocks: true,
    environment: 'jsdom',
    transformMode: {
      web: [/\.[jt]sx$/],
    },
  },
  resolve: {
    alias: {
      "@v-ui/components": r("./packages/v-ui/src/components")
    },
  },
})
