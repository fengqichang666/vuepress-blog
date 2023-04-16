---
title: pinia
date: 2022-12-22 10:55:10
tags: pinia
---

[Pinia](https://so.csdn.net/so/search?q=Pinia&spm=1001.2101.3001.7020).js 有如下特点：

- 完整的 ts 的支持；
- 足够轻量，压缩后的体积只有1kb左右;
- 去除 mutations，只有 state，getters，actions；
- actions 支持同步和异步；
- 代码扁平化没有模块嵌套，只有 store 的概念，store 之间可以自由使用，每一个store都是独立的
- 无需手动添加 store，store 一旦创建便会自动添加；
- 支持Vue3 和 Vue2

# 安装

`npm install pinia`

# 引入注册Vue3

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
 
const store = createPinia()
let app = createApp(App)
 
app.use(store)
app.mount('#app')
```

# 初始化仓库Store

**1.新建一个文件夹Store**

**2.新建文件[name].ts**

**3.定义仓库Store**

`import { defineStore } from 'pinia'`

**4.我们需要知道存储是使用定义的`defineStore()`，并且它需要一个唯一的名称，作为第一个参数传递**

新建文件store-namespace/index.ts

```
export const enum Names {
    Test = 'TEST'
}
```

store 引入

```
import { defineStore } from 'pinia'
import { Names } from './store-namespace'
 
export const useTestStore = defineStore(Names.Test, {
 
})
```

这个*名称*，也称为*id*，是必要的，Pania 使用它来将商店连接到 [devtools](https://so.csdn.net/so/search?q=devtools&spm=1001.2101.3001.7020)。将返回的函数命名为*use...*是可组合项之间的约定，以使其使用习惯。

**5.定义值**

**State 箭头函数 返回一个对象 在对象里面定义值**

```typescript
import { defineStore } from 'pinia'
import { Names } from './store-namespce'
 
export const useTestStore = defineStore(Names.Test, {
     state:()=>{
         return {
             current:1
         }
     }
})
```

```typescript
import { defineStore } from 'pinia'
import { Names } from './store-namespce'
 
export const useTestStore = defineStore(Names.Test, {
     state:()=>{
         return {
             current:1
         }
     },
     //类似于computed 可以帮我们去修饰我们的值
     getters:{
 
     },
     //可以操作异步 和 同步提交state
     actions:{
 
     }
})
```

# State

## 1.State 是允许直接修改值的 例如current++

```typescript
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
     </div>
</template>
 
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
    Test.current++
}
</script>

```

## 2.[批量修改](https://so.csdn.net/so/search?q=批量修改&spm=1001.2101.3001.7020)State的值

在他的实例上有$patch方法可以批量修改多个值

```typescript
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
          <div>
            {{Test.age}}
          </div>
     </div>
</template>
 
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
    Test.$patch({
       current:200,
       age:300
    })
}
</script>
```

## 3.批量修改函数形式

推荐使用函数形式 可以自定义修改逻辑

```typescript
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
          <div>
            {{Test.age}}
          </div>
     </div>
</template>
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
    Test.$patch((state)=>{
       state.current++;
       state.age = 40
    })
}
</script>
```

## 4.通过原始对象修改整个实例

`$state`您可以通过将store的属性设置为新对象来替换store的整个状态

缺点就是必须修改整个对象的所有属性

```typescript
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
          <div>
            {{Test.age}}
          </div>
     </div>
</template>
 
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
    Test.$state = {
       current:10,
       age:30
    }    
}
</script>
```

## 5.通过actions修改

定义Actions

在actions 中直接使用this就可以指到state里面的值

```typescript
import { defineStore } from 'pinia'
import { Names } from './store-naspace'
export const useTestStore = defineStore(Names.TEST, {
     state:()=>{
         return {
            current:1,
            age:30
         }
     },
 
     actions:{
         setCurrent () {
             this.current++
         }
     }
})
```

使用方法直接在实例调用

```typescript
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
          <div>
            {{Test.age}}
          </div>
     </div>
</template>
 
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
     Test.setCurrent()
}
</script>
```

# 解构store

在[Pinia](https://so.csdn.net/so/search?q=Pinia&spm=1001.2101.3001.7020)是不允许直接解构是会失去响应性的。解决方案可以使用 storeToRefs

```
import { storeToRefs } from 'pinia'
const Test = useTestStore()
const { current, name } = storeToRefs(Test)
```

其原理跟toRefs 一样的给里面的数据包裹一层toref

# Actions，getters

## Actions（支持同步异步）

### 1.同步 直接调用即可

```typescript
import { defineStore } from 'pinia'
import { Names } from './store-naspace'
export const useTestStore = defineStore(Names.TEST, {
    state: () => ({
        counter: 0,
    }),
    actions: {
        increment() {
            this.counter++
        },
        randomizeCounter() {
            this.counter = Math.round(100 * Math.random())
        },
    },
})
```

```vue
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.counter}}
          </div>    
     </div>
</template>
 
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
     Test.randomizeCounter()
}
 
</script>
 
<style>
 
</style>
```

### 2.异步 可以结合async await 修饰

```typescript
import { defineStore } from 'pinia'
import { Names } from './store-naspace'
 
type Result = {
    name: string
    isChu: boolean
}
 
const Login = (): Promise<Result> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: '小满',
                isChu: true
            })
        }, 3000)
    })
}
 
export const useTestStore = defineStore(Names.TEST, {
    state: () => ({
        user: <Result>{},
        name: "123"
    }),
    actions: {
        async getLoginInfo() {
            const result = await Login()
            this.user = result;
        }
    },
})
```

```vue
<template>
     <div>
         <button @click="Add">test</button>
          <div>
             {{Test.user}}
          </div>    
     </div>
</template>
 
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
     Test.getLoginInfo()
}
 
</script>
 
<style>
 
</style>
```

### 3.多个action互相调用getLoginInfo setName

```typescript
    state: () => ({
        user: <Result>{},
        name: "default"
    }),
    actions: {
        async getLoginInfo() {
            const result = await Login()
            this.user = result;
            this.setName(result.name)
        },
        setName (name:string) {
            this.name = name;
        }
    },
```

## getters

1.使用[箭头函数](https://so.csdn.net/so/search?q=箭头函数&spm=1001.2101.3001.7020)不能使用this this指向已经改变指向undefined 修改值请用state

主要作用类似于computed 数据修饰并且有缓存

```typescript
    getters:{
       newPrice:(state)=>  `$${state.user.price}`
    },
```

2.普通函数形式可以使用this

```typescript
    getters:{
       newCurrent ():number {
           return ++this.current
       }
    },
```

3.getters 互相调用

```typescript
    getters:{
       newCurrent ():number | string {
           return ++this.current + this.newName
       },
       newName ():string {
           return `$-${this.name}`
       }
    },
```

# API

## $[reset](https://so.csdn.net/so/search?q=reset&spm=1001.2101.3001.7020)

重置`store`到他的初始状态

```typescript
state: () => ({
     user: <Result>{},
     name: "default",
     current:1
}),
```

Vue 例如我把值改变到了10

```typescript
const change = () => {
     Test.current++
}
```

调用$reset();

将会把state所有值 重置回 原始状态

## 订阅state的改变

类似于Vuex 的abscribe 只要有state 的变化就会走这个函数

```
Test.$subscribe((args,state)=>{
   console.log(args,state);
})
```

第二个参数   如果你的组件卸载之后还想继续调用请设置第二个参数

```
Test.$subscribe((args,state)=>{
   console.log(args,state);
   
},{
  detached:true
})
```

## 3.订阅Actions的调用

 只要有actions被调用就会走这个函数

```
Test.$onAction((args)=>{
   console.log(args);
   
})
```

# pinia插件

[pinia](https://so.csdn.net/so/search?q=pinia&spm=1001.2101.3001.7020) 和 vuex 都有一个通病 页面刷新状态会丢失

我们可以写一个pinia 插件缓存他的值

```typescript
const __piniaKey = '__PINIAKEY__'
//定义兜底变量
 
 
type Options = {
   key?:string
}
//定义入参类型
 
 
 
//将数据存在本地
const setStorage = (key: string, value: any): void => {
 
	localStorage.setItem(key, JSON.stringify(value))
 
}
 
 
//存缓存中读取
const getStorage = (key: string) => {
 
	return (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as 		string) : {})
 
}
//利用函数柯丽华接受用户入参
const piniaPlugin = (options: Options) => {
 
    //将函数返回给pinia  让pinia  调用 注入 context
    return (context: PiniaPluginContext) => {
        const { store } = context;
        const data = getStorage(`${options?.key ?? __piniaKey}-${store.$id}`)
        store.$subscribe(() => {
        setStorage(`${options?.key ?? __piniaKey}-${store.$id}`, 								toRaw(store.$state));
        })
        //返回值覆盖pinia 原始值
        return {
        	...data
        }
    }
}
 
//初始化pinia
const pinia = createPinia()
//注册pinia 插件
pinia.use(piniaPlugin({
	key: "pinia"
}))
```

