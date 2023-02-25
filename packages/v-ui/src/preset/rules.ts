import type { Rule, RuleContext } from "unocss";
import type { Theme } from "unocss/preset-uno";

export const rules: Rule<Theme>[] = [
  // Theme Rules
  [/^bg-(.*)-(.*)$/, ([, t, c]: string[], { theme }: RuleContext<Theme>) => {
    console.log(t);
    console.log(c);
    console.log(theme.colors);
    return { 'background-color': `red` }
  }],
];