import { iconConfig, presetUnoVui, TransformerAttributifyToClass } from '@silentmx/preset';
import {
  defineConfig,
  presetAttributify, presetIcons, presetUno,
  transformerDirectives, transformerVariantGroup
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(iconConfig("assets/svgs")),
    presetUnoVui({
      themes: [
        { primary: "blue", accent: "purple" },
        { primary: "pink", accent: "sky" },
      ],
      // icons: {
      //   loading: "i-mingcute:loading-line animate-spin"
      // }
    })
  ],
  transformers: [
    TransformerAttributifyToClass(),
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  include: [/.*\/uno-vui\.js(.*)?$/, './**/*.vue', './**/*.md']
})