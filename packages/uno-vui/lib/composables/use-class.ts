
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

  // some:对数组中每一项运行给定函数，只要有一项返回true，就会跳出循环，函数返回true;
  params.some(item => {
    if (item.condition) {
      if (item.trueVal != undefined) {
        classVal += item.trueVal;
        if (!merge) {
          return true;
        }
      }
    } else {
      if (item.falseVal != undefined) {
        classVal += item.falseVal;
        if (!merge) {
          return true;
        }
      }
    }
  });

  return classVal;
}

/**
 * 从atts获取unocss 有效的class字符串
 * @returns { string }
 */
export function getAttrsClass(): string {
  const attrs = Object.assign({}, useAttrs());
  let attrClass = attrs.class as string || "";
  // 从attrs获取有效的unocss class属性
  Object.keys(attrs).filter(k => k != "class")
    .forEach(k => {
      if (typeof attrs[k] == "string") {
        attrClass += (attrs[k] as string).split(" ").reduce((acc, cur) => {
          if (cur) {
            acc += ` ${k}-${cur}`;
          }
          return acc;
        }, ` ${k}`)
      }
    });
  return attrClass;
}