---
title: vue响应式原理、依赖收集
date: 2023-02-23 09:38:38
tags: vue响应式原理、依赖收集
---

![vue原理图](https://fengqichang666.github.io/images/vueDep.png)

![vue原理图](https://fengqichang666.github.io/images/vueDep2.png)

## 概览

vue 作为一种[MVVM]模式的框架， 其数据绑定的底层原理为：**数据劫持 + 发布订阅者模式**。

其中主要有这么**四种“角色”**：Observer数据劫持, Dep数据收集, Watcer订阅者，以及 Compiler 模板编译器。

**Observer （数据劫持）**
核心是通过Obeject.defineProperty()来监听数据的变动，这个函数内部可以定义setter和getter。
每当数据发生变化，就会触发setter()。这时候 [Observer] 就要通过 Dep 通知 Watcher 订阅者。

**发布订阅模式**主要是通过 **Dep** 和 **Watcher** 来完成。

**Dep** （发布者）
有 **addWatcher**() 和 **notify**() 两个方法，（收集 Watcher 依赖，并通知依赖变更）。
Dep 中存放着 Watcher 实例化时存放的所有依赖，是个数据集，当 Dep 收到来自 Observer 的数据变化通知时，Dep 会调用 notify() 方法去通知 Watcher 进行更新。

**Watcher** （订阅者）

渲染`Watcher`是一个组件实例只有一个，这样做是为了减少watcher实例所占用的内存开销。有一个 **update**() 方法，（订阅 Dep ，接收数据变更）。
Watcher 是 Observer 和 Compile 之间通信的桥梁，主要做的事情是：

1. 在自身实例化时往 Dep 中添加自己；
2. 当它收到来自 Dep 的数据变化通知后（ Dep.notify() ），会调用自身的 update() 方法，并触发Compile中绑定的回调。

**Compile**
Compile主要做的事情是解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，**一旦接收到数据有变动，收到通知，更新视图**。

## 响应式原理

### 数据劫持

在我们访问或者修改某个对象的某个属性的时候，通过一段代码进行拦截，然后进行额外的操作，返回结果。vue中双向数据绑定就是一个典型的应用。

### 简述：

遍历对象，通过`Object.defineProperty`为每个属性添加 getter 和 setter，进行数据劫持。getter 函数用于在数据读取时进行依赖收集，在对应的 dep 中存储所有的 watcher；setter 则是数据更新后通知所有的 watcher 进行更新。

Object.defineProperty() 和 Proxy 对象，都可以用来对数据的劫持操作。

Vue2.x 是使用 Object.defindProperty()，来实现对对象的监听。

Vue3.x 版本之后就改用Proxy实现。

`Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。`

当把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的 property，并使用 Object.defineProperty 把这些 property 全部转为 getter/setter。简单理解就是在data和用户之间做了一层代理中间层，在vue initData的时候，将_data上面的数据代理到vm上，通过observer类将所有的data变成可观察的，及对data定义的每一个属性进行getter\setter操作，这就是Vue实现响应式的基础。

Vue数据响应式变化主要涉及 Observer, Watcher , Dep 这三个主要的类。因此要弄清Vue响应式变化需要明白这个三个类之间是如何运作联系的；以及它们的原理，负责的逻辑操作。

![vue原理图](https://fengqichang666.github.io/images/vueDep3.png)

### Observer

`Object.defineProperty`的用法

```
const obj = {}

let val = 1
Object.defineProperty(obj, a, {
  get() { // 下文中该方法统称为getter
    console.log('get property a')
    return val
  },
  set(newVal) { // 下文中该方法统称为setter
    if (val === newVal) return
    console.log(`set property a -> ${newVal}`)
    val = newVal
  }
})
```

当我们访问`obj.a`时，打印`get property a`并返回1，`obj.a = 2`设置新的值时，打印`set property a -> 2`。这相当于我们自定义了`obj.a`取值和赋值的行为，使用自定义的`getter`和`setter`来重写了原有的行为，这也就是`数据劫持`的含义。

但是上面的代码有一个问题：我们需要一个全局的变量来保存这个属性的值，因此，我们可以用下面的写法（闭包）

```
// value使用了参数默认值
function defineReactive(data, key, value = data[key]) {
  Object.defineProperty(data, key, {
    get: function reactiveGetter() {
      return value
    },
    set: function reactiveSetter(newValue) {
      if (newValue === value) return
      value = newValue
    }
  })
}

defineReactive(obj, a, 1)
```

如果`obj`有多个属性呢？我们可以新建一个类`Observer`来遍历该对象

Observer类是将每个目标对象（即data）的键值转换成getter/setter形式，用于进行依赖收集以及调度更新。那么在vue这个类是如何实现的：

- 1、observer实例绑定在data的ob属性上面，防止重复绑定；
- 2、若data为数组，先实现对应的[变异方法]（Vue重写了数组的7种原生方法）再将数组的每个成员进行observe，使之成响应式数据；
- 3、否则执行walk()方法，遍历data所有的数据，进行getter/setter绑定。这里的核心方法就是 defineReative(obj, keys[i], obj[keys[i]])

```
class Observer {
  constructor(value) {
    this.value = value
    this.walk()
  }
  walk() {
    Object.keys(this.value).forEach((key) => defineReactive(this.value, key))
  }
}

const obj = { a: 1, b: 2 }
new Observer(obj)
```

如果`obj`内有嵌套的属性呢？我们可以使用递归来完成嵌套属性的数据劫持

vue采用递归的思想在defineReactive函数中在执行一次observer函数就行，递归将对象在遍历一次获取key/value值

同样在设置值的时候可能会把name也设置成一个对象，因此在data值更新的时候也需要进行判断深度监听

```
// 入口函数
function observe(data) {
  if (typeof data !== 'object') return
  // 调用Observer
  new Observer(data)
}

class Observer {
  constructor(value) {
    this.value = value
    this.walk()
  }
  walk() {
    // 遍历该对象，并进行数据劫持
    Object.keys(this.value).forEach((key) => defineReactive(this.value, key))
  }
}

function defineReactive(data, key, value = data[key]) {
  // 如果value是对象，递归调用observe来监测该对象
  // 如果value不是对象，observe函数会直接返回
  observe(value)
  Object.defineProperty(data, key, {
    get: function reactiveGetter() {
      return value
    },
    set: function reactiveSetter(newValue) {
      if (newValue === value) return
      value = newValue
      observe(newValue) // 设置的新值也要被监听
    }
  })
}

const obj = {
  a: 1,
  b: {
    c: 2
  }
}

observe(obj)
```

```
执行observe(obj)
├── new Observer(obj),并执行this.walk()遍历obj的属性，执行defineReactive()
    ├── defineReactive(obj, a)
        ├── 执行observe(obj.a) 发现obj.a不是对象，直接返回
        ├── 执行defineReactive(obj, a) 的剩余代码
    ├── defineReactive(obj, b) 
	    ├── 执行observe(obj.b) 发现obj.b是对象
	        ├── 执行 new Observer(obj.b)，遍历obj.b的属性，执行defineReactive()
                    ├── 执行defineReactive(obj.b, c)
                        ├── 执行observe(obj.b.c) 发现obj.b.c不是对象，直接返回
                        ├── 执行defineReactive(obj.b, c)的剩余代码
            ├── 执行defineReactive(obj, b)的剩余代码
代码执行结束
```



这就是简单的一个Observer类，这也是vue响应式的基本原理。但我们都知道 object.defineproperty的存在一些缺点：

1、对于复杂的对象需要深度监听，递归到底，一次性计算量大；

2、无法监听新增属性/删除属性（Vue.set Vue.delete）；

3、无法监听数组，需特殊处理，也就是上面说的变异方法；

### vue数组的监听

object.defineproperty对数组是不起作用的（因为未对数组每一项进行数据劫持），那么在vue中又是如何去监听数组的变化，其实Vue 将被侦听的数组的变更方法进行了包裹。接下来将用简单代码演示：

```
// 防止全局污染，重新定义数组原型
const oldArrayProperty = Array.prototype
// 创建新对象，原型指向oldArrayProperty
const arrProto = Object.create(oldArrayProperty);

['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
  arrProto[methodName] = function () { // 在定义数组的方法
    updateView()
    oldArrayProperty[methodName].call(this, ...arguments) // 实际执行数组的方法
  }
})

// 在Observer函数中对数组进行处理
if (Array.isArray(value)) {
    value.__proto__ = arrProto
  }
```

从代码中看到，在Observer函数有一层对数组进行拦截，将数组的__proto__指向了一个arrProto，arrProto是一个对象，这个对象指向数组的原型，因此arrProto拥有了数组原型上的方法，然后在这对象上重新自定义了数组的7中方法将其包裹，但又不会影响数组原型的方法，这就是变异，再将数组的每个成员进行observe，使之成响应式数据。

### 数据代理

`vm 拿到data中的数据后，放在了vm里的_data中。实际上data就是_data。vm中的age代理了_data中的age。读取vm.age时，调用get方法，读取了_data中的age。修改了vm中的age时，就会调用set方法去修改_data中的age。估计会有人想为什么要多此一举呢？其实，如果不做代理，那么在{{  }}中就要这样写了{{_data.xxx}}，会很麻烦。`

### 依赖收集与派发更新

![vue原理图](https://fengqichang666.github.io/images/vueDep4.png)

为了提高代码执行效率，我们没有必要对其进行响应式处理，因此，依赖收集简单理解就是收集只在实际页面中用到的data数据，那么Vue是如何进行依赖收集的，这也就是要讲的Watcher、Dep类了。

#### 依赖

**Watcher**类可以如下实现

```
class Watcher {
  constructor(data, expression, cb) {
    // data: 数据对象，如obj
    // expression：表达式，如b.c，根据data和expression就可以获取watcher依赖的数据
    // cb：依赖变化时触发的回调
    this.data = data
    this.expression = expression
    this.cb = cb
    // 初始化watcher实例时订阅数据
    this.value = this.get()
  }
  
  get() {
    const value = parsePath(this.data, this.expression)
    return value
  }
  
  // 当收到数据变化的消息时执行该方法，从而调用cb
  update() {
    this.value = parsePath(this.data, this.expression) // 对存储的数据进行更新
    cb()
  }
}

function parsePath(obj, expression) {
  const segments = expression.split('.')
  for (let key of segments) {
    if (!obj) return
    obj = obj[key]
  }
  return obj
}
```

1. 需要有一个数组来存储`watcher`
2. `watcher`实例需要订阅(依赖)数据，也就是获取依赖或者收集依赖
3. `watcher`的依赖发生变化时触发`watcher`的回调函数，也就是派发更新。

每个数据都应该维护一个属于自己的数组，该数组来存放依赖自己的`watcher`，我们可以在`defineReactive`中定义一个数组`dep`，这样通过闭包，每个属性就能拥有一个属于自己的`dep`

```
function defineReactive(data, key, value = data[key]) {
  const dep = [] // 增加
  observe(value)
  Object.defineProperty(data, key, {
    get: function reactiveGetter() {
      return value
    },
    set: function reactiveSetter(newValue) {
      if (newValue === value) return
      value = newValue
      observe(newValue)
      dep.notify()
    }
  })
}
```

#### 依赖收集

页面的初次渲染过程中(暂时忽略渲染函数和虚拟`DOM`等部分)：渲染引擎会解析模板，比如引擎遇到了一个插值表达式，如果我们此时实例化一个`watcher`，会发生什么事情呢？从`Watcher`的代码中可以看到，实例化时会执行`get`方法，`get`方法的作用就是`获取`自己依赖的数据，而我们重写了数据的访问行为，为每个数据定义了`getter`，因此`getter`函数就会执行，如果我们在`getter`中把当前的`watcher`添加到`dep`数组中(淘宝低登记买家信息)，就能够完成依赖收集了

```
注意：执行到getter时，new Watcher()的get方法还没有执行完毕。
new Watcher()时执行constructor，调用了实例的get方法，实例的get方法会读取数据的值，从而触发了数据的getter，
getter执行完毕后，实例的get方法执行完毕，并返回值，constructor执行完毕，实例化完毕。
```

通过上面的分析，我们只需要对`getter`进行一些修改：

```
get: function reactiveGetter() {
  dep.push(watcher) // 新增
  return value
}
```

`watcher`这个变量从哪里来呢？我们是在模板编译函数中的实例化`watcher`的，`getter`中取不到这个实例啊。解决方法也很简单，将`watcher`实例放到全局不就行了吗，比如放到`window.target`上。因此，`Watcher`的`get`方法做如下修改

```
get() {
  window.target = this // 新增
  const value = parsePath(this.data, this.expression)
  return value
}
```

这样，将`get`方法中的`dep.push(watcher)`修改为`dep.push(window.target)`即可。

> 注意，不能这样写window.target = new Watcher()。因为执行到getter的时候，实例化watcher还没有完成，所以window.target还是undefined

> 依赖收集过程：渲染页面时碰到插值表达式，`v-bind`等需要数据等地方，会实例化一个`watcher`,实例化`watcher`就会对依赖的数据求值，从而触发`getter`，数据的`getter`函数就会添加依赖自己的`watcher`，从而完成依赖收集。我们可以理解为`watcher`在收集依赖，而代码的实现方式是在数据中存储依赖自己的`watcher`

> 利用这种方法，每遇到一个插值表达式就会新建一个`watcher`，这样每个节点就会对应一个`watcher`。实际上这是`vue1.x`的做法，以节点为单位进行更新，粒度较细。而`vue2.x`的做法是每个组件对应一个`watcher`，实例化`watcher`时传入的也不再是一个`expression`，而是渲染函数，渲染函数由组件的模板转化而来，这样一个组件的`watcher`就能收集到自己的所有依赖，以组件为单位进行更新，是一种中等粒度的方式。要实现`vue2.x`的响应式系统涉及到很多其他的东西，比如组件化，虚拟`DOM`等，而这个系列文章只专注于数据响应式的原理，因此不能实现`vue2.x`，但是两者关于响应式的方面，原理相同。

#### 派发更新

实现依赖收集后，我们最后要实现的功能是派发更新，也就是依赖变化时触发`watcher`的回调。从依赖收集部分我们知道，获取哪个数据，也就是说触发哪个数据的`getter`，就说明`watcher`依赖哪个数据，那数据变化的时候如何通知`watcher`呢？在`setter`中派发更新。

```
set: function reactiveSetter(newValue) {
  if (newValue === value) return
  value = newValue
  observe(newValue)
  dep.forEach(d => d.update()) // 新增 update方法见Watcher类
}
```

#### 优化代码

#####  Dep类

将`dep`数组抽象为一个类:

```
class Dep {
  constructor() {
    this.subs = []
  }

  depend() {
    this.addSub(Dep.target)
  }

  notify() {
    const subs = [...this.subs]
    subs.forEach((s) => s.update())
  }

  addSub(sub) {
    this.subs.push(sub)
  }
}
```

`defineReactive`函数只需做相应的修改

```
function defineReactive(data, key, value = data[key]) {
  const dep = new Dep() // 修改
  observe(value)
  Object.defineProperty(data, key, {
    get: function reactiveGetter() {
      dep.depend() // 修改
      return value
    },
    set: function reactiveSetter(newValue) {
      if (newValue === value) return
      value = newValue
      observe(newValue)
      dep.notify() // 修改
    }
  })
}
```

##### window.target

在`watcher`的`get`方法中

```
get() {
  window.target = this // 设置了window.target
  const value = parsePath(this.data, this.expression)
  return value
}
```

我们没有重置`window.target`。有些同学可能认为这没什么问题，但是考虑如下场景：有一个对象`obj: { a: 1, b: 2 }`我们先实例化了一个`watcher1`，`watcher1`依赖`obj.a`，那么`window.target`就是`watcher1`。之后我们访问了`obj.b`，会发生什么呢？访问`obj.b`会触发`obj.b`的`getter`，`getter`会调用`dep.depend()`，那么`obj.b`的`dep`就会收集`window.target`， 也就是`watcher1`，这就导致`watcher1`依赖了`obj.b`，但事实并非如此。为解决这个问题，我们做如下修改：

```
// Watcher的get方法
get() {
  window.target = this
  const value = parsePath(this.data, this.expression)
  window.target = null // 新增，求值完毕后重置window.target
  return value
}

// Dep的depend方法
depend() {
  if (Dep.target) { // 新增
    this.addSub(Dep.target)
  }
}
```

通过上面的分析能够看出，`window.target`的含义就是当前执行上下文中的`watcher`实例。由于`js`单线程的特性，同一时刻只有一个`watcher`的代码在执行，因此`window.target`就是当前正在处于实例化过程中的`watcher`

##### update方法

`update`方法如下：

```
update() {
  this.value = parsePath(this.data, this.expression)
  this.cb()
}
```

回顾一下`vm.$watch`方法，我们可以在定义的回调中访问`this`，并且该回调可以接收到监听数据的新值和旧值，因此做如下修改

```
update() {
  const oldValue = this.value
  this.value = parsePath(this.data, this.expression)
  this.cb.call(this.data, this.value, oldValue)
}
```

### Vue源码

在[Vue源码--56行](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fblob%2Fdev%2Fsrc%2Fcore%2Fobserver%2Fdep.js)中，我们会看到这样一个变量：`targetStack`，看起来好像和我们的`window.target`有点关系，没错，确实有关系。设想一个这样的场景：我们有两个嵌套的父子组件，渲染父组件时会新建一个父组件的`watcher`，渲染过程中发现还有子组件，就会开始渲染子组件，也会新建一个子组件的`watcher`。在我们的实现中，新建父组件`watcher`时，`window.target`会指向父组件`watcher`，之后新建子组件`watcher`，`window.target`将被子组件`watcher`覆盖，子组件渲染完毕，回到父组件`watcher`时，`window.target`变成了`null`，这就会出现问题，因此，我们用一个栈结构来保存`watcher`。

```
const targetStack = []

function pushTarget(_target) {
  targetStack.push(window.target)
  window.target = _target
}

function popTarget() {
  window.target = targetStack.pop()
}
```

`Watcher`的`get`方法做如下修改

```
get() {
  pushTarget(this) // 修改
  const value = parsePath(this.data, this.expression)
  popTarget() // 修改
  return value
}
```

此外，`Vue`中使用`Dep.target`而不是`window.target`来保存当前的`watcher`，这一点影响不大，只要能保证有一个全局唯一的变量来保存当前的`watcher`即可

### 代码总结

被Observer的data在触发 getter 时，Dep 就会收集依赖，然后打上标记，这里就是标记为Dep.target

Watcher是一个观察者对象。依赖收集以后的watcher对象被保存在Dep的subs中，数据变动的时候Dep会通知watcher实例，然后由watcher实例回调cb进行视图更新。

Watcher可以接受多个订阅者的订阅，当有data变动时，就会通过 Dep 给 Watcher 发通知进行更新。

![vue原理图](https://fengqichang666.github.io/images/vueDep5.png)

```
// 调用该方法来检测数据
function observe(data) {
  if (typeof data !== 'object') return
  new Observer(data)
}

class Observer {
  constructor(value) {
    this.value = value
    this.walk()
  }
  walk() {
    Object.keys(this.value).forEach((key) => defineReactive(this.value, key))
  }
}

// 数据拦截
function defineReactive(data, key, value = data[key]) {
  const dep = new Dep()
  observe(value)
  Object.defineProperty(data, key, {
    get: function reactiveGetter() {
      dep.depend()
      return value
    },
    set: function reactiveSetter(newValue) {
      if (newValue === value) return
      value = newValue
      observe(newValue)
      dep.notify()
    }
  })
}

// 依赖
class Dep {
  constructor() {
    this.subs = []
  }

  depend() {
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }

  notify() {
    const subs = [...this.subs]
    subs.forEach((s) => s.update())
  }

  addSub(sub) {
    this.subs.push(sub)
  }
}

Dep.target = null

const TargetStack = []

function pushTarget(_target) {
  TargetStack.push(Dep.target)
  Dep.target = _target
}

function popTarget() {
  Dep.target = TargetStack.pop()
}

// watcher
class Watcher {
  constructor(data, expression, cb) {
    this.data = data
    this.expression = expression
    this.cb = cb
    this.value = this.get()
  }

  get() {
    pushTarget(this)
    const value = parsePath(this.data, this.expression)
    popTarget()
    return value
  }

  update() {
    const oldValue = this.value
    this.value = parsePath(this.data, this.expression)
    this.cb.call(this.data, this.value, oldValue)
  }
}

// 工具函数
function parsePath(obj, expression) {
  const segments = expression.split('.')
  for (let key of segments) {
    if (!obj) return
    obj = obj[key]
  }
  return obj
}

// for test
let obj = {
  a: 1,
  b: {
    m: {
      n: 4
    }
  }
}

observe(obj)

let w1 = new Watcher(obj, 'a', (val, oldVal) => {
  console.log(`obj.a 从 ${oldVal}(oldVal) 变成了 ${val}(newVal)`)
})

```

### 注意事项

#### 闭包

`Vue`能够实现如此强大的功能，离不开闭包的功劳：在`defineReactive`中就形成了闭包，这样每个对象的每个属性就能保存自己的值`value`和依赖对象`dep`。

#### 只要触发getter就会收集依赖吗

答案是否定的。在`Dep`的`depend`方法中，我们看到，只有`Dep.target`为真时才会添加依赖。比如在派发更新时会触发`watcher`的`update`方法，该方法也会触发`parsePath`来取值，但是此时的`Dep.target`为`null`，不会添加依赖。仔细观察可以发现，只有`watcher`的`get`方法中会调用`pushTarget(this)`来对`Dep.target`赋值，其他时候`Dep.target`都是`null`，而`get`方法只会在实例化`watcher`的时候调用，因此，在我们的实现中，一个`watcher`的依赖在其实例化时就已经确定了，之后任何读取值的操作均不会增加依赖。

#### 依赖嵌套的对象属性

```
let w2 = new Watcher(obj, 'b.m.n', (val, oldVal) => {
  console.log(`obj.b.m.n 从 ${oldVal}(oldVal) 变成了 ${val}(newVal)`)
})
```

`w2`会依赖`obj.b.m.n`， 但是`w2`会依赖`obj.b, obj.b.m`吗？或者说，`obj.b,和obj.b.m`，它们闭包中保存的`dep`中会有`w2`吗？答案是会。我们先不从代码角度分析，设想一下，如果我们让`obj.b = null`，那么很显然`w2`的回调函数应该被触发，这就说明`w2`会依赖中间层级的对象属性。

接下来我们从代码层面分析一下：`new Watcher()`时，会调用`watcher的get`方法，将`Dep.target`设置为`w2`，`get`方法会调用`parsePath`来取值，我们来看一下取值的具体过程：

```
function parsePath(obj, expression) {
  const segments = expression.split('.') // 先将表达式分割，segments:['b', 'm', 'n']
  // 循环取值
  for (let key of segments) {
    if (!obj) return
    obj = obj[key]
  }
  return obj
}
```

1. 局部变量`obj`为对象`obj`，读取`obj.b`的值，触发`getter`，触发`dep.depend()`(该`dep`是`obj.b`的闭包中的`dep`)，`Dep.target`存在，添加依赖
2. 局部变量`obj`为`obj.b`，读取`obj.b.m`的值，触发`getter`，触发`dep.depend()`(该`dep`是`obj.b.m`的闭包中的`dep`)，`Dep.target`存在，添加依赖
3. 局部变量`obj`为对象`obj.b.m`，读取`obj.b.m.n`的值，触发`getter`，触发`dep.depend()`(该`dep`是`obj.b.m.n`的闭包中的`dep`)，`Dep.target`存在，添加依赖

从上面的代码可以看出，`w2`会依赖与目标属性相关的每一项，这也是符合逻辑的。

## 总结

总结一、

1. 在Vue中模版编译过程中的指令或者数据绑定都会实例化一个Watcher实例，实例化过程中会触发get()将自身指向Dep.target;
2. data在Observer时执行getter会触发dep.depend()进行依赖收集，
3. 当data中被 Observer的某个对象值变化后，触发subs中观察它的watcher执行 update() 方法，最后实际上是调用watcher的回调函数cb，进而更新视图。

总结二、

1. 调用`observe(obj)`，将`obj`设置为响应式对象，`observe函数，Observe, defineReactive函数`三者互相调用，从而递归地将`obj`设置为响应式对象
2. 渲染页面时实例化`watcher`，这个过程会读取依赖数据的值，从而完成`在getter中获取依赖`
3. 依赖变化时触发`setter`，从而派发更新，执行回调，完成`在setter中派发更新`

## 【源码目录结构】

```
├─ .circleci           // 包含CircleCI持续集成/持续部署工具的配置文件
├─ .github             // 项目相关的说明文档，上面的说明文档就在此文件夹
├─ benchmarks          // 基准,性能测试文件，Vue的跑分demo，比如大数据量的table或者渲染大量SVG
├─ dist                // 构建后输出的不同版本Vue文件(UMD、CommonJS、ES 生产和开发包)
├─ examples            // 部分示例，用Vue写的一些小demo
├─ flow                // flow 因为Vue使用了 [Flow](https://flow.org/) 来进行静态类型检查，静态类型检查类型声明文件
├─ packages            // 包含服务端渲染和模板编译器两种不同的NPM包，是提供给不同使用场景使用的
├─ scripts             // 存放npm脚本配置文件，结合webpack、rollup进行编译、测试、构建等操作（使用者不需要关心）
│   ├─ alias.js        // 模块导入所有源代码和测试中使用的别名
│   ├─ config.js       // 包含在'dist/`中找到的所有文件的生成配置
│   ├─ build.js        // 对 config.js 中所有的rollup配置进行构建
├─ src                 // 主要源码所在位置，核心内容
│   ├─ compiler        // 解析模版相关
│       ├─ codegen     // 把AST转换为Render函数
│       ├─ directives  // 通用生成Render函数之前需要处理的指令
│       ├─ parser       // 解析模版成AST
│   ├─ core             // Vue核心代码，包括内置组件，全局API封装，Vue 实例化，观察者，虚拟DOM, 工具函数等等。
│       ├─ components   // 组件相关属性，主要是Keep-Alive
│       ├─ global-api   // Vue全局API，如Vue.use,Vue.extend,Vue.mixin等
│       ├─ instance     // 实例化相关内容，生命周期、事件等
│       ├─ observer     // 响应式核心目录，双向数据绑定相关文件
│       ├─ util         // 工具方法
│       └─ vdom         // 包含虚拟DOM 创建（creation）和打补丁(patching) 的代码
│   ├─ platforms        // 和平台相关的内容，Vue.js 是一个跨平台的MVVM 框架(web、native、weex)
│       ├─ web          // web端
│           ├─ compiler // web端编译相关代码，用来编译模版成render函数basic.js
│           ├─ runtime  // web端运行时相关代码，用于创建Vue实例等
│           ├─ server   // 服务端渲染
│           └─ util     // 相关工具类
│       └─ weex         // 基于通用跨平台的 Web 开发语言和开发经验，来构建 Android、iOS 和 Web 应用
│   ├─ server           // 服务端渲染（ssr）
│   ├─ sfc              // 转换单文件组件（*.vue）
│   └─ shared           // 全局共享的方法和常量
├─ test                 // test 测试用例
├─ types                // Vue新版本支持TypeScript，主要是TypeScript类型声明文件
├─ node_modules         // npm包存放目录
|-- .babelrc.js         // babel配置
|-- .editorconfig       // 文本编码样式配置文件
|-- .eslintignore       // eslint校验忽略文件
|-- .eslintrc.js        // eslint配置文件
|-- .flowconfig         // flow配置文件
|-- .gitignore         // Git提交忽略文件配置
|-- BACKERS.md         // 赞助者信息文件
|-- LICENSE            // 项目开源协议
|-- package.json       // 依赖
|-- README.md          // 说明文件
|-- yarn.lock          // yarn版本锁定文件
 
```

