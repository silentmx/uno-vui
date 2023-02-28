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
        { primary: "blue", secondary: "purple" },
        { primary: "pink", secondary: "violet" },
      ]
    }),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives()
  ],
  include: [/.*\/v-ui\.js(.*)?$/, './**/*.vue', './**/*.md']
});