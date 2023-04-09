---
  layout: home
  sidebar: false

  title: uno-vui
  titleTemplate: Vue3 组件库

  hero:
    name: Uno-Vui
    text: vue3 UI 组件库
    tagline: 基于unocss和vueuse开发的vue3组件库
    image: /logo.svg
    alt: uno-vui
    actions:
      - theme: brand
        text: 快速上手
        link: /guide/
      - theme: alt
        text: 组件
        link: /components/
      - theme: alt
        text: 在Github上查看
        link: https://github.com/silentmx/uno-vui

  features:
    - icon: ⚙️
      title: 多颜色主题
      details: 通过Unocss预设, 提过多套颜色主题
    - icon: 🌈
      title: 组件
      details: 提供丰富、精美的ui组件, 使用任意svg图标
    - icon: 🔑
      title: 完全类型化的API
      details: 灵活的 API 和完整的 TypeScript 类型

---
<script setup lang="ts">
import { version } from "../packages/uno-vui/package.json";

onMounted(() => {
  if(version && !document.querySelector("#version-samp")) {
    const tagLineParagragh = document.querySelector('div.VPHero.has-image.VPHomeHero > div > div.main > p.tagline');
    const docsReleaseTagSpan = document.createElement('samp');
    docsReleaseTagSpan.id = "version-samp";
    docsReleaseTagSpan.classList.add(...["bg-primary", "px-2", "py-1", "text-sm", "rd-3", "text-gray-100", "v-mid", "ml-1"]);
    docsReleaseTagSpan.innerText = `v${version}`;
    tagLineParagragh?.appendChild(docsReleaseTagSpan);
  }
});
</script>