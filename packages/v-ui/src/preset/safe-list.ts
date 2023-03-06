import { ThemeList } from "./config";

export const safelist: string[] = [
  // theme color safe list
  ...ThemeList.reduce((acc: string[], cur) => {
    acc.push(...[
      `bg-${cur}`, `text-${cur}`, `b-${cur}`,
      `hover:bg-${cur}`, `hover:text-${cur}`, `hover:b-${cur}`,
      `hover:bg-${cur}Light`, `hover:text-${cur}Light`, `hover:b-${cur}Light`,
      `hover:bg-${cur}Heavy`, `hover:text-${cur}Heavy`, `hover:b-${cur}Heavy`,
    ]);
    return acc;
  }, []).flat(2)
];