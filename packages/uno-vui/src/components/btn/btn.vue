<script setup lang="ts">
import { presetIconConfig } from '../../composables';
import { ThemeType } from '../../preset/types';

const props = withDefaults(defineProps<{
  theme: ThemeType
  appear: "fill" | "outlined" | "text";
  icon?: string;
  to?: string;
  loading?: boolean;
  disabled?: boolean;
}>(), {
  theme: "default",
  appear: "fill"
});

const attrs = Object.assign({}, useAttrs(), props.to ? { href: props.to, role: "link" } : { role: "button" });
const slots = useSlots();
const onlyIcon = computed(() => {
  return props.icon && !slots.default;
});
const isDisabled = computed(() => {
  return props.loading || props.disabled;
});


const compClass = computed(() => {
  // 基础样式
  const base = [
    "flex justify-center items-center gap-1",
    onlyIcon.value ? "aspect-square p-1" : "px-0.875em py-0.25em"
  ];

  // 背景
  switch (props.appear) {
    case "fill": {
      base.push(`bg-${props.theme}`);
      if (props.theme == "default") {
        base.push("bg-op-10");
      }

      if (!isDisabled.value) {
        if (props.theme == "default") {
          base.push("hover:bg-op-20")
        } else {
          base.push(`hover:bg-${props.theme}-500`)
        }
      }

      break;
    }
    case "outlined": {
      base.push(`bg-${props.theme} bg-op-10`);
      if (!isDisabled.value) {
        if (props.theme == "default") {
          base.push("hover:bg-op-20")
        } else {
          base.push(`hover:bg-${props.theme}`)
        }
      }
      break;
    }
    case "text": {
      if (!isDisabled.value) {
        base.push(`hover:bg-${props.theme} hover:bg-op-10`);
      }
    }
  }


  return base;
});
</script>

<template>
  <component :is="to ? 'a' : 'button'" v-bind="attrs" :disabled="isDisabled" :aria-disabled="isDisabled"
    :class="compClass">
    <i v-if="loading" :class="presetIconConfig?.loading"></i>
    <i v-else-if="icon" :class="icon"></i>
    <slot></slot>
    <div></div>
  </component>
</template>