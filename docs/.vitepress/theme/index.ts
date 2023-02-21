import * as components from '@silentmx/v-ui/components';
import Theme from 'vitepress/theme';
import type { App } from 'vue';
import { h } from 'vue';
import DemoBlock from './components/demo-block.vue';
import './custom.css';

// Unocss
import 'uno.css';

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      // 'home-features-after': () => h(teamMember),
    })
  },
  enhanceApp(app: App) {
    for (let name of Object.keys(components)) {
      app.component(name, (components as any)[name]);
    }

    app.component("Demo", DemoBlock);
  }
}