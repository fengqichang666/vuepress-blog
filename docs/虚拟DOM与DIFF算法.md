---
title: 虚拟DOM与DIFF算法
date: 2021-10-08 16:57:02
tags: 虚拟DOM与DIFF算法
---

## 虚拟DOM(Virtual DOM)

### 什么是虚拟DOM

一句话总结虚拟DOM就是一个用来描述真实DOM的**javaScript对象 ** 包含tag，props，children三个属性。。。

`真实DOM`:

```
<ul class="list">
    <li>a</li>
    <li>b</li>
    <li>c</li>
</ul>
```

`对应的虚拟DOM`:

```
let vnode = h('ul.list', [
  h('li','a'),
  h('li','b'),
  h('li','c'),
])

console.log(vnode)
```

#### 控制台打印出来的**Vnode**:

<img src="https://fengqichang666.github.io/images/640.webp" style="zoom: 50%;" />

**h函数就是vue中的createElement方法，这个函数作用就是创建虚拟dom，追踪dom变化的**

```
function h(tag,props,...children){//h函数，返回一个虚拟dom对象
    return {
        tag,
        props:props || {},
        children:children.flat()//扁平化数组，降至一维数组
    }
}
//源码
export function h (sel: string): VNode
export function h (sel: string, data: VNodeData | null): VNode
export function h (sel: string, children: VNodeChildren): VNode
export function h (sel: string, data: VNodeData | null, children: VNodeChildren): VNode
export function h (sel: any, b?: any, c?: any): VNode {
  var data: VNodeData = {}
  var children: any
  var text: any
  var i: number
    ...
  return vnode(sel, data, children, text, undefined) //最终返回一个vnode函数
};
// vnode函数
export function vnode (sel: string | undefined,
  data: any | undefined,
  children: Array<VNode | string> | undefined,
  text: string | undefined,
  elm: Element | Text | undefined): VNode {
  const key = data === undefined ? undefined : data.key
  return { sel, data, children, text, elm, key } //最终生成Vnode对象
}
```

`h函数`先生成一个`vnode`函数,然后`vnode`函数再生成一个`Vnode`对象(虚拟DOM对象)

**最终html代码会被编译成h函数的渲染形式。返回的是一个虚拟DOM对象，通过diff算法，来追踪自己要如何改变真实DOM。**

createElment参数（也就是h函数）：createElment函数接受三个参数，分别是：

     参数一：tag（标签名）、组件的选项对象、函数（必选）；
    
     参数二：一个对象，标签的属性对应的数据（可选）；
    
     参数三：子级虚拟节点，字符串形式或数组形式，子级虚拟节点也需要使用createElement构建。
### 为什么要使用虚拟DOM

- MVVM框架解决视图和状态同步问题

- 模板引擎可以简化视图操作,没办法跟踪状态

- 虚拟DOM跟踪状态变化

- 参考github上**virtual-dom**[1]的动机描述

- - 虚拟DOM可以维护程序的状态,跟踪上一次的状态
  - 通过比较前后两次状态差异更新真实DOM

- 跨平台使用

- - 浏览器平台渲染DOM
  - 服务端渲染SSR(Nuxt.js/Next.js),前端是vue向,后者是react向
  - 原生应用(Weex/React Native)
  - 小程序(mpvue/uni-app)等

- 真实DOM的属性很多，创建DOM节点开销很大

- 虚拟DOM只是普通JavaScript对象，描述属性并不需要很多，创建开销很小

- **复杂视图情况下提升渲染性能**(操作dom性能消耗大,减少操作dom的范围可以提升性能)

**复杂视图情况下提升渲染性能**,因为`虚拟DOM+Diff算法`可以精准找到DOM树变更的地方,减少DOM的操作(重排重绘)

## Diff算法

diff 算法首先要明确一个概念就是 Diff 的对象是虚拟DOM（virtual dom），更新真实 DOM 是 Diff 算法的结果。

- `init()`设置模块.创建`patch()`函数
- 使用`h()`函数创建JavaScript对象`(Vnode)`描述`真实DOM`
- `patch()`比较`新旧两个Vnode`
- 把变化的内容更新到`真实DOM树`

### init函数

init函数时设置模块,然后创建patch()函数,我们先通过场景案例来有一个直观的体现:

```
import {init} from 'snabbdom/build/package/init.js'
import {h} from 'snabbdom/build/package/h.js'

// 1.导入模块
import {styleModule} from "snabbdom/build/package/modules/style";
import {eventListenersModule} from "snabbdom/build/package/modules/eventListeners";

// 2.注册模块
const patch = init([
  styleModule,
  eventListenersModule
])

// 3.使用h()函数的第二个参数传入模块中使用的数据(对象)
let vnode = h('div', [
  h('h1', {style: {backgroundColor: 'red'}}, 'Hello world'),
  h('p', {on: {click: eventHandler}}, 'Hello P')
])

function eventHandler() {
  alert('疼,别摸我')
}

const app = document.querySelector('#app')

patch(app,vnode)
```

当init使用了导入的模块就能够在h函数中用这些模块提供的api去创建`虚拟DOM(Vnode)对象`;在上文中就使用了`样式模块`以及`事件模块`让创建的这个虚拟DOM具备样式属性以及事件属性,最终通过`patch函数`对比`两个虚拟dom`(会先把app转换成虚拟dom),更新视图;

### patch函数(核心)

- pactch(oldVnode,newVnode)
- 把新节点中变化的内容渲染到真实DOM,最后返回新节点作为下一次处理的旧节点(核心)
- 对比新旧`VNode`是否相同节点(节点的key和sel相同)
- 如果不是相同节点,删除之前的内容,重新渲染
- 如果是相同节点,再判断新的`VNode`是否有`text`,如果有并且和`oldVnode`的`text`不同直接更新文本内容`(patchVnode)`
- 如果新的VNode有children,判断子节点是否有变化`(updateChildren,最麻烦,最难实现)`

```
return function patch(oldVnode: VNode | Element, vnode: VNode): VNode {    
    let i: number, elm: Node, parent: Node
    const insertedVnodeQueue: VNodeQueue = []
    // cbs.pre就是所有模块的pre钩子函数集合
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]()
    // isVnode函数时判断oldVnode是否是一个虚拟DOM对象
    if (!isVnode(oldVnode)) {
        // 若不是即把Element转换成一个虚拟DOM对象
        oldVnode = emptyNodeAt(oldVnode)
    }
    // sameVnode函数用于判断两个虚拟DOM是否是相同的,源码见补充1;
    if (sameVnode(oldVnode, vnode)) {
        // 相同则运行patchVnode对比两个节点,关于patchVnode后面会重点说明(核心)
        patchVnode(oldVnode, vnode, insertedVnodeQueue)
    } else {
        elm = oldVnode.elm! // !是ts的一种写法代码oldVnode.elm肯定有值
        // parentNode就是获取父元素
        parent = api.parentNode(elm) as Node

        // createElm是用于创建一个dom元素插入到vnode中(新的虚拟DOM)
        createElm(vnode, insertedVnodeQueue)

        if (parent !== null) {
            // 把dom元素插入到父元素中,并且把旧的dom删除
            api.insertBefore(parent, vnode.elm!, api.nextSibling(elm))// 把新创建的元素放在旧的dom后面
            removeVnodes(parent, [oldVnode], 0, 0)
        }
    }

    for (i = 0; i < insertedVnodeQueue.length; ++i) {
        insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i])
    }
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]()
    return vnode
}
```

#### 补充1: sameVnode函数

```
function sameVnode(vnode1: VNode, vnode2: VNode): boolean { 通过key和sel选择器判断是否是相同节点
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel
}
```

### patchVnode

- 第一阶段触发`prepatch`函数以及`update`函数(都会触发prepatch函数,两者不完全相同才会触发update函数)
- 第二阶段,真正对比新旧`vnode`差异的地方
- 第三阶段,触发`postpatch`函数更新节点

```
function patchVnode(oldVnode: VNode, vnode: VNode, insertedVnodeQueue: VNodeQueue) {
    const hook = vnode.data?.hook
    hook?.prepatch?.(oldVnode, vnode)
    const elm = vnode.elm = oldVnode.elm!
    const oldCh = oldVnode.children as VNode[]
    const ch = vnode.children as VNode[]
    if (oldVnode === vnode) return
    if (vnode.data !== undefined) {
        for (let i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
        vnode.data.hook?.update?.(oldVnode, vnode)
    }
    if (isUndef(vnode.text)) { // 新节点的text属性是undefined
        if (isDef(oldCh) && isDef(ch)) { // 当新旧节点都存在子节点
            if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue) //并且他们的子节点不相同执行updateChildren函数,后续会重点说明(核心)
        } else if (isDef(ch)) { // 只有新节点有子节点
            // 当旧节点有text属性就会把''赋予给真实dom的text属性
            if (isDef(oldVnode.text)) api.setTextContent(elm, '') 
            // 并且把新节点的所有子节点插入到真实dom中
            addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
        } else if (isDef(oldCh)) { // 清除真实dom的所有子节点
            removeVnodes(elm, oldCh, 0, oldCh.length - 1)
        } else if (isDef(oldVnode.text)) { // 把''赋予给真实dom的text属性
            api.setTextContent(elm, '')
        }
    } else if (oldVnode.text !== vnode.text) { //若旧节点的text与新节点的text不相同
        if (isDef(oldCh)) { // 若旧节点有子节点,就把所有的子节点删除
            removeVnodes(elm, oldCh, 0, oldCh.length - 1)
        }
        api.setTextContent(elm, vnode.text!) // 把新节点的text赋予给真实dom
    }
    hook?.postpatch?.(oldVnode, vnode) // 更新视图
}
```

![](https://fengqichang666.github.io/images/Diff.webp)

### updateChildren(核中核:判断子节点的差异)

  这个函数分为三个部分,`部分1:声明变量`,`部分2:同级别节点比较`,`部分3:循环结束的收尾工作`

- `同级别节点比较`的`五种`情况:

- 1. `oldStartVnode/newStartVnode`(旧开始节点/新开始节点)相同
  2. `oldEndVnode/newEndVnode`(旧结束节点/新结束节点)相同
  3. `oldStartVnode/newEndVnode`(旧开始节点/新结束节点)相同
  4. `oldEndVnode/newStartVnode`(旧结束节点/新开始节点)相同
  5. `特殊情况当1,2,3,4的情况都不符合`的时候就会执行,在`oldVnodes`里面寻找跟`newStartVnode`一样的节点然后位移到`oldStartVnode`,若没有找到在就`oldStartVnode`创建一个

- 执行过程是一个循环,在每次循环里,只要执行了上述的情况的五种之一就会结束一次循环

- `循环结束的收尾工作`:直到oldStartIdx>oldEndIdx || newStartIdx>newEndIdx(代表旧节点或者新节点已经遍历完)

