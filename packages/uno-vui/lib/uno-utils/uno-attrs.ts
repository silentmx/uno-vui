import { defaultIgnoreAttributes } from 'unocss/preset-attributify';

const ignoreAttributes = [
  ...defaultIgnoreAttributes,
  ...["on", "model", "id", "style", ":", "key", "is", "aria", "accesskey", "about", "#"]
];

export const unoAttrs = () => {
  return computed(() => {
    const { attrs, classObj } = attrsToClass();
    return {
      attrs,
      classObj
    }
  });
}

/**
 * 把有效的unocss attribute 放入class并删除该attr, 分离attr和class
 */
function attrsToClass() {
  const attrs = Object.assign({}, useAttrs());
  const classSet = new Set<string>();

  Object.entries(attrs).map(([key, val]) => {
    const ignore = ignoreAttributes.some(prefix => key.startsWith(prefix));
    if (!ignore && typeof val == "string") {
      const k = key.replace("un-", "");
      if (val) {
        val.split(" ").map(item => {
          if (k == "class") {
            classSet.add(`${item}`);
          } else {
            classSet.add(`${k}-${item}`);
          }
        });
      } else {
        classSet.add(`${k}`);
      }
      delete attrs[key];
    }
  });

  return {
    attrs,
    classObj: groupClassSet(classSet),
  }
}

/**
 * 对class set 按作用进行分组
 */
function groupClassSet(classset: Set<string>) {
  const classObj = {
    base: "",
    border: "",
    bg: "",
    text: ""
  };

  for (const val of classset) {
    // border
    if (val == "b" || ["rd", "b-", "border"].some(v => val.includes(v))) {
      classObj.border += ` ${val}`;
      continue;
    }

    // bg
    if (val.includes("bg")) {
      classObj.bg += ` ${val}`;
      continue;
    }

    // text
    if (["text", "color", "c-"].some(v => val.includes(v))) {
      classObj.text += ` ${val}`;
      continue;
    }

    classObj.base = ` ${val}`;
  }

  return classObj;
}