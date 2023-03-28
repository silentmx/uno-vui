<script setup lang="ts">
import { theme } from 'unocss/preset-mini';
import type { ThemeType } from '../../preset/types';

const props = defineProps({
  type: {
    type: String as PropType<ThemeType>,
    default: "default"
  },
  ghost: {
    type: String as PropType<"solid" | "dashed">,
  },
  to: String,
  loading: Boolean,
  disabled: Boolean,
  text: Boolean,
});

const binds = Object.assign({}, useAttrs(), props.to ? { href: props.to } : { type: "button" });
const isDisabled = computed(() => {
  return props.loading || props.disabled;
});

const classList = computed(() => {
  const baseClass = [
    `relative flex justify-center items-center gap-1 px-0.875em py-0.25em b-rd`,
    props.disabled ? "cursor-not-allowed" : "",
    props.loading ? "cursor-wait" : "",
  ];

  // 点击波纹动画
  if (!isDisabled.value) {
    baseClass.push(...[
      `after:content-none after:absolute after:inset-0 after:op-0 after:transition-600 after:rd-inherit`,
      `after:active:shadow-none after:active:transition-0`,
    ]);

    if (props.ghost) {
      baseClass.push(`after:shadow-[0_0_0_8px_var(--un-shadow-color)]`);
    } else {
      baseClass.push(`after:shadow-[0_0_0_6px_var(--un-shadow-color)]`);
    }

    if (!((binds.class || "") as string).split(" ").some(v => /^bg-(.+)$/.test(v))) {
      baseClass.push(...[
        props.type == "default" || props.text ?
          `after:active:op-30 dark:after:active:op-50` :
          `after:active:op-50 dark:after:active:op-100`
      ]);
    } else {
      baseClass.push(...[
        props.text ? `after:active:op-30 dark:after:active:op-50` : `after:active:op-50 dark:after:active:op-100`
      ]);
    }
  }

  // 背景色, 如果通过外部class设置, type将失效
  if (!((binds.class || "") as string).split(" ").some(v => /^bg-(.+)$/.test(v))) {
    // 通过type props 设置
    baseClass.push(...[
      `bg-${props.type} hover:bg-${props.type}Heavy after:shadow-${props.type}Heavy`,
    ]);

    if (props.text) {
      baseClass.push(...[
        `bg-op-0 hover:bg-op-15`
      ])
    } else {
      if (props.ghost) {
        baseClass.push(...[
          isDisabled.value ?
            props.type == "default" ? `bg-op-10 hover:bg-op-10` : `bg-op-10 hover:bg-op-10` :
            props.type == "default" ? `bg-op-10 hover:bg-op-20` : `bg-op-10 hover:bg-op-100`
        ])
      } else {
        baseClass.push(...[
          isDisabled.value ?
            props.type == "default" ? `bg-op-10 hover:bg-op-10` : `bg-op-70 hover:bg-op-70` :
            props.type == "default" ? `bg-op-10 hover:bg-op-20` : ``
        ])
      }
    }
  } else {
    if (props.text) {
      baseClass.push(...[
        `bg-op-0 hover:bg-op-15`
      ])
    } else {
      if (props.ghost) {
        baseClass.push(...[
          isDisabled.value ? `bg-op-10` : `bg-op-10 hover:bg-op-100`
        ])
      } else {
        baseClass.push(...[
          isDisabled.value ? `bg-op-70` : ``
        ])
      }
    }
  }

  // 文字颜色, 如果通过外部class设置, type将失效
  if (!((binds.class || "") as string).split(" ").some(v =>
    /^text-\#(.+)$/.test(v) || /^bg-(.+)$/.test(v) ||
    Object.keys(theme.colors).some(k => `text-${k}` == v)
  )) {
    if (props.text) {
      baseClass.push(...[
        props.type == "default" ? `hover:text-${props.type}` : `text-${props.type}`
      ]);
    } else {
      if (props.ghost) {
        baseClass.push(...[
          isDisabled.value ?
            props.type == "default" ? `hover:text-${props.type}` : `text-${props.type}` :
            props.type == "default" ? `hover:text-${props.type}` : `text-${props.type} hover:text-light`
        ]);
      } else {
        baseClass.push(...[
          props.type == "default" ? `hover:text-${props.type}` : `text-light`
        ]);
      }
    }
  }

  // 边框
  if (props.ghost) {
    if (!((binds.class || "") as string).split(" ").some(v => /^bg-(.+)$/.test(v))) {
      baseClass.push(...[
        `b b-${props.ghost} b-${props.type}`,
      ]);
    } else {
      baseClass.push(...[
        `b b-${props.ghost}`,
      ]);
    }
  }

  return baseClass;
})
</script>

<template>
  <component :is="to ? 'a' : 'button'" v-bind="binds" :disabled="isDisabled" :aria-disabled="isDisabled"
    :class="classList">
    <div v-if="loading" class="i-line-md:loading-twotone-loop"></div>
    <slot v-else name="icon"></slot>
    <slot></slot>
  </component>
</template>