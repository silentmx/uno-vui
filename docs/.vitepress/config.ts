import { unovuiResolver } from 'uno-vui/utils';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vitepress';
import { applyPlugins } from './theme/plugins';

// 指导
const guides = [
  { text: "快速开始", link: "/guide/" },
  { text: "主题", link: "/guide/theme" }
];

// 组件
const components = [
  {
    text: "基础组件",
    items: [
      {
        text: "图标",
        link: "/components/icon"
      }
    ]
  }
];

const nav = [
  { text: "指导", items: guides },
  { text: "组件", items: components },
];
const sidebar = {
  "/guide/": guides,
  "/components/": components
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // app level config options
  lang: "zh-Hans",
  title: "uno-vui",
  description: "Vue3 components library build on top of Unocss and Vueuse",
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ["link", { rel: "icon", href: "/logo.svg", type: "image/svg+xml" }],
    ["meta", { property: "og:description", content: "Vue3 components library" }],
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
  vite: {
    optimizeDeps: {
      exclude: [
        "vitepress"
      ]
    },
    server: {
      hmr: {
        overlay: false
      }
    },
    plugins: [
      Unocss(),
      AutoImport({
        imports: ["vue", "@vueuse/core"],
        ignore: ["h"],
        vueTemplate: true
      }),
      Components({
        resolvers: [
          unovuiResolver()
        ]
      })
    ]
  },
  markdown: {
    config: (md) => {
      applyPlugins(md);
    }
  }
})
