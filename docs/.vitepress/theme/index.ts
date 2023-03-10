import Theme from 'vitepress/theme';
import { h } from 'vue';
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
}