import { ThemeKeys } from "./types";

export const safelist: string[] = [
  // border type
  ...["b-dashed", "b-solid"],
  // theme color safe list
  ...ThemeKeys.reduce((acc: string[], cur) => {
    acc.push(...[
      `bg-${cur}`, `hover:bg-${cur}`, `hover:bg-${cur}Light`, `hover:bg-${cur}Heavy`,
      `b-${cur}`, `hover:b-${cur}`, `hover:b-${cur}Light`, `hover:b-${cur}Heavy`,
      `border-${cur}`, `hover:border-${cur}`, `hover:border-${cur}Light`, `hover:border-${cur}Heavy`,
      `text-${cur}`, `hover:text-${cur}`, `hover:text-${cur}Light`, `hover:text-${cur}Heavy`,
      `c-${cur}`, `hover:c-${cur}`, `hover:c-${cur}Light`, `hover:c-${cur}Heavy`,
      `shadow-${cur}`, `hover:shadow-${cur}`, `hover:shadow-${cur}Light`, `hover:shadow-${cur}Heavy`,
      `after:shadow-${cur}`, `after:shadow-${cur}Light`, `after:shadow-${cur}Heavy`,
    ]);
    return acc;
  }, []).flat(2)
];