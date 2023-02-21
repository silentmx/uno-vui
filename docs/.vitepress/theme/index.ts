import 'uno.css';
import Theme from 'vitepress/theme';
import { h } from 'vue';
import * as components from '../../../src/components';
import DemoBlock from './components/demo-block.vue';
import './custom.css';

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      // 'home-features-after': () => h(teamMember),
    })
  },
  enhanceApp({ app }) {
    for (let name of Object.keys(components)) {
      app.component(name, components[name]);
    }

    app.component("Demo", DemoBlock);
  }
}