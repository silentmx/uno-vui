import Vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import AutoImport from 'unplugin-auto-import/vite';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      imports: ["vue", "@vueuse/core"],
      vueTemplate: true
    }),
  ],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/*'],
    root: fileURLToPath(new URL('./', import.meta.url)),
  },
  resolve: {
    alias: {
      "@uno-vui": fileURLToPath(new URL("./packages/uno-vui/lib", import.meta.url))
    },
  },
})
