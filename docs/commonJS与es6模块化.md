---
title: exports、module.exports和export、export default
date: 2021-10-25 13:41:29
tags:
---

```
ES6标准发布后，module成为标准，标准的使用是以export指令导出接口，以import引入模块，但是在我们一贯的node模块中，我们采用的是CommonJS规范，使用require引入模块，使用module.exports导出接口。
require: node 和 es6 都支持的引入
export / import : 只有es6 支持的导出引入
module.exports / exports: 只有 node 支持的导出
```

#node模块

> `Node`里面的模块系统遵循的是`CommonJS`规范。`requirejs`遵循`AMD`，`seajs`遵循`CMD`
>
> `CommonJS`定义的模块分为: 模块标识(`module`)、模块定义(`exports`) 、模块引用(`require`)

在一个node执行一个文件时，会给这个文件内生成一个 `exports`和`module`对象，
而`module`又有一个`exports`属性。都指向一块{}内存区域。

> ```abnf
> exports = module.exports = {};
> ```

其实`require`导出的内容是`module.exports`的指向的内存块内容，并不是`exports`的。

简而言之，区分他们之间的区别就是 `exports` 只是 `module.exports`的引用，辅助后者添加内容用的。

CommonJS与requirejs  （使用一个define函数来提供模块的闭包，其他可以完全一致）

```
导出
// a.js

// -------- node -----------
module.exports = {
  a : function() {},
  b : 'xxx'
};

// ----------- AMD or CMD ----------------
define(function(require, exports, module){
  module.exports = {
    a : function() {},
    b : 'xxx'
  };
});

导入
// b.js

// ------------ node ---------
var m = require('./a');
m.a();

// ------------ AMD or CMD -------------
define(function(require, exports, module){
   var m = require('./a');
   m.a();
});
```



# ES中的模块导出导入

### export 和 export default

> 1. export与export default均可用于导出常量、函数、文件、模块等
> 2. 在一个文件或模块中，export、import可以有多个，export default仅有一个
> 3. 通过export方式导出，在导入时要加{ }，export default则不需要
> 4. export能直接导出变量表达式，export default不行。

```
//导出变量
export const a = '100';  
 //导出方法
export const dogSay = function(){ 
    console.log('wang wang');
}
//导出方法第二种
function catSay(){
   console.log('miao miao'); 
}
export { catSay };
//export default导出
export default 123;
或
const m = 100;
export default m; 
//export defult const m = 100;// 这里不能写这种格式。
```

# ` Common.js` 和 `es6` module 区别

> `CommonJS` 模块输出的是一个值的拷贝，`ES6` 模块输出的是值的引用。
>
> `CommonJS` 模块是运行时加载，`ES6` 模块是编译时输出接口。
>
> `CommonJs` 是单个值导出，`ES6` Module可以导出多个
>
> `CommonJs` 是动态语法可以写在判断里，`ES6` Module 静态语法只能写在顶层
>
> `CommonJs` 的 this 是当前模块，`ES6` Module的 this 是 undefined

```
CommonJS
1、对于基本数据类型，属于复制。即会被模块缓存。同时，在另一个模块可以对该模块输出的变量重新赋值。
2、对于复杂数据类型，属于浅拷贝。由于两个模块引用的对象指向同一个内存空间，因此对该模块的值做修改时会影响另一个模块。
3、当使用require命令加载某个模块时，就会运行整个模块的代码。
4、当使用require命令加载同一个模块时，不会再执行该模块，而是取到缓存之中的值。也就是说，CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。
5、循环加载时，属于加载时执行。即脚本代码在require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。
ES6模块
1、ES6模块中的值属于【动态只读引用】。
2、对于只读来说，即不允许修改引入变量的值，import的变量是只读的，不论是基本数据类型还是复杂数据类型。当模块遇到import命令时，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
3、对于动态来说，原始值发生变化，import加载的值也会发生变化。不论是基本数据类型还是复杂数据类型。（各模块不相互影响）
4、循环加载时，ES6模块是动态引用。只要两个模块之间存在某个引用，代码就能够执行。
```

