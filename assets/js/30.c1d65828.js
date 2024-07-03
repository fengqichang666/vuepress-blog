(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{306:function(e,n,t){"use strict";t.r(n);var a=t(10),l=Object(a.a)({},(function(){var e=this,n=e._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h3",{attrs:{id:"vue-style-scoped-子组件的根节点依然受其父组件的css-的影响"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#vue-style-scoped-子组件的根节点依然受其父组件的css-的影响"}},[e._v("#")]),e._v(" "),n("code",[e._v("vue style scoped")]),e._v("，子组件的根节点依然受其父组件的CSS 的影响")]),e._v(" "),n("p",[e._v("子组件根节点样式会受到父组件样式影响，这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。")]),e._v(" "),n("h3",{attrs:{id:"监听数组内对象某属性改变"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#监听数组内对象某属性改变"}},[e._v("#")]),e._v(" 监听数组内对象某属性改变")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("1.\ncomputed:{\n\twatchInputData(){ return this.listMenu[4].value }//下标可以是变量\n},\nwatch:{\n      watchInputData(newval,oldval) {\n        //这里即可监听到\n      }\n  }\n2.\ncreated(){\n\tthis.$watch(()=>this.listMenu[4].value,function(newval,oldval){\n\t\n\t})\n}\n3.watch:{\n\tlistMenu:{\n\t \thandler(newval ,oldval) {\n        \t这里newval  oldval是整个数组，需要遍历进行对其中某项的操作\n    \t },\n    \t deep:true\n\t}\n}\n\n")])])]),n("h3",{attrs:{id:"vue输入框防抖"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#vue输入框防抖"}},[e._v("#")]),e._v(" vue输入框防抖")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("// 1.设置v-throttle自定义指令\nVue.directive('throttle', {\n  bind: (el, binding) => {\n    let throttleTime = binding.value; // 防抖时间\n    if (!throttleTime) { // 用户若不设置防抖时间，则默认2s\n      throttleTime = 2000;\n    }\n    let cbFun;\n    el.addEventListener('click', event => {\n      if (!cbFun) { // 第一次执行\n        cbFun = setTimeout(() => {\n          cbFun = null;\n        }, throttleTime);\n      } else {\n        event && event.stopImmediatePropagation();\n      }\n    }, true);\n  },\n});\n// 2.为button标签设置v-throttle自定义指令\n<button @click=\"sayHello\" v-throttle>提交</button>\n")])])]),n("h3",{attrs:{id:"图片懒加载"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#图片懒加载"}},[e._v("#")]),e._v(" 图片懒加载")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("const LazyLoad = {\n    // install方法\n    install(Vue,options){\n       // 代替图片的loading图\n        let defaultSrc = options.default;\n        Vue.directive('lazy',{\n            bind(el,binding){\n                LazyLoad.init(el,binding.value,defaultSrc);\n            },\n            inserted(el){\n                // 兼容处理\n                if('IntersectionObserver' in window){\n                    LazyLoad.observe(el);\n                }else{\n                    LazyLoad.listenerScroll(el);\n                }\n                \n            },\n        })\n    },\n    // 初始化\n    init(el,val,def){\n        // data-src 储存真实src\n        el.setAttribute('data-src',val);\n        // 设置src为loading图\n        el.setAttribute('src',def);\n    },\n    // 利用IntersectionObserver监听el\n    observe(el){\n        let io = new IntersectionObserver(entries => {\n            let realSrc = el.dataset.src;\n            if(entries[0].isIntersecting){\n                if(realSrc){\n                    el.src = realSrc;\n                    el.removeAttribute('data-src');\n                }\n            }\n        });\n        io.observe(el);\n    },\n    // 监听scroll事件\n    listenerScroll(el){\n        let handler = LazyLoad.throttle(LazyLoad.load,300);\n        LazyLoad.load(el);\n        window.addEventListener('scroll',() => {\n            handler(el);\n        });\n    },\n    // 加载真实图片\n    load(el){\n        let windowHeight = document.documentElement.clientHeight\n        let elTop = el.getBoundingClientRect().top;\n        let elBtm = el.getBoundingClientRect().bottom;\n        let realSrc = el.dataset.src;\n        if(elTop - windowHeight<0&&elBtm > 0){\n            if(realSrc){\n                el.src = realSrc;\n                el.removeAttribute('data-src');\n            }\n        }\n    },\n    // 节流\n    throttle(fn,delay){\n        let timer; \n        let prevTime;\n        return function(...args){\n            let currTime = Date.now();\n            let context = this;\n            if(!prevTime) prevTime = currTime;\n            clearTimeout(timer);\n            \n            if(currTime - prevTime > delay){\n                prevTime = currTime;\n                fn.apply(context,args);\n                clearTimeout(timer);\n                return;\n            }\n\n            timer = setTimeout(function(){\n                prevTime = Date.now();\n                timer = null;\n                fn.apply(context,args);\n            },delay);\n        }\n    }\n\n}\nexport default LazyLoad;\n")])])]),n("h3",{attrs:{id:"一键-copy的功能"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#一键-copy的功能"}},[e._v("#")]),e._v(" 一键 Copy的功能")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("import { Message } from 'ant-design-vue';\n\nconst vCopy = { //\n  /*\n    bind 钩子函数，第一次绑定时调用，可以在这里做初始化设置\n    el: 作用的 dom 对象\n    value: 传给指令的值，也就是我们要 copy 的值\n  */\n  bind(el, { value }) {\n    el.$value = value; // 用一个全局属性来存传进来的值，因为这个值在别的钩子函数里还会用到\n    el.handler = () => {\n      if (!el.$value) {\n      // 值为空的时候，给出提示，我这里的提示是用的 ant-design-vue 的提示，你们随意\n        Message.warning('无复制内容');\n        return;\n      }\n      // 动态创建 textarea 标签\n      const textarea = document.createElement('textarea');\n      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域\n      textarea.readOnly = 'readonly';\n      textarea.style.position = 'absolute';\n      textarea.style.left = '-9999px';\n      // 将要 copy 的值赋给 textarea 标签的 value 属性\n      textarea.value = el.$value;\n      // 将 textarea 插入到 body 中\n      document.body.appendChild(textarea);\n      // 选中值并复制\n      textarea.select();\n      // textarea.setSelectionRange(0, textarea.value.length);\n      const result = document.execCommand('Copy');\n      if (result) {\n        Message.success('复制成功');\n      }\n      document.body.removeChild(textarea);\n    };\n    // 绑定点击事件，就是所谓的一键 copy 啦\n    el.addEventListener('click', el.handler);\n  },\n  // 当传进来的值更新的时候触发\n  componentUpdated(el, { value }) {\n    el.$value = value;\n  },\n  // 指令与元素解绑的时候，移除事件绑定\n  unbind(el) {\n    el.removeEventListener('click', el.handler);\n  },\n};\n\nexport default vCopy;\n")])])])])}),[],!1,null,null,null);n.default=l.exports}}]);