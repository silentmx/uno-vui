<script setup lang="ts">
import { useCursorClass } from '../../composables';
import { ThemeType } from '../../preset/types';

const props = withDefaults(defineProps<{
  theme: ThemeType;
  type: "text" | "passowrd" | "email" | "password" | "tel" | "url";
  appear: "left" | "top" | "floating";
  label?: string;
  hint?: string;
  placeholder?: string;
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
  // class?: string;

  modelValue: string;
  dataUnoInfo: any;
}>(), {
  theme: "default",
  type: "text",
  appear: "floating",
});

const emit = defineEmits<{
  (e: "update:modelValue"): void
}>();
const vm = useVModel(props, "modelValue", emit);

const cursorClass = useCursorClass(toRef(props, "loading"), toRef(props, "disabled"));
// const classMap = useClassMap(toRef(props, "class"));

const inputRef = ref();
const isFocusInput = useFocus(inputRef);
// const a = first
const fieldsetClass = computed(() => {
  const classVal = [
    // 基础样式
    "flex items-center px-0.5em gap-1 box-border transition-250 relative",
    // 边框
    // classMap.value.get("border-style") || "b-solid",
    // classMap.value.get("border-width") || "b",
    // classMap.value.get("border-radius") || "rd",
    // classMap.value.get("border-color") || "b-gray",
    // classMap.value.get("hover-border-color") || "hover:b-dark dark:hover:b-light",
    // classMap.value.get("focus-within-border-color") || (
    //   props.theme == "default" ? "focus-within:b-dark dark:focus-within:b-light" : `!focus-within:b-${props.theme}`
    // ),
    // // text
    // classMap.value.get("text-color") || ""
  ];

  return classVal;
});

const prefixRef = ref();
const prefixSize = useElementSize(prefixRef);
const prefixStyleVar = computed(() => {
  return {
    "--un-translate-y": isFocusInput.focused.value || vm.value ? "-50%" : "0",
    "--un-translate-x": isFocusInput.focused.value || vm.value ? "4px" : `${prefixSize.width.value + 4}px`
  }
});

const labelRef = ref();
const labelSize = useElementSize(labelRef);
const labelStyleVar = computed(() => {
  return {
    "--label-width": (isFocusInput.focused.value || vm.value) && props.label ? `${labelSize.width.value + 8}px` : "0",
  }
});
const labelClass = computed(() => {
  return [
    "transition-all-300",
    isFocusInput.focused.value || vm.value ? "text-80%" : "",
    (isFocusInput.focused.value || vm.value) ? "text-primary" : "text-gray",
  ]
})
</script>

<template>
  <div ref="root" class="flex flex-col relative mt-0.5em">
    <label v-if="appear != 'floating'">label</label>
    <fieldset ref="fieldsetRef" :class="[fieldsetClass, cursorClass]" :disabled="disabled" :aria-disabled="disabled">
      <legend class="p-0 w-[var(--label-width)] transition-all ease-out" :style="labelStyleVar"></legend>
      <div ref="prefixRef">
        <slot name="prefix">prefix</slot>
      </div>
      <div ref="labelRef" class="flex items-center h-full absolute max-w-60% text-truncate translate-0"
        :style="prefixStyleVar" :class="labelClass" @click="inputRef.focus()">
        <label class="text-truncate">{{ label }}</label>
      </div>
      <input ref="inputRef" :type="type" v-model="vm" class="w-full py-0.5em bg-clip-text text-size-inherit lh-inherit"
        :placeholder="`${appear == 'floating' && !isFocusInput.focused.value && label ? '' : placeholder}`" />
      <slot name="suffix">{{ dataUnoInfo }}</slot>
    </fieldset>
  </div>
</template>