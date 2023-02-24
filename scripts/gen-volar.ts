import camelcase from 'camelcase';
import fs from 'fs-extra';
import { globbySync } from "globby";
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const indexContent = `/**
 * Auto genrator
 */
$component
`;

const volarContent = `/** 
 * Auto genrator
 */
declare module 'vue' {
  export interface GlobalComponents {
    $component
  }
}

export { }
`;

const pkgRoot = path.join(__dirname, "..");
const componentsDir = path.join(pkgRoot, "packages", "v-ui", "src", "components");
const componentsPath = globbySync(["**/index.vue"], { cwd: componentsDir, absolute: true });
const componentProps = componentsPath.map(c => {
  let props = path.parse(c);
  let name = camelcase(`V-${props.dir.split(path.sep).pop()}`, { pascalCase: true, preserveConsecutiveUppercase: true });
  let url = `./${props.dir.split(path.sep).pop()}/${props.base}`;
  return {
    name,
    url
  };
});

// Write /src/components/index.ts
const exports = componentProps.map(c => `export { default as ${c.name} }  from '${c.url}';`)
let componentIndexContent = indexContent.replace("$component", exports.join("\n"));
fs.writeFileSync(path.join(componentsDir, "index.ts"), componentIndexContent, { encoding: "utf8" });

// Write volar.d.ts
const volarDir = path.join(pkgRoot, "packages", "v-ui");
const imports = componentProps.map(c => `${c.name}: typeof import('@silentmx/v-ui')['${c.name}']`);
const volarDTSContent = volarContent.replace('$component', imports.join("\n    "));
fs.writeFileSync(path.join(volarDir, "volar.d.ts"), volarDTSContent, { encoding: "utf8" });