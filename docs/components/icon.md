---
title: 图标
---

# 图标
在纯css中使用任何图标，更多信息请查看[@unocss/preset-icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons)，
如果IDE为[vscode](https://code.visualstudio.com/),推荐先安装[Iconify](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)插件

1.添加图标库, 图标可在[icones](https://icones.js.org/)进行查看, 自定义svg推荐存放在public/svgs目录中
```shell
# npm
npm i @iconify/json -D

# yarn
yarn add @iconify/json -D

# pnpm
pnpm add @iconify/json -D
```
2.添加unocss图标配置
```ts 
// unocss.config.ts, 在vite.confg.ts中同理
...
import { promises as fs } from 'node:fs';
import { defineConfig, presetIcons } from 'unocss';
...

export default defineConfig({
  ...
  presets: [
    ...
    presetIcons({
      // prefix: "", 可修改图标引用前缀
      // scale: 1.2, // 图标默认大小为1em, 可以通过这里来设置默认大小
      // 自定义图标, 这里svg图标存放在public/svgs目录下
      collections: {
        // 获取不带颜色的svg图标
        "svgs": (name) => {
          return fs.readFile(`./public/svgs/${name}.svg`, 'utf-8');
        },
        // 获取带颜色的svg图标
        "csvgs": (name) => {
          return fs.readFile(`./public/svgs/${name}.svg`, 'utf-8');
        }
      },
      customizations: {
        // 根据collections来确定svg带不带默认颜色
        transform(svg, collection, icon) {
          if (collection == "csvgs") {
            return svg;
          }
          return svg.replace(/fill=[\'\"]\S*[\'\"]/, "fill=\"currentColor\"");
        }
      },
      // 图标额外css属性，推荐添加
      extraProperties: {
        "display": "inline-block",
        "vertical-align": "middle",
      }
    })
    ...
  ]
  ...
})
```

## 基础用法
使用name属性定义图标名称, type属性来改变图标的颜色
<demo src="../example/icon/basic.vue"></demo>

## 任意颜色
如果预设置的主题颜色不能满足需求，可以通过text-xxx类样式设置想要的颜色, 这时type无效,
[iconify](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)图标库如果有颜色，颜色设置将无效,
<demo src="../example/icon/colors.vue"></demo>

## 图标大小
图标大小可通过 text-xxx类样式直接设置
<demo src="../example/icon/size.vue"></demo>

## 自定义svg
添加自定义图标配置后，使用方式和使用[iconify](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)图标库基本一样。
例如在public/svgs文件夹中添加名称为desktop.svg的矢量图标, 使用i-svgs前缀去除图标原始颜色, i-csvgs前缀保留原始颜色
<demo src="../example/icon/custom.vue"></demo>

## 组件参数
| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| name | `string` | `undefined` | 图标名称 |
| type | `'primary' \| 'accent' \| 'success' \| 'warn' \| 'error'` | `` | 图标主题颜色 |