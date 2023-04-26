<script setup lang="ts">
import { defaultDocument } from '@vueuse/core';
import { parseColor, theme } from 'unocss/preset-mini';
import { themeList } from '../../composables';

// 使用index的方式来存储选用的主题
const themeIndex = useLocalStorage("unovui-theme-index", 0);

onMounted(() => {
  if (themeIndex.value != 0) {
    changeTheme(themeIndex.value, themeList.value[themeIndex.value])
  }
});

const changeTheme = (index: number, config?: any) => {
  themeIndex.value = index;
  if (index == 0) {
    defaultDocument?.body.removeAttribute("style");
  } else if (config) {
    Object.entries(config).forEach(([key, val]) => {
      Object.keys(theme.colors.blue).forEach(region => {
        defaultDocument?.body.style.setProperty(
          `--unovui-${key}-${region}`,
          `${parseColor(`${val}-${region}`, theme)?.cssColor?.components.join(",")}`
        )
      })
    })
  }
}
</script>

<template>
  <div v-if="themeList.length > 1" class="flex flex-col gap-2 w-30">
    <button v-for="(item, index) in themeList" @click="changeTheme(index, item)">
      <div class="flex gap-1 items-center rd shadow-xs" :class="`bg-${item.default} bg-op-10 hover:bg-op-15`">
        <i class="text-2xl" :class="{
            'i-line-md:confirm-circle bg-primary': index == themeIndex,
            'i-line-md:circle': index != themeIndex
          }"></i>
        <div class="flex-auto">
          <div :class="`h-2 bg-${item.primary}`"></div>
          <div :class="`h-2 bg-${item.accent} mt-2`"></div>
        </div>
      </div>
    </button>
  </div>
</template>