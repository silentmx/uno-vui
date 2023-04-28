import type { App } from 'vue';
import * as components from './components';

// export all components
export * from './components';

export const Unovui = {
  install(app: App) {
    Object.values(components).forEach(c => app.use(c));
  }
}