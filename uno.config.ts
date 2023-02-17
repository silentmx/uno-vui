import { promises as fs } from 'fs';
import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      // https://icones.js.org/collection/all
      cdn: "https://esm.sh/",
      // scale: 1.2,
      // warn: true,
      // custom svg collection
      collections: {
        // svg without default color
        "svg": (name) => {
          return fs.readFile(`./public/svgs/${name}.svg`, 'utf-8');
        },
        // svg with default color
        "csvg": (name) => {
          return fs.readFile(`./public/svgs/${name}.svg`, 'utf-8');
        }
      },
      customizations: {
        transform(svg, collection, icon) {
          if (collection == "csvg") {
            return svg;
          }
          return svg.replace(/#fff/, "currentColor");
        }
      },
      extraProperties: {
        "display": "inline-block",
        "vertical-align": "middle",
      }
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  include: [/.*\/hs-ui\.js(.*)?$/, './**/*.vue', './**/*.md']
});