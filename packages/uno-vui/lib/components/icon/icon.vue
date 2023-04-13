<script setup lang="ts">
import type { PropType } from 'vue';
import type { ThemeType } from '../../preset/types';
import { computUnoClassInfo, unoText } from '../../uno-utils';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  theme: {
    type: String as PropType<ThemeType>,
    default: "default"
  },
});

// 这里添加边框只是为了使图标的颜色默认使用theme的设置
const baseClass = computed(() => {
  return [props.name, "b-solid"];
});
const unoClassInfo = computUnoClassInfo(baseClass);
const { textClass } = unoText(toRef(props, "theme"), unoClassInfo, true);
</script>

<template>
  <i :class="[name, textClass]" v-if="name"></i>
</template>