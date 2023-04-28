import Vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "uno-vui",
      fileName: "uno-vui",
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "unocss", "@vueuse/core", "unocss/preset-mini"],
      output: {
        globals: {
          vue: "Vue",
          unocss: "unocss",
          "@vueuse/core": "@vueuse/core",
          "unocss/preset-mini": "unocss/preset-mini"
        }
      }
    }
  },
  plugins: [
    Vue(),
    AutoImport({
      imports: ["vue", "@vueuse/core"],
      vueTemplate: true
    })
  ]
})