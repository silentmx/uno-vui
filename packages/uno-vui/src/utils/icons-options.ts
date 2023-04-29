import { deOptimisePaths, importDirectory, runSVGO } from '@iconify/tools';
import { mergeDeep } from 'unocss';
import type { IconsOptions } from 'unocss/preset-icons';

type IconsConfig = {
  /**
   * 存放svg的路径
   * 
   * @default `src/assets/svgs`
   */
  svgPath?: string;

  /**
   * Unocss presetIcons {@link IconsOptions}
   */
  iconsOptions?: IconsOptions;
}

/**
 * uno-vui icon config for preset-icons
 * @param config {@link IconsConfig}
 * @returns { IconsOptions }
 */
export const unovuiIconsOptions = (config: IconsConfig = {}): IconsOptions => {
  const {
    svgPath = "src/assets/svgs",
    iconsOptions = {}
  } = config;

  return mergeDeep({
    collections: {
      // custom icon set
      "svg": async () => {
        // load icons
        const iconSet = await importDirectory(svgPath, {
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
  }, iconsOptions);
}