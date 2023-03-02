<script setup lang="ts">
import type { PropType } from 'vue';
import type { ThemeType } from '../../composables/types';
import { getTheme } from '../../composables/use-theme';

const props = defineProps({
  type: {
    type: String as PropType<"button" | "submit" | "reset">,
    default: "button"
  },
  theme: {
    type: String as PropType<ThemeType | "default">,
    default: "default",
  },
  to: String,
  loading: Boolean,
  disabled: Boolean,
});

const binds = Object.assign({}, useAttrs(), props.to ? { href: props.to } : {});

const isDisabled = computed(() => {
  return props.loading || props.disabled;
});

const Vbtn = ref<HTMLElement | null>(null);
const theme = getTheme(props.theme, Vbtn);
const classList = computed(() => {
  const baseClass = [
    `flex items-center px-4 py-1 b-rd b`,
    props.disabled ? "cursor-not-allowed" : "",
    props.loading ? "cursor-wait" : "",
  ];

  if (props.theme == "default") {
    // 背景色
    baseClass.push(`bg-${theme.color}-${theme.region} bg-op-10 hover:bg-op-30`);

    // 文字颜色
    baseClass.push(
      theme.isHover.value ? `text-${theme.color}-${theme.region}` : ``
    );

    // 边框
    baseClass.push(
      theme.isHover.value ? `b-solid b-op-30 b-${theme.color}-${theme.region}` : `b-solid b-op-10 b-gray`
    )
  } else {
    // 背景色
    baseClass.push(
      theme.isHover.value ?
        `bg-${theme.color}-${theme.hoverRegion} b-solid b-${theme.color}-${theme.hoverRegion}` :
        `bg-${theme.color}-${theme.region} b-solid b-${theme.color}-${theme.region}`,
    );

    // 文字颜色
    baseClass.push(`text-gray-100`);
  }

  return baseClass;
});
</script>

<template>
  <component :type="to ? '' : type" :is="to ? 'a' : 'button'" ref="Vbtn" v-bind="binds" :disabled="isDisabled"
    :aria-disabled="isDisabled" :class="classList">
    <!-- <div v-if="loading" class="i-carbon-circle-dash animate-spin"></div> -->
    <slot></slot>
  </component>
</template>