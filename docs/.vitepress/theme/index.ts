// https://vitepress.dev/guide/custom-theme
import type { Router } from "vitepress";
import Theme from "vitepress/theme";
import { h, watch, type App } from 'vue';
import Demo from './components/Demo.vue';
import HomePage from './components/HomePage.vue';

import './overrides.css';
import './rainbow.css';
import './vars.css';

// Unocss
import 'virtual:uno.css';

let homePageStyle: HTMLStyleElement | undefined

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      "home-features-after": () => h(HomePage),
    })
  },
  enhanceApp: ({ app, router }: { app: App, router: Router }) => {
    app.component("Demo", Demo);

    if (typeof window === "undefined") {
      return;
    }

    watch(
      () => router.route.data.relativePath,
      () => updateHomePageStyle(location.pathname === '/'),
      { immediate: true }
    )
  },
}

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) {
      return;
    }
    homePageStyle = document.createElement('style');
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle);
  } else {
    if (!homePageStyle) {
      return;
    }
    homePageStyle.remove();
    homePageStyle = undefined;
  }
}