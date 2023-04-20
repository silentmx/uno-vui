<script setup lang="ts">
import type { PropType } from 'vue';
import { commonProps } from '../../composables';

const props = defineProps({
  ...commonProps,
  modelValue: String,
  modelModifiers: { default: () => ({}) },
  type: {
    type: String as PropType<"text" | "passowrd" | "email" | "password" | "tel" | "url">,
    default: "text"
  },
  label: String,
  labelPosition: {
    type: String as PropType<"left" | "top" | "floating">,
    default: "floating"
  },
  icon: String,
  hint: String,
  placeholder: String,
  loading: Boolean,
  disabled: Boolean,
  class: String,
});

const emit = defineEmits<{
  (e: "update:modelValue"): void
}>();
const vm = useVModel(props, "modelValue", emit);

const fieldset = ref();
const { focused } = useFocusWithin(fieldset);
const compClass = computed(() => {
  return [
    "flex items-center rd b p-0.25em bg-op-3",
    props.disabled || focused.value ? `` : `hover:b-dark dark:hover:b-light b-1.5`,
    focused.value ? `bg-${props.theme} b-${props.theme} b-1.5` : ``,
  ];
});
</script>

<template>
  <div class="flex flex-col relative">
    <fieldset :class="[compClass, props.class]" ref="fieldset">
      <legend class="">sss
      </legend>
      <slot name="prefix"></slot>
      <input :type="type" v-model="vm" class="w-full bg-clip-text text-size-inherit lh-inherit"
        :placeholder="placeholder" />
      <slot name="suffix"></slot>
    </fieldset>
    <div>
      <slot name="hint">hint</slot>
    </div>
  </div>
</template>