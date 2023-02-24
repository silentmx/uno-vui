import { fileURLToPath } from 'node:url'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Unocss(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      vueTemplate: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url))
    }
  }
})
