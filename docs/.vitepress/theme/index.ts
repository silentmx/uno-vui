import Theme from 'vitepress/theme';
import { h, type App } from 'vue';
import DemoBlock from '../components/demo-block.vue';
import './main.css';

// Unocss
import 'uno.css';

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      // 'home-features-after': () => h(TeamMember),
    })
  },
  enhanceApp({ app }: { app: App }) {
    app.component("Demo", DemoBlock);
  }
}