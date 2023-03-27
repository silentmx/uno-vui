import { promises as fs } from 'node:fs';
import { presetUnoVui } from 'uno-vui';
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      collections: {
        "svgs": (name) => {
          return fs.readFile(`./public/svgs/${name}.svg`, "utf-8");
        },
        "csvgs": (name) => {
          return fs.readFile(`./public/svgs/${name}.svg`, 'utf-8');
        }
      },
      customizations: {
        transform(svg, collection) {
          if (collection == "csvgs") {
            return svg;
          }
          return svg.replace(/fill=[\'\"]\S*[\'\"]/, "fill=\"currentColor\"");
        }
      },
      extraProperties: {
        "display": "inline-block",
        "vertical-align": "middle",
      }
    }),
    presetUnoVui({
      themes: [
        { primary: "blue", accent: "purple" },
        { primary: "blue", accent: "purple" },
        { primary: "pink", accent: "violet" },
      ]
    }),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  include: [/.*\/uno-vui\.js(.*)?$/, './**/*.vue', './**/*.md']
});