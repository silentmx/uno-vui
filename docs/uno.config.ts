import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';
export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      cdn: "https://esm.sh/"
    })
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives()
  ],
  include: [/.*\/v-ui\.js(.*)?$/, './**/*.vue', './**/*.md'],
});