import type { ComputedRef, DeepReadonly, Ref } from 'vue';
import type { ThemeType } from '../preset/types';
import { genCompClass, getAttrsClass } from './use-class';
import { globalKeywords, hasParseableColor } from './use-unocss';

// border类型
const borderStyles = ["solid", "dashed", "dotted", "double", "hidden", "none", "groove", "ridge", "inset", "outset", ...globalKeywords];
const directionMap: Record<string, string[]> = {
  'l': ['-left'],
  'r': ['-right'],
  't': ['-top'],
  'b': ['-bottom'],
  's': ['-inline-start'],
  'e': ['-inline-end'],
  'x': ['-left', '-right'],
  'y': ['-top', '-bottom'],
  '': [''],
  'bs': ['-block-start'],
  'be': ['-block-end'],
  'is': ['-inline-start'],
  'ie': ['-inline-end'],
  'block': ['-block-start', '-block-end'],
  'inline': ['-inline-start', '-inline-end'],
}

// border style正则表达式
const borderStyleRegList = [
  /(?:border|b)-(?:style-)?()(\S+)/gm,
  /(?:border|b)-([xy])-(?:style-)?(\S+)/gm,
  /(?:border|b)-([rltbse])-(?:style-)?(\S+)/gm,
  /(?:border|b)-(block|inline)-(?:style-)?(\S+)/gm,
  /(?:border|b)-([bi][se])-(?:style-)?(\S+)/gm,
];

// border color正则表达式
const borderColorRegList = [
  /(?:border|b)-()(?:color-)?(\S+)/gm,
  /(?:border|b)-([xy])-(?:color-)?(\S+)/gm,
  /(?:border|b)-([rltbse])-(?:color-)?(\S+)/gm,
  /(?:border|b)-(block|inline)-(?:color-)?(\S+)/gm,
  /(?:border|b)-([bi][se])-(?:color-)?(\S+)/gm,
];

// border rounded正则表达式
const borderRoundedRegList = [
  /(?:border-|b-)?(?:rounded|rd)()(?:-(\S+))?/gm,
  /(?:border-|b-)?(?:rounded|rd)-([rltbse])(?:-(\S+))?/gm,
  /(?:border-|b-)?(?:rounded|rd)-([rltb]{2})(?:-(\S+))?/gm,
  /(?:border-|b-)?(?:rounded|rd)-([bise][se])(?:-(\S+))?/gm,
  /(?:border-|b-)?(?:rounded|rd)-([bi][se]-[bi][se])(?:-(\S+))?/gm,
];

/**
 * @typedef { Object } 边框props
 * @prop `hasBorder` 是否有边框
 * @prop `borderClass` 边框样式class
 */
type BorderProps = {
  hasBorder: DeepReadonly<ComputedRef<boolean>>,
  borderClass: DeepReadonly<ComputedRef<string[]>>,
}

/**
 * 关于边框的class计算属性
 * 主要用来计算border的默认颜色，radius，border style, size
 * @param type {@link ThemeType} 组件主题类型
 * @param disabled 是否disabled状态
 * 
 * @returns `borderProps` {@link BorderProps} 包含是否有border和class样式
 */
export const useBorder = (
  type: Ref<ThemeType>,
  disabled?: ComputedRef<boolean> | Ref<boolean>,
): BorderProps => {

  const hasBorder = computed(() => {
    return borderStyleRegList.some(reg => handlerBorderStyleReg(getAttrsClass().matchAll(reg)));
  });

  const borderClass = computed(() => {
    const hasBorderColor = borderColorRegList.some(reg => handlerBorderColorReg(getAttrsClass().matchAll(reg)));
    const hasRounded = borderRoundedRegList.some(reg => reg.test(getAttrsClass()));

    return [
      // border radius
      genCompClass([
        { condition: hasRounded, falseVal: `b-rd` },
      ]),
      // border size
      genCompClass([
        { condition: hasBorder.value, trueVal: "b" },
      ]),
      // border color
      genCompClass([
        { condition: hasBorder.value, falseVal: "" },
        { condition: hasBorderColor, trueVal: "" },
        {
          condition: type.value == "default",
          trueVal: "b-light-900 dark:b-dark-50"
        },
        { condition: type.value, trueVal: `b-${type.value}` }
      ]),
      // border hover color
      genCompClass([
        { condition: disabled?.value || hasBorderColor, trueVal: "" },
      ])
    ];
  });

  return {
    hasBorder: readonly(hasBorder),
    borderClass: readonly(borderClass),
  }
}

// 只有class样式指定了border style, 才算所border生效
function handlerBorderStyleReg(matchAllArray: IterableIterator<RegExpMatchArray> | null): boolean {
  if (matchAllArray == null) {
    return false;
  }

  return Array.from(matchAllArray).some(match => {
    const [, d = '', s]: string[] = match;
    if (borderStyles.includes(s) && d in directionMap) {
      return true;
    }
  });
}

function handlerBorderColorReg(matchAllArray: IterableIterator<RegExpMatchArray> | null): boolean {
  if (matchAllArray == null) {
    return false;
  }

  return Array.from(matchAllArray).some(match => {
    const [, d = '', c]: string[] = match;
    if (d in directionMap && (c.includes("url") || hasParseableColor(c))) {
      return true;
    }
  });
}