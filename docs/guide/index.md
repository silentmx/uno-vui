---
title: "快速开始"
---

# Uno vui
::: warning 警告!
[Uno Vui](https://github.com/silentmx/uno-vui)目前还在积极开发中，还不能用于生产环境。感谢你的支持和反馈。
:::

## 简介
Uno vui 是一套基于[Unocss](https://unocss.dev)和[vueuse](https://vueuse.org)开发的vue3 UI组件库。
组件库使用最新的[Vue3 setup script](https://cn.vuejs.org/guide/typescript/composition-api.html)，完全使用
[Typescript](https://www.typescriptlang.org/)来编写，并使用[Vite](https://cn.vitejs.dev/)进行打包和构建。

## 安装
- `@unocss/reset`包含style样式预设。[更多信息](https://unocss.dev/guide/style-reset)
- `@iconify/json` `@iconify/tools`是图标库及工具。[更多信息](https://unocss.dev/presets/icons)
```shell
# npm
npm i uno-vui @unocss/reset && npm i unocss @iconify/json @iconify/tools -D

# yarn
yarn add uno-vui @unocss/reset && yarn add unocss @iconify/json @iconify/tools -D

# pnpm
pnpm add uno-vui @unocss/reset && pnpm add unocss @iconify/json @iconify/tools -D
```

## [配置](https://unocss.dev/integrations/vite)


在vite配置文件中安装插件
```ts
// vite.config.ts
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    UnoCSS(),
  ],
})
```
在项目根目录新建`uno.config.ts`文件
```ts
// uno.config.ts
// 这里只是一个示例，你也可以根据需求自行配置
import {
  deOptimisePaths,
  importDirectory,
  runSVGO,
} from '@iconify/tools';
import { presetUnoVui } from 'uno-vui';
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      // scale: 1.2,
      collections: {
        // 自定义svg图标,这里配置图标存放地址/public/svgs
        // 使用: <u-icon name="i-[name]"></u-icon> 或者<div class="i-[name]"></div>

        // Loading custon icon set
        "csvg": async () => {
          // load icons
          const iconSet = await importDirectory("./public/svgs", {
            prefix: "svg",
          });
          // Clean up each icon
          await iconSet.forEach(async (name) => {
            const svg = iconSet.toSVG(name)!;
            // Optimise
            runSVGO(svg);
            // Update paths for compatibility with old software
            await deOptimisePaths(svg);
          });
          // Export as IconifyJSON
          return iconSet.export();
        }
      },
      // 图标额外css属性，推荐添加
      extraProperties: {
        "display": "inline-block",
        "vertical-align": "middle",
      }
    }),
    // 主题配置
    presetUnoVui({
      themes: [
        { primary: "blue", accent: "purple" },
        { primary: "pink", accent: "violet" },
      ]
    }),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  // 添加这里恨重要，unocss默认不扫描node_modules文件夹下的.js,.cjs文件
  // 这个ui库打包时是没有生成css文件的
  include: [/.*\/uno-vui\.js(.*)?$/]
});
```

添加virtual:uno.css到主入口文件
```ts
// main.ts
...
import '@unocss/reset/antfu.css'; // css 预设,你也可以使用其他预设
import 'virtual:uno.css'; // unocss
...
```


## 全量导入（不推荐）
失去tree-shaking能力，打包有冗余代码
```ts
...
import { createApp } from 'vue';
import { Unovui } from 'uno-vui';
import App from './App.vue';

const app = createApp(App);
app.use(Unovui);
...
```

## 按需导入（推荐）
你需要额外的插件来导入，首先安装插件
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)。
```shell
# npm
npm install unplugin-vue-components unplugin-auto-import -D

# yarn
yarn add unplugin-vue-components unplugin-auto-import -D

# pnpm
pnpm add unplugin-vue-components unplugin-auto-import -D
```

然后在[Vite](https://cn.vitejs.dev/)配置中添加如下配置
```ts
// vite.config.ts
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { UnovuiResolver } from 'uno-vui';

// https://vitejs.dev/config/
export default defineConfig({
  ...
  plugins: [
    ...
    Unocss(),
    AutoImport({
      ...
      resolvers: [UnovuiResolver()]
      ...
    }),
    Components({
      ...
      resolvers: [UnovuiResolver()]
      ...
    })
  ],
  ...
})
```

祝你开发愉快