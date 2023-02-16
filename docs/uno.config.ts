import { defineConfig, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';
export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      cdn: "https://esm.sh/"
    })
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives()
  ],
  include: [/.*\/xxx\.js(.*)?$/, './**/*.vue', './**/*.md'],
});