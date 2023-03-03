---
title: vue3笔记
date: 2022-12-15 15:00:16
tags:
---

## Vue3 新特性介绍

### 重写双向绑定

```
vue2
基于Object.defineProperty()实现

vue3 基于Proxy
proxy与Object.defineProperty(obj, prop, desc)方式相比有以下优势：

//丢掉麻烦的备份数据
//省去for in 循环
//可以监听数组变化
//代码更简化
//可以监听动态新增的属性；
//可以监听删除的属性 ；
//可以监听数组的索引和 length 属性；
let proxyObj = new Proxy(obj,{
    get : function (target,prop) {
        return prop in target ? target[prop] : 0
    },
    set : function (target,prop,value) {
        target[prop] = 888;
    }
})
```

## Vue3 优化Vdom

**在Vue2中,每次更新diff,都是全量对比,Vue3则只对比带有标记的,这样大大减少了非动态内容的对比消耗**

### patch flag 优化静态树

```
<span>Hello world!</span>
<span>Hello world!</span>
<span>Hello world!</span>
<span>Hello world!</span>
<span>{{msg}}</span>
<span>Hello world!</span>
<span>Hello world! </span>
```

`Vue3` 编译后的 `Vdom` 是这个样子的

```
export function render(_ctx，_cache，$props，$setup，$data，$options){return (_openBlock(),_createBlock(_Fragment,null，[
_createvNode( "span", null,"Hello world ! "),
_createvNode( "span",null，"Hello world! "),
_createvNode( "span"，null，"Hello world! "),
_createvNode( "span", null，"Hello world! "),
_createVNode("span", null，_toDisplaystring(_ctx.msg)，1/* TEXT */)，
_createvNode( "span", null，"Hello world! "),
_createvNode( "span", null，"Hello world! ")]，64/*STABLE_FRAGMENT */))
```

新增了 patch flag 标记

```
TEXT = 1 // 动态文本节点
CLASS=1<<1,1 // 2//动态class
STYLE=1<<2，// 4 //动态style
PROPS=1<<3,// 8 //动态属性，但不包含类名和样式
FULLPR0PS=1<<4,// 16 //具有动态key属性，当key改变时，需要进行完整的diff比较。
HYDRATE_ EVENTS = 1 << 5，// 32 //带有监听事件的节点
STABLE FRAGMENT = 1 << 6, // 64 //一个不会改变子节点顺序的fragment
KEYED_ FRAGMENT = 1 << 7, // 128 //带有key属性的fragment 或部分子字节有key
UNKEYED FRAGMENT = 1<< 8, // 256 //子节点没有key 的fragment
NEED PATCH = 1 << 9, // 512 //一个节点只会进行非props比较
DYNAMIC_SLOTS = 1 << 10 // 1024 // 动态slot
HOISTED = -1 // 静态节点
BALL = -2
```

我们发现创建动态 dom 元素的时候，Vdom 除了模拟出来了它的基本信息之外，还给它加了一个标记： 1 /* TEXT */

这个标记就叫做 patch flag（补丁标记）

patch flag 的强大之处在于，当你的 diff 算法走到 _createBlock 函数的时候，会忽略所有的静态节点，只对有标记的动态节点进行对比，而且在多层的嵌套下依然有效。

尽管 JavaScript 做 Vdom 的对比已经非常的快，但是 patch flag 的出现还是让 Vue3 的 Vdom 的性能得到了很大的提升，尤其是在针对大组件的时候。

## Vue3 Fragment

vue3 允许我们支持多个根节点(vue将为我们创建一个虚拟的Fragment节点)、同时支持render JSX 写法

## Ref全家桶

### ref   

绑定普通的数据类型，如果用ref去绑定对象 或者 数组 等复杂的数据类型，源码里面其实也是 去调用reactive

接受一个内部值并返回一个[响应式](https://so.csdn.net/so/search?q=响应式&spm=1001.2101.3001.7020)且可变的 ref 对象。ref 对象仅有一个 `.value` property，指向该内部值。

### isRef

判断是不是一个ref对象

```
import { ref, Ref,isRef } from 'vue'
let message: Ref<string | number> = ref("我是message")
let notRef:number = 123
const changeMsg = () => {
  message.value = "change msg"

  console.log(isRef(message)); //true
  console.log(isRef(notRef)); //false
  
}
```

### shallowRef、triggerRef 

shallowRef()存在的意义：将最终的结果输出到视图，节省一些不必要的输出。

**shallowRef是浅层响应式数据，即：修改.value值时会更新视图。而修改具体属性值时，不会更新视图。**

triggerRef  强制更新页面DOM

```
1、shallowRef() 函数是浅层响应，只有对value整体修改，才能更新到视图层。
2、对属性值的修改是可以的，只是不更新到视图层。
3、对属性值修改之后，我们可以通过triggerRef()函数手动更新到视图。

// 定义shallowRef变量
const state = shallowRef({ count: 1 })

// 整体修改值（即.value），其template内的视图也会更新！
state.value = { count: 2 }

// 修改属性值时，其template内的视图不会更新！但并不代表其值没有被修改，仅仅是视图没更新
state.value.count = 2

// 此时我们可以用triggerRef函数手动更新视图
triggerRef(state)
```

### customRef

创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

customRef 是个工厂函数要求我们自定义的 `ref` 中返回一个 `customRef`，而 `customRef` 也要返回一个对象，并且实现 get 和 set ，适合去做防抖之类的

 customRef的两个参数分别是用于追踪的 track 与用于触发响应的 trigger

```
<template>
 
  <div ref="div">小满Ref</div>
  <hr>
  <div>
    {{ name }}
  </div>
  <hr>
  <button @click="change">修改 customRef</button>
 
</template>
 
<script setup lang='ts'>
import { ref, reactive, onMounted, shallowRef, customRef } from 'vue'
 
function myRef<T = any>(value: T) {
  let timer:any;
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newVal) {
        clearTimeout(timer)
        timer =  setTimeout(() => {
          console.log('触发了set')
          value = newVal
          trigger()
        },500)
      }
    }
  })
}
 
const name = myRef<string>('小满')
 
const change = () => {
  name.value = '大满'
}
 
</script>
<style scoped>
</style>
```

## Reactive全家桶

### `reactive`

**reactive 源码约束了我们的类型，用来绑定复杂的数据类型 例如 对象 数组**

使用reactive 去修改值无须.value

reactive 基础用法

```
import { reactive } from 'vue'
let person = reactive({
   name:"小满"
})
person.name = "大满"
```

数组异步赋值问题

这样赋值页面是不会变化的因为会脱离响应式

```
let person = reactive<number[]>([])
setTimeout(() => {
  person = [1, 2, 3]
  console.log(person);
  
},1000)
```

解决方案1  使用push

```
import { reactive } from 'vue'
let person = reactive<number[]>([])
setTimeout(() => {
  const arr = [1, 2, 3]
  person.push(...arr)
  console.log(person);
  
},1000)
```

方案2  包裹一层对象

```
type Person = {
  list?:Array<number>
}
let person = reactive<Person>({
   list:[]
})
setTimeout(() => {
  const arr = [1, 2, 3]
  person.list = arr;
  console.log(person);
},1000)
```

### readonly

取得一个对象（反应性或普通）或ref并返回一个只读代理。访问的任何嵌套属性也将是只读的。
传入普通对象等返回只读代理。
传入普通数值或字符串不能变成只读，例如 readonly(‘abc’)

可结合Provide/inject 使用

```
const original = reactive({ count: 0 })

const copy = readonly(original)

watchEffect(() => {
  // 反应性跟踪
  console.log(copy.count)
})

// 改变 original 会触发观察copy的watcher执行其函数回调
original.count++

// 改变 copy 将会失败并且在控制台返回一个警告
copy.count++ // warning!

```

### shallowReactive 

只能对浅层的数据（对象第一层） 如果是深层的数据只会改变值 不会改变视图

## to系列全家桶

### toRef

- toRef是将对象中的某个值转化为响应式数据 toRef(obj,key)
- 注意点：就是 toRef 修改的值，只能修改原始对象为 响应式对象，toRe如果原始对象是非响应式的就不会更新视图 数据是会变的

### toRefs

可以帮我们批量创建ref对象主要是方便我们解构使用

对对象解构时，解构出来的值为非响应式数据，但使用 toRefs 定义后 这些被解构出来的值 为响应式数据

```
import { reactive, toRefs } from 'vue'
const obj = reactive({
   foo: 1,
   bar: 1
})
 
let { foo, bar } = toRefs(obj)
 
foo.value++
console.log(foo, bar);
```

### toRaw

将响应式对象转化为普通对象

```
import { reactive, toRaw } from 'vue'
const obj = reactive({
   foo: 1,
   bar: 1
})
const state = toRaw(obj)
// 响应式对象转化为普通对象
const change = () => {
   console.log(obj, state);
}
```

## computed用法

[计算属性](https://so.csdn.net/so/search?q=计算属性&spm=1001.2101.3001.7020)就是当依赖的属性的值发生变化的时候，才会触发他的更改，如果依赖的值，不发生变化的时候，使用的是缓存中的属性值。

1 函数形式

```
let price = ref(0)//$0 
let m = computed<string>(()=>{
   return `$` + price.value
})
price.value = 500
```

2 对象形式

```
let price = ref<number | string>(1)//$0
let mul = computed({
   get: () => {
      return price.value
   },
   set: (value) => {
      price.value = 'set' + value
   }
})
const changeMul = ()=> {
    mul.value = '***'
}
```

## watch侦听器

`watch` 需要侦听特定的数据源，并在单独的回调函数中执行副作用

watch第一个参数监听源

watch第二个参数回调函数cb（newVal,oldVal）

watch第三个参数一个options配置项是一个对象{

​	[immediate](https://so.csdn.net/so/search?q=immediate&spm=1001.2101.3001.7020):true //是否立即调用一次

​	deep:true //是否开启[深度监听](https://so.csdn.net/so/search?q=深度监听&spm=1001.2101.3001.7020)

}

监听Ref

```
let message = ref({
    nav:{
        bar:{
            name:""
        }
    }
})
 
 
watch(message, (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
},{
    immediate:true,
    deep:true
})
```

监听多个ref 注意变成数组

```
let message = ref('')
let message2 = ref('')
 
watch([message,message2], (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
})
```

监听Reactive

使用reactive监听深层对象开启和不开启deep 效果一样

```
import { ref, watch ,reactive} from 'vue'
 
let message = reactive({
    nav:{
        bar:{
            name:""
        }
    }
})
 
 
watch(message, (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
})
```

监听reactive 单一值

```
let message = reactive({
    name:"",
    name2:""
})
watch(()=>message.name, (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
})
```

## watchEffect高级侦听器

立即执行传入的一个函数，同时[响应式](https://so.csdn.net/so/search?q=响应式&spm=1001.2101.3001.7020)追踪其依赖，并在其依赖变更时重新运行该函数。

watchEffect 接收2个参数 ，并且有返回一个 StopHandle 函数用来停止侦听。
1、第一个参数：（必传）
effect 函数，收集依赖，并且组件初始化时立即执行一次;
并且 effect 函数可以接受一个 onInvalidate 函数参数，该参数执行并传入一个 callback ，每次监听回调执行前都会执行该 callback。
2、第二个参数对象（非必传）： flush 、 onTrack 、 onTrigger; 

```
let count = ref(0)
let Cc = computed(()=> count.value * 2)
let obj = reactive({
  data:123,
  inObj:{d1:0}
})
 
const stop = watchEffect((onInvalidate) => {
  //! 立即执行传入的回调函数，同时响应式追踪其所有依赖，并在依赖变更时重新运行该回调函数。
  console.log(Cc.value); // 注意，如果依赖是 ref 和 computed 对象，必须要.value，否则并不会视为依赖
  console.log(count.value);
  console.log(obj.data); // 同理，reactive数据也只会侦听触发了get的property(属性)
  //! 注意首次执行并不会执行onInvalidate ，第二次开始才会！
  onInvalidate(()=>{
    //! 在回调触发前会调用该函数，并且stop()停止侦听的时候也会触发一次！
    console.log('watchEffect的onInvalidate');
  })
 
},{
  flush:'pre', // flush?: 'pre' | 'post' | 'sync' // 默认：'pre'
  
  //! 跟踪之前会触发该函数，收集了多少个依赖就触发多少次！返回对应依赖信息
  onTrack(e){console.log(e.target,'onTrack触发')}, 
 
  //! 跟他名字一样依赖更改就触发执行，而且是同步的！没有所谓的缓冲回调
  onTrigger(e){console.log(e.target,'onTrigger触发')} 
})
setTimeout(() => {
  stop() // 停止侦听 则调用该返回值即可 
}, 1000*5);
```

### 清除副作用 oninvalidate

在触发监听之前会调用一个函数可以处理你的逻辑例如[防抖](https://so.csdn.net/so/search?q=防抖&spm=1001.2101.3001.7020)

1. 在回调触发前会调用该函数
2. 侦听器被停止 (如果在 `setup()` 或生命周期钩子函数中使用了 `watchEffect`，在组件卸载时会自动停止侦听。)

```
let message = ref<string>('')
let message2 = ref<string>('')
 watchEffect((oninvalidate) => {
    //console.log('message', message.value);
    oninvalidate(()=>{
        
    })
    console.log('message2', message2.value);
})
```

### 副作用刷新时机 flush 一般使用post

|          | pre                | sync                 | post               |
| :------- | :----------------- | :------------------- | :----------------- |
| 更新时机 | 组件**更新前**执行 | 强制效果始终同步触发 | 组件**更新后**执行 |

**停止跟踪**

watchEffect 返回一个函数 调用之后将停止更新

生命周期钩子函数中使用了 `watchEffect`，在组件卸载时也会自动停止侦听。

```
const stop =  watchEffect((oninvalidate) => {
    //console.log('message', message.value);
    oninvalidate(()=>{
 
    })
    console.log('message2', message2.value);
},{
    flush:"post",
    onTrigger () {
 
    }
})
// 停止跟踪
stop()
```



## 组件的生命周期

| 选项式 API        | Hook inside `setup` |
| :---------------- | :------------------ |
| `beforeCreate`    | Not needed*         |
| `created`         | Not needed*         |
| `beforeMount`     | `onBeforeMount`     |
| `mounted`         | `onMounted`         |
| `beforeUpdate`    | `onBeforeUpdate`    |
| `updated`         | `onUpdated`         |
| `beforeUnmount`   | `onBeforeUnmount`   |
| `unmounted`       | `onUnmounted`       |
| `errorCaptured`   | `onErrorCaptured`   |
| `renderTracked`   | `onRenderTracked`   |
| `renderTriggered` | `onRenderTriggered` |
| `activated`       | `onActivated`       |
| `deactivated`     | `onDeactivated`     |

1  `onRenderTracked` 直译过来就是状态跟踪，他会跟踪页面上所有的方法跟变量，也就是我们`return`返回的属性与方法，它都会进行跟踪。当页面有`update`时，会生成一个`event`对象。我们可以通过这个`event`对象查看程序的问题所在。

2  `onRenderTriggered`直译过来是状态触发，它不会跟踪每一个值，而是给你变化值的信息，并且新值和旧值都会给你明确的展示出来。

```
新值newValue和旧值oldValue都会给你明确的展示出来。主要的属性介绍
key 哪个变量发生了变化
newValue 更新后变量的值
oldValue 更新前变量的值
target 目前页面中的响应变量和函数
```

**activated,deactivated**

activated,deactivated这两个生命周期函数一定是要在使用了keep-alive组件后才会有的，否则则不存在当引入keep-alive的时候，页面第一次进入，钩子的触发顺序created-> mounted-> activated，退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated。
组件每次进去执行的方法放在 activated 中， activated 中的不管是否需要缓存多会执行。

## VNode hooks

在每个组件或HTML标签上，我们可以使用一些特殊的（文档没写的）钩子作为事件监听器。这些钩子有：

- onVnodeBeforeMount

- onVnodeMounted

- onVnodeBeforeUpdate

- onVnodeUpdated

- onVnodeBeforeUnmount

- onVnodeUnmounted

  在组件上使用`onVnodeMounted`，当需要在组件挂载时执行一些代码，或者在更新时使用`onVnodeUpdated`进行调试，可以确定的是所有这些钩子都能在某些情况下派上用场。

  ```
  <script setup>
  import { ref } from 'vue'
  
  const count = ref(0)
  
  function onMyComponentMounted() {}
  
  function divThatDisplaysCountWasUpdated() {}
  </script>
  
  <template>
    <MyComponent @vnodeMounted="onMyComponentMounted" />
    <div @vnodeUpdated="divThatDisplaysCountWasUpdated">{{ count }}</div>
  </template>
  ```

  需要注意的是，这些钩子向回调函数传递一些参数。除了`onVnodeBeforeUpdate`和`onVnodeUpdated`传递两个参数，即当前的`VNode`和之前的`VNode`，其它只传递一个参数，即当前的`VNode`

## 父子组件传参

### [defineProps ](https://so.csdn.net/so/search?q=defineProps&spm=1001.2101.3001.7020) 

子组件接受值

```
父组件
<Menu :data="data"  title="我是标题"></Menu>
子组件 ts可以使用传递字面量类型的纯类型语法做为参数
defineProps<{
    title:string,
    data:number[]
}>()
// withDefaults是个函数也是无须引入开箱即用接受一个props函数第二个参数是一个对象设置默认值
type Props = {
    title?: string,
    data?: number[]
}
withDefaults(defineProps<Props>(), {
    title: "张三",
    data: () => [1, 2, 3]
})

不是TS
defineProps({
    title:{
        default:"",
        type:string
    },
    data:Array
})
```

### defineEmits

子组件给父组件传参 通过defineEmits派发一个事件

```
<template>
    <div class="menu">
        <button @click="clickTap">派发给父组件</button>
    </div>
</template>
 
<script setup lang="ts">
import { reactive } from 'vue'
const list = reactive<number[]>([4, 5, 6])
 
const emit = defineEmits(['on-click'])
 
//如果用了ts可以这样
// const emit = defineEmits<{
//     (e: "on-click", name: string): void
// }>()
const clickTap = () => {
    emit('on-click', list)
}
 
</script>
```

### defineExpose

子组件暴露给父组件内部属性   从父组件获取子组件实例通过ref 

```
 <Menu ref="menus"></Menu>
//这样获取是有代码提示的
 const menus = ref<InstanceType<typeof menus>>()
```

然后打印menus.value 发现没有任何属性

这时候父组件想要读到子组件的属性可以通过 defineExpose暴露	

```
const list = reactive<number[]>([4, 5, 6])
 
defineExpose({
    list
})
```

## 依赖注入Provide / Inject

provide 可以在祖先组件中指定我们想要**提供**给后代组件的数据或方法，而在任何后代组件中，我们都可以使用 inject 来接收 provide **提供**的数据或方法。 

父组件传递数据

```vue
<template>
    <div class="App">
        <button>我是App</button>
        <A></A>
    </div>
</template>
    
<script setup lang='ts'>
import { provide, ref } from 'vue'
import A from './components/A.vue'
let flag = ref<number>(1)
provide('flag', flag)
</script>
    
<style>
.App {
    background: blue;
    color: #fff;
}
</style>
```

子组件接受

```vue
<template>
    <div style="background-color: green;">
        我是B
        <button @click="change">change falg</button>
        <div>{{ flag }}</div>
    </div>
</template>
    
<script setup lang='ts'>
import { inject, Ref, ref } from 'vue'
 
const flag = inject<Ref<number>>('flag', ref(1))
 
const change = () => {
    flag.value = 2
}
</script>
    
<style>
</style>
```

如果传递普通的值 是不具有响应式的 需要通过ref reactive 添加响应式

使用场景

当父组件有很多数据需要分发给其子代组件的时候， 就可以使用provide和inject。

## 兄弟组件传参和Bus

### 借助父组件传参

A 组件派发事件通过App.vue 接受A组件派发的事件然后在Props 传给B组件 也是可以实现的

缺点就是比较麻烦 ，无法直接通信，只能充当桥梁

### Event Bus

可以使用$emit 传递 $on监听 emit传递过来的事件

简易版

```vue
 
type BusClass<T> = {
    emit: (name: T) => void
    on: (name: T, callback: Function) => void
}
type BusParams = string | number | symbol 
type List = {
    [key: BusParams]: Array<Function>
}
class Bus<T extends BusParams> implements BusClass<T> {
    list: List
    constructor() {
        this.list = {}
    }
    emit(name: T, ...args: Array<any>) {
        let eventName: Array<Function> = this.list[name]
        eventName.forEach(ev => {
            ev.apply(this, args)
        })
    }
    on(name: T, callback: Function) {
        let fn: Array<Function> = this.list[name] || [];
        fn.push(callback)
        this.list[name] = fn
    }
}
 
export default new Bus<number>()
```

然后挂载到Vue config 全局就可以使用

## 全局组件，局部组件，递归组件

### 配置全局组件

在main.ts 引入我们的组件跟随在createApp(App) 后面 切记不能放到mount 后面这是一个链式调用用

调用 component 第一个参数组件名称 第二个参数组件实例

```
import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/reset/index.less'
import Card from './components/Card/index.vue'
 
 
createApp(App).component('Card',Card).mount('#app')
```

直接在其他vue页面 立即使用即可 无需引入

### 批量注册全局组件

element ui :遍历一下然后通过 app.component 注册

```
import * as ElementPlusIconVue from '@element-plus/icons-vue'
const app = created(App)
for(const [key,component] of Object.entries(ElementPlusIconVue)){
	app.component(key,component)
}
```

### 配置局部组件

就是在一个组件内（A） 通过import 去引入别的组件(B) 称之为局部组件

应为B组件只能在A组件内使用 所以是局部组件

如果C组件想用B组件 就需要C组件也手动import 引入 B 组件

### 配置递归组件

子组件增加一个组件名称(为了 递归用 )

组件定义名称几种方式

1.再增加一个script 通过 export 添加name

```
<script lang="ts">
export default {
  name:"TreeItem"
}
</script>
```

2.直接使用文件名当组件名

3.使用插件 unplugin-vue-define-options   

​	 ts支持 `"types": ["unplugin-vue-define-options/macros-global"]`

## 动态组件

什么是动态组件 就是：让多个组件使用同一个挂载点，并动态切换，这就是动态组件

在挂载点使用[component](https://so.csdn.net/so/search?q=component&spm=1001.2101.3001.7020)标签，然后使用[v-bind](https://so.csdn.net/so/search?q=v-bind&spm=1001.2101.3001.7020):is=”组件”

```
  <component :is="A"></component>

import A from './A.vue'
import B from './B.vue'
```

通过is 切换 A B 组件

***\*注意事项\**** 

***\*1.在Vue2 的时候is 是通过组件名称切换的 在Vue3 setup 是通过组件实例切换的\****

***\*2.如果你把组件实例放到Reactive Vue会给你一个警告runtime-core.esm-bundler.js:38 [Vue warn]: Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`. 
Component that was made reactive:\**** 

***\*这是因为reactive 会进行proxy 代理 而我们组件代理之后毫无用处 节省性能开销 推荐我们使用shallowRef 或者 markRaw 跳过proxy 代理\****

***\*修改如下\****

```
const tab = reactive<Com[]>([{
    name: "A组件",
    comName: markRaw(A)
}, {
    name: "B组件",
    comName: markRaw(B)
}])
```

## 插槽slot

插槽就是子组件中的提供给父组件使用的一个[占位符](https://so.csdn.net/so/search?q=占位符&spm=1001.2101.3001.7020)，用<slot></slot> 表示，父组件可以在这个占位符中填充任何模板代码，如 HTML、组件等，填充的内容会替换子组件的<slot></slot>标签。

### 匿名插槽

1.在子组件放置一个插槽

```
<template>
    <div>
       <slot></slot>
    </div>
</template>
```

父组件使用插槽

在父组件给这个插槽填充内容

```
        <Dialog>
           <template v-slot>
               <div>2132</div>
           </template>
        </Dialog>
```

### [具名插槽](https://so.csdn.net/so/search?q=具名插槽&spm=1001.2101.3001.7020)

具名插槽其实就是给插槽取个名字。一个子组件可以放多个插槽，而且可以放在不同的地方，而父组件填充内容时，可以根据这个名字把内容填充到对应插槽中

```
    <div>
        <slot name="header"></slot>
        <slot></slot>
 
        <slot name="footer"></slot>
    </div>
```

父组件使用需对应名称

```
        <Dialog>
            <template v-slot:header>
               <div>1</div>
           </template>
           <template v-slot>
               <div>2</div>
           </template>
           <template v-slot:footer>
               <div>3</div>
           </template>
        </Dialog>
```

 插槽简写

```
        <Dialog>
            <template #header>
               <div>1</div>
           </template>
           <template #default>
               <div>2</div>
           </template>
           <template #footer>
               <div>3</div>
           </template>
        </Dialog>
```

### 作用域插槽

在子组件[动态绑定](https://so.csdn.net/so/search?q=动态绑定&spm=1001.2101.3001.7020)参数 派发给父组件的slot去使用

```
    <div>
        <slot name="header"></slot>
        <div>
            <div v-for="item in 100">
                <slot :data="item"></slot>
            </div>
        </div>
 
        <slot name="footer"></slot>
    </div>
```

通过结构方式取值

```
         <Dialog>
            <template #header>
                <div>1</div>
            </template>
            <template #default="{ data }">
                <div>{{ data }}</div>
            </template>
            <template #footer>
                <div>3</div>
            </template>
        </Dialog>
```

### 动态插槽

插槽可以是一个变量名

```
        <Dialog>
            <template #[name]>
                <div>
                    23
                </div>
            </template>
        </Dialog>
        
        
        const name = ref('header')
```

### 从子组件暴露插槽

有时，我们使用第三方组件时，会把它的实现包装在我们自定义组件中。这是一个很好的做法和可扩展的解决方案，但这样一来，第三方组件的插槽就会丢失，下面方法可以将它们的插槽暴露在父组件中：

**WrapperComponent.vue**

```
<template>
  <div class="wrapper-of-third-party-component">
    <ThirdPartyComponent v-bind="$attrs">

        <!-- 暴露第三方组件的插槽  -->
        <template v-for="(_, name) in $slots" #[name]="slotData">
            <slot :name="name" v-bind="slotData || {}"></slot>
        </template>

    </ThirdPartyComponent>
  </div>
</template>
```

现在每个使用`WrapperComponent`的组件都可以使用第三方组件的插槽。

## 异步组件&代码分包&suspense

### 异步组件

在大型应用中，我们可能需要将应用分割成小一些的代码块 并且减少主包的体积

这时候就可以使用异步组件

**顶层 `await`**

在setup语法糖里面 使用方法

`<script setup> 中可以使用顶层 await。结果代码会被编译成 async setup()`


```
<script setup>
const post = await fetch(`/api/post/1`).then(r => r.json())
</script>
```

父组件引用子组件 通过defineAsyncComponent加载异步配合import 函数模式便可以分包

```html
<script setup lang="ts">
import { reactive, ref, markRaw, toRaw, defineAsyncComponent } from 'vue'
 
const Dialog = defineAsyncComponent(() => import('../../components/Dialog/index.vue'))
 
//完整写法
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),
 
  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,
 
  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```

### suspense

`<suspense>` 组件有两个插槽。它们都只接收一个直接子节点。`default` 插槽里的节点会尽可能展示出来。如果不能，则展示 `fallback` 插槽里的节点。

```
     <Suspense>
            <template #default>
                <Dialog>
                    <template #default>
                        <div>我在哪儿</div>
                    </template>
                </Dialog>
            </template>
 
            <template #fallback>
                <div>loading...</div>
            </template>
        </Suspense>
```

## Teleport传送组件

Teleport 是一种能够将我们的模板渲染至指定DOM节点，不受父级style、v-show等属性影响，但data、prop数据依旧能够共用的技术；

主要解决的问题 因为Teleport节点挂载在其他指定的DOM节点下，完全不受父级style样式影响

使用方法

通过to 属性 插入指定元素位置 to="body" 便可以将`Teleport` 内容传送到指定位置

```
<Teleport to="body">
    <Loading></Loading>
</Teleport>
```

也可以自定义传送位置 支持 class id等 选择器

多个使用场景

```
<Teleport to=".modal1">
     <Loading></Loading>
</Teleport>
<Teleport to=".modal2">
     <Loading></Loading>
</Teleport>
```

动态控制teleport

使用disabled 设置为 true则 to属性不生效 false 则生效

```
    <teleport :disabled="true" to='body'>
      <A></A>
    </teleport>
```

## keep-alive缓存组件

有时候我们不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。而是希望组件可以缓存下来,维持当前的状态。这时候就需要用到`keep-alive`组件。

开启keep-alive 生命周期的变化

初次进入时： onMounted> onActivated
退出后触发 deactivated
再次进入：
只会触发 onActivated
事件挂载的方法等，只执行一次的放在 onMounted中；组件每次进去执行的方法放在 onActivated中

```
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>
 
<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>
 
<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>
```

**`include` 和 `exclude`**

 `<keep-alive :include="" :exclude="" :max=""></keep-alive>`

include 和 exclude 允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：

**`max`**

`<keep-alive :max="10">
  <component :is="view"></component>
</keep-alive>`

## transition动画组件

 Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡:

- 条件渲染 (使用 v-if)
- 条件展示 (使用 v-show)
- 动态组件
- 组件根节点

自定义 transition 过度效果，你需要对`transition`组件的`name`属性自定义。并在css中写入对应的样式

### 过渡的类名

在进入/离开的过渡中，会有 6 个 class 切换。

过渡 class   在进入/离开的过渡中，会有 6 个 class 切换。

v-enter-from：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

v-enter-to：定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter-from 被移除)，在过渡/动画完成之后移除。

v-leave-from：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。

v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

v-leave-to：离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave-from 被移除)，在过渡/动画完成之后移除。

```
<button @click='flag = !flag'>切换</button>
<transition name='fade'>
	<div v-if='flag' class="box"></div>
</transition>
```

```
//开始过度
.fade-enter-from{
   background:red;
   width:0px;
   height:0px;
   transform:rotate(360deg)
}
//开始过度了
.fade-enter-active{
  transition: all 2.5s linear;
}
//过度完成
.fade-enter-to{
   background:yellow;
   width:200px;
   height:200px;
}
//离开的过度
.fade-leave-from{
  width:200px;
  height:200px;
  transform:rotate(360deg)
}
//离开中过度
.fade-leave-active{
  transition: all 1s linear;
}
//离开完成
.fade-leave-to{
  width:0px;
   height:0px;
}
```

### 自定义过渡 class 类名

transition props

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

自定义过度时间 单位毫秒

你也可以分别指定进入和离开的持续时间：

```
<transition :duration="1000">...</transition>
 
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

自定义class

```
        <transition
            leave-active-class="animate__animated animate__bounceInLeft"
            enter-active-class="animate__animated animate__bounceInRight"
        >
            <div v-if="flag" class="box"></div>
        </transition>
```

### transition 生命周期8个

```
  @before-enter="beforeEnter" //对应enter-from
  @enter="enter"//对应enter-active
  @after-enter="afterEnter"//对应enter-to
  @enter-cancelled="enterCancelled"//显示过度打断
  @before-leave="beforeLeave"//对应leave-from
  @leave="leave"//对应enter-active
  @after-leave="afterLeave"//对应leave-to
  @leave-cancelled="leaveCancelled"//离开过度打断
```

当只用 JavaScript 过渡的时候，在 **`enter` 和 `leave` 钩子中必须使用 `done` 进行回调**

```
const beforeEnter = (el: Element) => {
    console.log('进入之前from', el);
}
const Enter = (el: Element,done:Function) => {
    console.log('过度曲线');
    setTimeout(()=>{
       done()
    },3000)
}
const AfterEnter = (el: Element) => {
    console.log('to');
}
```

### appear

通过这个属性可以设置初始节点过度 就是页面加载完成就开始动画 对应三个状态

```
appear-active-class=""
appear-from-class=""
appear-to-class=""
appear
```

## transition-group过度列表

怎么同时渲染整个列表，比如使用 `v-for`？在这种场景下，我们会使用 `<transition-group>` 组件。

- 默认情况下，它不会渲染一个包裹元素，但是你可以通过 `tag` attribute 指定渲染一个元素。
- [过渡模式](https://v3.cn.vuejs.org/guide/transitions-enterleave.html#过渡模式)不可用，因为我们不再相互切换特有的元素。
- 内部元素**总是需要**提供唯一的 `key` attribute 值。
- CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身。

```
<transition-group>
     <div style="margin: 10px;" :key="item" v-for="item in list">{{ item }</div>
</transition-group>
```

```
const list = reactive<number[]>([1, 2, 4, 5, 6, 7, 8, 9])
const Push = () => {
    list.push(123)
}
const Pop = () => {
    list.pop()
}
```

### 列表的移动过渡

`<transition-group>` 组件还有一个特殊之处。除了进入和离开，它还可以为定位的改变添加动画。只需了解新增的 v-move 类就可以使用这个新功能，它会应用在元素改变定位的过程中。像之前的类名一样，它的前缀可以通过 name attribute 来自定义，也可以通过 move-class attribute 手动设置

```vue
<template>
    <div>
        <button @click="shuffle">Shuffle</button>
        <transition-group class="wraps" name="mmm" tag="ul">
            <li class="cell" v-for="item in items" :key="item.id">{{ item.number }}</li>
        </transition-group>
    </div>
</template>
  
<script setup  lang='ts'>
import _ from 'lodash'
import { ref } from 'vue'
let items = ref(Array.apply(null, { length: 81 } as number[]).map((_, index) => {
    return {
        id: index,
        number: (index % 9) + 1
    }
}))
const shuffle = () => {
    items.value = _.shuffle(items.value)
}
</script>
  
<style scoped lang="less">
.wraps {
    display: flex;
    flex-wrap: wrap;
    width: calc(25px * 10 + 9px);
    .cell {
        width: 25px;
        height: 25px;
        border: 1px solid #ccc;
        list-style-type: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
 
.mmm-move {
    transition: transform 0.8s ease;
}
</style>
```

### 状态过渡

Vue 也同样可以给字体 背景颜色等添加过渡动画

```
<template>
    <div>
        <input step="20" v-model="num.current" type="number" />
        <div>{{ num.tweenedNumber.toFixed(0) }}</div>
    </div>
</template>
    
<script setup lang='ts'>
import { reactive, watch } from 'vue'
import gsap from 'gsap'
const num = reactive({
    tweenedNumber: 0,
    current:0
})
 
watch(()=>num.current, (newVal) => {
    gsap.to(num, {
        duration: 1,
        tweenedNumber: newVal
    })
})
 
</script>
    
<style>
</style>
```

## 深入v-model

v-model 其实是一个语法糖 通过props 和 emit组合而成的

1.默认值的改变

- prop：`value` -> `modelValue`；
- 事件：`input` -> `update:modelValue`；
- `v-bind` 的 `.sync` 修饰符和组件的 `model` 选项已移除
- 新增 支持多个v-model
- 新增 支持自定义 修饰符 Modifiers

父组件

```vue
<template>
  <button @click="show = !show">开关{{show}}</button>
  <Dialog v-model="show"></Dialog>
</template>
 
<script setup lang='ts'>
import Dialog from "./components/Dialog/index.vue";
import {ref} from 'vue'
const show = ref(false)
</script>
 
<style>
</style>
```

子组件

```vue
<template>
     <div v-if='propData.modelValue' class="dialog">
         <div class="dialog-header">
             <div>标题</div><div @click="close">x</div>
         </div>
         <div class="dialog-content">
            内容
         </div>
     </div>
</template>
 
<script setup lang='ts'>
 
type Props = {
   modelValue:boolean
}
const propData = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const close = () => {
     emit('update:modelValue',false)
}
</script>
<style lang='less'>
.dialog{
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    &-header{
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    &-content{
        padding: 10px;
    }
}
</style>
```

### 绑定多个案例

父组件

```vue
<template>
  <button @click="show = !show">开关{{show}} ----- {{title}}</button>
  <Dialog v-model:title='title' v-model="show"></Dialog>
</template>
 
<script setup lang='ts'>
import Dialog from "./components/Dialog/index.vue";
import {ref} from 'vue'
const show = ref(false)
const title = ref('我是标题')
</script>
 
<style>
</style>
```

子组件

```vue
<template>
     <div v-if='modelValue ' class="dialog">
         <div class="dialog-header">
             <div>标题---{{title}}</div><div @click="close">x</div>
         </div>
         <div class="dialog-content">
            内容
         </div>
         
     </div>
</template>
 
<script setup lang='ts'>
 
type Props = {
   modelValue:boolean,
   title:string
}
 
const propData = defineProps<Props>()
 
const emit = defineEmits(['update:modelValue','update:title'])
 
const close = () => {
     emit('update:modelValue',false)
     emit('update:title','我要改变')
}
 
</script>
 
<style lang='less'>
.dialog{
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    &-header{
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    &-content{
        padding: 10px;
    }
}
</style>
```

### 自定义修饰符

添加到组件 `v-model` 的修饰符将通过 `modelModifiers` prop 提供给组件。在下面的示例中，我们创建了一个组件，其中包含默认为空对象的 `modelModifiers` prop

```vue
<script setup lang='ts'>
 
type Props = {
    modelValue: boolean,
    title?: string,
    modelModifiers?: {
        default: () => {}
    }
    titleModifiers?: {
        default: () => {}
    }
 
}
 
const propData = defineProps<Props>()
 
const emit = defineEmits(['update:modelValue', 'update:title'])
 
const close = () => {
    console.log(propData.modelModifiers);
 
    emit('update:modelValue', false)
    emit('update:title', '我要改变')
}
```

## 	自定义指令directive(属于破坏性更新)

directive-[自定义指令](https://so.csdn.net/so/search?q=自定义指令&spm=1001.2101.3001.7020)（属于破坏性更新）

### vue3指令的钩子函数

created 元素初始化的时候
beforeMount 指令绑定到元素后调用 只调用一次
mounted 元素插入父级dom调用
beforeUpdate 元素被更新之前调用
update 这个周期方法被移除 改用updated
beforeUnmount 在元素被移除前调用
unmounted 指令被移除后调用 只调用一次

Vue2 指令 bind inserted update componentUpdated unbind

### 在setup内定义局部指令

这里有一个需要注意的限制：必须以 `vNameOfDirective` 的形式来命名本地自定义指令，以使得它们可以直接在模板中使用。

```vue
<template>
  <button @click="show = !show">开关{{show}} ----- {{title}}</button>
  <Dialog  v-move-directive="{background:'green',flag:show}"></Dialog>
</template>
```

```js
 
const vMoveDirective: Directive = {
  created: () => {
    console.log("初始化====>");
  },
  beforeMount(...args: Array<any>) {
    // 在元素上做些操作
    console.log("初始化一次=======>");
  },
  mounted(el: any, dir: DirectiveBinding<Value>) {
    el.style.background = dir.value.background;
    console.log("初始化========>");
  },
  beforeUpdate() {
    console.log("更新之前");
  },
  updated() {
    console.log("更新结束");
  },
  beforeUnmount(...args: Array<any>) {
    console.log(args);
    console.log("======>卸载之前");
  },
  unmounted(...args: Array<any>) {
    console.log(args);
    console.log("======>卸载完成");
  },
};
```

### 生命周期钩子参数详解

第一个 el 当前绑定的DOM 元素

第二个 binding

instance：使用指令的组件实例。
value：传递给指令的值。例如，在 v-my-directive="1 + 1" 中，该值为 2。
oldValue：先前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否有更改都可用。
arg：传递给指令的参数(如果有的话)。例如在 v-my-directive:foo 中，arg 为 "foo"。
modifiers：包含修饰符(如果有的话) 的对象。例如在 v-my-directive.foo.bar 中，修饰符对象为 {foo: true，bar: true}。
dir：一个对象，在注册指令时作为参数传递。

第三个 当前元素的虚拟DOM 也就是Vnode

第四个 prevNode 上一个虚拟节点，仅在 `beforeUpdate` 和 `updated` 钩子中可用 

### 函数简写

你可能想在 `mounted` 和 `updated` 时触发相同行为，而不关心其他的钩子函数。那么你可以通过将这个函数模式实现

```vue
<template>
   <div>
      <input v-model="value" type="text" />
      <A v-move="{ background: value }"></A>
   </div>
</template>
   
<script setup lang='ts'>
import A from './components/A.vue'
import { ref, Directive, DirectiveBinding } from 'vue'
let value = ref<string>('')
type Dir = {
   background: string
}
const vMove: Directive = (el, binding: DirectiveBinding<Dir>) => {
   el.style.background = binding.value.background
}
</script>

```

自定义拖拽指令 

```vue
<template>
  <div v-move class="box">
    <div class="header"></div>
    <div>
      内容
    </div>
  </div>
</template>
 
<script setup lang='ts'>
import { Directive } from "vue";
const vMove: Directive = {
  mounted(el: HTMLElement) {
    let moveEl = el.firstElementChild as HTMLElement;
    const mouseDown = (e: MouseEvent) => {
      //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
      console.log(e.clientX, e.clientY, "-----起始", el.offsetLeft);
      let X = e.clientX - el.offsetLeft;
      let Y = e.clientY - el.offsetTop;
      const move = (e: MouseEvent) => {
        el.style.left = e.clientX - X + "px";
        el.style.top = e.clientY - Y + "px";
        console.log(e.clientX, e.clientY, "---改变");
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", move);
      });
    };
    moveEl.addEventListener("mousedown", mouseDown);
  },
};
</script>
 
<style lang='less'>
.box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  .header {
    height: 20px;
    background: black;
    cursor: move;
  }
}
</style>
```

## 自定义Hooks

Vue3 自定义Hook

主要用来处理复用代码逻辑的一些封装

这个在vue2 就已经有一个东西是Mixins

mixins就是将这些多个相同的逻辑抽离出来，各个组件只需要引入mixins，就能实现一次写代码，多组件受益的效果。

弊端就是 会涉及到覆盖的问题

组件的data、methods、filters会覆盖mixins里的同名data、methods、filters。

第二点就是 变量来源不明确（隐式传入），不利于阅读，使代码变得难以维护。

Vue3 的自定义的hook

Vue3 的 hook函数 相当于 vue2 的 mixin, 不同在与 hooks 是函数
Vue3 的 hook函数 可以帮助我们提高代码的复用性, 让我们能在不同的组件中都利用 hooks 函数

Vue3 hook 库[Get Started | VueUse](https://vueuse.org/guide/)

## Vue3定义全局函数和变量

### globalProperties

由于[Vue3](https://so.csdn.net/so/search?q=Vue3&spm=1001.2101.3001.7020) 没有Prototype 属性 使用 app.config.globalProperties 代替 然后去定义变量和函数

```js
// 之前 (Vue 2.x)
Vue.prototype.$http = () => {}

// 之后 (Vue 3.x)
const app = createApp({})
app.config.globalProperties.$http = () => {}
```

### 过滤器

在Vue3 移除了

可以使用全局函数代替Filters

```js
app.config.globalProperties.$filters = {
  format<T extends any>(str: T): string {
    return `$${str}`
  }
}
```

声明文件 不然TS无法正确类型 推导

```js
type Filter = {
    format<T>(str: T): string
}
 
// 声明要扩充@vue/runtime-core包的声明.
// 这里扩充"ComponentCustomProperties"接口, 因为他是vue3中实例的属性的类型.
declare module 'vue' {
    export interface ComponentCustomProperties {
        $filters: Filter
    }
}
```

setup 读取值

```js
import { getCurrentInstance, ComponentInternalInstance } from 'vue';
 
const { appContext } = <ComponentInternalInstance>getCurrentInstance()
 
console.log(appContext.config.globalProperties.$env);
 
推荐第二种方式
 
import {ref,reactive,getCurrentInstance} from 'vue'
const app = getCurrentInstance()
console.log(app?.proxy?.$filters.format('js'))
```

## 编写Vue3插件

插件是自包含的代码，通常向 Vue 添加全局级功能。你如果是一个对象需要有install方法Vue会帮你自动注入到install 方法 你如果是function 就直接当install 方法去使用

在使用 `createApp()` 初始化 Vue 应用程序后，你可以通过调用 `use()` 方法将插件添加到你的应用程序中。

实现一个Loading

```vue
// Loading.Vue
<template>
    <div v-if="isShow" class="loading">
        <div class="loading-content">Loading...</div>
    </div>
</template>
    
<script setup lang='ts'>
import { ref } from 'vue';
const isShow = ref(false)//定位loading 的开关
 
const show = () => {
    isShow.value = true
}
const hide = () => {
    isShow.value = false
}
//对外暴露 当前组件的属性和方法
defineExpose({
    isShow,
    show,
    hide
})
</script>
<style scoped lang="less">
.loading {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    &-content {
        font-size: 30px;
        color: #fff;
    }
}
</style>
```

```js
// Loading.ts
import {  createVNode, render, VNode, App } from 'vue';
import Loading from './index.vue'
 
export default {
    install(app: App) {
        //createVNode vue提供的底层方法 可以给我们组件创建一个虚拟DOM 也就是Vnode
        const vnode: VNode = createVNode(Loading)
        //render 把我们的Vnode 生成真实DOM 并且挂载到指定节点
        render(vnode, document.body)
        // Vue 提供的全局配置 可以自定义
        app.config.globalProperties.$loading = {
            show: () => vnode.component?.exposed?.show(),
            hide: () => vnode.component?.exposed?.hide()
        }
 
    }
}
```

```js
// Main.ts
import Loading from './components/loading'
 
let app = createApp(App)
app.use(Loading)
type Lod = {
    show: () => void,
    hide: () => void
}
//编写ts loading 声明文件放置报错 和 智能提示
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $loading: Lod
    }
}
app.mount('#app')
```

```vue
// 使用方法
<template>
  <div></div>
</template>
<script setup lang='ts'>
import { ref,reactive,getCurrentInstance} from 'vue'
const  instance = getCurrentInstance()  
instance?.proxy?.$Loading.show()
setTimeout(()=>{
  instance?.proxy?.$Loading.hide()
},5000)
// console.log(instance)
</script>
<style>
*{
  padding: 0;
  margin: 0;
}
</style>
```

### Vue use 源码手写

```
import type { App } from 'vue'
import { app } from './main'
 
interface Use {
    install: (app: App, ...options: any[]) => void
}
 
const installedList = new Set()
 
export function MyUse<T extends Use>(plugin: T, ...options: any[]) {
    if(installedList.has(plugin)){
      return console.warn('重复添加插件',plugin)
    }else{
        plugin.install(app, ...options)
        installedList.add(plugin)
    }
} 
```

## Scoped和样式 穿透

主要是用于修改很多vue常用的组件库（element, [vant](https://so.csdn.net/so/search?q=vant&spm=1001.2101.3001.7020), AntDesigin），虽然配好了样式但是还是需要更改其他的样式

就需要用到[样式穿透](https://so.csdn.net/so/search?q=样式穿透&spm=1001.2101.3001.7020)

[scoped](https://so.csdn.net/so/search?q=scoped&spm=1001.2101.3001.7020)的原理

vue中的scoped 通过在DOM结构以及css样式上加唯一不重复的标记:data-v-hash的方式，以保证唯一（而这个工作是由过PostCSS转译实现的），达到样式私有化模块化的目的。

总结一下scoped三条渲染规则：

1. 给HTML的DOM节点加一个不重复data属性(形如：data-v-123)来表示他的唯一性
2. 在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的data属性选择器（如[data-v-123]）来私有化样式
3. 如果组件内部包含有其他组件，只会给其他组件的最外层标签加上当前组件的data属性（具有多个根节点的子组件不能从父范围的样式设置样式）

PostCSS会给一个组件中的所有dom添加了一个独一无二的动态属性data-v-xxxx，然后，给CSS选择器额外添加一个对应的属性选择器来选择该组件中dom，这种做法使得样式只作用于含有该属性的dom——组件内部dom, 从而达到了'样式模块化'的效果.

 Vue 提供了样式穿透:**deep()** 他的作用就是用来改变 属性选择器的位置

## css Style完整新特性

除了deep(),其实还有两个选择器可以补充

### 插槽选择器(slotted)

```vue
// A组件
<template>
    <div>
        我是插槽
        <slot></slot>
    </div>
</template>
 
<script>
export default {}
</script>
 

<style scoped>
 :slotted(.a) {
    color:red
 }

</style>
```

```vue
// 父组件
<template>
    <div>
        <A>
            <div class="a">私人定制div</div>
        </A>
    </div>
</template>
 
<script setup>
import A from "@/components/A.vue"
</script>
 
<style lang="less" scoped>
</style>
```



### 全局选择器

在之前我们想加入全局 样式 通常都是新建一个style 标签 不加[scoped](https://so.csdn.net/so/search?q=scoped&spm=1001.2101.3001.7020) 现在有更优雅的解决方案

```css
<style>
 div{
     color:red
 }
</style>
 
//  效果等同于上面
<style lang="less" scoped>
:global(div){
    color:red
}
</style>
```

### 动态 CSS

单文件组件的 `<style>` 标签可以通过 `v-bind` 这一 CSS 函数将 CSS 的值关联到动态的组件状态上：

```vue
<template>
    <div class="div">
       小满是个弟弟
    </div>
</template>
 
<script lang="ts" setup>
import { ref } from 'vue'
const red = ref<string>('red')
</script>
 
<style lang="less" scoped>
.div{
   color:v-bind(red)
}
 
</style>
```

如果是对象 [v-bind](https://so.csdn.net/so/search?q=v-bind&spm=1001.2101.3001.7020) ,加引号

```vue
 <template>
    <div class="div">
        小满是个弟弟
    </div>
</template>
 
<script lang="ts" setup>
import { ref } from "vue"
const red = ref({
    color:'pink'
})
</script>
 
    <style lang="less" scoped>
.div {
    color: v-bind('red.color');
}
</style>
```

## Mitt

在[vue3](https://so.csdn.net/so/search?q=vue3&spm=1001.2101.3001.7020)中$on，$off 和 $once 实例方法已被移除，组件实例不再实现事件触发接口，因此大家熟悉的EventBus便无法使用了。然而我们习惯了使用EventBus，对于这种情况我们可以使用Mitt库（其实就是我们视频中讲的发布订阅模式的设计）

### main.ts 初始化

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
 
const Mit = mitt()
 
//TypeScript注册
// 由于必须要拓展ComponentCustomProperties类型才能获得类型提示
declare module "vue" {
    export interface ComponentCustomProperties {
        $Bus: typeof Mit
    }
}
 
const app = createApp(App)
 
//Vue3挂载全局API
app.config.globalProperties.$Bus = Mit
 
app.mount('#app')
```

### 使用方法通过emit派发， on 方法添加事件，off 方法移除，clear 清空所有

```vue
// A组件派发（emit）
<template>
    <div>
        <h1>我是A</h1>
        <button @click="emit1">emit1</button>
        <button @click="emit2">emit2</button>
    </div>
</template>
 
<script setup lang='ts'>
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance();
const emit1 = () => {
    instance?.proxy?.$Bus.emit('on-num', 100)
}
const emit2 = () => {
    instance?.proxy?.$Bus.emit('*****', 500)
}
</script>
 
<style>
</style>
```

```vue
B组件监听（on）
<template>
    <div>
        <h1>我是B</h1>
    </div>
</template>
 
<script setup lang='ts'>
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
instance?.proxy?.$Bus.on('on-num', (num) => {
    console.log(num,'===========>B')
})
</script>
 
<style>
</style>
```

### 监听所有事件（ on("*") ）

```typescript
instance?.proxy?.$Bus.on('*',(type,num)=>{
    console.log(type,num,'===========>B')
})
```

### 移除监听事件（off）

```typescript
const Fn = (num: any) => {
    console.log(num, '===========>B')
}
instance?.proxy?.$Bus.on('on-num',Fn)//listen
instance?.proxy?.$Bus.off('on-num',Fn)//unListen
```

### 清空所有监听（clear）

```typescript
instance?.proxy?.$Bus.all.clear() 
```

## 环境变量

**他的主要作用就是让开发者区分不同的运行环境，来实现 兼容开发和生产**

**例如 npm run dev 就是开发环境 npm run build 就是生产环境等等**

[Vite](https://so.csdn.net/so/search?q=Vite&spm=1001.2101.3001.7020) 在一个特殊的 **`import.meta.env`** 对象上暴露环境变量。这里有一些在所有情况下都可以使用的内建变量

```json
{
    "BASE_URL":"/", //部署时的URL前缀
    "MODE":"development", //运行模式
    "DEV":true,"  //是否在dev环境
    PROD":false, //是否是build 环境
    "SSR":false //是否是SSR 服务端渲染模式
}
```

**需要注意的一点就是这个环境变量不能使用动态赋值import.meta.env[key] 因为这些环境变量在打包的时候是会被硬编码的通过JSON.stringify 注入浏览器的**

### 配置额外的环境变量

在根目录新建env 文件 可以创建多个

格式：.env.development

 修改启动命令

在 package json 配置 --mode env文件名称()

配置智能提示:env.d.ts

```
interface ImportMetaEnv {
    VITE_XIAOMAN:string
}
```

读取环境变量属性值

import.meta.env.VITE_XIAOMAN

### 生产环境使用

创建 .env.production 在执行npm run build 的时候他会自己加载这个文件 

### **如果想在vite.config.ts 使用环境变量**

```typescript
import { fileURLToPath, URL } from 'node:url'
 
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
 
 
 
// https://vitejs.dev/config/
export default ({mode}:any) => {
 
  console.log(loadEnv(mode,process.cwd()))
  
  return defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
} 
```

## Proxy跨域

### 什么是[跨域](https://so.csdn.net/so/search?q=跨域&spm=1001.2101.3001.7020)

主要是出于浏览器的[同源策略](https://so.csdn.net/so/search?q=同源策略&spm=1001.2101.3001.7020)限制，它是浏览器最核心也最基本的安全功能。

当一个请求url的 **协议、域名、端口** 三者之间任意一个与当前页面url不同即为跨域。

### 如何解决跨域

1.[jsonp](https://so.csdn.net/so/search?q=jsonp&spm=1001.2101.3001.7020) 这种方式在之前很常见，他实现的基本原理是利用了HTML里script元素标签没有跨域限制 动态创建script标签，将src作为服务器地址，服务器返回一个callback接受返回的参数

2.cors 设置 CORS 允许跨域资源共享 需要后端设置

3.使用Vite proxy 或者 node代理 或者 webpack proxy 他们三种方式都是代理

```js
// node 后端接口
const express = require('express')
const app = express()
 
//创建get请求
app.get('/xm',(req,res)=>{
     res.json({
        code:200,
        message:"请求成功"
     })
})
//端口号9001
app.listen(9001)
```

在vite.config.js/ts 进行配置

```
export default defineConfig({
  plugins: [vue()],
  server:{
     proxy:{
        '/api':{
            target:"http://localhost:9001/", //跨域地址
            changeOrigin:true, //支持跨域
            rewrite:(path) => path.replace(/^\/api/, "")//重写路径,替换/api
        }
     }
  }
})
```

