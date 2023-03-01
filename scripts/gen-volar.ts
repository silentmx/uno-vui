import camelcase from 'camelcase';
import fs from 'fs-extra';
import { globbySync } from "globby";
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const indexContent = `/**
 * Auto genrator
 */
import type { Plugin } from 'vue';
import { withInstall } from '../composables/install';

$imports

$consts

export default [
  $components
] as Plugin[];
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
const componentsPath = globbySync(["**/*.vue"], { cwd: componentsDir, absolute: true });
const componentProps = componentsPath.map(c => {
  let props = path.parse(c);
  let name = camelcase(
    `${props.dir.split(path.sep).pop()}-${props.name != 'index' ? props.name : ''}`,
    { pascalCase: true, preserveConsecutiveUppercase: true }
  );
  let url = `./${props.dir.split(path.sep).pop()}/${props.base}`;
  return {
    name,
    componentName: `V${name}`,
    url
  };
});

// Write /src/components/index.ts
const componentImports = componentProps.map(c => `import ${c.name} from '${c.url}';`);
const componentConsts = componentProps.map(c => `export const ${c.componentName} = withInstall(${c.name}, "${c.componentName}");`);
const componentDefaults = componentProps.map(c => `${c.componentName},`);
const componentImportsContent = indexContent.replace("$imports", componentImports.join("\n"));
const componentConstsContent = componentImportsContent.replace("$consts", componentConsts.join("\n"));
const componentdefaultContent = componentConstsContent.replace("$components", componentDefaults.join("\n  "));
fs.writeFileSync(path.join(componentsDir, "index.ts"), componentdefaultContent, { encoding: "utf8" });

// Write volar.d.ts
const volarDir = path.join(pkgRoot, "packages", "v-ui");
const imports = componentProps.map(c => `${c.componentName}: typeof import('@silentmx/v-ui')['${c.componentName}']`);
const volarDTSContent = volarContent.replace('$component', imports.join("\n    "));
fs.writeFileSync(path.join(volarDir, "volar.d.ts"), volarDTSContent, { encoding: "utf8" });