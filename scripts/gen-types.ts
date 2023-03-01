import fs from 'fs-extra';
import path from "node:path";
import { fileURLToPath } from "node:url";
import { theme } from 'unocss/preset-mini';

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const content = `/**
 * Auto genrator
 */
// theme type list
export const ThemeList = ["primary", "accent", "success", "warn", "error"] as const;
export type ThemeType = typeof ThemeList[number];
export interface ThemeConfig {
  primary: ColorType;
  accent: ColorType;
  success: ColorType;
  warn: ColorType;
  error: ColorType;
}

//颜色区间
export const colorRegion = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"] as const;
export type ColorRegionType = typeof colorRegion[number];

// colors type list
export const ColorList = [
  $color
] as const;
export type ColorType = typeof ColorList[number];

// size type list
export const SizeList = [
  $size
] as const;
export type SizeType = typeof SizeList[number];
`;

const pkgRoot = path.join(__dirname, "..");
const srcDir = path.join(pkgRoot, "packages", "v-ui", "src", "composables");

const colors = Object.keys(theme.colors || {}).filter(c => {
  return typeof (theme.colors as any)[c] == "object";
}).map(c => `"${c}",`);
const sizes = Object.keys(theme.spacing || {}).map(s => `"${s.toLowerCase()}",`);

const colorContent = content.replace("$color", colors.join("\n  "));
const sizesContent = colorContent.replace("$size", sizes.join("\n  "));
fs.writeFileSync(path.join(srcDir, "types.ts"), sizesContent, { encoding: "utf8" });