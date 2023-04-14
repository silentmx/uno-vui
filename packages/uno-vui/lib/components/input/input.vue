<script setup lang="ts">
import type { PropType } from 'vue';
import type { ThemeType } from '../../preset';
import { computUnoClassInfo, genUnoClass, unoBg, unoBorder, unoText } from '../../uno-utils';

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
  placeholder: String,
  disabled: Boolean,
  loading: Boolean,
});

const fieldClass = computed(() => {
  return genUnoClass([
    {
      commonCondition: true,
      options: [
        { classVal: "flex relative items-center bg-op-5 px-2 gap-1" },
        { classVal: "hover:bg-op-5", conditions: [{ condition: props.disabled }] },
        { classVal: "hover:bg-op-7", conditions: [{ condition: props.disabled, prefix: "not" }] }
      ]
    }
  ]);
});

const { unoClassInfo, unoClass } = computUnoClassInfo(fieldClass);
const { bgClass, bgStyle } = unoBg(toRef(props, "theme"), unoClassInfo, toRef(props, "disabled"));
const { borderClass } = unoBorder(toRef(props, "theme"), unoClassInfo, toRef(props, "disabled"));
const { textClass } = unoText("default", unoClassInfo, false);
</script>

<template>
  <div class="flex flex-col relative !b-none bg-op-0" :class="textClass" :style="bgStyle">
    <label>label</label>
    <fieldset class="b-inherit" :class="[fieldClass, unoClass, borderClass, bgClass]">
      <legend class="hidden">sss</legend>
      <slot name="prefix">prefix</slot>
      <input :type="type" class="flex-auto bg-clip-text text-size-inherit lh-inherit py-0.325em"
        :placeholder="placeholder">
      <slot name="suffix">suffix</slot>
    </fieldset>
    <div>
      <span class="text-70%">hint or error message</span>
    </div>
  </div>
</template>