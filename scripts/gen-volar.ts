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

const genImportString = (componentName: string) => `${componentName}: typeof import('v-ui')['${componentName}']`;
const genExportString = (name: string, url: string) => `export { default as ${name} } from '${url}';`;

const pkgRoot = path.join(__dirname, "..");
const componentsDir = path.join(pkgRoot, "src", "components");
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
const exports = componentProps.map(c => genExportString(c.name, c.url));
const componentIndexContent = indexContent.replace('$component', exports.join("\n"));
fs.writeFileSync(path.join(componentsDir, "index.ts"), componentIndexContent, { encoding: "utf8" });

// Write volar.d.ts
const imports = componentProps.map(c => genImportString(c.name));
const volarDTSContent = volarContent.replace('$component', imports.join("\n    "));
fs.writeFileSync(path.join(pkgRoot, "volar.d.ts"), volarDTSContent, { encoding: "utf8" });