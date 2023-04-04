import type { ComputedRef, DeepReadonly, Ref } from 'vue';
import type { ThemeType } from '../preset/types';
import { genCompClass, getAttrsClass } from './use-class';
import { hasParseableColor } from './use-unocss';

// bg color正则表达式
const bgColorRegList = [
  /bg-(\S+)/gm
];

// bg opacity
const bgOpRegList = [
  /bg-op(?:acity)?-?(\S+)/gm
];

/**
 * @typedef { Object } 背景色props
 * @prop `hasBg` 是否含有背景色
 * @prop `bgClass` 背景色样式class
 */
type BgProps = {
  hasBg: DeepReadonly<ComputedRef<boolean>>,
  bgClass: DeepReadonly<ComputedRef<string[]>>
}

/**
 * 关于背景色的class计算属性
 * @param type {@link ThemeType} 组件主题类型
 * @param hasBorder 组件是否有边框
 * @param text 组件是否只显示文字, 此时背景色透明度为0
 * @param disabled  组件`disabled`状态
 * @return `bgprops` {@link BgProps} 组件背景色props
 */
export const useBg = (
  type: Ref<ThemeType>,
  hasBorder?: ComputedRef<boolean> | Ref<boolean>,
  text?: ComputedRef<boolean> | Ref<boolean>,
  disabled?: ComputedRef<boolean> | Ref<boolean>
): BgProps => {

  const hasBg = computed(() => {
    return bgColorRegList.some(reg => handlerBgColorReg(getAttrsClass().matchAll(reg)));
  });

  const bgClass = computed(() => {
    const hasOp = bgOpRegList.some(reg => reg.test(getAttrsClass()));

    return [
      // bg color
      genCompClass([
        { condition: hasBg.value, trueVal: "" },
        {
          condition: type.value == "default",
          trueVal: `bg-light-400 dark:bg-dark-400`
        },
        { condition: type.value, trueVal: `bg-${type.value}` }
      ]),
      // bg hover color
      genCompClass([
        { condition: disabled?.value, trueVal: "" },
        { condition: hasBg.value, trueVal: "" },
        {
          condition: type.value == "default",
          trueVal: `hover:bg-light-500 dark:hover:bg-dark-300`
        },
        { condition: type.value, trueVal: `hover:bg-${type.value}Heavy` }
      ]),
      // bg opacity
      genCompClass([
        { condition: hasOp, trueVal: "" },
        { condition: text?.value, trueVal: "bg-op-0" },
        { condition: type.value == "default", trueVal: "" },
        { condition: hasBorder?.value, trueVal: "bg-op-10" },
        { condition: disabled?.value, trueVal: "bg-op-60" }
      ]),
      // bg hover opacity
      genCompClass([
        { condition: disabled?.value, trueVal: "" },
        { condition: type.value == "default", trueVal: "" },
        { condition: text?.value, trueVal: "hover:bg-op-10" },
      ])
    ]
  });

  return {
    hasBg: readonly(hasBg),
    bgClass: readonly(bgClass),
  }
}

function handlerBgColorReg(matchAllArray: IterableIterator<RegExpMatchArray> | null): boolean {
  if (matchAllArray == null) {
    return false;
  }

  return Array.from(matchAllArray).some(match => {
    const [, c]: string[] = match;
    if (c.includes("url") || hasParseableColor(c)) {
      return true;
    }
  })
}