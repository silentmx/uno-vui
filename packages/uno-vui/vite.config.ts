import Vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: {
        "uno-vui": resolve(__dirname, "src/index.ts"),
        "preset": resolve(__dirname, "src/preset/index.ts"),
        "utils": resolve(__dirname, "src/utils/index.ts"),
        "forms": resolve(__dirname, "src/forms/index.ts"),
      },
      name: "uno-vui",
      fileName: (format: string, entryName: string) => `${entryName}${format == "es" ? ".js" : `.umd.${format}`}`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        "vue",
        "@vueuse/core",
        "unocss",
        "unocss/preset-mini",
        "unplugin-vue-components",
        "unplugin-auto-import",
        "@iconify/tools",
        "@floating-ui/vue",
      ],
      // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      output: {
        globals: {
          "vue": "Vue",
          "@vueuse/core": "@vueuse/core",
          "unocss": "unocss",
          "unocss/preset-mini": "unocss/preset-mini",
          "unplugin-vue-components": "unplugin-vue-components",
          "unplugin-auto-import": "unplugin-auto-import",
          "@iconify/tools": "@iconify/tools",
          "@floating-ui/vue": "@floating-ui/vue",
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