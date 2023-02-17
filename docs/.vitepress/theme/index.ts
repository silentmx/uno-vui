import 'uno.css';
import Theme from 'vitepress/theme';
import { h } from 'vue';
import './custom.css';

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      // 'home-features-after': () => h(teamMember),
    })
  },
  enhanceApp({ app }) {

  }
}