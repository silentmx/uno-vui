import { sep } from "node:path";
import type { MarkdownRenderer } from "vitepress";
import type { DemoInfos } from './type';

const scriptRE = /<\/script>/;
const scriptLangTsRE = /<\s*script[^>]*\blang=['"]ts['"][^>]*/;
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/;
const scriptClientRE = /<\s*script[^>]*\bclient\b[^>]*/;

let index = 1;
export function getDemoComponent(md: MarkdownRenderer, env: any, { title, desc, path, code, ...props }: DemoInfos) {
  const componentName = `DemoComponent${index++}`;
  path = normalizePath(path);
  injectImportStatement(env, componentName, path);

  const lang = props.lang || "vue";
  const prop = props.prop || "";
  const highlightedCode = md.options.highlight!(code, lang, prop);
  return `
    <demo
      code="${encodeURIComponent(code)}"
      highlightedCode="${encodeURIComponent(highlightedCode)}"
      lang="${lang}"
      src="${path}"
      title="${title ?? ''}"
      desc="${desc ?? ''}"
    >
      <${componentName}></${componentName}>
    </demo>
  `.trim();
}

function normalizePath(path: string) {
  return path.split(sep).join('/');
}

function injectImportStatement(env: any, componentName: string, path: string) {
  const componentRegistStatement = `import ${componentName} from '${path}'`.trim();

  if (!env?.sfcBlocks?.scripts) {
    env.sfcBlocks.scripts = [];
  }

  const tags = env.sfcBlocks.scripts as { content: string }[];

  const isUsingTS = tags.findIndex(tag => scriptLangTsRE.test(tag.content)) > -1;
  const existingSetupScriptIndex = tags?.findIndex((tag) => {
    return (
      scriptRE.test(tag.content)
      && scriptSetupRE.test(tag.content)
      && !scriptClientRE.test(tag.content)
    )
  });

  if (existingSetupScriptIndex > -1) {
    const tagSrc = tags[existingSetupScriptIndex];
    tags[existingSetupScriptIndex].content = tagSrc.content.replace(
      scriptRE,
      `${componentRegistStatement}
      </script>`,
    );
  } else {
    tags.unshift({
      content: `
        <script ${isUsingTS ? 'lang="ts"' : ''} setup >
          ${componentRegistStatement}
        </script>
      `.trim(),
    });
  }
}