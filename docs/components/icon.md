---
title: "图标"
---

# 图标
通过unocss `presetIcons`[预设](/guide/#配置)，uno-vui提供了`unovuiIconsOptions`设置。你可以使用任何你想使用的svg图标。
在国内推荐直接安装[@iconify/json](https://icones.js.org/)
::: code-group
```shell [pnpm]
pnpm add @iconify/json -D
```

```shell [yarn]
yarn add @iconify/json -D
```

```shell [npm]
npm install @iconify/json -D
```
:::

## 基础用法
使用`name`属性定义图标名称,必须带上前缀`i-`,[原因](https://unocss.dev/guide/extracting)。你也可以直接通过`class`来使用图标
<demo src="../example/icon/basic.vue"/>

## 图标颜色
你可以使用`bg-xxx` `text-xxx` `c-xxx`来设置任何你想要设置的图标颜色，
若果svg不是纯色图标,你也可以通过[Modes Overriding](https://unocss.dev/presets/icons#modes-overriding)的方式来设置图标颜色
<demo src="../example/icon/colors.vue" />

## 图标大小
使用`text-xxx`来设置图标大小
<demo src="../example/icon/size.vue" />

## props
| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| name | `string` | `undefined` | 图标名称, 必填 |