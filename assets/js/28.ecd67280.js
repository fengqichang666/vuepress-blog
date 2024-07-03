(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{302:function(e,t,a){"use strict";a.r(t);var v=a(10),n=Object(v.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("p",[t("img",{attrs:{src:"https://fengqichang666.github.io/images/vueDep.png",alt:"vue原理图"}})]),e._v(" "),t("p",[t("img",{attrs:{src:"https://fengqichang666.github.io/images/vueDep2.png",alt:"vue原理图"}})]),e._v(" "),t("h2",{attrs:{id:"概览"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#概览"}},[e._v("#")]),e._v(" 概览")]),e._v(" "),t("p",[e._v("vue 作为一种[MVVM]模式的框架， 其数据绑定的底层原理为："),t("strong",[e._v("数据劫持 + 发布订阅者模式")]),e._v("。")]),e._v(" "),t("p",[e._v("其中主要有这么"),t("strong",[e._v("四种“角色”")]),e._v("：Observer数据劫持, Dep数据收集, Watcer订阅者，以及 Compiler 模板编译器。")]),e._v(" "),t("p",[t("strong",[e._v("Observer （数据劫持）")]),e._v("\n核心是通过Obeject.defineProperty()来监听数据的变动，这个函数内部可以定义setter和getter。\n每当数据发生变化，就会触发setter()。这时候 [Observer] 就要通过 Dep 通知 Watcher 订阅者。")]),e._v(" "),t("p",[t("strong",[e._v("发布订阅模式")]),e._v("主要是通过 "),t("strong",[e._v("Dep")]),e._v(" 和 "),t("strong",[e._v("Watcher")]),e._v(" 来完成。")]),e._v(" "),t("p",[t("strong",[e._v("Dep")]),e._v(" （发布者）\n有 "),t("strong",[e._v("addWatcher")]),e._v("() 和 "),t("strong",[e._v("notify")]),e._v("() 两个方法，（收集 Watcher 依赖，并通知依赖变更）。\nDep 中存放着 Watcher 实例化时存放的所有依赖，是个数据集，当 Dep 收到来自 Observer 的数据变化通知时，Dep 会调用 notify() 方法去通知 Watcher 进行更新。")]),e._v(" "),t("p",[t("strong",[e._v("Watcher")]),e._v(" （订阅者）")]),e._v(" "),t("p",[e._v("渲染"),t("code",[e._v("Watcher")]),e._v("是一个组件实例只有一个，这样做是为了减少watcher实例所占用的内存开销。有一个 "),t("strong",[e._v("update")]),e._v("() 方法，（订阅 Dep ，接收数据变更）。\nWatcher 是 Observer 和 Compile 之间通信的桥梁，主要做的事情是：")]),e._v(" "),t("ol",[t("li",[e._v("在自身实例化时往 Dep 中添加自己；")]),e._v(" "),t("li",[e._v("当它收到来自 Dep 的数据变化通知后（ Dep.notify() ），会调用自身的 update() 方法，并触发Compile中绑定的回调。")])]),e._v(" "),t("p",[t("strong",[e._v("Compile")]),e._v("\nCompile主要做的事情是解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，"),t("strong",[e._v("一旦接收到数据有变动，收到通知，更新视图")]),e._v("。")]),e._v(" "),t("h2",{attrs:{id:"响应式原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#响应式原理"}},[e._v("#")]),e._v(" 响应式原理")]),e._v(" "),t("h3",{attrs:{id:"数据劫持"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据劫持"}},[e._v("#")]),e._v(" 数据劫持")]),e._v(" "),t("p",[e._v("在我们访问或者修改某个对象的某个属性的时候，通过一段代码进行拦截，然后进行额外的操作，返回结果。vue中双向数据绑定就是一个典型的应用。")]),e._v(" "),t("h3",{attrs:{id:"简述"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#简述"}},[e._v("#")]),e._v(" 简述：")]),e._v(" "),t("p",[e._v("遍历对象，通过"),t("code",[e._v("Object.defineProperty")]),e._v("为每个属性添加 getter 和 setter，进行数据劫持。getter 函数用于在数据读取时进行依赖收集，在对应的 dep 中存储所有的 watcher；setter 则是数据更新后通知所有的 watcher 进行更新。")]),e._v(" "),t("p",[e._v("Object.defineProperty() 和 Proxy 对象，都可以用来对数据的劫持操作。")]),e._v(" "),t("p",[e._v("Vue2.x 是使用 Object.defindProperty()，来实现对对象的监听。")]),e._v(" "),t("p",[e._v("Vue3.x 版本之后就改用Proxy实现。")]),e._v(" "),t("p",[t("code",[e._v("Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。")])]),e._v(" "),t("p",[e._v("当把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的 property，并使用 Object.defineProperty 把这些 property 全部转为 getter/setter。简单理解就是在data和用户之间做了一层代理中间层，在vue initData的时候，将_data上面的数据代理到vm上，通过observer类将所有的data变成可观察的，及对data定义的每一个属性进行getter\\setter操作，这就是Vue实现响应式的基础。")]),e._v(" "),t("p",[e._v("Vue数据响应式变化主要涉及 Observer, Watcher , Dep 这三个主要的类。因此要弄清Vue响应式变化需要明白这个三个类之间是如何运作联系的；以及它们的原理，负责的逻辑操作。")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://fengqichang666.github.io/images/vueDep3.png",alt:"vue原理图"}})]),e._v(" "),t("h3",{attrs:{id:"observer"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#observer"}},[e._v("#")]),e._v(" Observer")]),e._v(" "),t("p",[t("code",[e._v("Object.defineProperty")]),e._v("的用法")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("const obj = {}\n\nlet val = 1\nObject.defineProperty(obj, a, {\n  get() { // 下文中该方法统称为getter\n    console.log('get property a')\n    return val\n  },\n  set(newVal) { // 下文中该方法统称为setter\n    if (val === newVal) return\n    console.log(`set property a -> ${newVal}`)\n    val = newVal\n  }\n})\n")])])]),t("p",[e._v("当我们访问"),t("code",[e._v("obj.a")]),e._v("时，打印"),t("code",[e._v("get property a")]),e._v("并返回1，"),t("code",[e._v("obj.a = 2")]),e._v("设置新的值时，打印"),t("code",[e._v("set property a -> 2")]),e._v("。这相当于我们自定义了"),t("code",[e._v("obj.a")]),e._v("取值和赋值的行为，使用自定义的"),t("code",[e._v("getter")]),e._v("和"),t("code",[e._v("setter")]),e._v("来重写了原有的行为，这也就是"),t("code",[e._v("数据劫持")]),e._v("的含义。")]),e._v(" "),t("p",[e._v("但是上面的代码有一个问题：我们需要一个全局的变量来保存这个属性的值，因此，我们可以用下面的写法（闭包）")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("// value使用了参数默认值\nfunction defineReactive(data, key, value = data[key]) {\n  Object.defineProperty(data, key, {\n    get: function reactiveGetter() {\n      return value\n    },\n    set: function reactiveSetter(newValue) {\n      if (newValue === value) return\n      value = newValue\n    }\n  })\n}\n\ndefineReactive(obj, a, 1)\n")])])]),t("p",[e._v("如果"),t("code",[e._v("obj")]),e._v("有多个属性呢？我们可以新建一个类"),t("code",[e._v("Observer")]),e._v("来遍历该对象")]),e._v(" "),t("p",[e._v("Observer类是将每个目标对象（即data）的键值转换成getter/setter形式，用于进行依赖收集以及调度更新。那么在vue这个类是如何实现的：")]),e._v(" "),t("ul",[t("li",[e._v("1、observer实例绑定在data的ob属性上面，防止重复绑定；")]),e._v(" "),t("li",[e._v("2、若data为数组，先实现对应的[变异方法]（Vue重写了数组的7种原生方法）再将数组的每个成员进行observe，使之成响应式数据；")]),e._v(" "),t("li",[e._v("3、否则执行walk()方法，遍历data所有的数据，进行getter/setter绑定。这里的核心方法就是 defineReative(obj, keys[i], obj[keys[i]])")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("class Observer {\n  constructor(value) {\n    this.value = value\n    this.walk()\n  }\n  walk() {\n    Object.keys(this.value).forEach((key) => defineReactive(this.value, key))\n  }\n}\n\nconst obj = { a: 1, b: 2 }\nnew Observer(obj)\n")])])]),t("p",[e._v("如果"),t("code",[e._v("obj")]),e._v("内有嵌套的属性呢？我们可以使用递归来完成嵌套属性的数据劫持")]),e._v(" "),t("p",[e._v("vue采用递归的思想在defineReactive函数中在执行一次observer函数就行，递归将对象在遍历一次获取key/value值")]),e._v(" "),t("p",[e._v("同样在设置值的时候可能会把name也设置成一个对象，因此在data值更新的时候也需要进行判断深度监听")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("// 入口函数\nfunction observe(data) {\n  if (typeof data !== 'object') return\n  // 调用Observer\n  new Observer(data)\n}\n\nclass Observer {\n  constructor(value) {\n    this.value = value\n    this.walk()\n  }\n  walk() {\n    // 遍历该对象，并进行数据劫持\n    Object.keys(this.value).forEach((key) => defineReactive(this.value, key))\n  }\n}\n\nfunction defineReactive(data, key, value = data[key]) {\n  // 如果value是对象，递归调用observe来监测该对象\n  // 如果value不是对象，observe函数会直接返回\n  observe(value)\n  Object.defineProperty(data, key, {\n    get: function reactiveGetter() {\n      return value\n    },\n    set: function reactiveSetter(newValue) {\n      if (newValue === value) return\n      value = newValue\n      observe(newValue) // 设置的新值也要被监听\n    }\n  })\n}\n\nconst obj = {\n  a: 1,\n  b: {\n    c: 2\n  }\n}\n\nobserve(obj)\n")])])]),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("执行observe(obj)\n├── new Observer(obj),并执行this.walk()遍历obj的属性，执行defineReactive()\n    ├── defineReactive(obj, a)\n        ├── 执行observe(obj.a) 发现obj.a不是对象，直接返回\n        ├── 执行defineReactive(obj, a) 的剩余代码\n    ├── defineReactive(obj, b) \n\t    ├── 执行observe(obj.b) 发现obj.b是对象\n\t        ├── 执行 new Observer(obj.b)，遍历obj.b的属性，执行defineReactive()\n                    ├── 执行defineReactive(obj.b, c)\n                        ├── 执行observe(obj.b.c) 发现obj.b.c不是对象，直接返回\n                        ├── 执行defineReactive(obj.b, c)的剩余代码\n            ├── 执行defineReactive(obj, b)的剩余代码\n代码执行结束\n")])])]),t("p",[e._v("这就是简单的一个Observer类，这也是vue响应式的基本原理。但我们都知道 object.defineproperty的存在一些缺点：")]),e._v(" "),t("p",[e._v("1、对于复杂的对象需要深度监听，递归到底，一次性计算量大；")]),e._v(" "),t("p",[e._v("2、无法监听新增属性/删除属性（Vue.set Vue.delete）；")]),e._v(" "),t("p",[e._v("3、无法监听数组，需特殊处理，也就是上面说的变异方法；")]),e._v(" "),t("h3",{attrs:{id:"vue数组的监听"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vue数组的监听"}},[e._v("#")]),e._v(" vue数组的监听")]),e._v(" "),t("p",[e._v("object.defineproperty对数组是不起作用的（因为未对数组每一项进行数据劫持），那么在vue中又是如何去监听数组的变化，其实Vue 将被侦听的数组的变更方法进行了包裹。接下来将用简单代码演示：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("// 防止全局污染，重新定义数组原型\nconst oldArrayProperty = Array.prototype\n// 创建新对象，原型指向oldArrayProperty\nconst arrProto = Object.create(oldArrayProperty);\n\n['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {\n  arrProto[methodName] = function () { // 在定义数组的方法\n    updateView()\n    oldArrayProperty[methodName].call(this, ...arguments) // 实际执行数组的方法\n  }\n})\n\n// 在Observer函数中对数组进行处理\nif (Array.isArray(value)) {\n    value.__proto__ = arrProto\n  }\n")])])]),t("p",[e._v("从代码中看到，在Observer函数有一层对数组进行拦截，将数组的__proto__指向了一个arrProto，arrProto是一个对象，这个对象指向数组的原型，因此arrProto拥有了数组原型上的方法，然后在这对象上重新自定义了数组的7中方法将其包裹，但又不会影响数组原型的方法，这就是变异，再将数组的每个成员进行observe，使之成响应式数据。")]),e._v(" "),t("h3",{attrs:{id:"数据代理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据代理"}},[e._v("#")]),e._v(" 数据代理")]),e._v(" "),t("p",[t("code",[e._v("vm 拿到data中的数据后，放在了vm里的_data中。实际上data就是_data。vm中的age代理了_data中的age。读取vm.age时，调用get方法，读取了_data中的age。修改了vm中的age时，就会调用set方法去修改_data中的age。估计会有人想为什么要多此一举呢？其实，如果不做代理，那么在"+e._s()+"中就要这样写了"+e._s(e._data.xxx)+"，会很麻烦。")])]),e._v(" "),t("h3",{attrs:{id:"依赖收集与派发更新"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#依赖收集与派发更新"}},[e._v("#")]),e._v(" 依赖收集与派发更新")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://fengqichang666.github.io/images/vueDep4.png",alt:"vue原理图"}})]),e._v(" "),t("p",[e._v("为了提高代码执行效率，我们没有必要对其进行响应式处理，因此，依赖收集简单理解就是收集只在实际页面中用到的data数据，那么Vue是如何进行依赖收集的，这也就是要讲的Watcher、Dep类了。")]),e._v(" "),t("h4",{attrs:{id:"依赖"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#依赖"}},[e._v("#")]),e._v(" 依赖")]),e._v(" "),t("p",[t("strong",[e._v("Watcher")]),e._v("类可以如下实现")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("class Watcher {\n  constructor(data, expression, cb) {\n    // data: 数据对象，如obj\n    // expression：表达式，如b.c，根据data和expression就可以获取watcher依赖的数据\n    // cb：依赖变化时触发的回调\n    this.data = data\n    this.expression = expression\n    this.cb = cb\n    // 初始化watcher实例时订阅数据\n    this.value = this.get()\n  }\n  \n  get() {\n    const value = parsePath(this.data, this.expression)\n    return value\n  }\n  \n  // 当收到数据变化的消息时执行该方法，从而调用cb\n  update() {\n    this.value = parsePath(this.data, this.expression) // 对存储的数据进行更新\n    cb()\n  }\n}\n\nfunction parsePath(obj, expression) {\n  const segments = expression.split('.')\n  for (let key of segments) {\n    if (!obj) return\n    obj = obj[key]\n  }\n  return obj\n}\n")])])]),t("ol",[t("li",[e._v("需要有一个数组来存储"),t("code",[e._v("watcher")])]),e._v(" "),t("li",[t("code",[e._v("watcher")]),e._v("实例需要订阅(依赖)数据，也就是获取依赖或者收集依赖")]),e._v(" "),t("li",[t("code",[e._v("watcher")]),e._v("的依赖发生变化时触发"),t("code",[e._v("watcher")]),e._v("的回调函数，也就是派发更新。")])]),e._v(" "),t("p",[e._v("每个数据都应该维护一个属于自己的数组，该数组来存放依赖自己的"),t("code",[e._v("watcher")]),e._v("，我们可以在"),t("code",[e._v("defineReactive")]),e._v("中定义一个数组"),t("code",[e._v("dep")]),e._v("，这样通过闭包，每个属性就能拥有一个属于自己的"),t("code",[e._v("dep")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("function defineReactive(data, key, value = data[key]) {\n  const dep = [] // 增加\n  observe(value)\n  Object.defineProperty(data, key, {\n    get: function reactiveGetter() {\n      return value\n    },\n    set: function reactiveSetter(newValue) {\n      if (newValue === value) return\n      value = newValue\n      observe(newValue)\n      dep.notify()\n    }\n  })\n}\n")])])]),t("h4",{attrs:{id:"依赖收集"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#依赖收集"}},[e._v("#")]),e._v(" 依赖收集")]),e._v(" "),t("p",[e._v("页面的初次渲染过程中(暂时忽略渲染函数和虚拟"),t("code",[e._v("DOM")]),e._v("等部分)：渲染引擎会解析模板，比如引擎遇到了一个插值表达式，如果我们此时实例化一个"),t("code",[e._v("watcher")]),e._v("，会发生什么事情呢？从"),t("code",[e._v("Watcher")]),e._v("的代码中可以看到，实例化时会执行"),t("code",[e._v("get")]),e._v("方法，"),t("code",[e._v("get")]),e._v("方法的作用就是"),t("code",[e._v("获取")]),e._v("自己依赖的数据，而我们重写了数据的访问行为，为每个数据定义了"),t("code",[e._v("getter")]),e._v("，因此"),t("code",[e._v("getter")]),e._v("函数就会执行，如果我们在"),t("code",[e._v("getter")]),e._v("中把当前的"),t("code",[e._v("watcher")]),e._v("添加到"),t("code",[e._v("dep")]),e._v("数组中(淘宝低登记买家信息)，就能够完成依赖收集了")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("注意：执行到getter时，new Watcher()的get方法还没有执行完毕。\nnew Watcher()时执行constructor，调用了实例的get方法，实例的get方法会读取数据的值，从而触发了数据的getter，\ngetter执行完毕后，实例的get方法执行完毕，并返回值，constructor执行完毕，实例化完毕。\n")])])]),t("p",[e._v("通过上面的分析，我们只需要对"),t("code",[e._v("getter")]),e._v("进行一些修改：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("get: function reactiveGetter() {\n  dep.push(watcher) // 新增\n  return value\n}\n")])])]),t("p",[t("code",[e._v("watcher")]),e._v("这个变量从哪里来呢？我们是在模板编译函数中的实例化"),t("code",[e._v("watcher")]),e._v("的，"),t("code",[e._v("getter")]),e._v("中取不到这个实例啊。解决方法也很简单，将"),t("code",[e._v("watcher")]),e._v("实例放到全局不就行了吗，比如放到"),t("code",[e._v("window.target")]),e._v("上。因此，"),t("code",[e._v("Watcher")]),e._v("的"),t("code",[e._v("get")]),e._v("方法做如下修改")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("get() {\n  window.target = this // 新增\n  const value = parsePath(this.data, this.expression)\n  return value\n}\n")])])]),t("p",[e._v("这样，将"),t("code",[e._v("get")]),e._v("方法中的"),t("code",[e._v("dep.push(watcher)")]),e._v("修改为"),t("code",[e._v("dep.push(window.target)")]),e._v("即可。")]),e._v(" "),t("blockquote",[t("p",[e._v("注意，不能这样写window.target = new Watcher()。因为执行到getter的时候，实例化watcher还没有完成，所以window.target还是undefined")])]),e._v(" "),t("blockquote",[t("p",[e._v("依赖收集过程：渲染页面时碰到插值表达式，"),t("code",[e._v("v-bind")]),e._v("等需要数据等地方，会实例化一个"),t("code",[e._v("watcher")]),e._v(",实例化"),t("code",[e._v("watcher")]),e._v("就会对依赖的数据求值，从而触发"),t("code",[e._v("getter")]),e._v("，数据的"),t("code",[e._v("getter")]),e._v("函数就会添加依赖自己的"),t("code",[e._v("watcher")]),e._v("，从而完成依赖收集。我们可以理解为"),t("code",[e._v("watcher")]),e._v("在收集依赖，而代码的实现方式是在数据中存储依赖自己的"),t("code",[e._v("watcher")])])]),e._v(" "),t("blockquote",[t("p",[e._v("利用这种方法，每遇到一个插值表达式就会新建一个"),t("code",[e._v("watcher")]),e._v("，这样每个节点就会对应一个"),t("code",[e._v("watcher")]),e._v("。实际上这是"),t("code",[e._v("vue1.x")]),e._v("的做法，以节点为单位进行更新，粒度较细。而"),t("code",[e._v("vue2.x")]),e._v("的做法是每个组件对应一个"),t("code",[e._v("watcher")]),e._v("，实例化"),t("code",[e._v("watcher")]),e._v("时传入的也不再是一个"),t("code",[e._v("expression")]),e._v("，而是渲染函数，渲染函数由组件的模板转化而来，这样一个组件的"),t("code",[e._v("watcher")]),e._v("就能收集到自己的所有依赖，以组件为单位进行更新，是一种中等粒度的方式。要实现"),t("code",[e._v("vue2.x")]),e._v("的响应式系统涉及到很多其他的东西，比如组件化，虚拟"),t("code",[e._v("DOM")]),e._v("等，而这个系列文章只专注于数据响应式的原理，因此不能实现"),t("code",[e._v("vue2.x")]),e._v("，但是两者关于响应式的方面，原理相同。")])]),e._v(" "),t("h4",{attrs:{id:"派发更新"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#派发更新"}},[e._v("#")]),e._v(" 派发更新")]),e._v(" "),t("p",[e._v("实现依赖收集后，我们最后要实现的功能是派发更新，也就是依赖变化时触发"),t("code",[e._v("watcher")]),e._v("的回调。从依赖收集部分我们知道，获取哪个数据，也就是说触发哪个数据的"),t("code",[e._v("getter")]),e._v("，就说明"),t("code",[e._v("watcher")]),e._v("依赖哪个数据，那数据变化的时候如何通知"),t("code",[e._v("watcher")]),e._v("呢？在"),t("code",[e._v("setter")]),e._v("中派发更新。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("set: function reactiveSetter(newValue) {\n  if (newValue === value) return\n  value = newValue\n  observe(newValue)\n  dep.forEach(d => d.update()) // 新增 update方法见Watcher类\n}\n")])])]),t("h4",{attrs:{id:"优化代码"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#优化代码"}},[e._v("#")]),e._v(" 优化代码")]),e._v(" "),t("h5",{attrs:{id:"dep类"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dep类"}},[e._v("#")]),e._v(" Dep类")]),e._v(" "),t("p",[e._v("将"),t("code",[e._v("dep")]),e._v("数组抽象为一个类:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("class Dep {\n  constructor() {\n    this.subs = []\n  }\n\n  depend() {\n    this.addSub(Dep.target)\n  }\n\n  notify() {\n    const subs = [...this.subs]\n    subs.forEach((s) => s.update())\n  }\n\n  addSub(sub) {\n    this.subs.push(sub)\n  }\n}\n")])])]),t("p",[t("code",[e._v("defineReactive")]),e._v("函数只需做相应的修改")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("function defineReactive(data, key, value = data[key]) {\n  const dep = new Dep() // 修改\n  observe(value)\n  Object.defineProperty(data, key, {\n    get: function reactiveGetter() {\n      dep.depend() // 修改\n      return value\n    },\n    set: function reactiveSetter(newValue) {\n      if (newValue === value) return\n      value = newValue\n      observe(newValue)\n      dep.notify() // 修改\n    }\n  })\n}\n")])])]),t("h5",{attrs:{id:"window-target"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#window-target"}},[e._v("#")]),e._v(" window.target")]),e._v(" "),t("p",[e._v("在"),t("code",[e._v("watcher")]),e._v("的"),t("code",[e._v("get")]),e._v("方法中")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("get() {\n  window.target = this // 设置了window.target\n  const value = parsePath(this.data, this.expression)\n  return value\n}\n")])])]),t("p",[e._v("我们没有重置"),t("code",[e._v("window.target")]),e._v("。有些同学可能认为这没什么问题，但是考虑如下场景：有一个对象"),t("code",[e._v("obj: { a: 1, b: 2 }")]),e._v("我们先实例化了一个"),t("code",[e._v("watcher1")]),e._v("，"),t("code",[e._v("watcher1")]),e._v("依赖"),t("code",[e._v("obj.a")]),e._v("，那么"),t("code",[e._v("window.target")]),e._v("就是"),t("code",[e._v("watcher1")]),e._v("。之后我们访问了"),t("code",[e._v("obj.b")]),e._v("，会发生什么呢？访问"),t("code",[e._v("obj.b")]),e._v("会触发"),t("code",[e._v("obj.b")]),e._v("的"),t("code",[e._v("getter")]),e._v("，"),t("code",[e._v("getter")]),e._v("会调用"),t("code",[e._v("dep.depend()")]),e._v("，那么"),t("code",[e._v("obj.b")]),e._v("的"),t("code",[e._v("dep")]),e._v("就会收集"),t("code",[e._v("window.target")]),e._v("， 也就是"),t("code",[e._v("watcher1")]),e._v("，这就导致"),t("code",[e._v("watcher1")]),e._v("依赖了"),t("code",[e._v("obj.b")]),e._v("，但事实并非如此。为解决这个问题，我们做如下修改：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("// Watcher的get方法\nget() {\n  window.target = this\n  const value = parsePath(this.data, this.expression)\n  window.target = null // 新增，求值完毕后重置window.target\n  return value\n}\n\n// Dep的depend方法\ndepend() {\n  if (Dep.target) { // 新增\n    this.addSub(Dep.target)\n  }\n}\n")])])]),t("p",[e._v("通过上面的分析能够看出，"),t("code",[e._v("window.target")]),e._v("的含义就是当前执行上下文中的"),t("code",[e._v("watcher")]),e._v("实例。由于"),t("code",[e._v("js")]),e._v("单线程的特性，同一时刻只有一个"),t("code",[e._v("watcher")]),e._v("的代码在执行，因此"),t("code",[e._v("window.target")]),e._v("就是当前正在处于实例化过程中的"),t("code",[e._v("watcher")])]),e._v(" "),t("h5",{attrs:{id:"update方法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#update方法"}},[e._v("#")]),e._v(" update方法")]),e._v(" "),t("p",[t("code",[e._v("update")]),e._v("方法如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("update() {\n  this.value = parsePath(this.data, this.expression)\n  this.cb()\n}\n")])])]),t("p",[e._v("回顾一下"),t("code",[e._v("vm.$watch")]),e._v("方法，我们可以在定义的回调中访问"),t("code",[e._v("this")]),e._v("，并且该回调可以接收到监听数据的新值和旧值，因此做如下修改")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("update() {\n  const oldValue = this.value\n  this.value = parsePath(this.data, this.expression)\n  this.cb.call(this.data, this.value, oldValue)\n}\n")])])]),t("h3",{attrs:{id:"vue源码"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vue源码"}},[e._v("#")]),e._v(" Vue源码")]),e._v(" "),t("p",[e._v("在"),t("a",{attrs:{href:"https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fblob%2Fdev%2Fsrc%2Fcore%2Fobserver%2Fdep.js",target:"_blank",rel:"noopener noreferrer"}},[e._v("Vue源码--56行"),t("OutboundLink")],1),e._v("中，我们会看到这样一个变量："),t("code",[e._v("targetStack")]),e._v("，看起来好像和我们的"),t("code",[e._v("window.target")]),e._v("有点关系，没错，确实有关系。设想一个这样的场景：我们有两个嵌套的父子组件，渲染父组件时会新建一个父组件的"),t("code",[e._v("watcher")]),e._v("，渲染过程中发现还有子组件，就会开始渲染子组件，也会新建一个子组件的"),t("code",[e._v("watcher")]),e._v("。在我们的实现中，新建父组件"),t("code",[e._v("watcher")]),e._v("时，"),t("code",[e._v("window.target")]),e._v("会指向父组件"),t("code",[e._v("watcher")]),e._v("，之后新建子组件"),t("code",[e._v("watcher")]),e._v("，"),t("code",[e._v("window.target")]),e._v("将被子组件"),t("code",[e._v("watcher")]),e._v("覆盖，子组件渲染完毕，回到父组件"),t("code",[e._v("watcher")]),e._v("时，"),t("code",[e._v("window.target")]),e._v("变成了"),t("code",[e._v("null")]),e._v("，这就会出现问题，因此，我们用一个栈结构来保存"),t("code",[e._v("watcher")]),e._v("。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("const targetStack = []\n\nfunction pushTarget(_target) {\n  targetStack.push(window.target)\n  window.target = _target\n}\n\nfunction popTarget() {\n  window.target = targetStack.pop()\n}\n")])])]),t("p",[t("code",[e._v("Watcher")]),e._v("的"),t("code",[e._v("get")]),e._v("方法做如下修改")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("get() {\n  pushTarget(this) // 修改\n  const value = parsePath(this.data, this.expression)\n  popTarget() // 修改\n  return value\n}\n")])])]),t("p",[e._v("此外，"),t("code",[e._v("Vue")]),e._v("中使用"),t("code",[e._v("Dep.target")]),e._v("而不是"),t("code",[e._v("window.target")]),e._v("来保存当前的"),t("code",[e._v("watcher")]),e._v("，这一点影响不大，只要能保证有一个全局唯一的变量来保存当前的"),t("code",[e._v("watcher")]),e._v("即可")]),e._v(" "),t("h3",{attrs:{id:"代码总结"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#代码总结"}},[e._v("#")]),e._v(" 代码总结")]),e._v(" "),t("p",[e._v("被Observer的data在触发 getter 时，Dep 就会收集依赖，然后打上标记，这里就是标记为Dep.target")]),e._v(" "),t("p",[e._v("Watcher是一个观察者对象。依赖收集以后的watcher对象被保存在Dep的subs中，数据变动的时候Dep会通知watcher实例，然后由watcher实例回调cb进行视图更新。")]),e._v(" "),t("p",[e._v("Watcher可以接受多个订阅者的订阅，当有data变动时，就会通过 Dep 给 Watcher 发通知进行更新。")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://fengqichang666.github.io/images/vueDep5.png",alt:"vue原理图"}})]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("// 调用该方法来检测数据\nfunction observe(data) {\n  if (typeof data !== 'object') return\n  new Observer(data)\n}\n\nclass Observer {\n  constructor(value) {\n    this.value = value\n    this.walk()\n  }\n  walk() {\n    Object.keys(this.value).forEach((key) => defineReactive(this.value, key))\n  }\n}\n\n// 数据拦截\nfunction defineReactive(data, key, value = data[key]) {\n  const dep = new Dep()\n  observe(value)\n  Object.defineProperty(data, key, {\n    get: function reactiveGetter() {\n      dep.depend()\n      return value\n    },\n    set: function reactiveSetter(newValue) {\n      if (newValue === value) return\n      value = newValue\n      observe(newValue)\n      dep.notify()\n    }\n  })\n}\n\n// 依赖\nclass Dep {\n  constructor() {\n    this.subs = []\n  }\n\n  depend() {\n    if (Dep.target) {\n      this.addSub(Dep.target)\n    }\n  }\n\n  notify() {\n    const subs = [...this.subs]\n    subs.forEach((s) => s.update())\n  }\n\n  addSub(sub) {\n    this.subs.push(sub)\n  }\n}\n\nDep.target = null\n\nconst TargetStack = []\n\nfunction pushTarget(_target) {\n  TargetStack.push(Dep.target)\n  Dep.target = _target\n}\n\nfunction popTarget() {\n  Dep.target = TargetStack.pop()\n}\n\n// watcher\nclass Watcher {\n  constructor(data, expression, cb) {\n    this.data = data\n    this.expression = expression\n    this.cb = cb\n    this.value = this.get()\n  }\n\n  get() {\n    pushTarget(this)\n    const value = parsePath(this.data, this.expression)\n    popTarget()\n    return value\n  }\n\n  update() {\n    const oldValue = this.value\n    this.value = parsePath(this.data, this.expression)\n    this.cb.call(this.data, this.value, oldValue)\n  }\n}\n\n// 工具函数\nfunction parsePath(obj, expression) {\n  const segments = expression.split('.')\n  for (let key of segments) {\n    if (!obj) return\n    obj = obj[key]\n  }\n  return obj\n}\n\n// for test\nlet obj = {\n  a: 1,\n  b: {\n    m: {\n      n: 4\n    }\n  }\n}\n\nobserve(obj)\n\nlet w1 = new Watcher(obj, 'a', (val, oldVal) => {\n  console.log(`obj.a 从 ${oldVal}(oldVal) 变成了 ${val}(newVal)`)\n})\n\n")])])]),t("h3",{attrs:{id:"注意事项"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#注意事项"}},[e._v("#")]),e._v(" 注意事项")]),e._v(" "),t("h4",{attrs:{id:"闭包"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#闭包"}},[e._v("#")]),e._v(" 闭包")]),e._v(" "),t("p",[t("code",[e._v("Vue")]),e._v("能够实现如此强大的功能，离不开闭包的功劳：在"),t("code",[e._v("defineReactive")]),e._v("中就形成了闭包，这样每个对象的每个属性就能保存自己的值"),t("code",[e._v("value")]),e._v("和依赖对象"),t("code",[e._v("dep")]),e._v("。")]),e._v(" "),t("h4",{attrs:{id:"只要触发getter就会收集依赖吗"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#只要触发getter就会收集依赖吗"}},[e._v("#")]),e._v(" 只要触发getter就会收集依赖吗")]),e._v(" "),t("p",[e._v("答案是否定的。在"),t("code",[e._v("Dep")]),e._v("的"),t("code",[e._v("depend")]),e._v("方法中，我们看到，只有"),t("code",[e._v("Dep.target")]),e._v("为真时才会添加依赖。比如在派发更新时会触发"),t("code",[e._v("watcher")]),e._v("的"),t("code",[e._v("update")]),e._v("方法，该方法也会触发"),t("code",[e._v("parsePath")]),e._v("来取值，但是此时的"),t("code",[e._v("Dep.target")]),e._v("为"),t("code",[e._v("null")]),e._v("，不会添加依赖。仔细观察可以发现，只有"),t("code",[e._v("watcher")]),e._v("的"),t("code",[e._v("get")]),e._v("方法中会调用"),t("code",[e._v("pushTarget(this)")]),e._v("来对"),t("code",[e._v("Dep.target")]),e._v("赋值，其他时候"),t("code",[e._v("Dep.target")]),e._v("都是"),t("code",[e._v("null")]),e._v("，而"),t("code",[e._v("get")]),e._v("方法只会在实例化"),t("code",[e._v("watcher")]),e._v("的时候调用，因此，在我们的实现中，一个"),t("code",[e._v("watcher")]),e._v("的依赖在其实例化时就已经确定了，之后任何读取值的操作均不会增加依赖。")]),e._v(" "),t("h4",{attrs:{id:"依赖嵌套的对象属性"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#依赖嵌套的对象属性"}},[e._v("#")]),e._v(" 依赖嵌套的对象属性")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("let w2 = new Watcher(obj, 'b.m.n', (val, oldVal) => {\n  console.log(`obj.b.m.n 从 ${oldVal}(oldVal) 变成了 ${val}(newVal)`)\n})\n")])])]),t("p",[t("code",[e._v("w2")]),e._v("会依赖"),t("code",[e._v("obj.b.m.n")]),e._v("， 但是"),t("code",[e._v("w2")]),e._v("会依赖"),t("code",[e._v("obj.b, obj.b.m")]),e._v("吗？或者说，"),t("code",[e._v("obj.b,和obj.b.m")]),e._v("，它们闭包中保存的"),t("code",[e._v("dep")]),e._v("中会有"),t("code",[e._v("w2")]),e._v("吗？答案是会。我们先不从代码角度分析，设想一下，如果我们让"),t("code",[e._v("obj.b = null")]),e._v("，那么很显然"),t("code",[e._v("w2")]),e._v("的回调函数应该被触发，这就说明"),t("code",[e._v("w2")]),e._v("会依赖中间层级的对象属性。")]),e._v(" "),t("p",[e._v("接下来我们从代码层面分析一下："),t("code",[e._v("new Watcher()")]),e._v("时，会调用"),t("code",[e._v("watcher的get")]),e._v("方法，将"),t("code",[e._v("Dep.target")]),e._v("设置为"),t("code",[e._v("w2")]),e._v("，"),t("code",[e._v("get")]),e._v("方法会调用"),t("code",[e._v("parsePath")]),e._v("来取值，我们来看一下取值的具体过程：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("function parsePath(obj, expression) {\n  const segments = expression.split('.') // 先将表达式分割，segments:['b', 'm', 'n']\n  // 循环取值\n  for (let key of segments) {\n    if (!obj) return\n    obj = obj[key]\n  }\n  return obj\n}\n")])])]),t("ol",[t("li",[e._v("局部变量"),t("code",[e._v("obj")]),e._v("为对象"),t("code",[e._v("obj")]),e._v("，读取"),t("code",[e._v("obj.b")]),e._v("的值，触发"),t("code",[e._v("getter")]),e._v("，触发"),t("code",[e._v("dep.depend()")]),e._v("(该"),t("code",[e._v("dep")]),e._v("是"),t("code",[e._v("obj.b")]),e._v("的闭包中的"),t("code",[e._v("dep")]),e._v(")，"),t("code",[e._v("Dep.target")]),e._v("存在，添加依赖")]),e._v(" "),t("li",[e._v("局部变量"),t("code",[e._v("obj")]),e._v("为"),t("code",[e._v("obj.b")]),e._v("，读取"),t("code",[e._v("obj.b.m")]),e._v("的值，触发"),t("code",[e._v("getter")]),e._v("，触发"),t("code",[e._v("dep.depend()")]),e._v("(该"),t("code",[e._v("dep")]),e._v("是"),t("code",[e._v("obj.b.m")]),e._v("的闭包中的"),t("code",[e._v("dep")]),e._v(")，"),t("code",[e._v("Dep.target")]),e._v("存在，添加依赖")]),e._v(" "),t("li",[e._v("局部变量"),t("code",[e._v("obj")]),e._v("为对象"),t("code",[e._v("obj.b.m")]),e._v("，读取"),t("code",[e._v("obj.b.m.n")]),e._v("的值，触发"),t("code",[e._v("getter")]),e._v("，触发"),t("code",[e._v("dep.depend()")]),e._v("(该"),t("code",[e._v("dep")]),e._v("是"),t("code",[e._v("obj.b.m.n")]),e._v("的闭包中的"),t("code",[e._v("dep")]),e._v(")，"),t("code",[e._v("Dep.target")]),e._v("存在，添加依赖")])]),e._v(" "),t("p",[e._v("从上面的代码可以看出，"),t("code",[e._v("w2")]),e._v("会依赖与目标属性相关的每一项，这也是符合逻辑的。")]),e._v(" "),t("h2",{attrs:{id:"总结"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[e._v("#")]),e._v(" 总结")]),e._v(" "),t("p",[e._v("总结一、")]),e._v(" "),t("ol",[t("li",[e._v("在Vue中模版编译过程中的指令或者数据绑定都会实例化一个Watcher实例，实例化过程中会触发get()将自身指向Dep.target;")]),e._v(" "),t("li",[e._v("data在Observer时执行getter会触发dep.depend()进行依赖收集，")]),e._v(" "),t("li",[e._v("当data中被 Observer的某个对象值变化后，触发subs中观察它的watcher执行 update() 方法，最后实际上是调用watcher的回调函数cb，进而更新视图。")])]),e._v(" "),t("p",[e._v("总结二、")]),e._v(" "),t("ol",[t("li",[e._v("调用"),t("code",[e._v("observe(obj)")]),e._v("，将"),t("code",[e._v("obj")]),e._v("设置为响应式对象，"),t("code",[e._v("observe函数，Observe, defineReactive函数")]),e._v("三者互相调用，从而递归地将"),t("code",[e._v("obj")]),e._v("设置为响应式对象")]),e._v(" "),t("li",[e._v("渲染页面时实例化"),t("code",[e._v("watcher")]),e._v("，这个过程会读取依赖数据的值，从而完成"),t("code",[e._v("在getter中获取依赖")])]),e._v(" "),t("li",[e._v("依赖变化时触发"),t("code",[e._v("setter")]),e._v("，从而派发更新，执行回调，完成"),t("code",[e._v("在setter中派发更新")])])]),e._v(" "),t("h2",{attrs:{id:"【源码目录结构】"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#【源码目录结构】"}},[e._v("#")]),e._v(" 【源码目录结构】")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("├─ .circleci           // 包含CircleCI持续集成/持续部署工具的配置文件\n├─ .github             // 项目相关的说明文档，上面的说明文档就在此文件夹\n├─ benchmarks          // 基准,性能测试文件，Vue的跑分demo，比如大数据量的table或者渲染大量SVG\n├─ dist                // 构建后输出的不同版本Vue文件(UMD、CommonJS、ES 生产和开发包)\n├─ examples            // 部分示例，用Vue写的一些小demo\n├─ flow                // flow 因为Vue使用了 [Flow](https://flow.org/) 来进行静态类型检查，静态类型检查类型声明文件\n├─ packages            // 包含服务端渲染和模板编译器两种不同的NPM包，是提供给不同使用场景使用的\n├─ scripts             // 存放npm脚本配置文件，结合webpack、rollup进行编译、测试、构建等操作（使用者不需要关心）\n│   ├─ alias.js        // 模块导入所有源代码和测试中使用的别名\n│   ├─ config.js       // 包含在'dist/`中找到的所有文件的生成配置\n│   ├─ build.js        // 对 config.js 中所有的rollup配置进行构建\n├─ src                 // 主要源码所在位置，核心内容\n│   ├─ compiler        // 解析模版相关\n│       ├─ codegen     // 把AST转换为Render函数\n│       ├─ directives  // 通用生成Render函数之前需要处理的指令\n│       ├─ parser       // 解析模版成AST\n│   ├─ core             // Vue核心代码，包括内置组件，全局API封装，Vue 实例化，观察者，虚拟DOM, 工具函数等等。\n│       ├─ components   // 组件相关属性，主要是Keep-Alive\n│       ├─ global-api   // Vue全局API，如Vue.use,Vue.extend,Vue.mixin等\n│       ├─ instance     // 实例化相关内容，生命周期、事件等\n│       ├─ observer     // 响应式核心目录，双向数据绑定相关文件\n│       ├─ util         // 工具方法\n│       └─ vdom         // 包含虚拟DOM 创建（creation）和打补丁(patching) 的代码\n│   ├─ platforms        // 和平台相关的内容，Vue.js 是一个跨平台的MVVM 框架(web、native、weex)\n│       ├─ web          // web端\n│           ├─ compiler // web端编译相关代码，用来编译模版成render函数basic.js\n│           ├─ runtime  // web端运行时相关代码，用于创建Vue实例等\n│           ├─ server   // 服务端渲染\n│           └─ util     // 相关工具类\n│       └─ weex         // 基于通用跨平台的 Web 开发语言和开发经验，来构建 Android、iOS 和 Web 应用\n│   ├─ server           // 服务端渲染（ssr）\n│   ├─ sfc              // 转换单文件组件（*.vue）\n│   └─ shared           // 全局共享的方法和常量\n├─ test                 // test 测试用例\n├─ types                // Vue新版本支持TypeScript，主要是TypeScript类型声明文件\n├─ node_modules         // npm包存放目录\n|-- .babelrc.js         // babel配置\n|-- .editorconfig       // 文本编码样式配置文件\n|-- .eslintignore       // eslint校验忽略文件\n|-- .eslintrc.js        // eslint配置文件\n|-- .flowconfig         // flow配置文件\n|-- .gitignore         // Git提交忽略文件配置\n|-- BACKERS.md         // 赞助者信息文件\n|-- LICENSE            // 项目开源协议\n|-- package.json       // 依赖\n|-- README.md          // 说明文件\n|-- yarn.lock          // yarn版本锁定文件\n \n")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);