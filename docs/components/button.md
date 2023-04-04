---
title: 按钮
---

## 基础用法
使用```type```来更改背景色调。```class="bg-xxx"```给自定义背景色调，此时hover效果失效，需要```class="hover:bg-xxx"```来设置
<demo src="../example/button/basic.vue"></demo>

<!-- ## 圆角按钮
按钮默认radius为0.25rem，可以通过```class="b-rd-xxx"```来调整按钮的圆角
<demo src="../example/button/rounded.vue"></demo>

## 带图标
首先需要配置[图标](/components/icon), 加载状态下只会显示加载图标
<demo src="../example/button/icon.vue"></demo>

## 其他颜色
使用```class="bg-xxx"```来改变背景色, ```class="b-xxx"```来改变边框颜色, ```class="text-xxx"```来改文字颜色,
```after:shadow-xxx```来改变点击博文颜色
<demo src="../example/button/colors.vue"></demo>

## 大小
可以通过设置文字大小来设置按钮的大小, 比如```class="text-2xl"```, 想要按钮占满整行添加类```class="block"```
<demo src="../example/button/size.vue"></demo>

## Link按钮
使用```to```属性来指定跳转链接
<demo src="../example/button/link.vue"></demo>

## 加载和禁用状态
<demo src="../example/button/state.vue"></demo> -->

### 组件```Props```
| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| type | `'default' \| 'primary' \| 'accent' \| 'success' \| 'warn' \| 'error'` | `default` | 主题颜色 |
| bs | `'solid' \| 'dashed'` | `undefined` | 边框类型 |
| to | `string` | `undefined` | 跳转链接地址 |
| text | `boolean` | `false` | 是否为文本按钮,为true时没有背景色 |
| loading | `boolean` | `false` | 是否为加载状态 |
| disabled | `boolean` | `false` | 是否为禁用状态 |

## 组件```Slots```
| 名称 | 参数 | 描述 |
| --- | --- | --- |
| default | `()` | 自定义默认内容 |
| icon | `()` | 图标组件 |