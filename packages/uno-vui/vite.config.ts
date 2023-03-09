import { resolve } from 'node:path';
import { defineConfig, mergeConfig } from 'vite';
import viteConfig from '../../vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    build: {
      lib: {
        entry: resolve(__dirname, "lib/main.ts"),
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
    }
  })
);