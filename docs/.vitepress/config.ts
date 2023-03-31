import { defineConfig } from 'vitepress';
import { applyPlugins } from './plugins';

// 指导
const guides = [
  { text: "快速开始", link: "/guide/" },
];

// 组件
const components = [
  {
    text: "基础组件",
    items: [
      {
        text: "按钮",
        link: "/components/button",
      },
      {
        text: "图标",
        link: "/components/icon",
      }
    ],
  },
  {
    text: "表单组件",
    items: [
      {
        text: "input输入框",
        link: "/components/input",
      }
    ]
  }
];

// 指令
const directives = [
  { text: "弹出/提示", link: "/directives/popup" }
];

const nav = [
  { text: "指导", items: guides },
  { text: "组件", items: components },
  { text: "指令", items: directives },
];

const sidebar = {
  '/guide/': [
    {
      text: '开发指南',
      items: guides,
    },
  ],
  '/components/': components,
  "/directives/": directives,
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