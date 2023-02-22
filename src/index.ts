export { VUiResolver } from './component-resolver';
export * from './components';
export { presetVui } from './preset';
import type { App } from 'vue';

// 全局注册组件
import * as components from './components';
export const vui = {
  install(app: App) {
    for (let name in components) {
      app.component(name, (components as any)[name]);
    }
  }
};