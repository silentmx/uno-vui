<script setup lang="ts">
import { defaultDocument } from '@vueuse/core';
import { parseColor, theme } from 'unocss/preset-mini';
import { presetThemeConfigs } from '../../composables';

// 使用index的方式来存储选用的主题
const themeIndex = useLocalStorage("unovui-theme-index", 0);

onMounted(() => {
  if (themeIndex.value != 0) {
    changeTheme(themeIndex.value, presetThemeConfigs.value?.[themeIndex.value])
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
  <div v-if="presetThemeConfigs && presetThemeConfigs.length > 1" class="flex gap-2 flex-wrap">
    <button v-for="(item, index) in presetThemeConfigs" @click="changeTheme(index, item)"
      class="bg-white dark:bg-black rd-lg p-2 shadow-md">
      <div class="flex gap-2 items-center">
        <i class="text-2xl" :class="{
            'i-line-md:confirm-circle text-primary': index == themeIndex,
            'i-line-md:circle': index != themeIndex
          }">
        </i>
        <div class="flex gap-1">
          <div v-for="c in item" :class="`bg-${c} rd-full h-6 w-2`"></div>
        </div>
      </div>
    </button>
  </div>
</template>