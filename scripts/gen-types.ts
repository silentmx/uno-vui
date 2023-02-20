import fs from 'fs-extra';
import path from "node:path";
import { fileURLToPath } from "node:url";
import { theme } from 'unocss/preset-mini';

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const content = `/**
 * Auto genrator from unocss/preset-mini
 */
// theme type list
const ThemeList = ["primary", "secondary", "success", "warn", "error", "info", "default"] as const;
export type ThemeType = typeof ThemeList[number];

// colors type list
const ColorList = [
  $color
] as const;
export type ColorType = typeof ColorList[number];

// size type list
const SizeList = [
  $size
] as const;
export type SizeType = typeof SizeList[number];
`;

const pkgRoot = path.join(__dirname, "..");
const srcDir = path.join(pkgRoot, "src", "composables");

const colors = Object.keys(theme.colors || {}).filter(c => {
  if (theme.colors && typeof theme.colors[c] == 'object') {
    return ![
      "light",
      "dark",
      "red",
      "yellow",
      "green",
      "lightblue",
      "warmgray",
      "truegray",
      "coolgray",
      "bluegray"
    ].includes(c.toLowerCase());
  } else {
    return false;
  }
}).map(c => `"${c}",`);
const sizes = Object.keys(theme.spacing || {}).map(s => `"${s.toLowerCase()}",`);

const colorContent = content.replace("$color", colors.join("\n  "));
const sizesContent = colorContent.replace("$size", sizes.join("\n  "));
fs.writeFileSync(path.join(srcDir, "types.ts"), sizesContent, { encoding: "utf8" });