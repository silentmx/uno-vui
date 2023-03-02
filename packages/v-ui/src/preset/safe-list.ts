import { ColorList, colorRegion, type ColorType } from "../composables/types";

export const safelist: string[] = [
  // theme color safe list
  ...ColorList.reduce((acc: string[], cur: ColorType) => {
    // 背景色，文字颜色，边框颜色
    acc.push(...[
      `bg-${cur}`, `text-${cur}`, `b-${cur}`
    ]);

    colorRegion.forEach(region => {
      acc.push(...[
        `bg-${cur}-${region}`, `text-${cur}-${region}`, `b-${cur}-${region}`,
      ]);
    });

    return acc;
  }, []).flat(2),
];