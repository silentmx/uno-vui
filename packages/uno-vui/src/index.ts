import type { App } from 'vue';
import components from './components';

export * from './components';

export const Unovui = {
  install(app: App) {
    components.forEach(c => app.use(c));
  }
}