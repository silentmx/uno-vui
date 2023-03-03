import { ThemeList } from "./config";

export const safelist: string[] = [
  // theme color safe list
  ...ThemeList.reduce((acc: string[], cur) => {
    acc.push(...[
      `bg-${cur}`, `text-${cur}`, `b-${cur}`,
      `hover:bg-${cur}`, `hover:text-${cur}`, `hover:b-${cur}`,
      `hover:bg-h${cur}`, `hover:text-h${cur}`, `hover:b-h${cur}`,
    ]);
    return acc;
  }, []).flat(2)
];