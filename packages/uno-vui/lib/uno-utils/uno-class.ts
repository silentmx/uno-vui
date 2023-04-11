import { parseColor, theme } from "unocss/preset-mini";
import type { ComputedRef, Ref } from "vue";
import { prefix } from "../preset";
import type { Condition, UnoClassInfo } from "./uno-type";

const borderStyles = ["solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset"];

/**
 * unocss 正则分析表达式
 * matchArray
 * - 0: 原字符串
 * - 1: prefix 比如:hover dark after等
 * - 2: 描述类型 `border | bg | text`
 * - 2: 属性的其他值
 */
const regexp = new RegExp(/^([^b.]+)?(border|b|rd|bg|text|color|c)(?:-(.+))?$/);
const sizeRegexp = new RegExp(/(\d+(px|rem|em)?)$/);
const directRegexp = new RegExp(/(?:.+-)?([xy])?([rltbse])?(block|inline)?([bi][se])?-(?:.+)?/);
const opRegexp = new RegExp(/(?:.+-)?op(?:acity)?-(\d{1,3})$/);
const colorRegexp = new RegExp(/(rgb[a]?\(.+\))?(url\(.+\))?(#\d+)?(primary|accent|success|warn|error)?(Heavy|Light)?$/);

/**
 * 对unocss class进行分析
 * @param extraClass 
 * @returns `unoClassInfo` {@link UnoClassInfo}
 */
export const computUnoClassInfo = (
  baseClass?: ComputedRef<string | string[]> | Ref<string | string[]> | string | string[],
) => {
  return computed(() => {
    const unoClassInfo: UnoClassInfo = {
      border: {},
      bg: {},
      text: {},
    };

    // 从组件attrs获取有效的unocss
    const attrs = Object.assign({ class: "" }, useAttrs());
    const classList = attrs.class.split(" ").filter(v => !!v);
    // 有可能以attr的方式使用unocss
    Object.entries(attrs).filter(([k, _]) => k != "class").forEach(([k, v]) => {
      if (typeof v == "string") {
        if (v) {
          classList.push(...v.split(" ").map(item => `${k}-${item}`));
        } else {
          classList.push(k);
        }
      }
    });

    const baseClassVal = unref(unref(baseClass));
    if (baseClassVal) {
      if (Array.isArray(baseClassVal)) {
        baseClassVal.forEach(item => {
          classList.push(...item.split(" ").filter(v => !!v));
        });
      } else {
        classList.push(...baseClassVal.split(" ").filter(v => !!v));
      }
    }

    // 使用正则对每一个class进行分析
    classList.forEach(item => {
      const matchArray = regexp.exec(item);
      if (matchArray) {
        const [, prefix = "normal", type, val = ""] = matchArray;
        const prefixKey = prefix.split(/[:-]/g).sort().filter(v => !!v).toString();

        switch (type) {
          // border
          case "border":
          case "b": {
            if (!unoClassInfo.border[prefixKey]) {
              unoClassInfo.border[prefixKey] = {};
            }

            // border style
            if (borderStyles.some(b => val.includes(b))) {
              unoClassInfo.border[prefixKey].hasBorder = true;
            }

            // border color
            if (hasColor(val)) {
              unoClassInfo.border[prefixKey].hasColor = true;
            }

            // border radius
            if (val.includes("rd") || val.includes("rounded")) {
              unoClassInfo.border[prefixKey].hasRadius = true;
            }

            // border size
            const borderSize = getSize(val);
            if (borderSize) {
              unoClassInfo.border[prefixKey].size = borderSize;
            }

            // border direction
            const borderDirection = getDirection(val);
            if (borderDirection) {
              if (unoClassInfo.border[prefixKey].direction) {
                unoClassInfo.border[prefixKey].direction?.push(borderDirection);
              } else {
                unoClassInfo.border[prefixKey].direction = [borderDirection];
              }
            }

            break;
          }
          case "rd": {
            // border radius
            if (!unoClassInfo.border[prefixKey]) {
              unoClassInfo.border[prefixKey] = {};
            }
            unoClassInfo.border[prefixKey].hasRadius = true;
            break;
          }
          // bg
          case "bg": {
            if (!unoClassInfo.bg[prefixKey]) {
              unoClassInfo.bg[prefixKey] = {};
            }
            // has bg color
            if (hasColor(val)) {
              unoClassInfo.bg[prefixKey].hasColor = true;
              unoClassInfo.bg[prefixKey].color = getColor(val);
            }

            // bg opacity
            const op = getOp(val);
            if (op) {
              unoClassInfo.bg[prefixKey].op = op;
            }
            break;
          }
          // text
          case "text":
          case "color":
          case "c": {
            if (!unoClassInfo.text[prefixKey]) {
              unoClassInfo.text[prefixKey] = {};
            }
            // has text color
            if (hasColor(val)) {
              unoClassInfo.text[prefixKey].hasColor = true;
            }

            break;
          }
          default: {
            break;
          }
        }
      }
    });

    return readonly(unoClassInfo);
  });
}

/**
 * 按照约束条件过滤字符串
 * @param configs 参数，是一个数组
 * - classVal: 需要约束的值
 * - conditions {@link Condition} 约束条件数组
 * - relation: 约束条件之间的关系，and ｜ or， 默认值是and
 * 
 * @returns string
 */
export const genUnoClassString = (configs: {
  classVal: string,
  conditions?: Condition[],
  relation?: "and" | "or"
}[] = []): string => {
  return configs.map(config => {
    const { classVal = "", conditions = [], relation = "and" } = config;
    // 如果没有约束条件，直接返回classvVal的值
    if (conditions.length <= 0) {
      return classVal;
    }

    // 对约束条件进行and或者or的测试
    const condition = relation == "and" ?
      conditions.every(c => unref(unref(c))) :
      conditions.some(c => unref(unref(c)));

    // 如果满足约束条件, 返回值
    if (condition) {
      return classVal;
    }
  }).filter(v => !!v).toString().replace(/,/g, " ");
}

function getSize(val: string): string | undefined {
  const sizeMatch = sizeRegexp.exec(val);
  if (sizeMatch && !val.includes("op")) {
    const [, s] = sizeMatch;
    return s;
  }

  return undefined;
}

function getDirection(val: string): string | undefined {
  const directMatch = directRegexp.exec(val);
  if (directMatch) {
    const [, d1, d2, d3, d4] = directMatch;
    return d1 || d2 || d3 || d4;
  }

  return undefined;
}

function getOp(val: string): string | undefined {
  const opMatch = opRegexp.exec(val);
  if (opMatch) {
    const [, op] = opMatch;
    return op;
  }
  return undefined;
}


/**
 * 判断一个字符串是否包含颜色信息
 * @param val unocss class 字符串
 * @returns `boolean`
 */
function hasColor(val: string): boolean {
  return ["rgb", "url", "#",
    "primary", "accent", "success", "wan", "error",
    ...Object.keys(theme.colors)
  ].some(c => val.includes(c));
}

/**
 * 获取颜色
 * @param val unocss class 字符串
 */
function getColor(val: string): string {
  let color = "";
  const match = val.match(colorRegexp);

  if (match) {
    const [input, rgb, url, num, themeKey, themeSuffix] = match;
    if (input) {
      color = rgb || url || num || `rgb(var(${prefix}-${themeKey}-${themeSuffix ? themeSuffix.toLowerCase() : ''}))`;
    } else {
      const colorString = Object.keys(theme.colors).find(c => val.includes(c));
      if (colorString) {
        color = parseColor(colorString, theme)?.color || '';
      }
    }
  }

  return color;
}