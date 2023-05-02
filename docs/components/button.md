---
title: 按钮
---

# 按钮

## 基础用法
`theme`控制主题色调，`appear`用来控制外观`fill: 不带边框(默认)`，`outlined: 有边框`, `text: 文本按钮`。
<demo src="../example/button/basic.vue"/>

## 边框
可以直接使用unocss来覆盖默认边框的样式
<demo src="../example/button/border.vue"/>

## 背景
使用unocss覆盖默认背景
<demo src="../example/button/bg.vue"/>

## 文字颜色
使用unocss覆盖默认文字颜色
<demo src="../example/button/text.vue"/>

## 带图标
加载状态下只会显示加载图标
<demo src="../example/button/icon.vue" />

## 大小
可以通过设置文字大小来设置按钮的大小, 比如`class="text-2xl"`, 想要按钮占满整行添加类`class="block"`
<demo src="../example/button/size.vue" />

## Link按钮
使用`to`属性来指定跳转链接
<demo src="../example/button/link.vue" />

## 加载状态
<demo src="../example/button/state.vue" />

### 组件`Props`
| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'accent' \| 'success' \| 'warn' \| 'error'` | `default` | 主题颜色 |
| appear | `'fill' \| 'outlined' \| 'text'` | `fill` | 外观 |
| icon | `string` | `undefined` | [图标名称](/components/icon) |
| loading | `boolean` | `false` | 是否为加载状态 |
| disabled | `boolean` | `false` | 是否为禁用状态 |
| to | `string` | `undefined` | 跳转链接地址 |

## 组件`Slots`
| 名称 | 参数 | 描述 |
| --- | --- | --- |
| default | `()` | 自定义默认内容 |