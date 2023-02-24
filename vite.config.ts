import { fileURLToPath, URL } from 'node:url';

import Vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vitest/config';

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
      external: [
        'vue',
      ],
      output: {
        globals: {
          "vue": "Vue",
        }
      }
    }
  },
  plugins: [
    Vue(),
    // https://github.com/antfu/unplugin-auto-import
    Unocss(),
    AutoImport({
      imports: ["vue", "@vueuse/core"],
      dts: "src/auto-imports.d.ts",
      dirs: [
        "src/composables"
      ],
      vueTemplate: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    clearMocks: true,
    include: ['test/**/*.test.ts'],
    environment: "jsdom",
    transformMode: {
      web: [/\.[jt]sx$/],
    }
  }
})
