import camelcase from 'camelcase';
import fs from 'fs-extra';
import { globbySync } from "globby";
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const componentsIndexContent = `/**
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

const functionsIndexContent = `/**
* Auto genrator
*/
import type { Plugin } from 'vue';
import { withInstallFunction } from '../composables/install';

$imports

$consts

export default [
  $functions
] as Plugin[];
`;

const volarContent = `/** 
 * Auto genrator
 */
declare module 'vue' {
  export interface GlobalComponents {
    $component
  }

  // for vue template auto import
  export interface ComponentCustomProperties {
    $properties
  }
  
}

export { }
`;

const pkgRoot = path.join(__dirname, "..");
// components
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
const componentImportsContent = componentsIndexContent.replace("$imports", componentImports.join("\n"));
const componentConstsContent = componentImportsContent.replace("$consts", componentConsts.join("\n"));
const componentdefaultContent = componentConstsContent.replace("$components", componentDefaults.join("\n  "));
fs.writeFileSync(path.join(componentsDir, "index.ts"), componentdefaultContent, { encoding: "utf8" });

// functions
const functionsDir = path.join(pkgRoot, "packages", "v-ui", "src", "functions");
const functionsPath = globbySync(["*/**/index.ts"], { cwd: functionsDir, absolute: true });
const functionsProps = functionsPath.map(c => {
  let props = path.parse(c);
  let name = camelcase(`${props.dir.split(path.sep).pop()}`, { pascalCase: true, preserveConsecutiveUppercase: true });
  let url = `./${props.dir.split(path.sep).pop()}`;
  return {
    name,
    url,
  }
});
// Write /src/functions/index.ts
const functionsImports = functionsProps.map(c => `import ${c.name} from '${c.url}';`);
const functionsConsts = functionsProps.map(c => `export const V${c.name} = withInstallFunction(${c.name}, "$V${c.name}");`);
const functionsDefaults = functionsProps.map(c => `V${c.name},`);
const functionsImportsContent = functionsIndexContent.replace("$imports", functionsImports.join("\n"));
const functionsConstsContent = functionsImportsContent.replace("$consts", functionsConsts.join("\n"));
const functionsdefaultContent = functionsConstsContent.replace("$functions", functionsDefaults.join("\n  "));
fs.writeFileSync(path.join(functionsDir, "index.ts"), functionsdefaultContent, { encoding: "utf8" });


// Write volar.d.ts
const volarDir = path.join(pkgRoot, "packages", "v-ui");
const imports = componentProps.map(c => `${c.componentName}: typeof import('@silentmx/v-ui')['${c.componentName}']`);
const properties = functionsProps.map(c => `$V${c.name}: typeof import('@silentmx/v-ui')['V${c.name}']`);
const volarDTSContent = volarContent.replace('$component', imports.join("\n    "));
const volarPropertiesContent = volarDTSContent.replace("$properties", properties.join("\n    "));
fs.writeFileSync(path.join(volarDir, "volar.d.ts"), volarPropertiesContent, { encoding: "utf8" });