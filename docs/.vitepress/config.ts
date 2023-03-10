import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: "zh-Hans",
  title: "uno-vui",
  description: "Vue3 Unocss components library",
  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', {
      property: 'og:description',
      content: 'Vue3 Unocss components library',
    }],
  ],
  themeConfig: {
    logo: "/logo.png",
    outline: {
      label: "本页目录"
    },
    editLink: {
      pattern: "https://github.com/silentmx/uno-vui/edit/main/docs/:path",
      text: "为此页提供修改建议"
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/silentmx/uno-vui" }
    ],
    footer: {
      message: "MIT Licensed",
      copyright: "Copyright © 2023-present @silentmx"
    }
  },
  markdown: {
    // config: (md) => {
    //   applyPlugins(md);
    // },
    theme: {
      light: "vitesse-light",
      dark: "vitesse-dark"
    }
  }
});