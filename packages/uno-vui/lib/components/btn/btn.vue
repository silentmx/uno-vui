<script setup lang="ts">
import { containBrd, containColor, genCompClass } from '../../composables/use-class';
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

const slots = useSlots();
const binds = Object.assign({}, useAttrs(), props.to ? { href: props.to } : { type: "button" });
const isDisabled = computed(() => {
  return props.loading || props.disabled;
});
const onlyIcon = computed(() => slots.icon && !slots.default);

const classList = computed(() => {
  // 外部class是否包含背景色
  const isContainBg = containColor(binds.class as string);
  // 外部class包含边框颜色
  const isContainBc = containColor(binds.class as string, "b|border");
  // 外部class包含border-radius
  const isContainBr = containBrd(binds.class as string);
  // 外部class包含文字颜色
  const isContainTc = containColor(binds.class as string, "text|c");

  return [
    // 基础样式
    `relative flex justify-center items-center gap-1 transition-300`,
    // 如果只有图标, padding值设置为0.25rem，并且长宽保持1:1
    // 否则只设定常规padding
    genCompClass([
      { condition: onlyIcon.value, trueVal: "aspect-square p-1", falseVal: "px-0.875em py-0.25em" }
    ]),

    // 鼠标disabled状态
    genCompClass([
      { condition: props.disabled, trueVal: "cursor-not-allowed" }
    ]),

    // 鼠标loading状态
    genCompClass([
      { condition: props.loading, trueVal: "cursor-wait" }
    ]),

    // 背景色, 如果外部class包含背景色，优先使用外部class
    genCompClass([
      { condition: isContainBg, falseVal: `bg-${props.type}` }
    ]),
    // 背景色透明度
    genCompClass([
      // 文本按钮，透明度为0
      { condition: props.text, trueVal: "bg-op-0" },
      // type为default或者有边框，透明度为0.15
      { condition: props.type == "default" || props.bs, trueVal: "bg-op-15" },
      // 按钮禁用状态下透明度为0.6
      { condition: isDisabled.value, trueVal: "bg-op-60" }
    ]),
    // 背景色hover, 如果外部class包含背景色或在禁用状态下，hover无效
    genCompClass([
      { condition: isContainBg || isDisabled.value, falseVal: `hover:bg-${props.type}Heavy` }
    ]),
    // 背景色hover透明度
    genCompClass([
      // disabled状态下，保持不变
      { condition: isDisabled.value, trueVal: " " },
      // type为default时, 文本按钮, 0.20
      { condition: props.type == "default" || props.text, trueVal: "hover:bg-op-20" },
    ]),

    // 边框
    genCompClass([
      { condition: props.bs, trueVal: `b b-${props.bs}` }
    ]),
    // 边框颜色
    genCompClass([
      { condition: isContainBc, falseVal: `b-${props.type}` }
    ]),
    // 边框radius
    genCompClass([
      { condition: isContainBr, falseVal: `b-rd` }
    ]),

    // 文字颜色
    genCompClass([
      { condition: isContainTc || props.type == "default", trueVal: " " },
      { condition: props.bs || props.text, trueVal: `text-${props.type}`, falseVal: "text-light" }
    ]),
    // 文字hover颜色
    genCompClass([
      { condition: isContainTc || isDisabled.value, trueVal: " " },
      { condition: props.type == "default", trueVal: `hover:text-gray-500 dark:hover-text-gray` },
      { condition: props.text, trueVal: `hover:text-${props.type}` },
      { condition: true, trueVal: "hover:text-light" }
    ]),

    //active shadow动画
    !isDisabled.value ? genCompClass([
      {
        condition: true,
        trueVal: "after:content-none after:absolute after:inset-0 after:op-0 after:transition-600 after:rd-inherit"
      },
      {
        condition: true,
        trueVal: "after:active:shadow-none after:active:transition-0"
      },
      // 宽度
      {
        condition: props.bs,
        trueVal: "after:shadow-[0_0_0_7px_var(--un-shadow-color)]",
        falseVal: "after:shadow-[0_0_0_6px_var(--un-shadow-color)]"
      },
      // 颜色
      {
        condition: containColor(binds.class as string, "after[:-]shadow"),
        falseVal: `after:shadow-${props.type}Heavy`
      },
      // 透明度
      {
        condition: (props.type == "default" || props.text) && !props.bs,
        trueVal: "after:active:op-30 dark:after:active:op-40",
        falseVal: "after:active:op-50 dark:after:active:op-90"
      }
    ], true) : "",
  ];
});
</script>

<template>
  <component :is="to ? 'a' : 'button'" v-bind="binds" :disabled="isDisabled" :aria-disabled="isDisabled"
    :class="classList">
    <div v-if="loading" class="i-eos-icons:loading"></div>
    <slot v-else name="icon"></slot>
    <slot></slot>
  </component>
</template>