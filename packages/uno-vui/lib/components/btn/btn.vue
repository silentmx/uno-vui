<script setup lang="ts">
import type { PropType } from 'vue';
import { genCompClass, useBg, useBorder, useCursor, useText } from '../../composables';
import type { ThemeType } from '../../preset';

const props = defineProps({
  type: {
    type: String as PropType<ThemeType>,
    default: "default"
  },
  icon: String,
  text: Boolean,
  loading: Boolean,
  disabled: Boolean,
  to: String,
});

const btnRef = ref<Element>();
const extraAttrs = Object.assign({}, props.to ? { href: props.to } : { type: "button" });
const slots = useSlots();
const onlyIcon = computed(() => props.icon && !slots.default);

const isDisabled = computed(() => {
  return props.loading || props.disabled;
});

const { hasBorder, borderClass } = useBorder(toRef(props, "type"), isDisabled);
const { hasBg, bgClass } = useBg(toRef(props, "type"), hasBorder, toRef(props, "text"), isDisabled);
const { textClass } = useText(toRef(props, "type"), hasBg, hasBorder, toRef(props, "text"), isDisabled);
const { cursorClass } = useCursor(toRef(props, "loading"), toRef(props, "disabled"));

const baseClass = computed(() => {
  return [
    // 基础样式
    `relative flex justify-center items-center gap-1 transition-300`,
    // 如果只有图标, padding值设置为0.25rem，并且长宽保持1:1,否则只设定常规padding
    genCompClass([
      { condition: onlyIcon.value, trueVal: "aspect-square p-1", falseVal: "px-0.875em py-0.25em" }
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
      // {
      //   condition: hasBorder.value,
      //   trueVal: "after:shadow-[0_0_0_7px_var(--un-shadow-color)]",
      //   falseVal: "after:shadow-[0_0_0_6px_var(--un-shadow-color)]"
      // },
      // 颜色
      // {
      //   condition: containColor(attrs.class as string, "after[:-]shadow"),
      //   falseVal: `after:shadow-${props.type}Heavy`
      // },
      // 透明度
      // {
      //   condition: (props.type == "default" || props.text) && !hasBorder.value,
      //   trueVal: "after:active:op-30 dark:after:active:op-40",
      //   falseVal: "after:active:op-50 dark:after:active:op-90"
      // }
    ], true) : "",
  ];
});
</script>

<template>
  <component ref="btnRef" :is="to ? 'a' : 'button'" v-bind="extraAttrs" :disabled="isDisabled" :aria-disabled="isDisabled"
    :class="[baseClass, borderClass, bgClass, textClass, cursorClass]">
    <div v-if="loading" class="i-eos-icons:loading"></div>
    <div v-else-if="icon" :class="icon"></div>
    <slot></slot>
  </component>
</template>