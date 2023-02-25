import { ThemeList } from "../composables/types";

// bluepurple: {
//   primarylight: '#1d4ed8',
//   primarydark: '#3b82f6',
//   secondarylight: '#7e22ce',
//   secondarydark: '#a855f7'
// },
// ambergray: {
//   primarylight: '#b45309',
//   primarydark: '#f59e0b',
//   secondarylight: '#374151',
//   secondarydark: '#6b7280'
// },
// successlight: '#15803d',
// successdark: '#22c55e',
// warnlight: '#a16207',
// warndark: '#eab308',
// errorlight: '#b91c1c',
// errordark: '#ef4444',
// infolight: '#374151',
// infodark: '#6b7280'
export const safelist: string[] = [
  // theme safe list
  ...ThemeList.map((item: string) => {

    return `bg-bluepurple-successdark`;
  }),
];