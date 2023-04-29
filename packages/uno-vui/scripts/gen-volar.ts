import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as unovui from 'uno-vui';
import { name } from '../package.json';

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const contentTemplate = `// Auto generated declarations for volar
declare module 'vue' {
  export interface GlobalComponents {
    $components
  }
}

export { }`;

const pkgRoot = path.join(__dirname, "..");
const allKeys = Object.keys(unovui).filter(k => {
  const isUtils = k.toLowerCase().startsWith("unovui") || k.toLowerCase().startsWith("transformer");
  const isPreset = k.toLowerCase().startsWith("preset");
  return !(isUtils || isPreset);
});
const volarDTSContent = contentTemplate.replace(
  "$components",
  allKeys.filter(k => k.startsWith("U"))
    .map((componentName) => `${componentName}: typeof import('${name}')['${componentName}']`)
    .join("\n    ")
);

// write files
fs.writeFileSync(path.join(pkgRoot, "volar.d.ts"), volarDTSContent, { encoding: "utf8" });
