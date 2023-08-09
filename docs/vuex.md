---
title: vuex
date: 2021-11-25 15:56:11
---

## `Vuex`的核心概念

### State

是`Vuex`用来存储数据的地方，存储在state中数据可以看做是当前应用的全局变量可以在当前应用的任何地方访问。

> 1.是`Vuex`用来存储数据的地方，存储在state中数据可以看做是当前应用的全局变量可以在当前应用的任何地方访问。
>
> 2.在开发中我们推荐将store中的state赋值给需要使用该状态的组件的计算属性中(一定不能把state赋值给data,state发生改变时不会重新给data赋值)
>
> 3.`Vuex` 为了简化 state与计算属性配合使用时的代码,提供了一个辅助函数`mapState` 可以简化上面的写法
>
> ```
> // 首先引入辅助函数mapState
> import {mapState} from 'vuex'
>  /*
>  computed: {
>  	book() {
>     		return this.$store.state.book;
>     	},
>  }*/
>     
>     // 下面的写法等价于上面的写法
> computed: {
>       ...mapState(['book'])
>    }
> 
> ```
>
> 

### Getters

 getter就是`Vuex`的计算属性，开发人员可以将state 或其他getter 计算后的的返回值存放在指定getter中,当前getter会将这些依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。可以认为是 store 的计算属性

```
state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
 // Getter 接受 state 作为其第一个参数
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
  //Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值：
  store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
  //Getter 也可以接受其他 getter 作为第二个参数：
  getters: {
      // ...
      doneTodosCount: (state, getters) => {
        return getters.doneTodos.length
      }
    }
  
```

在任何组件中都可以通过`this.$store.getter.`属性名访问

1. getter在组件中依然存放在组建的计算属性中

   ```
   computed: {
           score() {
             return this.$store.getters.calcScore;
           }
       }
   ```

   

2. `Vuex`为 getters 同样提供了辅助函数 `mapGetters`

   ```
   方法一: mapState可以接收一个字符串数组作为参数,数组中的每一项字符串都会成为当前组件的计算属性并且与Vuex中的同名getter建立映射对应关系。
    computed: {
    	...mapGetters(["calcScore"])
    }
   方法二: mapGetters可以接收对象作为参数,对象的每一个key都会成为当前组件的计算属性名,value必须是一个字符串并且与Vuex中的同名getter建立映射对应关系。
   computed: {
   	...mapGetters({
   		s1: 'calcScore'
   	})
   }
   ```

### Mutations

`vuex`规定mutation是唯一可以修改state的地方

```
  mutations: { // 修改state的方法
    // 同步操作 直接修改
    changeBook(state, book) {
      state.book = book;
    },
}
```

在组件中必须使用`$store.commit`方法提交指定mutation,指定mutation才会触发

```
methods: {
        // 执行该方法会将state中的book变成JavaScript,而不是最开始的HTML+CSS
        changeBookByCommit() {
            // 触发mutation必须使用$store所提供的commit方法提交一次mutation
            // commit 方法接收两个参数 参数一 需要触发mutation的函数名 参数二 载荷(传参/提交给mutation的参数)
            //注意: commit只能接受两个参数,如果你想要的传递多个参数时,请将载荷作为对象提交
            this.$store.commit("changeBook", "JavaScript");
        }
    }

```

> 注意: Mutation 需遵守 Vue 的响应规则 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：
>
> 1、最好提前在你的 store 中初始化好所有所需state属性。
>
> 2、当需要在对象上添加新属性时，你应该使用 Vue.set(obj, 'newProp', 123), 或者以新对象替换老对象

```
 mutations: {
        addCount(state) {
            state.count ++
        },
        setArr(state) {
            // vuex 依然遵循响应式原则,在vue的响应式原则中,通过下标修改添加数组的其中一项是不会引起页面更新
            // state.arr[0] = 'A'
            // vuex没有this,所以只能先 import Vue,在使用Vue.set方法修改数组
            Vue.set(state.arr, 0 , 'A')
            // 以新对象替换老对象方法引起引用数据类型响应变化
            state.arr = state.arr.map((item,index) => {
                if(index === 0) {
                    return 'AA'
                }
                return item
            })

        },
        setObj(state) {
            // state.obj.address = 'hz'  // Error 直接给对象通过key添加属性也不会引起页面更新
            Vue.set(state.obj,'address', 'gz' )
            
             state.obj = {
                ...state.obj,
                address: '广州'
            }
        }
    }

```

> 注意1: Mutation 内部只允许同步操作,原因在vuex中mutation是唯一可以修改state的地方,所以开发中我们有时会对mutation进行数据追踪观察state是否按照预期发生改变,这样做的化就可以在开发中捕获大量的错误,如果mutation允许异步操作的话,就会导致我们的数据追踪变得混乱不可查阅。
>
> 2:因为每次提交mutation都是传入commit函数一个同名mutation字符串，这样的操作有时会导致提交字符串与mutation名不一致导致指定mutation没有被提交，这个问题尤其会出现在多人开发中。为了避免该问题vuex推荐专门创建一个名为 mutation-types.js 文件存储当前应用中所有的mutation名,开发人员就可以使用变量的方式声明提交指定的mutation了

```
export const ADD_CURRENT_COUNT = 'ADD_CURRENT_COUNT'

export const SET_ARR = 'SET_ARR'

export const SET_OBJ = 'SET_OBJ'
```

```
// store中的mutation全部使用 mutation-types声明好的常量作为函数名
import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
    mutations: {
        // ES6 动态键名 将mutation-types中 声明好的常量作为当前mutation的函数名
        [types.ADD_CURRENT_COUNT](state, num) {
               // some code...
        },
        [types.SET_ARR](state, {index, value}) {
              // some code...
        },
        [types.SET_OBJ](state) {
            // some code...
        }
    }
})

```

```
// 组件调用这些mutation时 直接通过引入对应的mutation-types常量
<script>
import {ADD_CURRENT_COUNT, SET_ARR, SET_OBJ} from '../store/mutation-types'

export default {
    methods: {
        setStateCount() {
            this.$store.commit(ADD_CURRENT_COUNT, 7)
        },
        setStateArr() {
            this.$store.commit(SET_ARR)
        },
        setStateObj() {
            this.$store.commit(SET_OBJ)
        }
    }
}
</script>

```

Vuex为 mutations 同样提供了辅助函数 `mapMutations`

方法一: mapMutations可以接收一个字符串数组作为参数,数组中的每一项字符串都会成为当前组件的方法并且与Vuex中的同名mutation建立映射对应关系。

```
import {mapMutations} from 'vuex'
import {ADD_CURRENT_COUNT, SET_ARR} from '../store/mutation-types'

export default {
    computed: {
        ...mapMutations([ ADD_CURRENT_COUNT, SET_ARR ]),
    }
}
```

 方法二:mapMutations可以接收对象作为参数,对象的每一个key都会成为当前组件的方法名,`value必须是mutation的同名字符串`与Vuex中的mutation建立映射对应关系。

```
 computed: {
        ...mapMutations({ 
         addCount: ADD_CURRENT_COUNT, 
         setArr: SET_ARR }),
    }
```



### Actions

Vuex给开发人员提供了一个可以执行异步操作的函数action

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象

> 注意: action函数中接收两个参数
>
> 参数一 context 与 store对象相似所以可以访问 context.state / context.getters / context.commit / context.dispatch
>
> 参数二 action的载荷,action载荷与mutation一样只有一个如果需要传递多个参数请传递对象
>
> ★★★ action是不允许直接修改state的

```
	state: {
        result: {}
    },
    mutations: {
        [types.SET_RESULT](state, result) {
            // 修改state
            state.result = result
        }
    },
    actions: {
        searchMusic(context, keywords) {
            console.log(context)
            fetch('http://musicapi.leanapp.cn/search?keywords=' + keywords)
            .then(res => res.json())
            // 只有mutation才能修改state,所以action异步请求数据后,只能通过提交mutation修改state
            .then(({result}) => context.commit(types.SET_RESULT, result))
        }
    }

```

#### 在组件中分发 Action

直接使用`this.$store.dispatch`

```
created() {
      this.$store.dispatch('increment')
  }
```

`Vuex`为 action 同样提供了辅助函数 `mapActions`,`mapActions`生成的方法只接受一个参数,这个参数就是当前action的载荷

```javascript
created() {
    //   this.$store.dispatch('increment')
    this.increment()
  },
computed:{
 ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', 		amount)`
]),
 ...mapActions({
    add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
 })
}
```

Actions 支持同样的载荷方式和对象方式进行分发：

```
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```



### Modules

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```
state: {
    name: 'root'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    commend: {
        state: {
            name: '小明',
            age: 18
        },
        getters: {
            //some getters
        },
        mutation: {
            // some mutations
        },
        actions: {
            // some action
        },
        modules: {
            // some modules
        }
    } 
  }
```

> 虽然在我们在实例化vuex.Store时创建了不同的模块,但是最终生成的store对象所有数据(包含子模块的数据)依然存储在同一个state getters mutations actions中。

对于模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**。

同样，对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`：

```
const moduleA = {
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：

```
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```



#### 命名空间

默认情况下，模块内部的 action、mutation 和 getter 是注册在**全局命名空间**的——这样使得多个模块能够对同一 mutation 或 action 作出响应。

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。例如：

```
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // 模块内容（module assets）
      state: () => ({ ... }), // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: () => ({ ... }),
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: () => ({ ... }),
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```

启用了命名空间的 getter 和 action 会收到局部化的 `getter`，`dispatch` 和 `commit`。

在使用模块内容时不需要在同一模块内额外添加空间名前缀。更改 `namespaced` 属性后不需要修改模块内的代码。

#### module state

存放在module中的state,是否开启命名空间使用方式都是一样的。都是通过`store.state.`模块名`.state属性名`

辅助函数mapState获取指定模块的属性,必须使用 `"属性名:函数的形式"`

```
 ...mapState({
      commendName: state => state.commend.name, // $store.state.commend.name  => '小王'
      a1Name: ({a1}) => a1.name // $store.state.a1.name  => '老李头'
    })
```

当使用 `mapState`, `mapGetters`, `mapActions` 和 `mapMutations` 这些函数来绑定带命名空间的模块时，写起来可能比较繁琐：

```js
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  })
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ])
}
```

对于这种情况，你可以将模块的空间名称字符串作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文。于是上面的例子可以简化为：

```js
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
computed: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

而且，你可以通过使用 `createNamespacedHelpers` 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：

```js
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
```

#### module getters

所有module中的getter是直接存储在store.getters中的,依然通过`store.getters.属性名访问`

当开启了命名空间后module,getters 获取方式发生改变

变为 -->`store.getters['模块名/getter属性名']`

所以开启命名空间的getter可以与其他模块根store中的getter同名

```
store.getters.reverseName  根store的getter
store.getters['a1/reverseName']    a1模块的getter
```

辅助函数mapGetter 获取module的getter方法没有变化的

```
模块中getters函数包含四个参数
参数一 state -------- 当前模块的state
参数二 getters -------- 当前模块的getters(如果当前模块没有开启命名空间 该参数的值等于参数四)
参数三 rootState -------- 根state store的state
参数四 rootGetter -------- 根getters store的getters
```

```
computed: {
    ...mapGetters(['reverseName']),
    ...mapGetters({a1ReverseName: 'a1/reverseName'})
  }
```

#### module mutation 和 action

所有mutation和action也是直接存储在store中的,依然通过`store.dispatch('mutation名') store.dispatch('action名')`触发的 

> 在开发中如果你的模块如果没有开启命名空间，mutation与action 在模块与模块之间 或模块与根store之间存在同名mutation / action 是不会造成命名冲突不会报错的，但是如果commit / dispatch 这些同名 mutation / action时他们将都会执行。

当开启了命名空间后module,mutation与action方法名会发生改变

变为 --> `'模块名/mutation名' '模块名/action名'`

```
// $store.commit('myMutation')  => '根mutation的 myMutation方法被触发了'
// $store.commit('a1/myMutation')  => '模块 a1 mutation 的 myMutation方法被触发了'

// $store.dispatch('myAction') => '根action的 myAction方法被触发了'
// $store.dispatch('a1/myAction') => '模块 a1 action的 myAction方法被触发了'

```

> 模块中mutation\action函数无论是否开启具名空间依然只包含两个参数
>
> 参数一: 当前模块的局部state
>
> 参数二: 载荷

`命名空间开启的模块`action内部 `context`.commit 提交mutation时dispatch分发action时`会自动添加命名空间前缀`,从而实现`只提交当前模块mutation/action`的效果

```
如果你想要在开启命名空间模块的`action`中使用`context提交/分发全局mutation/action`请在`commit dispatch`方法传入`第三个参数{root:true}`代表调用全局
dispatch('someOtherAction', null, { root: true }) 

commit('someMutation', null, { root: true }
```

### store.commit和store.dispatch的区别及用法

 mutations 和 actions 都要在组件的methods中使用 ，而state和getters都是在组件中的computed中使用

dispatch是在actions中使用的，action是不允许直接修改state的，所以我们要在actions中定义提交mutations的方法

> 1、commit: 用来提交当前模块的mutations   
>
> ​	dispatch: 用来提交当前模块的actions(actions可以提交mutations,可以进行异步操作)   
>
> ​	commit 有些做不到的可以用 dispatch 进行提交
>
> 2、mutations修改state, action提交mutations。但是如果修改完还想做其他事情就用actions比较方便(then后执行想要做的事情) ==> this.$store.dispatch().then()
>
> 3、commit: 同步操作 存储 this.$store.commit('changeValue',name) 
>
> ​	dispatch: 异步操作 存储 this.$store.dispatch('getlists',name) 
>
> 
