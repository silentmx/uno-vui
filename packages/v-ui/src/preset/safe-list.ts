import { ColorList } from "../composables/types";

//颜色区间
const colorRegion = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

export const safeListSet = (): string[] => {
  const staticColorsSafeList = [
    "bg-red", "text-red",
    "bg-yellow", "text-yellow",
    "bg-green", "text-green",
    "bg-gray", "text-gray",
  ];

  // theme safe list
  let themeSafeList: string[] = ColorList.map(item => {
    return [`bg-${item}`, `text-${item}`];
  }).flat(2);

  return [
    ...staticColorsSafeList,
    ...themeSafeList
  ]
}