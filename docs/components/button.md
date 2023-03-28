---
title: 按钮
---

# 按钮
按钮用来给用户执行操作或做出选择

## 基础用法
<demo src="../example/button/basic.vue"></demo>

## 任意颜色
除了使用type设置主题颜色以外, 也可直接使用css来控制背景色，文字颜色，边框颜色。
当使用bg-xxx来设置背景色时，文字颜色默认跟随主题默认颜色，hover效果需要手动设置(比如hover:bg-xxx), 
点击动画颜色也需要通过after:shadow-xxx来设置
<demo src="../example/button/colors.vue"></demo>

## 任意大小
可以通过设置文字大小来设置按钮的大小, 也可以添加block类样式来让按钮占满整行
<demo src="../example/button/size.vue"></demo>

## 加载和禁用状态
<demo src="../example/button/state.vue"></demo>