---
title: vue第三方组件css修改
date: 2021-12-08 14:00:41
tags: vue第三方组件css修改
---

### 1.使用全局统一覆盖

在`src/styles`目录下新建一个`css`，根据需要，修改原有的class名称

然后在你的`main.js`中引入`**import** './src/styles/element-ui-reset.css'` 

### 在`.vue`文件中修改

#### 新建style标签不加scoped

**注意：一定要加上唯一的作用域 即最外层的class名或者id 。 它限定了当前的修改样式只能在元素以及其子元素中生效，防止影响其他地方（会影响到所有用到该组件的地方）**

#### 深度选择器

`/deep/ 或 ::v-deep 操作符    ----两者都是 >>> 的别名`

.el-table /deep/ tr{} //有效果但是`vscode`会有语法报错

.el-table \>>>  tr{} //有效果但是`vscode`会有语法报错

.el-table ::v-deep tr{}  //有效果

注意：当未使用`CSS`预处理器（less或者`scss`）时

/deep/与\>>>写在最前方（如：\>>> .el-table）`vscode`编译器会报错

当使用`CSS`预处理器（less）时 

\>>>会报错

