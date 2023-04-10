---
title: 按钮
---
# 按钮

## 背景色
使用```theme```来更改背景色调。```class="bg-xxx"```给自定义背景色调。
<demo src="../example/button/basic.vue"/>

## 边框
可以使用```class="b-xxx"```来定制按钮的边框类型大小和颜色, 边框颜色默认跟随背景色, 背景色会有透明的效果.
<demo src="../example/button/border.vue"/>

## 文本按钮
按钮设置```class="bg-op-0"```来使按钮背景变成透明
<demo src="../example/button/text.vue" />

## 带图标
首先需要配置[图标](/components/icon), 加载状态下只会显示加载图标
<demo src="../example/button/icon.vue" />

## 大小
可以通过设置文字大小来设置按钮的大小, 比如```class="text-2xl"```, 想要按钮占满整行添加类```class="block"```
<demo src="../example/button/size.vue" />

## Link按钮
使用```to```属性来指定跳转链接
<demo src="../example/button/link.vue" />

## 加载状态
<demo src="../example/button/state.vue" />

### 组件```Props```
| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| type | `'default' \| 'primary' \| 'accent' \| 'success' \| 'warn' \| 'error'` | `default` | 主题颜色 |
| icon | `string` | `undefined` | [图标名称](/components/icon) |
| loading | `boolean` | `false` | 是否为加载状态 |
| disabled | `boolean` | `false` | 是否为禁用状态 |
| to | `string` | `undefined` | 跳转链接地址 |

## 组件```Slots```
| 名称 | 参数 | 描述 |
| --- | --- | --- |
| default | `()` | 自定义默认内容 |