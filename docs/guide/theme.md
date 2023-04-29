---
title: 主题
---

# 配置
主题通过unoccs预设的方式配置，可以配置多套颜色主题, 主题变量包括
`primary` `accent` `success` `warn` `error` `default`,
预设默认包含一套主题为, 你可以通过预设去覆盖默认主题。配置时`primary` `accent`
是必填项，其它字段都有默认值
```ts
primary: "blue",
accent: "purple",
default: "gray",
success: "green",
warn: "yellow",
error: "red"
```

```ts {2-3,14-25}
// uno.config.ts
import { presetUnoVui } from 'uno-vui/preset';
import { TransformerAttributifyToClass, unovuiIconsOptions } from 'uno-vui/utils';
import {
  defineConfig,
  presetAttributify, presetIcons, presetUno,
  transformerDirectives, transformerVariantGroup
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(unovuiIconsOptions({
      svgPath: "src/assets/svgs"
    })),
    presetUnoVui({
      themes: [
        { primary: "blue", accent: "purple" },
        { primary: "pink", accent: "sky" },
      ],
      // 通过预设覆盖uno-vui默认使用图标
      // icons: {
      //   loading: "i-mingcute:loading-line animate-spin"
      // }
    })
  ],
  transformers: [
    TransformerAttributifyToClass(), // 必须放在第一个
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  // 添加这里恨重要，unocss默认不扫描node_modules文件夹下的.js,.cjs文件
  // 这个ui库打包时是没有生成css文件的
  include: [/.*\/uno-vui\.js(.*)?$/, './**/*.vue']
})
```

## 使用
你可以像使用unocss颜色一样来使用主题颜色
```html
<div class="bg-primary">primary</div>
<div class="bg-primary-500">primary 500</div>
<div class="bg-primary-500/20">primary opacity</div>
```

## 更改主题
如果预设包含多套主题, 可以通过组件`UThemePick`来更改使用的主题
<demo src="../example/theme/basic.vue"/>


