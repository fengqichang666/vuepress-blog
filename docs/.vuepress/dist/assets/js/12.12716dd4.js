(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{284:function(e,o,t){"use strict";t.r(o);var n=t(14),r=Object(n.a)({},(function(){var e=this,o=e._self._c;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("ES6标准发布后，module成为标准，标准的使用是以export指令导出接口，以import引入模块，但是在我们一贯的node模块中，我们采用的是CommonJS规范，使用require引入模块，使用module.exports导出接口。\nrequire: node 和 es6 都支持的引入\nexport / import : 只有es6 支持的导出引入\nmodule.exports / exports: 只有 node 支持的导出\n")])])]),o("p",[e._v("#node模块")]),e._v(" "),o("blockquote",[o("p",[o("code",[e._v("Node")]),e._v("里面的模块系统遵循的是"),o("code",[e._v("CommonJS")]),e._v("规范。"),o("code",[e._v("requirejs")]),e._v("遵循"),o("code",[e._v("AMD")]),e._v("，"),o("code",[e._v("seajs")]),e._v("遵循"),o("code",[e._v("CMD")])]),e._v(" "),o("p",[o("code",[e._v("CommonJS")]),e._v("定义的模块分为: 模块标识("),o("code",[e._v("module")]),e._v(")、模块定义("),o("code",[e._v("exports")]),e._v(") 、模块引用("),o("code",[e._v("require")]),e._v(")")])]),e._v(" "),o("p",[e._v("在一个node执行一个文件时，会给这个文件内生成一个 "),o("code",[e._v("exports")]),e._v("和"),o("code",[e._v("module")]),e._v("对象，\n而"),o("code",[e._v("module")]),e._v("又有一个"),o("code",[e._v("exports")]),e._v("属性。都指向一块{}内存区域。")]),e._v(" "),o("blockquote",[o("div",{staticClass:"language-abnf extra-class"},[o("pre",{pre:!0,attrs:{class:"language-abnf"}},[o("code",[o("span",{pre:!0,attrs:{class:"token definition keyword"}},[e._v("exports")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token rule"}},[e._v("module")]),e._v("."),o("span",{pre:!0,attrs:{class:"token rule"}},[e._v("exports")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" {}"),o("span",{pre:!0,attrs:{class:"token comment"}},[e._v(";")]),e._v("\n")])])])]),e._v(" "),o("p",[e._v("其实"),o("code",[e._v("require")]),e._v("导出的内容是"),o("code",[e._v("module.exports")]),e._v("的指向的内存块内容，并不是"),o("code",[e._v("exports")]),e._v("的。")]),e._v(" "),o("p",[e._v("简而言之，区分他们之间的区别就是 "),o("code",[e._v("exports")]),e._v(" 只是 "),o("code",[e._v("module.exports")]),e._v("的引用，辅助后者添加内容用的。")]),e._v(" "),o("p",[e._v("CommonJS与requirejs  （使用一个define函数来提供模块的闭包，其他可以完全一致）")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("导出\n// a.js\n\n// -------- node -----------\nmodule.exports = {\n  a : function() {},\n  b : 'xxx'\n};\n\n// ----------- AMD or CMD ----------------\ndefine(function(require, exports, module){\n  module.exports = {\n    a : function() {},\n    b : 'xxx'\n  };\n});\n\n导入\n// b.js\n\n// ------------ node ---------\nvar m = require('./a');\nm.a();\n\n// ------------ AMD or CMD -------------\ndefine(function(require, exports, module){\n   var m = require('./a');\n   m.a();\n});\n")])])]),o("h1",{attrs:{id:"es中的模块导出导入"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#es中的模块导出导入"}},[e._v("#")]),e._v(" ES中的模块导出导入")]),e._v(" "),o("h3",{attrs:{id:"export-和-export-default"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#export-和-export-default"}},[e._v("#")]),e._v(" export 和 export default")]),e._v(" "),o("blockquote",[o("ol",[o("li",[e._v("export与export default均可用于导出常量、函数、文件、模块等")]),e._v(" "),o("li",[e._v("在一个文件或模块中，export、import可以有多个，export default仅有一个")]),e._v(" "),o("li",[e._v("通过export方式导出，在导入时要加{ }，export default则不需要")]),e._v(" "),o("li",[e._v("export能直接导出变量表达式，export default不行。")])])]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("//导出变量\nexport const a = '100';  \n //导出方法\nexport const dogSay = function(){ \n    console.log('wang wang');\n}\n//导出方法第二种\nfunction catSay(){\n   console.log('miao miao'); \n}\nexport { catSay };\n//export default导出\nexport default 123;\n或\nconst m = 100;\nexport default m; \n//export defult const m = 100;// 这里不能写这种格式。\n")])])]),o("h1",{attrs:{id:"common-js-和-es6-module-区别"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#common-js-和-es6-module-区别"}},[e._v("#")]),e._v(" "),o("code",[e._v("Common.js")]),e._v(" 和 "),o("code",[e._v("es6")]),e._v(" module 区别")]),e._v(" "),o("blockquote",[o("p",[o("code",[e._v("CommonJS")]),e._v(" 模块输出的是一个值的拷贝，"),o("code",[e._v("ES6")]),e._v(" 模块输出的是值的引用。")]),e._v(" "),o("p",[o("code",[e._v("CommonJS")]),e._v(" 模块是运行时加载，"),o("code",[e._v("ES6")]),e._v(" 模块是编译时输出接口。")]),e._v(" "),o("p",[o("code",[e._v("CommonJs")]),e._v(" 是单个值导出，"),o("code",[e._v("ES6")]),e._v(" Module可以导出多个")]),e._v(" "),o("p",[o("code",[e._v("CommonJs")]),e._v(" 是动态语法可以写在判断里，"),o("code",[e._v("ES6")]),e._v(" Module 静态语法只能写在顶层")]),e._v(" "),o("p",[o("code",[e._v("CommonJs")]),e._v(" 的 this 是当前模块，"),o("code",[e._v("ES6")]),e._v(" Module的 this 是 undefined")])]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v('CommonJS\n1、对于基本数据类型，属于复制。即会被模块缓存。同时，在另一个模块可以对该模块输出的变量重新赋值。\n2、对于复杂数据类型，属于浅拷贝。由于两个模块引用的对象指向同一个内存空间，因此对该模块的值做修改时会影响另一个模块。\n3、当使用require命令加载某个模块时，就会运行整个模块的代码。\n4、当使用require命令加载同一个模块时，不会再执行该模块，而是取到缓存之中的值。也就是说，CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。\n5、循环加载时，属于加载时执行。即脚本代码在require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。\nES6模块\n1、ES6模块中的值属于【动态只读引用】。\n2、对于只读来说，即不允许修改引入变量的值，import的变量是只读的，不论是基本数据类型还是复杂数据类型。当模块遇到import命令时，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。\n3、对于动态来说，原始值发生变化，import加载的值也会发生变化。不论是基本数据类型还是复杂数据类型。（各模块不相互影响）\n4、循环加载时，ES6模块是动态引用。只要两个模块之间存在某个引用，代码就能够执行。\n')])])])])}),[],!1,null,null,null);o.default=r.exports}}]);