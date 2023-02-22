import {
  defineConfig, presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';
import { presetVui } from '../src/preset';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      cdn: "https://esm.sh/"
    }),
    presetVui(),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives()
  ],
});