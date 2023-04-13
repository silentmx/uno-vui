---
title: 图标
---

# 图标
以纯css的方式使用任何图标，更多信息请查看[@unocss/preset-icons](https://unocss.dev/presets/icons)，
如果IDE为[vscode](https://code.visualstudio.com/),推荐先安装[Iconify](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)插件
::: tip 提示
使用前需要对图标进行配置，配置说明请看[快速开始](/guide/)。
图标名称一定要加上前缀, 默认前缀为`i-`
:::

## 基础用法
使用name属性定义图标名称, ```theme```来更改背景色调。```class="text-xxx"```给自定义背景色调。
<demo src="../example/icon/basic.vue"></demo>

## 大小
图标大小可通过```class="text-xxx"```类样式直接设置
<demo src="../example/icon/size.vue"></demo>

## 自定义svg
添加自定义图标配置后。

[示例配置](/guide/#配置),在public/svgs文件夹中添加名称为desktop.svg的矢量图标, 使用i-csvg前缀去使用图标
如果图标不是纯色图标需要着色的话请带`?mask`后缀,如
```html
<u-icon name="i-csvg:[name]?mask" class="text-red"></u-icon>
```
<demo src="../example/icon/custom.vue"></demo>

## 组件参数
| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| name | `string` | `undefined` | 图标名称 |
| theme | `'default' \| 'primary' \| 'accent' \| 'warn' \| 'success' \| 'error'` | `default` | 图标主题颜色 |