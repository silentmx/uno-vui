import type { ComponentResolver } from 'unplugin-vue-components';

/**
 * Resolver component for 'unplugin-vue-components
 * @returns {ComponentResolver}
 */
export function UnovuiResolver(): ComponentResolver {
  return {
    type: "component",
    resolve: (name: string) => {
      if (name.match(/^U[A-Z]|u-[a-z]/)) {
        return { name, from: 'uno-vui' };
      }
    }
  }
}