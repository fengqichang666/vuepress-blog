(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{295:function(t,a,s){"use strict";s.r(a);var e=s(14),n=Object(e.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"vuex的核心概念"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vuex的核心概念"}},[t._v("#")]),t._v(" "),a("code",[t._v("Vuex")]),t._v("的核心概念")]),t._v(" "),a("h3",{attrs:{id:"state"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#state"}},[t._v("#")]),t._v(" State")]),t._v(" "),a("p",[t._v("是"),a("code",[t._v("Vuex")]),t._v("用来存储数据的地方，存储在state中数据可以看做是当前应用的全局变量可以在当前应用的任何地方访问。")]),t._v(" "),a("blockquote",[a("p",[t._v("1.是"),a("code",[t._v("Vuex")]),t._v("用来存储数据的地方，存储在state中数据可以看做是当前应用的全局变量可以在当前应用的任何地方访问。")]),t._v(" "),a("p",[t._v("2.在开发中我们推荐将store中的state赋值给需要使用该状态的组件的计算属性中(一定不能把state赋值给data,state发生改变时不会重新给data赋值)")]),t._v(" "),a("p",[t._v("3."),a("code",[t._v("Vuex")]),t._v(" 为了简化 state与计算属性配合使用时的代码,提供了一个辅助函数"),a("code",[t._v("mapState")]),t._v(" 可以简化上面的写法")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// 首先引入辅助函数mapState\nimport {mapState} from 'vuex'\n /*\n computed: {\n \tbook() {\n    \t\treturn this.$store.state.book;\n    \t},\n }*/\n    \n    // 下面的写法等价于上面的写法\ncomputed: {\n      ...mapState(['book'])\n   }\n\n")])])])]),t._v(" "),a("h3",{attrs:{id:"getters"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#getters"}},[t._v("#")]),t._v(" Getters")]),t._v(" "),a("p",[t._v("getter就是"),a("code",[t._v("Vuex")]),t._v("的计算属性，开发人员可以将state 或其他getter 计算后的的返回值存放在指定getter中,当前getter会将这些依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。可以认为是 store 的计算属性")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("state: {\n    todos: [\n      { id: 1, text: '...', done: true },\n      { id: 2, text: '...', done: false }\n    ]\n  },\n // Getter 接受 state 作为其第一个参数\n  getters: {\n    doneTodos: state => {\n      return state.todos.filter(todo => todo.done)\n    }\n  }\n  //Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值：\n  store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]\n  //Getter 也可以接受其他 getter 作为第二个参数：\n  getters: {\n      // ...\n      doneTodosCount: (state, getters) => {\n        return getters.doneTodos.length\n      }\n    }\n  \n")])])]),a("p",[t._v("在任何组件中都可以通过"),a("code",[t._v("this.$store.getter.")]),t._v("属性名访问")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("getter在组件中依然存放在组建的计算属性中")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("computed: {\n        score() {\n          return this.$store.getters.calcScore;\n        }\n    }\n")])])])]),t._v(" "),a("li",[a("p",[a("code",[t._v("Vuex")]),t._v("为 getters 同样提供了辅助函数 "),a("code",[t._v("mapGetters")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("方法一: mapState可以接收一个字符串数组作为参数,数组中的每一项字符串都会成为当前组件的计算属性并且与Vuex中的同名getter建立映射对应关系。\n computed: {\n \t...mapGetters([\"calcScore\"])\n }\n方法二: mapGetters可以接收对象作为参数,对象的每一个key都会成为当前组件的计算属性名,value必须是一个字符串并且与Vuex中的同名getter建立映射对应关系。\ncomputed: {\n\t...mapGetters({\n\t\ts1: 'calcScore'\n\t})\n}\n")])])])])]),t._v(" "),a("h3",{attrs:{id:"mutations"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mutations"}},[t._v("#")]),t._v(" Mutations")]),t._v(" "),a("p",[a("code",[t._v("vuex")]),t._v("规定mutation是唯一可以修改state的地方")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("  mutations: { // 修改state的方法\n    // 同步操作 直接修改\n    changeBook(state, book) {\n      state.book = book;\n    },\n}\n")])])]),a("p",[t._v("在组件中必须使用"),a("code",[t._v("$store.commit")]),t._v("方法提交指定mutation,指定mutation才会触发")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('methods: {\n        // 执行该方法会将state中的book变成JavaScript,而不是最开始的HTML+CSS\n        changeBookByCommit() {\n            // 触发mutation必须使用$store所提供的commit方法提交一次mutation\n            // commit 方法接收两个参数 参数一 需要触发mutation的函数名 参数二 载荷(传参/提交给mutation的参数)\n            //注意: commit只能接受两个参数,如果你想要的传递多个参数时,请将载荷作为对象提交\n            this.$store.commit("changeBook", "JavaScript");\n        }\n    }\n\n')])])]),a("blockquote",[a("p",[t._v("注意: Mutation 需遵守 Vue 的响应规则 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：")]),t._v(" "),a("p",[t._v("1、最好提前在你的 store 中初始化好所有所需state属性。")]),t._v(" "),a("p",[t._v("2、当需要在对象上添加新属性时，你应该使用 Vue.set(obj, 'newProp', 123), 或者以新对象替换老对象")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v(" mutations: {\n        addCount(state) {\n            state.count ++\n        },\n        setArr(state) {\n            // vuex 依然遵循响应式原则,在vue的响应式原则中,通过下标修改添加数组的其中一项是不会引起页面更新\n            // state.arr[0] = 'A'\n            // vuex没有this,所以只能先 import Vue,在使用Vue.set方法修改数组\n            Vue.set(state.arr, 0 , 'A')\n            // 以新对象替换老对象方法引起引用数据类型响应变化\n            state.arr = state.arr.map((item,index) => {\n                if(index === 0) {\n                    return 'AA'\n                }\n                return item\n            })\n\n        },\n        setObj(state) {\n            // state.obj.address = 'hz'  // Error 直接给对象通过key添加属性也不会引起页面更新\n            Vue.set(state.obj,'address', 'gz' )\n            \n             state.obj = {\n                ...state.obj,\n                address: '广州'\n            }\n        }\n    }\n\n")])])]),a("blockquote",[a("p",[t._v("注意1: Mutation 内部只允许同步操作,原因在vuex中mutation是唯一可以修改state的地方,所以开发中我们有时会对mutation进行数据追踪观察state是否按照预期发生改变,这样做的化就可以在开发中捕获大量的错误,如果mutation允许异步操作的话,就会导致我们的数据追踪变得混乱不可查阅。")]),t._v(" "),a("p",[t._v("2:因为每次提交mutation都是传入commit函数一个同名mutation字符串，这样的操作有时会导致提交字符串与mutation名不一致导致指定mutation没有被提交，这个问题尤其会出现在多人开发中。为了避免该问题vuex推荐专门创建一个名为 mutation-types.js 文件存储当前应用中所有的mutation名,开发人员就可以使用变量的方式声明提交指定的mutation了")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("export const ADD_CURRENT_COUNT = 'ADD_CURRENT_COUNT'\n\nexport const SET_ARR = 'SET_ARR'\n\nexport const SET_OBJ = 'SET_OBJ'\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// store中的mutation全部使用 mutation-types声明好的常量作为函数名\nimport Vue from 'vue'\nimport Vuex from 'vuex'\nimport * as types from './mutation-types'\n\nVue.use(Vuex)\n\nexport default new Vuex.Store({\n    mutations: {\n        // ES6 动态键名 将mutation-types中 声明好的常量作为当前mutation的函数名\n        [types.ADD_CURRENT_COUNT](state, num) {\n               // some code...\n        },\n        [types.SET_ARR](state, {index, value}) {\n              // some code...\n        },\n        [types.SET_OBJ](state) {\n            // some code...\n        }\n    }\n})\n\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// 组件调用这些mutation时 直接通过引入对应的mutation-types常量\n<script>\nimport {ADD_CURRENT_COUNT, SET_ARR, SET_OBJ} from '../store/mutation-types'\n\nexport default {\n    methods: {\n        setStateCount() {\n            this.$store.commit(ADD_CURRENT_COUNT, 7)\n        },\n        setStateArr() {\n            this.$store.commit(SET_ARR)\n        },\n        setStateObj() {\n            this.$store.commit(SET_OBJ)\n        }\n    }\n}\n<\/script>\n\n")])])]),a("p",[t._v("Vuex为 mutations 同样提供了辅助函数 "),a("code",[t._v("mapMutations")])]),t._v(" "),a("p",[t._v("方法一: mapMutations可以接收一个字符串数组作为参数,数组中的每一项字符串都会成为当前组件的方法并且与Vuex中的同名mutation建立映射对应关系。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("import {mapMutations} from 'vuex'\nimport {ADD_CURRENT_COUNT, SET_ARR} from '../store/mutation-types'\n\nexport default {\n    computed: {\n        ...mapMutations([ ADD_CURRENT_COUNT, SET_ARR ]),\n    }\n}\n")])])]),a("p",[t._v("方法二:mapMutations可以接收对象作为参数,对象的每一个key都会成为当前组件的方法名,"),a("code",[t._v("value必须是mutation的同名字符串")]),t._v("与Vuex中的mutation建立映射对应关系。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v(" computed: {\n        ...mapMutations({ \n         addCount: ADD_CURRENT_COUNT, \n         setArr: SET_ARR }),\n    }\n")])])]),a("h3",{attrs:{id:"actions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#actions"}},[t._v("#")]),t._v(" Actions")]),t._v(" "),a("p",[t._v("Vuex给开发人员提供了一个可以执行异步操作的函数action")]),t._v(" "),a("p",[t._v("Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象")]),t._v(" "),a("blockquote",[a("p",[t._v("注意: action函数中接收两个参数")]),t._v(" "),a("p",[t._v("参数一 context 与 store对象相似所以可以访问 context.state / context.getters / context.commit / context.dispatch")]),t._v(" "),a("p",[t._v("参数二 action的载荷,action载荷与mutation一样只有一个如果需要传递多个参数请传递对象")]),t._v(" "),a("p",[t._v("★★★ action是不允许直接修改state的")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("\tstate: {\n        result: {}\n    },\n    mutations: {\n        [types.SET_RESULT](state, result) {\n            // 修改state\n            state.result = result\n        }\n    },\n    actions: {\n        searchMusic(context, keywords) {\n            console.log(context)\n            fetch('http://musicapi.leanapp.cn/search?keywords=' + keywords)\n            .then(res => res.json())\n            // 只有mutation才能修改state,所以action异步请求数据后,只能通过提交mutation修改state\n            .then(({result}) => context.commit(types.SET_RESULT, result))\n        }\n    }\n\n")])])]),a("h4",{attrs:{id:"在组件中分发-action"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#在组件中分发-action"}},[t._v("#")]),t._v(" 在组件中分发 Action")]),t._v(" "),a("p",[t._v("直接使用"),a("code",[t._v("this.$store.dispatch")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("created() {\n      this.$store.dispatch('increment')\n  }\n")])])]),a("p",[a("code",[t._v("Vuex")]),t._v("为 action 同样提供了辅助函数 "),a("code",[t._v("mapActions")]),t._v(","),a("code",[t._v("mapActions")]),t._v("生成的方法只接受一个参数,这个参数就是当前action的载荷")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("created")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//   this.$store.dispatch('increment')")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("increment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("computed")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mapActions")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'increment'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`")]),t._v("\n\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// `mapActions` 也支持载荷：")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'incrementBy'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', \t\tamount)`")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mapActions")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("add")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'increment'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 将 `this.add()` 映射为 `this.$store.dispatch('increment')`")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("Actions 支持同样的载荷方式和对象方式进行分发：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// 以载荷形式分发\nstore.dispatch('incrementAsync', {\n  amount: 10\n})\n\n// 以对象形式分发\nstore.dispatch({\n  type: 'incrementAsync',\n  amount: 10\n})\n")])])]),a("h3",{attrs:{id:"modules"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#modules"}},[t._v("#")]),t._v(" Modules")]),t._v(" "),a("p",[t._v("由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。")]),t._v(" "),a("p",[t._v("为了解决以上问题，Vuex 允许我们将 store 分割成"),a("strong",[t._v("模块（module）")]),t._v("。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("state: {\n    name: 'root'\n  },\n  mutations: {\n  },\n  actions: {\n  },\n  modules: {\n    commend: {\n        state: {\n            name: '小明',\n            age: 18\n        },\n        getters: {\n            //some getters\n        },\n        mutation: {\n            // some mutations\n        },\n        actions: {\n            // some action\n        },\n        modules: {\n            // some modules\n        }\n    } \n  }\n")])])]),a("blockquote",[a("p",[t._v("虽然在我们在实例化vuex.Store时创建了不同的模块,但是最终生成的store对象所有数据(包含子模块的数据)依然存储在同一个state getters mutations actions中。")])]),t._v(" "),a("p",[t._v("对于模块内部的 mutation 和 getter，接收的第一个参数是"),a("strong",[t._v("模块的局部状态对象")]),t._v("。")]),t._v(" "),a("p",[t._v("同样，对于模块内部的 action，局部状态通过 "),a("code",[t._v("context.state")]),t._v(" 暴露出来，根节点状态则为 "),a("code",[t._v("context.rootState")]),t._v("：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("const moduleA = {\n  actions: {\n    incrementIfOddOnRootSum ({ state, commit, rootState }) {\n      if ((state.count + rootState.count) % 2 === 1) {\n        commit('increment')\n      }\n    }\n  }\n}\n")])])]),a("p",[t._v("对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("const moduleA = {\n  // ...\n  getters: {\n    sumWithRootCount (state, getters, rootState) {\n      return state.count + rootState.count\n    }\n  }\n}\n")])])]),a("h4",{attrs:{id:"命名空间"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#命名空间"}},[t._v("#")]),t._v(" 命名空间")]),t._v(" "),a("p",[t._v("默认情况下，模块内部的 action、mutation 和 getter 是注册在"),a("strong",[t._v("全局命名空间")]),t._v("的——这样使得多个模块能够对同一 mutation 或 action 作出响应。")]),t._v(" "),a("p",[t._v("如果希望你的模块具有更高的封装度和复用性，你可以通过添加 "),a("code",[t._v("namespaced: true")]),t._v(" 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。例如：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("const store = new Vuex.Store({\n  modules: {\n    account: {\n      namespaced: true,\n\n      // 模块内容（module assets）\n      state: () => ({ ... }), // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响\n      getters: {\n        isAdmin () { ... } // -> getters['account/isAdmin']\n      },\n      actions: {\n        login () { ... } // -> dispatch('account/login')\n      },\n      mutations: {\n        login () { ... } // -> commit('account/login')\n      },\n\n      // 嵌套模块\n      modules: {\n        // 继承父模块的命名空间\n        myPage: {\n          state: () => ({ ... }),\n          getters: {\n            profile () { ... } // -> getters['account/profile']\n          }\n        },\n\n        // 进一步嵌套命名空间\n        posts: {\n          namespaced: true,\n\n          state: () => ({ ... }),\n          getters: {\n            popular () { ... } // -> getters['account/posts/popular']\n          }\n        }\n      }\n    }\n  }\n})\n")])])]),a("p",[t._v("启用了命名空间的 getter 和 action 会收到局部化的 "),a("code",[t._v("getter")]),t._v("，"),a("code",[t._v("dispatch")]),t._v(" 和 "),a("code",[t._v("commit")]),t._v("。")]),t._v(" "),a("p",[t._v("在使用模块内容时不需要在同一模块内额外添加空间名前缀。更改 "),a("code",[t._v("namespaced")]),t._v(" 属性后不需要修改模块内的代码。")]),t._v(" "),a("h4",{attrs:{id:"module-state"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#module-state"}},[t._v("#")]),t._v(" module state")]),t._v(" "),a("p",[t._v("存放在module中的state,是否开启命名空间使用方式都是一样的。都是通过"),a("code",[t._v("store.state.")]),t._v("模块名"),a("code",[t._v(".state属性名")])]),t._v(" "),a("p",[t._v("辅助函数mapState获取指定模块的属性,必须使用 "),a("code",[t._v('"属性名:函数的形式"')])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v(" ...mapState({\n      commendName: state => state.commend.name, // $store.state.commend.name  => '小王'\n      a1Name: ({a1}) => a1.name // $store.state.a1.name  => '老李头'\n    })\n")])])]),a("p",[t._v("当使用 "),a("code",[t._v("mapState")]),t._v(", "),a("code",[t._v("mapGetters")]),t._v(", "),a("code",[t._v("mapActions")]),t._v(" 和 "),a("code",[t._v("mapMutations")]),t._v(" 这些函数来绑定带命名空间的模块时，写起来可能比较繁琐：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("computed")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mapState")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("a")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("state")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("some"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("nested"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("b")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("state")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("some"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("nested"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("b\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("methods")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mapActions")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'some/nested/module/foo'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// -> this['some/nested/module/foo']()")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'some/nested/module/bar'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// -> this['some/nested/module/bar']()")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("对于这种情况，你可以将模块的空间名称字符串作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文。于是上面的例子可以简化为：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("computed")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mapState")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'some/nested/module'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("a")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("state")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("b")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("state")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("b\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("computed")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mapActions")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'some/nested/module'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'foo'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// -> this.foo()")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bar'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// -> this.bar()")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("而且，你可以通过使用 "),a("code",[t._v("createNamespacedHelpers")]),t._v(" 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" createNamespacedHelpers "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'vuex'")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" mapState"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" mapActions "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createNamespacedHelpers")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'some/nested/module'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("computed")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 在 `some/nested/module` 中查找")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mapState")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("a")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("state")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("b")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("state")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("b\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("methods")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 在 `some/nested/module` 中查找")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mapActions")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'foo'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bar'")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h4",{attrs:{id:"module-getters"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#module-getters"}},[t._v("#")]),t._v(" module getters")]),t._v(" "),a("p",[t._v("所有module中的getter是直接存储在store.getters中的,依然通过"),a("code",[t._v("store.getters.属性名访问")])]),t._v(" "),a("p",[t._v("当开启了命名空间后module,getters 获取方式发生改变")]),t._v(" "),a("p",[t._v("变为 --\x3e"),a("code",[t._v("store.getters['模块名/getter属性名']")])]),t._v(" "),a("p",[t._v("所以开启命名空间的getter可以与其他模块根store中的getter同名")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("store.getters.reverseName  根store的getter\nstore.getters['a1/reverseName']    a1模块的getter\n")])])]),a("p",[t._v("辅助函数mapGetter 获取module的getter方法没有变化的")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("模块中getters函数包含四个参数\n参数一 state -------- 当前模块的state\n参数二 getters -------- 当前模块的getters(如果当前模块没有开启命名空间 该参数的值等于参数四)\n参数三 rootState -------- 根state store的state\n参数四 rootGetter -------- 根getters store的getters\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("computed: {\n    ...mapGetters(['reverseName']),\n    ...mapGetters({a1ReverseName: 'a1/reverseName'})\n  }\n")])])]),a("h4",{attrs:{id:"module-mutation-和-action"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#module-mutation-和-action"}},[t._v("#")]),t._v(" module mutation 和 action")]),t._v(" "),a("p",[t._v("所有mutation和action也是直接存储在store中的,依然通过"),a("code",[t._v("store.dispatch('mutation名') store.dispatch('action名')")]),t._v("触发的")]),t._v(" "),a("blockquote",[a("p",[t._v("在开发中如果你的模块如果没有开启命名空间，mutation与action 在模块与模块之间 或模块与根store之间存在同名mutation / action 是不会造成命名冲突不会报错的，但是如果commit / dispatch 这些同名 mutation / action时他们将都会执行。")])]),t._v(" "),a("p",[t._v("当开启了命名空间后module,mutation与action方法名会发生改变")]),t._v(" "),a("p",[t._v("变为 --\x3e "),a("code",[t._v("'模块名/mutation名' '模块名/action名'")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// $store.commit('myMutation')  => '根mutation的 myMutation方法被触发了'\n// $store.commit('a1/myMutation')  => '模块 a1 mutation 的 myMutation方法被触发了'\n\n// $store.dispatch('myAction') => '根action的 myAction方法被触发了'\n// $store.dispatch('a1/myAction') => '模块 a1 action的 myAction方法被触发了'\n\n")])])]),a("blockquote",[a("p",[t._v("模块中mutation\\action函数无论是否开启具名空间依然只包含两个参数")]),t._v(" "),a("p",[t._v("参数一: 当前模块的局部state")]),t._v(" "),a("p",[t._v("参数二: 载荷")])]),t._v(" "),a("p",[a("code",[t._v("命名空间开启的模块")]),t._v("action内部 "),a("code",[t._v("context")]),t._v(".commit 提交mutation时dispatch分发action时"),a("code",[t._v("会自动添加命名空间前缀")]),t._v(",从而实现"),a("code",[t._v("只提交当前模块mutation/action")]),t._v("的效果")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("如果你想要在开启命名空间模块的`action`中使用`context提交/分发全局mutation/action`请在`commit dispatch`方法传入`第三个参数{root:true}`代表调用全局\ndispatch('someOtherAction', null, { root: true }) \n\ncommit('someMutation', null, { root: true }\n")])])]),a("h3",{attrs:{id:"store-commit和store-dispatch的区别及用法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#store-commit和store-dispatch的区别及用法"}},[t._v("#")]),t._v(" store.commit和store.dispatch的区别及用法")]),t._v(" "),a("p",[t._v("mutations 和 actions 都要在组件的methods中使用 ，而state和getters都是在组件中的computed中使用")]),t._v(" "),a("p",[t._v("dispatch是在actions中使用的，action是不允许直接修改state的，所以我们要在actions中定义提交mutations的方法")]),t._v(" "),a("blockquote",[a("p",[t._v("1、commit: 用来提交当前模块的mutations")]),t._v(" "),a("p",[t._v("​\tdispatch: 用来提交当前模块的actions(actions可以提交mutations,可以进行异步操作)")]),t._v(" "),a("p",[t._v("​\tcommit 有些做不到的可以用 dispatch 进行提交")]),t._v(" "),a("p",[t._v("2、mutations修改state, action提交mutations。但是如果修改完还想做其他事情就用actions比较方便(then后执行想要做的事情) ==> this.$store.dispatch().then()")]),t._v(" "),a("p",[t._v("3、commit: 同步操作 存储 this.$store.commit('changeValue',name)")]),t._v(" "),a("p",[t._v("​\tdispatch: 异步操作 存储 this.$store.dispatch('getlists',name)")])])])}),[],!1,null,null,null);a.default=n.exports}}]);