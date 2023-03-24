import type { ComponentResolver } from 'unplugin-vue-components';

export function UnovuiResolver(): ComponentResolver {
  return {
    type: "component",
    resolve: (name: string) => {
      if (name.match(/^Uv[A-Z]|uv-[a-z]/)) {
        return { name, from: 'uno-vui' };
      }
    }
  }
}