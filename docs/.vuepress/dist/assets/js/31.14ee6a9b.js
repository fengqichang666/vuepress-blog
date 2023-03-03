(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{303:function(n,e,t){"use strict";t.r(e);var s=t(14),a=Object(s.a)({},(function(){var n=this,e=n._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[e("h2",{attrs:{id:"方法一、props-emit"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#方法一、props-emit"}},[n._v("#")]),n._v(" 方法一、"),e("code",[n._v("props")]),n._v("/"),e("code",[n._v("$emit")])]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("父传子\n父组件调用子组件\n <Son :ptos=\"ptos\"></Son>\n \n import Son from '@/views/Children.vue'\n components:{\n    Son\n  }\n 子组件接收\n props:{\n        ptos:{\n            type:String,\n            require:true\n        }\n    },\n 如果需要根据父组件传值实时刷新子组件\n data(){\n        return{\n            a:''\n        }\n    },\n created(){\n     this.a=this.ptos;\n },\n watch:{\n     ptos(newval,oldval){\n     \tthis.a=newval\n     }\n }\n子传父\n父组件\n <Son :ptos=\"ptos\" @zdysj='zdysj'></Son>\n \n zdysj(e){\n      console.log(e);//e代表'接收的子组件传的值'\n    }\n 子\n <el-button @click=\"stop\">{{a}}</el-button>\n \n stop(){\n   this.$emit('zdysj','子传父');\n }\n\n")])])]),e("h2",{attrs:{id:"方法二-事件总线-eventbus"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#方法二-事件总线-eventbus"}},[n._v("#")]),n._v(" 方法二 事件总线（EventBus）")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("1.使用js或者空vue实例组件\n新建一个 eventBus.js  \nimport Vue from 'vue'\nexport const EventBus = new Vue()\n新建一个 eventBus.vue\n<tempalte>\n</template>\n<script>\n    import Vue from 'vue';\n    export default new Vue({\n        data () {\n\n        }\n    })\n<\/script>\n父子组件引入\nimport {EventBus} from '@/eventBus.js'\n父\nmounted(){\n    EventBus.$on('zdysjed',({a})=>{\n      console.log(a);\n    })\n  },\n  \n子\nstop(){\n      EventBus.$emit('zdysjed',{a:'eventBus'});\n }\n")])])]),e("h2",{attrs:{id:"方法三、vuex与localstorage"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#方法三、vuex与localstorage"}},[n._v("#")]),n._v(" 方法三、vuex与localStorage")]),n._v(" "),e("h2",{attrs:{id:"方法四、-attrs-listeners"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#方法四、-attrs-listeners"}},[n._v("#")]),n._v(" 方法四、"),e("code",[n._v("$attrs")]),n._v("/"),e("code",[n._v("$listeners")])]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v('多级组件嵌套需要传递数据时，通常使用的方法是通过vuex。但如果仅仅是传递数据，而不做中间处理，使用 vuex 处理，未免有点大材小用。\n$attrs  可以通过 v-bind="$attrs" 传入内部组件\n接收除了props声明外的所有绑定属性（class、style除外）\n    <Son a=\'a\' b=\'b\'></Son> \n    <SonSon v-bind="$attrs"></SonSon>\n    子组件通过this.$attrs直接获取\n$listeners  可以通过 v-on="$listeners" 传入内部组件\n接收除了带有.native事件修饰符的所有事件监听器\n可以使用 $emit触发 parent.vue 的函数。\n$emit("事件名")\n\n')])])]),e("h2",{attrs:{id:"方法五、provide-inject"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#方法五、provide-inject"}},[n._v("#")]),n._v(" 方法五、provide/inject")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("data\nprovide\ncreated  // 在这个阶段$el还未生成，在这先处理privide的逻辑，子孙组件才可以取到inject的值\nmounted\n父组件\n provide(){\n    return{\n      provide:this.datas\n    }\n  }\n后代组件获取 不仅限与子组件\n  inject:[\"datas\"]\ncosole.log(this.datas)\n\n\n使用2.6最新API Vue.observable 优化响应式 provide\nimport Vue from 'vue'\n  provide() {\n    this.theme = Vue.observable({\n      color: \"blue\"\n    });\n    return {\n      theme: this.theme\n    };\n  }\n  \n  inject: {\n    theme: {\n      //函数式组件取值不一样\n      default: () => ({})\n    }\n  }\n//响应式方案\n1.传递的值变成 this--\x3e 整个实例\n provide: {\n    app: this// 传递整个this过去\n  }\n  子组件\n inject: ['app'], // this.app 下面都是响应式的,因为都是同一实例下的引用\n \n 2.使用computed\n  provide(){\n        return{\n            tableLen:() => this.tableData.length\n        }\n    }\n   子组件\n computed:{\n      tableLength(){\n          return this.tableLen();\n      },\n  },\n")])])]),e("h2",{attrs:{id:"方法六、-parent-children与-ref"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#方法六、-parent-children与-ref"}},[n._v("#")]),n._v(" 方法六、"),e("code",[n._v("$parent")]),n._v(" / "),e("code",[n._v("$children")]),n._v("与 "),e("code",[n._v("ref")])]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v(' <Son ref="sonRef"></Son> \n 使用this.$refs.sonRef能更快的获取操作子组件属性值或函数\n $refs不能在created生命周期中使用 因为在组件创建时候 该ref还没有绑定元素\n \n $children获取某个子组件的属性值或函数\n 可以使用$children[i].paramsName 来获取某个子组件的属性值或函数，$children返回的是一个子组件数组\n \n $parent获取修改父组件的数据内容\n this.$parent.datas\n \n')])])]),e("h2",{attrs:{id:"总结"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[n._v("#")]),n._v(" 总结")]),n._v(" "),e("p",[n._v("常见使用场景可以分为三类：")]),n._v(" "),e("ul",[e("li",[n._v("父子通信：")])]),n._v(" "),e("p",[n._v("父向子传递数据是通过 props，子向父是通过 events（"),e("code",[n._v("$emit")]),n._v("）；通过父链 / 子链也可以通信（"),e("code",[n._v("$parent")]),n._v(" / "),e("code",[n._v("$children")]),n._v("）；ref 也可以访问组件实例；provide / inject API；"),e("code",[n._v("$attrs/$listeners")])]),n._v(" "),e("ul",[e("li",[n._v("兄弟通信：")])]),n._v(" "),e("p",[n._v("Bus；Vuex")]),n._v(" "),e("ul",[e("li",[n._v("跨级通信：")])]),n._v(" "),e("p",[n._v("Bus；Vuex；provide / inject API、"),e("code",[n._v("$attrs/$listeners")])])])}),[],!1,null,null,null);e.default=a.exports}}]);