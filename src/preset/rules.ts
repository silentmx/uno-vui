import type { Rule, RuleContext } from "unocss";
import { parseColor } from 'unocss/preset-mini';
import type { Theme } from "unocss/preset-uno";

export const rules: Rule<Theme>[] = [
  // Theme Rules
  [/^bg-(.*)$/, ([, c]: string[], { theme }: RuleContext<Theme>) => {
    console.log(c);
    const color = parseColor(c, theme);
    return { 'background-color': `${color?.color}` }
  }],
];