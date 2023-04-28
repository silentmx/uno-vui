import { deOptimisePaths, importDirectory, runSVGO } from '@iconify/tools';
import { mergeDeep } from 'unocss';
import type { IconsOptions } from 'unocss/preset-icons';

/**
 * config for preset-icons
 * @param { string } path svg存放位置, 默认`src/assets/svgs`
 * @param { IconsOptions } options 自定义配置
 * @returns { IconsOptions }
 */
export const iconConfig = (path: string = "src/assets/svgs", options: IconsOptions = {}): IconsOptions => {
  return mergeDeep({
    collections: {
      // custom icon set
      "svg": async () => {
        // load icons
        const iconSet = await importDirectory(path, {
          prefix: "svg",
        });

        await iconSet.forEach(async (name, type) => {
          if (type !== "icon") {
            return;
          }

          const svg = iconSet.toSVG(name);
          if (svg) {
            // Optimise
            runSVGO(svg);

            // Update paths for compatibility with old software
            await deOptimisePaths(svg);
          } else {
            iconSet.remove(name);
            return;
          }
        });
        // Export as IconifyJson
        return iconSet.export();
      }
    },
    extraProperties: {
      "display": "inline-block",
      "vertical-align": "middle",
    }
  }, options);
}