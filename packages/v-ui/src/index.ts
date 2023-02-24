import type { App } from 'vue';
import * as components from './components';

export { VUiResolver } from './component-resolver';
export * from './components';
export { presetVui } from './preset';

export const vui = {
  install(app: App) {
    for (let name in components) {
      app.component(name, (components as any)[name]);
    }
  }
}