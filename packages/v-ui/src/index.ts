import type { App } from 'vue';
import components from './components';

export { VUiResolver } from './component-resolver';
export * from './components';
export { presetVui } from './preset';

export const vui = {
  install(app: App) {
    components.forEach(c => app.use(c));
  }
}