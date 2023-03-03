---
title: vue-cli中eslint检验指定文件/夹、报错部分快速修复
date: 2022-09-19 19:28:46
tags:  
---

## 整体介绍

### 1.在现有的项目中添加eslint配置

### 2.开启校验，忽略存量代码，仅校验新增交易

### 3.逐步修复存量代码

## 1.在现有的项目中添加eslint配置

#### 第一步

第一种：在终端中一个一个用yarn add或npm install去安装

第二种：打开项目的package.json文件，在devDependencies依赖项中加入ESlint所需要的包（可根据实际自行网上搜索）。执行一次yarn install或npm install。

#### 第二步

在目录中添加.editorconfig、.eslintrc.js、.eslintignore这三个文件

#### package.json文件**scripts**中内置检验命令

```
"lint": "eslint --ext .js,.vue src",// 仅校验出错误
```

一开始只加了这一行，运行后发现报错居多，后来发现了--fix，可快速修复大部分报错。如句尾无分号、空格位数不对……

```
"lint:fix": "eslint --fix --ext .js,.vue src" // 快速修复
```

这里建议本地运行项目时，也加入eslint校验。运行时保存代码后会直接运行eslint

```
"dev": "yarn lint:fix && yarn dev:mpa && vue-cli-service serve --open" // 具体根据项目自行调整
```

## 2.开启校验，忽略存量代码，仅校验新增交易

这里需要用到.eslintignore文件。此文件可对eslint进行忽略配置。（规则等同.gitignore）

```
node_modules
dist
public
```

上述是不需要校验的文件夹。

由于新增代码与老代码都在src下的views下，不能直接忽略src或者src/views。

把所有存量代码的文件目录配置忽略过于麻烦。后面研究了下可以先配置忽略所有，再配置需要校验的目录(可使用！)

```
/src/* 忽略src文件夹
!/src/views  但不忽略src下views文件夹
/src/views/*  忽略src下views文件夹
!/src/views/自己的文件夹名  但不忽略src/views下自己的文件夹
```

之所以这么写，是因为直接!/src/views/自己的文件夹名不生效。需要一层一层配置。

## 3.逐步修复存量代码

后面可结合实际开发，逐个文件夹配置不忽略，或者把忽略去除，项目整体一起修复
