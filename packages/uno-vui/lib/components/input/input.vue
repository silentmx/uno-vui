<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue';
import type { ThemeType } from '../../preset';
import { unoAttrs } from '../../uno-utils';

const props = defineProps({
  type: {
    type: String as PropType<"text" | "passowrd" | "email" | "password" | "tel" | "url">,
    default: "text"
  },
  theme: {
    type: String as PropType<ThemeType>,
    default: "default"
  },
  label: String,
  labelPosition: {
    type: String as PropType<"left" | "top" | "floating">,
    default: "floating"
  },
  icon: String,
  hint: String,
  modelValue: String,
  modelModifiers: { default: () => ({}) },
  disabled: Boolean,
  loading: Boolean,
});

const emit = defineEmits<{
  (e: "update:modelValue"): void
}>();

const vm = useVModel(props, "modelValue", emit);
const attrs = unoAttrs();
</script>

<template>
  <div class="flex flex-col relative">
    <fieldset class="flex items-center" :class="[attrs.classObj.bg, attrs.classObj.border]">
      <legend class="hidden"></legend>
      <slot name="prefix">prefix</slot>
      <input :type="type" v-model="vm" class="w-full bg-clip-text text-size-inherit lh-inherit" v-bind="attrs.attrs" />
      <slot name="suffix"></slot>
    </fieldset>
    <div>
      <slot name="hint">hint</slot>
      <div>{{ attrs.classObj }}</div>
    </div>
  </div>
</template>