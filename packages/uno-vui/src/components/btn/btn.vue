<script setup lang="ts">
import { presetIconConfig, useClassMap, useCursorClass } from '../../composables';
import type { ThemeType } from '../../preset/types';

const props = withDefaults(defineProps<{
  theme: ThemeType;
  appear: "fill" | "outlined" | "text";
  icon?: string;
  to?: string;
  loading?: boolean;
  disabled?: boolean;
  class?: string;
}>(), {
  theme: "default",
  appear: "fill"
});

const classMap = useClassMap(toRef(props, "class"));
const attrs = Object.assign({}, props.to ? { href: props.to, role: "link" } : { type: "button", role: "button" });
const slots = useSlots();
const onlyIcon = computed(() => {
  return props.icon && !slots.default;
});
const isDisabled = computed(() => {
  return props.loading || props.disabled;
});

const cursorClass = useCursorClass(toRef(props, "loading"), toRef(props, "disabled"));
const baseClass = computed(() => {
  // 基础样式
  let base = "flex justify-center items-center gap-1";
  base += classMap.value.get("other") || "";

  if (onlyIcon.value) {
    base += " aspect-square p-1";
  } else {
    base += " px-0.875em py-0.25em"
  }

  // 动画
  if (!isDisabled.value) {
    base += " animate-scale active:hover:animate-none active:focus:animate-none" +
      " active:hover:transform-scale-95 active:focus:transform-scale-95" +
      " transition-duration-200 animate-ease";
  }

  // 背景色
  if (classMap.value.has("bgColor")) {
    base += classMap.value.get("bgColor");
  } else {
    base += ` bg-${props.theme} hover:bg-${props.theme}-500`;
  }

  // 背景色透明度
  if (classMap.value.has("bgOp")) {
    base += classMap.value.get("bgOp");
  } else {
    if (props.appear == "outlined") {
      base += ` bg-op-10`;
    } else if (props.appear == "text") {
      base += ` bg-op-0 hover:bg-op-10`;
    } else if (isDisabled.value) {
      base += " bg-op-85";
    }
  }

  // 边框样式
  if (classMap.value.has("borderStyle")) {
    base += classMap.value.get("borderStyle");
  } else {
    if (props.appear == "outlined") {
      base += ` b-solid`;
    }
  }

  // 边框宽度
  if (classMap.value.has("borderWidth")) {
    base += classMap.value.get("borderWidth");
  } else {
    if (props.appear == "outlined" || classMap.value.has("borderStyle")) {
      base += ` b`;
    }
  }

  // 边框颜色
  if (classMap.value.has("borderColor")) {
    base += classMap.value.get("borderColor");
  } else {
    if (props.appear == "outlined" || classMap.value.has("borderStyle")) {
      base += ` b-${props.theme}`;
    }
  }

  // radius
  if (classMap.value.has("borderRadius")) {
    base += classMap.value.get("borderRadius");
  } else {
    base += " rd";
  }

  // 文字颜色
  if (classMap.value.has("textColor")) {
    base += classMap.value.get("textColor");
  } else {
    if (props.appear == "outlined") {
      base += ` text-${props.theme} hover:text-light`;
    } else if (props.appear == "text") {
      base += ` text-${props.theme}`;
    } else {
      base += " text-light";
    }
  }

  if (isDisabled.value) {
    return base.split(" ").filter(item => !item.includes("hover"));
  } else {
    return base;
  }
});
</script>

<template>
  <component :is="to ? 'a' : 'button'" v-bind="attrs" :disabled="isDisabled" :aria-disabled="isDisabled"
    :class="[baseClass, cursorClass]">
    <i v-if="loading" :class="presetIconConfig?.loading"></i>
    <i v-else-if="icon" :class="icon"></i>
    <slot></slot>
  </component>
</template>