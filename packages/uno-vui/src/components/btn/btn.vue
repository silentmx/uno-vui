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
  const baseVal = [
    // 基础样式
    "flex justify-center items-center gap-1",
    onlyIcon.value ? "aspect-square p-1" : "px-0.875em py-0.25em",
    classMap.value.get("others") || "",
    classMap.value.get("hover-others") || "",
    classMap.value.get("focus-within-others") || "",
    // 背景色
    classMap.value.get("bg-color") || `bg-${props.theme}`,
    classMap.value.get("hover-bg-color") || (classMap.value.has("bg-color") ? '' : `hover:bg-${props.theme}-500`),
    // 背景透明
    classMap.value.get("bg-opacity") || (
      props.appear == "text" ? "bg-op-0" :
        props.appear == "outlined" ? "bg-op-10" : isDisabled.value ?
          props.theme == "default" && !classMap.value.get("bg-color") ? "" : "bg-op-85" :
          props.theme == "default" && !classMap.value.get("bg-color") ? "bg-op-10" : ""),
    classMap.value.get("hover-bg-opacity") || (
      props.appear == "text" ? "hover:bg-op-10" :
        props.theme == "default" && !classMap.value.get("bg-color") ? "hover:bg-op-15" : ""),
    // 边框
    classMap.value.get("border-style") || (props.appear == "outlined" ? "b-solid" : ""),
    classMap.value.get("border-width") || "b",
    classMap.value.get("border-color") || `b-${props.theme}`,
    classMap.value.get("border-radius") || "rd",
    classMap.value.get("hover-border-style") || "",
    classMap.value.get("hover-border-width") || "",
    classMap.value.get("hover-border-color") || "",
    classMap.value.get("hover-border-radius") || "",
    // 文本
    classMap.value.get("text-color") || (
      props.theme == "default" ? "" : props.appear != "fill" ? `text-${props.theme}` : "text-light"),
    classMap.value.get("hover-text-color") || (
      props.theme == "default" ? "" : props.appear == "outlined" ? `hover:text-light` : ""),
  ].filter(v => !!v);

  // 动画
  if (!isDisabled.value) {
    baseVal.push("transition-all active:hover:animate-none active:focus:animate-none");
    baseVal.push("active:hover:transform-scale-95 active:focus:transform-scale-95");
  }

  if (isDisabled.value) {
    return baseVal.filter(item => !item.includes("hover"));
  } else {
    return baseVal;
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