import { fileURLToPath, URL } from 'node:url';

import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Unocss(),
    AutoImport({
      imports: ["vue", "@vueuse/core"],
      include: [/\.[jt]sx?$/, /\.vue\??/, /\.md$/],
      vueTemplate: true
    })
  ],
  optimizeDeps: {
    disabled: true
  },
  resolve: {
    alias: {
      'uno-vui': fileURLToPath(new URL('./packages/uno-vui', import.meta.url))
    }
  }
})
