import type { ComponentResolver } from 'unplugin-vue-components';
/**
 * Resolver for @silentmx/v-ui
 * @link
 */
export function VUiResolver(): ComponentResolver {
  return {
    type: "component",
    resolve: (name: string) => {
      if (name.match(/^V[A-Z]|v-[a-z]/)) {
        return { name, from: "v-ui" };
      }
    }
  }
}