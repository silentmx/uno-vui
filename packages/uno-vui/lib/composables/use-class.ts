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
type ColorPrefix = "bg" | "text|c" | "b|border" | "after[:-]shadow(?:-(.+))?$";

/**
 * 判断THML class属性是否包含颜色描述
 * @param classString 类样式
 * @param prefix {@link ColorPrefix}
 * @returns boolean
 */
export function containColor(classString: string = "", prefix: ColorPrefix = "bg"): boolean {
  const reg = new RegExp(`[${prefix}]-(.+)$`);
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