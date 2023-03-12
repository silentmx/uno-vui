import { defineConfig } from 'vitepress';
import { applyPlugins } from './plugins';

const guides = [
  { text: '快速开始', link: '/guide/' },
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
  },
  {
    text: "指令",
    items: [
      { text: "弹出层", link: "/components/popup" }
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
    nav,
    sidebar,
    footer: {
      message: "MIT Licensed",
      copyright: "Copyright © 2023-present @silentmx"
    }
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