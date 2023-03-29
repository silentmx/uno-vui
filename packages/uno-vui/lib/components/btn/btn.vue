<script setup lang="ts">
import { containBrd, containColor } from '../../composables/use-class';
import type { ThemeType } from '../../preset/types';

const props = defineProps({
  type: {
    type: String as PropType<ThemeType>,
    default: "default"
  },
  bs: { // 边框类型
    type: String as PropType<"solid" | "dashed">
  },
  to: String,
  loading: Boolean,
  disabled: Boolean,
  text: Boolean,
});

const binds = Object.assign({}, useAttrs(), props.to ? { href: props.to } : { type: "button" });
const isDisabled = computed(() => {
  return props.loading || props.disabled;
});

const classList = computed(() => [
  // 基础样式
  `relative flex justify-center items-center gap-1 px-0.875em py-0.25em`,
  // 鼠标disabled状态
  props.disabled ? `cursor-not-allowed` : ``,
  // 鼠标loading状态
  props.loading ? `cursor-wait` : ``,

  // 背景色, 如果外部class包含背景色，优先使用外部class
  containColor(binds.class as string) ? `` : `bg-${props.type} ${isDisabled.value ? `` : `hover:bg-${props.type}Heavy`}`,
  // 背景色透明度
  props.text ? `bg-op-0` :
    props.type == "default" || props.bs ? `bg-op-10` : `${isDisabled.value ? 'bg-op-70' : ''}`,
  // 背景色hover透明度
  // 0.2: props.text=true
  // 0.3: props.type=default
  props.text ? `hover:bg-op-20` :
    props.type == "default" ? `hover:bg-op-30` :
      isDisabled.value && props.bs ? `hover:bg-op-20` : `hover:bg-op-70`,

  // 边框
  props.bs ? `b b-${props.bs}` : ``,
  // 边框颜色
  containColor(binds.class as string, "b|border") ? `` : `b-${props.type}`,
  // 边框radius
  containBrd(binds.class as string) ? `` : `b-rd`,

  // 文字颜色
  containColor(binds.class as string, "text|c") ? `` :
    props.type == "default" ? `` :
      props.bs || props.text ? `text-${props.type}` : `text-light`,
  // 文字hover颜色
  containColor(binds.class as string, "text|c") ? `` :
    props.text || props.type == "default" ?
      `hover:text-${props.type}Heavy` :
      `${isDisabled.value ? '' : 'hover:text-light'}`,

  //active shadow动画
  isDisabled.value ? `` :
    "after:content-none after:absolute after:inset-0 after:op-0 after:transition-600 after:rd-inherit " +
    "after:active:shadow-none after:active:transition-0 " +
    `${props.bs ? "after:shadow-[0_0_0_7px_var(--un-shadow-color)]" : "after:shadow-[0_0_0_6px_var(--un-shadow-color)]"} ` +
    // 颜色
    `${containColor(binds.class as string, "after[:-]shadow(?:-(.+))?$") ? `` : `after:shadow-${props.type}Heavy`} ` +
    // 透明度
    `${props.type == "default" && !props.bs ?
      'after:active:op-40 dark:after:active:op-60' :
      'after:active:op-60 dark:after:active:op-90'
    }`
]);
</script>

<template>
  <component :is="to ? 'a' : 'button'" v-bind="binds" :disabled="isDisabled" :aria-disabled="isDisabled"
    :class="classList">
    <div v-if="loading" class="i-eos-icons:loading"></div>
    <slot v-else name="icon"></slot>
    <slot></slot>
  </component>
</template>