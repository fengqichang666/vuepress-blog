---
title: Proxy和Object.defineProperty
date: 2021-07-07 10:31:00
tags: Proxy和Object.defineProperty
---

## **Object.defineProperty**

vue2.x 以及之前的版本使用 Object.defineProperty 实现数据的双向绑定，简单实现下

```
let obj = {
  name: '李四',
  address: '上海浦东新区',
  flags: {
    book: {
      page: 153,
      name: 'JS'
    },
    hobby: ['足球', '游戏', '音乐']
  }
}
function observer(obj) {
  if (typeof obj == 'object') {
    for (let key in obj) {
      defineReactive(obj, key, obj[key])
    }
  }
}
 
function defineReactive(obj, key, value) {
  Object.defineProperty(obj, key, {
    get() {
      console.log('获取：' + key)
      return value
    },
    set(val) {
      observer(val)
      console.log(key + "-数据改变了")
      value = val
    }
  })
}
 
observer(obj)
```

问题1.删除或者增加对象属性无法监听到

```
Vue.$delete(target,key)   this.$delete(this.form,'members1')

方案一：利用Vue.set(object,key,value)
Vue.set(vm.obj,"sex","man")

方案二：利用this.$set(this.object,key,value)
this.$set(this.obj,"sex","man")

方案三：利用Object.assign({},this.obj)
this.obj.sex = "man";
this.obj = Object.assign({},this.obj)
或者下面方式
this.obj = Object.assign({ },this.obj,{"sex","man"})
```

问题2.数组的变化无法监听到   比如 obj.arr[0]='sss' 打印 ['sss', '游戏', '音乐'] 只会触发get  不会触发set;   

```swift
可以检测到：
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
```

问题3. 由于是使用递归遍历对象，使用 Object.defineProperty 劫持对象的属性，如果遍历的对象层级比较深，花的时间比较久，甚至有性能的问题

## **proxy** 

 对象用于定义基本操作的自定义行为

简单来说就是，可以在对目标对象设置一层拦截。无论对目标对象进行什么操作，都要经过这层拦截

```
let obj = {
      name: '李四',
      address: '上海浦东新区',
      flags: {
        book: {
          page: 153,
          name: 'JS'
        },
        hobby: ['足球', '游戏', '音乐']
      }
    }
 
 
    function observerProxy(obj) {
      const handler = {
        get(target, key, receiver) {
          console.log('获取：' + key) // 如果是对象，就递归添加 proxy 拦截
          if (typeof target[key] === 'object' && target[key] !== null) {
            return new Proxy(target[key], handler)
          }
          return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver) {
          console.log('设置：' + key) // 如果是对象，就递归添加 proxy 拦截
          return Reflect.set(target, key, value, receiver)
        }
      }
      return new Proxy(obj, handler)
    }
 
    let newObj = observerProxy(obj)
```

1.Object.defineProperty 拦截的是对象的属性，会改变原对象。proxy 是拦截整个对象，通过 new 生成一个新对象，不会改变原对象。

2.proxy 的拦截方式，除了上面的 get 和 set ，还有 11 种。选择的方式很多 Proxy，也可以监听一些 Object.defineProperty 监听不到的操作，比如监听数组，监听对象属性的新增，删除等。

Object.defineProperty() 的问题主要有三个：

- 不能监听数组的变化
- 必须遍历对象的每个属性
- 必须深层遍历嵌套的对象

Proxy 在 ES2015 规范中被正式加入，它有以下几个特点

- 针对对象：针对整个对象，而不是对象的某个属性，所以也就不需要对 keys 进行遍历。这解决了上述 Object.defineProperty() 第二个问题
- 支持数组：Proxy 不需要对数组的方法进行重载，省去了众多 hack，减少代码量等于减少了维护成本，而且标准的就是最好的。

除了上述两点之外，Proxy 还拥有以下优势：

- Proxy 的第二个参数可以有 13 种拦截方法，这比起 Object.defineProperty() 要更加丰富
- Proxy 作为新标准受到浏览器厂商的重点关注和性能优化，相比之下 Object.defineProperty() 是一个已有的老方法。

##  基于数据劫持双向绑定的实现思路

基于数据劫持的双向绑定离不开`Proxy`与`Object.defineProperty`等方法对对象/对象属性的"劫持",我们要实现一个完整的双向绑定需要以下几个要点。

1. 利用`Proxy`或`Object.defineProperty`生成的Observer针对对象/对象的属性进行"劫持",在属性发生变化后通知订阅者
2. 解析器Compile解析模板中的`Directive`(指令)，收集指令所依赖的方法和数据,等待数据变化然后进行渲染
3. Watcher属于Observer和Compile桥梁,它将接收到的Observer产生的数据变化,并根据Compile提供的指令进行视图渲染,使得数据变化促使视图变化
