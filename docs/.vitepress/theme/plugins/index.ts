import type { MarkdownRenderer } from "vitepress";
import { demoBlockPlugin } from "./demo-block";

export function applyPlugins(md: MarkdownRenderer) {
  md.use(demoBlockPlugin);
}