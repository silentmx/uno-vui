<script setup lang="ts">
import type { ThemeType } from '../../preset/types';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<Exclude<ThemeType, "default">>,
    default: ""
  },
});

const classList = computed(() => {
  return [
    `${props.name}`, // 图标名称,必须带前缀
    `${props.type ? 'text-' + props.type : ''}`, // 图标颜色
  ];
});
</script>

<template>
  <div :class="classList" v-if="name"></div>
</template>