---
title: "快速开始"
---

# Uno vui

::: warning 警告!
[Uno Vui](https://github.com/silentmx/uno-vui)目前还在积极开发中，还不能用于生产环境。感谢你的支持和反馈。
:::

## 简介
Uno vui 是一套基于[Unocss](https://github.com/unocss/unocss)和[vueuse](https://vueuse.org)的vue3 UI组件库，
你可以用来构建精美的页面。组件库使用最新的[Vue3 setup script](https://cn.vuejs.org/guide/typescript/composition-api.html)，完全使用
[Typescript](https://www.typescriptlang.org/)来编写，并使用[Vite](https://cn.vitejs.dev/)进行打包和构建。

## 安装
```shell
# npm
npm i uno-vui @unocss/reset && npm i unocss -D

# yarn
yarn add uno-vui @unocss/reset && yarn add unocss -D

# pnpm
pnpm add uno-vui @unocss/reset && pnpm add unocss -D
```
添加uno.css到主入口文件
```ts
// main.ts
...
import '@unocss/reset/antfu.css'; // css 预设,你也可以使用其他预设
import 'uno.css'; // unocss
...
```

## 全量导入（不推荐）
失去tree-shaking能力，打包有冗余代码
```ts
...
import { createApp } from 'vue';
import { UnoVui } from 'uno-vui';
import App from './App.vue';

const app = createApp(App);
app.use(UnoVui);
...
```

## 按需导入（推荐）
你需要额外的插件来导入，首先安装插件[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
和[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)。
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