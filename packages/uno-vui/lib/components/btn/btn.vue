<script setup lang="ts">
import { useBg } from '../../composables/use-bg';
import { useBorder } from '../../composables/use-border';
import { genCompClass } from '../../composables/use-class';
import type { ThemeType } from '../../preset/types';

const props = defineProps({
  type: {
    type: String as PropType<ThemeType>,
    default: "default"
  },
  to: String,
  loading: Boolean,
  disabled: Boolean,
  text: Boolean,
});

const slots = useSlots();
const attrs = Object.assign({}, useAttrs(), props.to ? { href: props.to } : { type: "button" });
const isDisabled = computed(() => {
  return props.loading || props.disabled;
});
const onlyIcon = computed(() => slots.icon && !slots.default);

const { hasBorder, borderClass } = useBorder(attrs.class as string, props.type, isDisabled);
const { hasBg, bgClass } = useBg(attrs.class as string, props.type, hasBorder, props.text, isDisabled);

const classList = computed(() => {
  // 外部class包含文字颜色
  // const isContainTc = containColor(attrs.class as string, "text|c");

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

    // // 文字颜色
    // genCompClass([
    //   { condition: isContainTc || props.type == "default", trueVal: " " },
    //   { condition: hasBorder.value || props.text, trueVal: `text-${props.type}`, falseVal: "text-light" }
    // ]),
    // // 文字hover颜色
    // genCompClass([
    //   { condition: isContainTc || isDisabled.value, trueVal: " " },
    //   { condition: props.type == "default", trueVal: `hover:text-defaultHeavy dark:hover:text-gray-200` },
    //   { condition: props.text, trueVal: `hover:text-${props.type}` },
    //   { condition: true, trueVal: "hover:text-light" }
    // ]),

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
        condition: hasBorder.value,
        trueVal: "after:shadow-[0_0_0_7px_var(--un-shadow-color)]",
        falseVal: "after:shadow-[0_0_0_6px_var(--un-shadow-color)]"
      },
      // 颜色
      // {
      //   condition: containColor(attrs.class as string, "after[:-]shadow"),
      //   falseVal: `after:shadow-${props.type}Heavy`
      // },
      // 透明度
      {
        condition: (props.type == "default" || props.text) && !hasBorder.value,
        trueVal: "after:active:op-30 dark:after:active:op-40",
        falseVal: "after:active:op-50 dark:after:active:op-90"
      }
    ], true) : "",
  ];
});
</script>

<template>
  <component :is="to ? 'a' : 'button'" v-bind="attrs" :disabled="isDisabled" :aria-disabled="isDisabled"
    :class="[classList, borderClass, bgClass]">
    <div v-if="loading" class="i-eos-icons:loading"></div>
    <slot v-else name="icon"></slot>
    <slot></slot>
  </component>
</template>