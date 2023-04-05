---
title: 按钮
---

## 背景色
使用```type```来更改背景色调。```class="bg-xxx"```给自定义背景色调，此时hover效果失效，需要```class="hover:bg-xxx"```来设置
hover背景色,```class="after:shadow-xxx"```设置active动画颜色
<demo src="../example/button/basic.vue"/>

## 边框
可以使用```class="b-xxx"```来定制按钮的边框, 在没有通过```class="bg-xxx"```来设置背景的情况下，背景色会有透明的效果.
边框颜色默认跟随```type```
<demo src="../example/button/border.vue"/>

## 文本按钮
按钮设置```text```属性后会变成文本按钮，默认情况下背景色会变成透明
<demo src="../example/button/text.vue" />

## 圆角按钮
按钮默认radius为0.25rem，可以通过```class="b-rd-xxx"```来调整按钮的圆角
<demo src="../example/button/rounded.vue"/>

## 带图标
首先需要配置[图标](/components/icon), 加载状态下只会显示加载图标
<demo src="../example/button/icon.vue" />

## 大小
可以通过设置文字大小来设置按钮的大小, 比如```class="text-2xl"```, 想要按钮占满整行添加类```class="block"```
<demo src="../example/button/size.vue" />

## Link按钮
使用```to```属性来指定跳转链接
<demo src="../example/button/link.vue" />

## 加载和禁用状态
<demo src="../example/button/state.vue" />

### 组件```Props```
| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| type | `'default' \| 'primary' \| 'accent' \| 'success' \| 'warn' \| 'error'` | `default` | 主题颜色 |
| icon | `string` | `undefined` | [图标名称](/components/icon) |
| text | `boolean` | `false` | 是否为文本按钮,为true时没有背景色 |
| loading | `boolean` | `false` | 是否为加载状态 |
| disabled | `boolean` | `false` | 是否为禁用状态 |
| to | `string` | `undefined` | 跳转链接地址 |

## 组件```Slots```
| 名称 | 参数 | 描述 |
| --- | --- | --- |
| default | `()` | 自定义默认内容 |