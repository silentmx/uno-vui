---
title: 快速开始
---

# Uno vui
::: warning 警告!
[uno-vui](https://github.com/silentmx/uno-vui)目前还在积极开发中，还不能用于生产环境
:::

## 简介
uno-vui是基于[Unocss](https://unocss.dev)和[Vueuse](https://vueuse.org)开发的vue3 UI组件库。
组件库使用最新的[Vue3 setup script](https://cn.vuejs.org/guide/typescript/composition-api.html),
完全使用[Typescript](https://www.typescriptlang.org/)来编写,并使用[Vite](https://cn.vitejs.dev/)进行打包和构建。

## 安装
- `@unocss/reset`包含style样式预设。[更多信息](https://unocss.dev/guide/style-reset)
- `@iconify/json`是图标库, 你也可以使用`cdn`的方式加载图标, Unocss推荐的`cdn`有两个
`https://esm.sh/`和`https://cdn.skypack.dev/`，在国内使用`cdn`不太稳定, 推荐使用安装的方式。
[更多信息](https://unocss.dev/presets/icons)
::: code-group
```shell [pnpm]
pnpm add uno-vui @unocss/reset @vueuse/core
pnpm add unocss @iconify/json -D
```

```shell [yarn]
yarn add uno-vui @unocss/reset @vueuse/core
yarn add unocss @iconify/json -D
```

```shell [npm]
npm install uno-vui @unocss/reset @vueuse/core
npm install unocss @iconify/json -D
```
:::

## 配置
推荐使用`vite.config.ts` + `uno.config.ts`的配置方式，[详细](https://unocss.dev/integrations/vite)
::: code-group
```ts [vite.config.ts] {7}
// vite.config.ts
import Unocss from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    Unocss(),
  ]
})
```

```ts [uno.config.ts] {2-3,14-26,29,33-35}
// uno.config.ts
import { presetUnoVui } from 'uno-vui/preset';
import { TransformerAttributifyToClass, unovuiIconsOptions } from 'uno-vui/utils';
import {
  defineConfig,
  presetAttributify, presetIcons, presetUno,
  transformerDirectives, transformerVariantGroup
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(unovuiIconsOptions({
      svgPath: "src/assets/svgs"
    })),
    presetUnoVui({
      themes: [
        { primary: "blue", accent: "purple" },
        { primary: "pink", accent: "sky" },
      ],
      // 通过预设覆盖uno-vui默认使用图标
      // icons: {
      //   loading: "i-mingcute:loading-line animate-spin"
      // }
    })
  ],
  transformers: [
    TransformerAttributifyToClass(), // 必须放在第一个
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  // 添加这里恨重要，unocss默认不扫描node_modules文件夹下的.js,.cjs文件
  // 这个ui库打包时是没有生成css文件的
  include: [/.*\/uno-vui\.js(.*)?$/, './**/*.vue']
})
```
:::
添加`virtual:uno.css`到程序主入口文件
```ts
// main.ts
import '@unocss/reset/tailwind.css'; // css 预设,你也可以使用其他预设
import 'virtual:uno.css'; // unocss
```

## 全量导入（不推荐）
失去tree-shaking能力
```ts {2,5}
import { createApp } from 'vue';
import { Unovui } from 'uno-vui';
import App from './App.vue';

const app = createApp(App);
app.use(Unovui);
```

## 按需导入（推荐）
你需要额外的插件来导入，首先安装插件
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)。
::: code-group
```shell [pnpm]
pnpm add unplugin-vue-components unplugin-auto-import -D
```

```shell [yarn]
yarn add unplugin-vue-components unplugin-auto-import -D
```

```shell [npm]
npm install unplugin-vue-components unplugin-auto-import -D
```
:::

然后在[Vite](https://cn.vitejs.dev/)配置中添加如下配置
```ts {3-4,6,19}
// vite.config.ts
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { unovuiResolver } from 'uno-vui/utils';

// https://vitejs.dev/config/
export default defineConfig({
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
  ],
})
```