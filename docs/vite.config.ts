import { UnovuiResolver } from 'uno-vui';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    Unocss(),
    AutoImport({
      imports: ["vue", "@vueuse/core"],
      include: [/\.[jt]sx?$/, /\.vue\??/, /\.md$/],
      vueTemplate: true
    }),
    Components({
      resolvers: [
        UnovuiResolver()
      ]
    }),
  ]
})