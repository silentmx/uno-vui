import { defaultIgnoreAttributes } from 'unocss/preset-attributify';
import type { Ref } from "vue";
import type { ThemeType } from '../preset';

const ignoreAttributes = [
  ...defaultIgnoreAttributes,
  ...["on", "model", "id", "style", ":", "key", "is", "aria", "accesskey", "about", "#", "ref"]
];

type UnoAttrConfig = {
  theme: Ref<ThemeType>,
  class?: string,
  loading?: Ref<boolean>,
  disabled?: Ref<boolean>,
  state?: Ref<"success" | "error">
}

type ClassObj = {
  border: string,
  bg: string,
  text: string,
  cursor: string,
  base: string,
}

export const unoAttrs = (config?: UnoAttrConfig) => {
  const originClassObj = ref<ClassObj>({
    border: "",
    bg: "",
    text: "",
    cursor: "",
    base: "",
  });
  const styleVar = ref<string>("");

  const attrs = computed(() => {
    const { attrs, classObj } = attrsToClass();
    originClassObj.value = classObj;
    return attrs;
  });

  const isDisabled = computed(() => {
    return unref(config?.loading) || unref(config?.disabled);
  });

  const classObj = computed<ClassObj>(() => {
    const theme = unref(config?.theme) || "default";
    const loading = unref(config?.loading) || false;
    const disabled = unref(config?.disabled) || false;
    const state = unref(config?.state);
    const baseClassObj = groupClassSet(
      (config?.class || "").split(" ").filter(v => !!v).reduce((acc, cur) => {
        acc.add(cur);
        return acc;
      }, new Set<string>())
    );
    return mergeClassObj(theme, unref(originClassObj), baseClassObj, loading, disabled, state);
  });

  return {
    attrs: readonly(attrs),
    classObj: readonly(classObj),
    styleVar: readonly(styleVar),
    isDisabled: readonly(isDisabled),
  }
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
  };
}

/**
 * 对class set 按作用进行分组
 */
function groupClassSet(classset: Set<string>): ClassObj {
  const classObj: ClassObj = {
    border: "",
    bg: "",
    text: "",
    cursor: "",
    base: "",
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

function mergeClassObj(
  theme: ThemeType,
  original: ClassObj,
  base: ClassObj,
  loading: boolean,
  disabled: boolean,
  state?: "success" | "error"
): ClassObj {
  const classObj: ClassObj = {
    border: "",
    bg: "",
    text: "",
    cursor: "",
    base: "",
  }

  // cursor
  if (loading && !disabled) {
    classObj.cursor = "cursor-wait";
  } else if (disabled) {
    classObj.cursor = "cursor-not-allowed";
  }

  // border

  return classObj;
}