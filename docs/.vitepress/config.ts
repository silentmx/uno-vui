import { defineConfig } from 'vitepress';
import { applyPlugins } from './plugins';

const guides = [
  { text: '开始', link: '/guide/' },
];

const components = [
  {
    text: '基础',
    items: [
      {
        text: '按钮',
        link: '/components/button',
      },
    ],
  },
  {
    text: "函数",
    items: [
      { text: "消息", link: "/components/message" }
    ]
  }
];

const nav = [
  { text: "指导", items: guides },
  { text: '组件', items: components },
];

const sidebar = {
  '/guide/': [
    {
      text: '开发指南',
      items: guides,
    },
  ],
  '/components/': components,
}

export default defineConfig({
  lang: "zh-Hans",
  title: "v-ui",
  description: `Popular, beautiful and fast UnoCSS component library`,
  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', {
      property: 'og:description',
      content: 'Popular, beautiful and fast UnoCSS component library',
    }],
  ],
  themeConfig: {
    logo: "/logo.png",
    outline: {
      label: "本页目录"
    },
    editLink: {
      pattern: 'https://github.com/silentmx/v-ui/edit/main/docs/:path',
      text: '为此页提供修改建议',
    },
    // algolia: {
    //   appId: '7H67QR5P0A',
    //   apiKey: 'deaab78bcdfe96b599497d25acc6460e',
    //   indexName: 'vitejs',
    //   searchParameters: {
    //     facetFilters: ['tags:zh-CN']
    //   }
    // },
    socialLinks: [{ icon: 'github', link: 'https://github.com/silentmx/v-ui' }],
    nav,
    sidebar,
    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2023-present @silentmx',
    },
  },
  markdown: {
    config: (md) => {
      applyPlugins(md);
    },
    theme: {
      light: "vitesse-light",
      dark: "vitesse-dark"
    }
  }
});