import { baseParse, type AttributeNode, type ElementNode } from '@vue/compiler-core';
import fsExtra from 'fs-extra';
import { dirname, resolve } from "node:path";
import type { MarkdownRenderer } from "vitepress";
import { getDemoComponent } from './utils';

export function demoBlockPlugin(md: MarkdownRenderer) {
  const addRenderRule = (type: string) => {
    const defaultRender = md.renderer.rules[type];

    md.renderer.rules[type] = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      const content = token.content.trim();

      if (!content.startsWith(`<demo `)) {
        return defaultRender!(tokens, idx, options, env, self);
      }

      const { path } = env;
      const props = parseProps(content);

      if (!props.src) {
        return defaultRender!(tokens, idx, options, env, self);
      }

      const frontmatter = env.frontmatter;
      const mdDir = dirname(frontmatter.realPath ?? path);
      const srcPath = resolve(mdDir, props.src);
      const code = fsExtra.readFileSync(srcPath, "utf-8");

      const demoScripts = getDemoComponent(md, env, {
        title: props.title,
        desc: props.desc,
        path: srcPath,
        code,
        ...props
      });

      return demoScripts;
    }
  }

  addRenderRule("html_inline");
  addRenderRule("html_block");
}

function parseProps(content: string) {
  const ast = baseParse(content);
  const demoElement = ast.children[0] as ElementNode;

  const props = getPropsMap(demoElement.props as AttributeNode[]);

  return props;
}

function getPropsMap(attrs: AttributeNode[]) {
  const map: Record<string, string | undefined> = {};
  for (const { name, value } of attrs) {
    map[name] = value?.content;
  }
  return map;
}

