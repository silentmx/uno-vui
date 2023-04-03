import type { ComputedRef, DeepReadonly, Ref } from "vue";
import type { ThemeType } from "../preset/types";
import { genCompClass } from "./use-class";
import { hasParseableColor } from "./use-unocss";

// bg color正则表达式
const bgColorRegList = [
  /bg-(\S+)$/
];

// bg opacity
const bgOpRegList = [
  /bg-op(?:acity)?-?(\S+)$/
];


/**
 * @typedef { Object } 背景色 props
 * @prop { DeepReadonly<Ref<boolean>> } hasBg: 是否含有背景色
 * @prop { DeepReadonly<ComputedRef<string[]>> } bgClass: 背景色样式class
 */
type BgProps = {
  hasBg: DeepReadonly<Ref<boolean>>,
  bgClass: DeepReadonly<ComputedRef<string[]>>
}

/**
 * 计算组件背景色unocss class列表
 * @param { string} attrsClass 组件class attr  
 * @param { ThemeType } [type="default"] {@link ThemeType} 组件主题类型
 * @param { ComputedRef<boolean> | Ref<boolean> } hasBorder 组件是否有边框
 * @param { boolean } text 组件是否只显示文字, 此时背景色透明度为0
 * @param { ComputedRef<boolean> | Ref<boolean> } disabled  组件`disabled`状态
 * @return `bgprops` {@link BgProps} 组件背景色props
 */
export function useBg(
  attrsClass: string = "",
  type: ThemeType = "default",
  hasBorder?: ComputedRef<boolean> | Ref<boolean>,
  text?: boolean,
  disabled?: ComputedRef<boolean> | Ref<boolean>
): BgProps {
  const hasBg = ref(bgColorRegList.some(reg => handlerBgColorReg(attrsClass.match(reg))));
  const hasOp = ref(bgOpRegList.some(reg => reg.test(attrsClass)));

  const bgClass = computed(() => {
    return [
      // bg color
      genCompClass([
        { condition: hasBg.value, trueVal: " " },
        {
          condition: type == "default",
          trueVal: `bg-light-400 hover:bg-light-500 dark:bg-dark-400 dark:hover:bg-dark-300`
        },
        { condition: true, trueVal: `bg-${type}` }
      ]),
      // bg hover color
      genCompClass([
        { condition: disabled?.value, trueVal: " " },
        {
          condition: type == "default",
          trueVal: `hover:bg-light-500 dark:hover:bg-dark-300`
        },
        { condition: true, trueVal: `hover:bg-${type}Heavy` }
      ]),
      // bg opacity
      genCompClass([
        { condition: hasOp.value, trueVal: " " },
        { condition: text, trueVal: "bg-op-0" },
        { condition: hasBorder?.value, trueVal: "bg-op-10" },
        { condition: disabled?.value, trueVal: "bg-op-60" }
      ]),
      // bg hover opacity
      genCompClass([
        { condition: disabled?.value, trueVal: " " },
        { condition: type == "default", trueVal: " " },
        { condition: text, trueVal: "hover:bg-op-10" },
      ])
    ]
  });

  return {
    hasBg: readonly(hasBg),
    bgClass: readonly(bgClass),
  }
}

function handlerBgColorReg(matchArray: RegExpMatchArray | null): boolean {
  if (matchArray == null) {
    return false;
  }

  const [, c]: string[] = matchArray;

  if (c.includes("url")) {
    return true;
  }

  return hasParseableColor(c);
}