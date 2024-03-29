import type { ComponentResolver } from 'unplugin-vue-components';

/**
 * Resolver component for `unplugin-vue-components`
 * @returns { ComponentResolver }
 */
export const unovuiResolver = (): ComponentResolver[] => {
  return [
    {
      type: "component",
      resolve: (name: string) => {
        if (name.match(/^U[A-Z]|u-[a-z]/)) {
          return { name, from: 'uno-vui' };
        }
      }
    },
    {
      type: "directive",
      resolve: (name: string) => {
        if (name.match(/^U[A-Z]|u-[a-z]/)) {
          return { name, from: 'uno-vui' };
        }
      }
    },
  ]
}