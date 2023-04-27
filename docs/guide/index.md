---
title: 快速开始
---

# Uno vui
::: warning 警告!
[uno-vui](https://github.com/silentmx/uno-vui)目前还在积极开发中，还不能用户生产环境
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
pnpm add @silentmx/preset unocss @iconify/json -D
```

```shell [yarn]
yarn add uno-vui @unocss/reset @vueuse/core
yarn add @silentmx/preset unocss @iconify/json -D
```

```shell [npm]
npm install uno-vui @unocss/reset @vueuse/core
npm install @silentmx/preset unocss @iconify/json -D
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

```ts [uno.config.ts] {2,13-15,21-23}
// uno.config.ts
import { iconConfig, presetUnoVui } from '@silentmx/preset';
import {
  defineConfig,
  presetAttributify, presetIcons, presetUno,
  transformerDirectives, transformerVariantGroup
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    // 这里你也可以使用自己的图标预设
    presetIcons(iconConfig()),
    presetUnoVui()
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  // 添加这里恨重要，unocss默认不扫描node_modules文件夹下的.js,.cjs文件
  // 这个ui库打包时是没有生成css文件的
  include: [/.*\/uno-vui\.js(.*)?$/, './**/*.vue']
})
```

```ts [uno.config.ts+custom icon preset] {2,14-15}
// uno.config.ts
// 这个例子需要自行安装`@iconify/tools`
import { deOptimisePaths, importDirectory, runSVGO } from '@iconify/tools';
import { iconConfig, presetUnoVui } from '@silentmx/preset';
import {
  defineConfig,
  presetIcons,
} from 'unocss';

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        // cdn: "https://esm.sh/",
        // scale: 1.2,
        // custom icon set
        "svg": async () => {
          // load icons
          const iconSet = await importDirectory("assets/svgs", {
            prefix: "svg",
          });

          await iconSet.forEach(async (name, type) => {
            if (type !== "icon") {
              return;
            }

            const svg = iconSet.toSVG(name);
            if (svg) {
              // Optimise
              runSVGO(svg);

              // Update paths for compatibility with old software
              await deOptimisePaths(svg);
            } else {
              iconSet.remove(name);
              return;
            }
          });
          // Export as IconifyJson
          return iconSet.export();
        }
      },
      // 图标额外css属性，推荐添加
      extraProperties: {
        "display": "inline-block",
        "vertical-align": "middle",
      }
    }),
    // ...other presets
  ],
})
```
:::
添加`virtual:uno.css`到程序主入口文件
```ts
// main.ts
import '@unocss/reset/antfu.css'; // css 预设,你也可以使用其他预设
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
```ts {3-4,6,13,16}
// vite.config.ts
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { UnovuiResolver } from '@silentmx/preset';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Unocss(),
    AutoImport({
      resolvers: [UnovuiResolver()]
    }),
    Components({
      resolvers: [UnovuiResolver()]
    })
  ],
})
```