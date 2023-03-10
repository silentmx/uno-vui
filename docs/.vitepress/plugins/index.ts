import type { MarkdownRenderer } from "vitepress";
import { demoBlockPlugin } from "./demo-block-plugin";
import { fencePlugin } from "./fence-plugin";

export function applyPlugins(md: MarkdownRenderer) {
  md.use(fencePlugin);
  md.use(demoBlockPlugin);
}