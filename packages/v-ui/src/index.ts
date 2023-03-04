import type { App } from 'vue';
import components from './components';
import functions from './functions';

export { VUiResolver } from './component-resolver';
export * from './components';
export * from './functions';
export { presetVui } from './preset';

export const vui = {
  install(app: App) {
    components.forEach(c => app.use(c));
    functions.forEach(f => app.use(f));
  }
}