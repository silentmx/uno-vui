import { ColorList, colorRegion } from "../composables/types";

export const safeListSet = (): string[] => {
  const staticColorsSafeList = [
    "bg-red", "text-red",
    "bg-yellow", "text-yellow",
    "bg-green", "text-green",
    "bg-gray", "text-gray",
  ];

  // theme safe list
  const themeSafeList: string[] = ColorList.map(item => {
    return [`bg-${item}`, `text-${item}`];
  }).flat(2);

  const safeList = [
    ...staticColorsSafeList,
    ...themeSafeList
  ];

  const res = safeList.reduce((acc: string[], cur: string) => {
    acc.push(cur);
    colorRegion.forEach(val => {
      acc.push(`${cur}-${val}`);
    });
    return acc;
  }, []);

  return res;
}