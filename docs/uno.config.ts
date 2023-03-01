import { presetVui } from '@silentmx/v-ui';
import {
  defineConfig, presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetVui({
      themes: [
        { primary: "blue", accent: "purple" },
        { primary: "pink", accent: "violet" },
      ]
    }),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives()
  ],
  include: [/.*\/v-ui\.js(.*)?$/, './**/*.vue', './**/*.md']
});