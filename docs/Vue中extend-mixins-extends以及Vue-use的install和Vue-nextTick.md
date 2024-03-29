---
title: Vue中extend,mixins,extends以及Vue.use的install和Vue.nextTick
date: 2021-09-24 15:33:37
---

## 1.Vue.extend

```
使用基础 Vue 构造器，创建一个“子类”
场景:vue 组件中有些需要将一些元素挂载到元素上,这个时候 extend 就起到作用了
Vue.extend实际是创建一个构造器,对应的初始化构造器,并将其挂载到标签上   是构造一个组件的语法器 
像是我们在JS中使用的构造函数，先定义好，然后在需要使用的地方new一下

为什么使用 extend
在 vue 项目中，我们有了初始化的根实例后，所有页面基本上都是通过 router 来管理，组件也是通过 import 来进行局部注册，所以组件的创建我们不需要去关注，相比 extend 要更省心一点点。但是这样做会有几个缺点：

组件模板都是事先定义好的，如果我要从接口动态渲染组件怎么办？
所有内容都是在 #app 下渲染，注册组件都是在当前位置渲染。如果我要实现一个类似于 window.alert() 提示组件要求像调用 JS 函数一样调用它，该怎么办？
这时候，Vue.extend + vm.$mount 组合就派上用场了。

写法:
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{extendData}}</br>实例传入的数据为:{{propsExtend}}</p>',//template对应的标签最外层必须只有一个标签
  data: function () {
    return {
      extendData: '这是extend扩展的数据',
    }
  },
  mounted() {
		setTimeout(() => {
			// 3s 后通过父级移除子元素的方式移除该组件实例和DOM节点
			this.$destroy();
			this.$el.parentNode.removeChild(this.$el);
		}, 3000);
	}
  props:['propsExtend']
})

// 创建的构造器可以挂载到元素上,也可以通过 components 或 Vue.component()注册使用
// 挂载到一个元素上。通过propsData传参.
new Profile({propsData:{propsExtend:'我是实例传入的数据'}}).$mount('#app-extend')
$mount('要添加到的容器') 如果不传入选择器，将渲染为文档之外的的元素，不可为html或body标签
但是可以
instance = new Profile({propsData:{propsExtend:'我是实例传入的数据'}});     document.body.appendChild(instance.$mount().$el);
示例：
	//message.js
	import Vue from "vue"
    import message from './message.vue'
    let MessageContructor  = Vue.extend(message)
    let instance
    let Message = function(options = {}){
        instance = new MessageContructor({propsData:{propsExtend:'我是实例传入的数据'}});
        document.body.appendChild(instance.$mount().$el);
    }

    export default Message;
    //main.js
    import Message from '@/components/message'
	Vue.prototype.$message = Message

或者
// 通过 components(局部组件注册) 或 Vue.component()注册
Vue.component('Profile',Profile)

```

## 2.Vue.component

```
1.将通过 Vue.extend 生成的扩展实例构造器注册（命名）为一个全局组件,参数可以是Vue.extend()扩展的实例,也可以是一个对象(会自动调用extend方法) 2.两个参数,一个组件名,一个extend构造器或者对象
//1.创建组件构造器
  var obj = {
    props: [],
    template: '<div><p>{{extendData}}</p></div>',//最外层只能有一个大盒子,这个和<tempalte>对应规则一致
    data: function () {
      return {
        extendData: '这是Vue.component传入Vue.extend注册的组件',
      }
    },
  };
 
  var Profile = Vue.extend(obj);
 
  //2.注册组件方法一:传入Vue.extend扩展过得构造器
  Vue.component('component-one', Profile)
 
  //2.注册组件方法二:直接传入
  Vue.component('component-two', obj)
 
  //3.挂载
  new Vue({
    el: '#app',
    components:{
    	
    }
  });
 //脚手架中
方法1
    // 引入
    import 组件名 from '@/components/xxx'
    // 注册为全局组件
    Vue.component('组件名',组件名)
方法2
	在src/components文件夹下新建index.js文件
 	// 引入写好的全局组件
    import 组件名1 from './xxx'
    import 组件名2 from './yyy'
    // 默认导出插件
    export default {
        install: function(Vue) {
            console.log('自定义的插件~')
            // 在自定义的插件中注册为全局组件
            Vue.component('组件名1',xxx)
            Vue.component('组件名2',yyy)
            // 也可以往Vue的原型对象上添加属性或者方法，名字可以自定义
            // 在其他.vue结尾的文件中，可以通过this，访问自己添加的属性和方法
            Vue.prototype.num = 10
            Vue.prototype.$sayHi = () => {
                alert('Hi~')
            }
        }
    }
    在main.js文件下，使用该插件。
    // 导入写好的自定义插件
    import myCom from '@/components'
    Vue.use(myCom)

  //获取注册的组件 (始终返回构造器)
  var oneComponent=Vue.component('component-one');
  console.log(oneComponent===Profile)//true,返回的Profile构造器

```

## 3.mixins

```
场景:有些组件有些重复的 js 逻辑,如校验手机验证码,解析时间等,mixins 就可以实现这种混入
详见另外一篇文档--详解mixins混入使用

```

## 4.Vue.use()

```

场景:我们使用 element时会先 import,再 Vue.use()一下,实际上就是注册组件,触发 install 方法;
这个在组件调用会经常使用到;
会自动组织多次注册相同的插件.
Vue.use()多次调用需写多次
    Vue.use(myPlugin)
    Vue.use(Vant)
    Vue.use(Lazyload)
```



## 5.install

```
场景:在 Vue.use()说到,执行该方法会触发 install

vue提供install可供我们开发新的插件及全局注册组件等
install方法第一个参数是vue的构造器，第二个参数是可选的选项对象
export default {
	install(Vue,option){
		组件
		指令
		混入
		挂载vue原型
	}
}
全局注册组件
import PageTools from '@/components/PageTools/pageTools.vue'
export default {
  install(Vue) {
    // 注册组件  挂载函数  注册过滤器  注册自定义指令
    Vue.component('PageTools', PageTools)
   
    Vue.prototype.$sleep = sleep
    // 过滤器
    Vue.filter('relTime', relTime)
  }
}
在main.js中直接用引用并Vue.use进行注册
import Component from '@/components'
Vue.use(Component)
全局自定义指令
export default{
	install(Vue){
		Vue.directive('pre',{
			inserted(button,bind){
				button.addEventListener('click',()=>{
					if(!button.disabled){
						button.disabled = true;
						setTimeout(()=>{
							button.disabled = false
						},1000)
					}
				})
			}
		})
	}
}
在main.js跟注册组件一样
import pre from '@/aiqi'
Vue.use(pre)

var MyPlugin = {};
  MyPlugin.install = function (Vue, options) {
    // 2. 添加全局资源,第二个参数传一个值默认是update对应的值
    Vue.directive('click', {
      bind(el, binding, vnode, oldVnode) {
        //做绑定的准备工作,添加时间监听
        console.log('指令my-directive的bind执行啦');
      },
      inserted: function(el){
      //获取绑定的元素
      console.log('指令my-directive的inserted执行啦');
      },
      update: function(){
      //根据获得的新值执行对应的更新
      //对于初始值也会调用一次
      console.log('指令my-directive的update执行啦');
      },
      componentUpdated: function(){
      console.log('指令my-directive的componentUpdated执行啦');
      },
      unbind: function(){
      //做清理操作
      //比如移除bind时绑定的事件监听器
      console.log('指令my-directive的unbind执行啦');
      }
    })

    // 3. 注入组件
    Vue.mixin({
      created: function () {
        console.log('注入组件的created被调用啦');
        console.log('options的值为',options)
      }
    })

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function (methodOptions) {
      console.log('实例方法myMethod被调用啦');
    }
  }

  //调用MyPlugin
  Vue.use(MyPlugin,{someOption: true })

  //3.挂载
  new Vue({
    el: '#app'
  });


```

## 4.extends

```
extends用法和mixins很相似,通过暴露一个extends对象到组件中使用。只不过接收的参数是简单的选项对象或构造函数,所以extends只能单次扩展一个组件

定义的属性覆盖规则和mixins一致
```

Vue.extend和Vue.component是为了创建构造器和组件; mixins和extends是为了拓展组件; install是开发插件; 总的顺序关系: Vue.extend>Vue.component>extends>mixins\> 组件
