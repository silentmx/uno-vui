import type { ThemeConfig } from "./types";

export function setSafelist(theme: ThemeConfig): string[] {
  const themeKeys = Object.keys(theme);
  themeKeys.push("default");
  return [
    // theme color safe list
    ...themeKeys.reduce((acc: string[], cur) => {
      acc.push(...[
        `bg-${cur}`, `text-${cur}`, `b-${cur}`,
        `hover:bg-${cur}`, `hover:text-${cur}`, `hover:b-${cur}`,
        `hover:bg-${cur}Light`, `hover:text-${cur}Light`, `hover:b-${cur}Light`,
        `hover:bg-${cur}Heavy`, `hover:text-${cur}Heavy`, `hover:b-${cur}Heavy`,
      ]);
      return acc;
    }, []).flat(2)
  ];
}