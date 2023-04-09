import { theme } from "unocss/preset-mini";
import type { ComputedRef, Ref } from "vue";
import type { UnoClassInfo } from "./uno-type";

const borderStyles = ["solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset"];

/**
 * unocss 正则分析表达式
 * matchArray
 * - 0: 原字符串
 * - 1: prefix 比如:hover dark after等
 * - 2: 描述类型 `border | bg | text | shadow`
 * - 2: 属性的其他值
 */
const regexp = new RegExp(/^([^b.]+)?(border|b|rd|bg|text|color|c|after[:-]shadow)(?:-(.+))?$/);
const sizeRegexp = new RegExp(/(\d+(px|rem|em)?)$/);
const directRegexp = new RegExp(/(?:.+-)?([xy])?([rltbse])?(block|inline)?([bi][se])-(?:.+)?/);
const opRegexp = new RegExp(/(?:.+-)?op(?:acity)?-(\d{1,3})$/);

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
      afterShadow: {}
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
          // afterShadow
          case "after:shadow":
          case "after-shadow": {
            if (!unoClassInfo.afterShadow[prefixKey]) {
              unoClassInfo.afterShadow[prefixKey] = {};
            }

            if (hasColor(val)) {
              unoClassInfo.afterShadow[prefixKey].hasColor = true;
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

type Condition = ComputedRef<boolean | string | undefined | null> | Ref<boolean | string | undefined | null> | boolean | string | undefined | null;

/**
 * 按照条件生成对应的unocss class
 * @param preCondition 先决条件
 * @param params 参数列表
 * @param merge 是否合并
 * - true: 依次取值合并
 * - false: 优先级从高到低排列, 一旦获取到class值, 就不再往下执行
 */
export const genUnoClass = (
  preCondition: Condition,
  params: { condition: Condition, trueVal?: string, falseVal?: string }[] = [],
  merge: boolean = false,
): string => {
  let classVal = "";
  if (unref(unref(preCondition))) {
    params.some(item => {
      if (unref(unref(item.condition))) {
        if (item.trueVal != undefined) {
          classVal += ` ${item.trueVal}`;
          if (!merge) {
            return true;
          }
        }
      } else {
        if (item.falseVal != undefined) {
          classVal += ` ${item.falseVal}`;
          if (!merge) {
            return true;
          }
        }
      }
    });
  }
  return classVal;
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
  const directMath = directRegexp.exec(val);
  if (directMath) {
    const [, d1, d2, d3, d4] = directMath;
    return d1 || d2 || d3 || d4;
  }

  return undefined;
}

function getOp(val: string): string | undefined {
  const opMath = opRegexp.exec(val);
  if (opMath) {
    const [, op] = opMath;
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