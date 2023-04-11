import type { App } from 'vue';
import components from './components';
import directives from './directives';

export { UnovuiResolver } from './component-resolver';
export * from './components';
export * from './directives';
export { presetUnoVui } from './preset';

export const Unovui = {
  install(app: App) {
    components.forEach(c => app.use(c));
    directives.forEach(d => app.use(d));
  }
}