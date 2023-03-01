import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    Unocss(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      include: [/\.[jt]sx?$/, /\.vue\??/, /\.md$/],
      vueTemplate: true,
      ignore: ["h"],
      dts: 'auto-imports.d.ts',
    }),
  ],
})
