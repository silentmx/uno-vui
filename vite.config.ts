import { fileURLToPath, URL } from 'node:url';

import Vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import AutoImport from 'unplugin-auto-import/vite';
import VueMacros from 'unplugin-vue-macros';
import { defineConfig } from 'vitest/config';

const externals = [
  'vue',
  '@floating-ui/dom',
];

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "v-ui",
      fileName: "v-ui",
    },
    outDir: "dist",
    rollupOptions: {
      external: externals,
      output: {
        globals: {
          "vue": "Vue",
          "@floating-ui/dom": "FloatingDom",
        }
      }
    }
  },
  plugins: [
    VueMacros.vite({
      plugins: {
        vue: Vue()
      }
    }),
    AutoImport({
      imports: ["vue", "@vueuse/core"],
      dts: "src/auto-imports.d.ts"
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
})
