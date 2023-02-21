import Theme from 'vitepress/theme';
import type { App } from 'vue';
import { h } from 'vue';
import * as components from '../../../src/components';
import DemoBlock from '../components/demo-block.vue';
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
  enhanceApp({ app }: { app: App }) {
    for (let name of Object.keys(components)) {
      app.component(name, (components as any)[name]);
    }

    app.component("Demo", DemoBlock);
  }
}