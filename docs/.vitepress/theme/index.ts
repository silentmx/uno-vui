import { vui } from '@silentmx/v-ui';
import Theme from 'vitepress/theme';
import type { App } from 'vue';
import { h } from 'vue';
import DemoBlock from '../components/demo-block.vue';
import './custom.css';

// Unocss
import 'uno.css';

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {

    })
  },
  enhanceApp({ app }: { app: App }) {
    app.use(vui);
    app.component("Demo", DemoBlock);
  }
}