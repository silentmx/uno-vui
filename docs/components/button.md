---
title: 按钮
---

# 按钮
按钮用来给用户执行操作或做出选择

## 基础用法
使用```type```来改变按钮的色调，```bs```改变边框的样式，```text```消除按钮背景色
<demo src="../example/button/basic.vue"></demo>

## 圆角按钮
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

## 加载和禁用状态
<demo src="../example/button/state.vue"></demo>