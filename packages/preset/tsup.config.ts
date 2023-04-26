import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts'
  ],
  clean: true,
  format: ['cjs', 'esm'],
  external: ['vue', '@vueuse/core', 'unocss', 'unplugin-vue-components', '@iconify/tools'],
  treeshake: true,
  dts: true,
})