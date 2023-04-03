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