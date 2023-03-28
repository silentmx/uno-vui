import { ThemeKeys } from "./types";

export const safelist: string[] = [
  // border type
  ...["b-dashed", "b-solid"],
  // theme color safe list
  ...ThemeKeys.reduce((acc: string[], cur) => {
    acc.push(...[
      `bg-${cur}`, `text-${cur}`, `b-${cur}`, `outline-${cur}`,
      `hover:bg-${cur}`, `hover:text-${cur}`, `hover:b-${cur}`, `hover:outline-${cur}`,
      `hover:bg-${cur}Light`, `hover:text-${cur}Light`, `hover:b-${cur}Light`, `hover:outline-${cur}Light`,
      `hover:bg-${cur}Heavy`, `hover:text-${cur}Heavy`, `hover:b-${cur}Heavy`, `hover:outline-${cur}Heavy`,
      `shadow-${cur}`, `shadow-${cur}Light`, `shadow-${cur}Heavy`,
      `after:shadow-${cur}`, `after:shadow-${cur}Light`, `after:shadow-${cur}Heavy`,
    ]);
    return acc;
  }, []).flat(2)
];