import { theme } from "unocss/preset-mini";

/**
 * unocss rule {@link presetUno }前缀
 * 
 * @description
 * - bg: 背景色
 * - text|c: 文本颜色，即color属性
 * - b|border: 边框颜色
 * - shadow: 阴影颜色
 */
type ColorPrefix = "bg" | "text|c" | "b|border" | "after[:-]shadow";

/**
 * 判断THML class属性是否包含颜色描述
 * @param classString 类样式
 * @param prefix {@link ColorPrefix}
 * @returns boolean
 */
export function containColor(classString: string = "", prefix: ColorPrefix = "bg"): boolean {
  const reg = new RegExp(`(${prefix})-(.+)$`);
  return classString.split(" ").some(c => {
    return reg.test(c) && (
      c.includes("#") ||
      c.includes("rgb") ||
      Object.keys(theme.colors).some(k => c.includes(k))
    );
  })
}

/**
 * 判断类样式是否包含border-radius
 * @param classString 类样式
 * @returns boolean
 */
export function containBrd(classString: string = ""): boolean {
  const reg = new RegExp("^(?:border-|b-)?(?:rounded|rd)()(?:-(.+))?$");
  return classString.split(" ").some(c => reg.test(c));
}

/**
 * 生成组件HTML Class
 * @param params 包含一组{条件, true类样式, false类样式}的列表
 * @param merge boolean 默认为false
 *  - true: 依次取值合并
 *  - false: 优先级从高到低排列, 一旦获取到class值, 就不再往下执行
 * @returns string
 */
export function genCompClass(params: {
  condition: boolean | string | undefined | null,
  trueVal?: string,
  falseVal?: string
}[] = [], merge: boolean = false): string {
  let classVal = "";

  // some:对数组中每一项运行给定函数，只要有一项返回true，就会跳出循环，函数返回true ；
  params.some(item => {
    if (item.condition) {
      classVal += `${item.trueVal ? `${item.trueVal} ` : ""}`;
    } else {
      classVal += `${item.falseVal ? `${item.falseVal} ` : ""}`;
    }

    if (classVal && !merge) {
      return true;
    }
  });

  return classVal;
}