import type { App } from 'vue';
import * as components from './components';

// export all components
export * from './components';
// export preset
export { changeTheme, presetThemeConfigs } from './composables';

/**
 * Vue app global install obj
 */
export const Unovui = {
  install(app: App) {
    Object.values(components).forEach(c => app.use(c));
  }
}