---
layout: home
sidebar: false

title: v-ui
titleTemplate: Vue3 组件库

hero:
  name: V-UI
  text: Vue3 UI 组件库
  tagline: 构建在Unocss 和 Vueuse之上的基础组件库
  image:
    src: /logo.svg
    alt: V-UI

  actions:
    - theme: brand
      text: 快速上手
      link: /guide/
    - theme: alt
      text: 组件
      link: /guide/components/
    - theme: alt
      text: 在 Github 上查看
      link: https://github.com/silentmx/v-ui
  
features:
  - icon: 💡
    title: 极速的服务启动
    details: 使用原生 ESM 文件，无需打包!
  - icon: ⚡️
    title: 轻量快速的热重载
    details: 无论应用程序大小如何，都始终极快的模块热替换（HMR）
  - icon: 🛠️
    title: 丰富的功能
    details: 对 TypeScript、JSX、CSS 等支持开箱即用。
  - icon: 📦
    title: 优化的构建
    details: 可选 “多页应用” 或 “库” 模式的预配置 Rollup 构建
  - icon: 🔩
    title: 通用的插件
    details: 在开发和构建之间共享 Rollup-superset 插件接口。
  - icon: 🔑
    title: 完全类型化的API
    details: 灵活的 API 和完整的 TypeScript 类型。
---

<script setup lang="ts">
import { version } from '../package.json';
import { VBtn } from '@silentmx/v-ui';

onMounted(() => {
  if(version) {
    const tagLineParagragh = document.querySelector('div.VPHero.has-image.VPHomeHero > div > div.main > p.tagline');
    const docsReleaseTagSpan = document.createElement('samp');
    docsReleaseTagSpan.classList.add("bg-blue", "px-2", "py-1", "text-3", "rd-3", "text-white", "v-mid", "ml-1");
    docsReleaseTagSpan.innerText = `v${version}`;
    tagLineParagragh?.appendChild(docsReleaseTagSpan);
  }
});
</script>