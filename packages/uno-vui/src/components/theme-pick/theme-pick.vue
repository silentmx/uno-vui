<script setup lang="ts">
import { autoUpdate, flip, offset, useFloating } from '@floating-ui/vue';
import { onClickOutside } from '@vueuse/core';
import { changeTheme, presetThemeConfigs, themeIndex } from '../../composables';

onMounted(() => {
  if (themeIndex.value != 0) {
    changeTheme(themeIndex.value);
  }
});

const visiable = ref(false);
const triggerBtn = ref();
const floatingEl = ref();

const { floatingStyles } = useFloating(triggerBtn, floatingEl, {
  placement: "bottom-end",
  middleware: [offset(5), flip()],
  whileElementsMounted: autoUpdate
});

onClickOutside(floatingEl, () => {
  visiable.value = false;
}, {
  ignore: [triggerBtn]
});
</script>

<template>
  <div v-if="presetThemeConfigs && presetThemeConfigs.length > 1" class="flex gap-2 flex-wrap relative inline-block">
    <button ref="triggerBtn" @click="visiable = true"
      class="flex justify-center items-center aspect-square p-1 rd-full hover:bg-gray/20 text-2xl">
      <i class="i-mdi:palette-swatch text-primary"></i>
    </button>
    <div v-show="visiable" ref="floatingEl" class="bg-light dark:bg-dark p-2 rd shadow-md" :style="floatingStyles">
      <button v-for="(item, index) in presetThemeConfigs" @click="changeTheme(index)"
        class="flex items-center gap-1 p-1 rd b b-primary b-solid"
        :class="`${index == themeIndex ? 'b-op-100' : 'b-op-0'}`">
        <div v-for="c in item" :class="`bg-${c} rd-full h-6 w-2`"></div>
      </button>
    </div>
  </div>
</template>