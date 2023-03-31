<script setup lang="ts">
import { containColor, genCompClass } from '../../composables/use-class';
import type { ThemeType } from '../../preset/types';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<ThemeType>,
    default: ""
  },
});

const binds = useAttrs();
const classList = computed(() => {
  const isContainTc = containColor(binds.class as string, "text|c");
  return [
    `${props.name}`, // 图标名称,必须带前缀
    // 颜色
    genCompClass([
      { condition: !isContainTc && props.type, trueVal: `text-${props.type}` },
    ]),
  ];
});
</script>

<template>
  <div :class="classList" v-if="name"></div>
</template>