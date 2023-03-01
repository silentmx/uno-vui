import { ColorList, colorRegion, type ColorType } from "../composables/types";

export const safeListSet = (): string[] => {
  // theme color safe list
  const themeColorSafeList: string[] = ColorList.reduce((acc: string[], cur: ColorType) => {
    // 背景色，文字颜色，边框颜色
    acc.push(...[
      `bg-${cur}`, `text-${cur}`, `b-${cur}`,
      `hover:bg-${cur}`, `hover:text-${cur}`, `hover:b-${cur}`,
      `dark:bg-${cur}`, `dark:text-${cur}`, `dark:b-${cur}`,
      `dark:hover:bg-${cur}`, `dark:hover:text-${cur}`, `dark:hover:b-${cur}`,
      `hover:dark:bg-${cur}`, `hover:dark:text-${cur}`, `hover:dark:b-${cur}`,
    ]);

    colorRegion.forEach(region => {
      acc.push(...[
        `bg-${cur}-${region}`, `text-${cur}-${region}`, `b-${cur}-${region}`,
        `hover:bg-${cur}-${region}`, `hover:text-${cur}-${region}`, `hover:b-${cur}-${region}`,
        `dark:bg-${cur}-${region}`, `dark:text-${cur}-${region}`, `dark:b-${cur}-${region}`,
        `dark:hover:bg-${cur}-${region}`, `dark:hover:text-${cur}-${region}`, `dark:hover:b-${cur}-${region}`,
        `hover:dark:bg-${cur}-${region}`, `hover:dark:text-${cur}-${region}`, `hover:dark:b-${cur}-${region}`,
      ]);
    })
    return acc;
  }, []);

  return [
    ...themeColorSafeList
  ];
}