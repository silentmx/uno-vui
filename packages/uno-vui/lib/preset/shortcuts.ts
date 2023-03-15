import type { UserShortcuts } from "unocss";
import type { Theme } from "unocss/preset-mini";

export const shortcuts: UserShortcuts<Theme> = [
  // static shortcuts
  {
    "unovui-overlay-container": "empty-hidden overflow-hidden pointer-events-none fixed z-1000 top-0 right-0 left-0 bottom-0",
    "unovui-overlay-popup": "pointer-events-auto",
  },
  // dynamic shortcuts
  // [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
];