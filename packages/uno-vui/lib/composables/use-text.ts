import type { ComputedRef, DeepReadonly, Ref } from 'vue';
import type { ThemeType } from '../preset/types';
import { genCompClass, getAttrsClass } from './use-class';
import { hasParseableColor } from './use-unocss';

const textColorRegList = [
  /(?:text|color|c)-(\S+)/gm
];

/**
 * @typedef { Object } 文字颜色 props
 * @prop `textClass` 文字颜色class
 */
type TextProps = {
  textClass: DeepReadonly<ComputedRef<string[]>>
}

export const useText = (
  type: Ref<ThemeType>,
  hasBg?: ComputedRef<boolean> | Ref<boolean> | boolean,
  hasBorder?: ComputedRef<boolean> | Ref<boolean> | boolean,
  text?: ComputedRef<boolean> | Ref<boolean> | boolean,
  disabled?: ComputedRef<boolean> | Ref<boolean> | boolean,
): TextProps => {
  const textClass = computed(() => {
    const hasColor = textColorRegList.some(reg => handlerTextColorReg(getAttrsClass().matchAll(reg)));
    return [
      // 文字颜色
      genCompClass([
        { condition: hasColor, trueVal: "" },
        { condition: unref(unref(hasBg)) && unref(unref(text)), trueVal: "" },
        { condition: unref(unref(hasBg)), trueVal: "text-light" },
        { condition: type.value == "default", trueVal: "" },
        { condition: unref(unref(hasBorder)) || unref(unref(text)), trueVal: `text-${type.value}`, falseVal: `text-light` },
      ]),
      // hover
      genCompClass([
        { condition: unref(unref(hasBorder)) && unref(unref(text)), trueVal: "" },
        { condition: hasColor || unref(unref(disabled)) || unref(unref(hasBg)) || type.value == "default", trueVal: "" },
        { condition: unref(unref(text)), trueVal: `hover:text-${type.value}`, falseVal: "hover:text-light" },
      ]),
    ];
  })

  return {
    textClass: readonly(textClass),
  }
}

function handlerTextColorReg(matchAllArray: IterableIterator<RegExpMatchArray> | null): boolean {
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