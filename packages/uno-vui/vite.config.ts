import Vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "uno-vui",
      fileName: "uno-vui"
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  plugins: [
    Vue(),
    Unocss(),
    AutoImport({
      imports: ["vue", "@vueuse/core"],
      ignore: ["h"],
      vueTemplate: true
    })
  ]
});