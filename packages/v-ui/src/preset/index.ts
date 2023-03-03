import type { Preset } from "unocss";
import type { Theme } from "unocss/preset-uno";
import type { PresetConfig } from "./config";
import { setPrelight } from "./prelights";
import { safelist } from "./safe-list";
import { theme } from "./theme";

export function presetVui(config?: PresetConfig): Preset<Theme> {
  return {
    name: "@silentmx/v-ui-preset",
    theme,
    safelist,
    layers: {
      theme: 0,
      default: 1,
    },
    preflights: setPrelight(config)
  }
}