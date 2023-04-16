---
title: vue组件通信
date: 2021-07-20 11:00:15
tags: vue组件通信
---

## 方法一、`props`/`$emit`

```
父传子
父组件调用子组件
 <Son :ptos="ptos"></Son>
 
 import Son from '@/views/Children.vue'
 components:{
    Son
  }
 子组件接收
 props:{
        ptos:{
            type:String,
            require:true
        }
    },
 如果需要根据父组件传值实时刷新子组件
 data(){
        return{
            a:''
        }
    },
 created(){
     this.a=this.ptos;
 },
 watch:{
     ptos(newval,oldval){
     	this.a=newval
     }
 }
子传父
父组件
 <Son :ptos="ptos" @zdysj='zdysj'></Son>
 
 zdysj(e){
      console.log(e);//e代表'接收的子组件传的值'
    }
 子
 <el-button @click="stop">{{a}}</el-button>
 
 stop(){
   this.$emit('zdysj','子传父');
 }

```

## 方法二 事件总线（EventBus）

```
1.使用js或者空vue实例组件
新建一个 eventBus.js  
import Vue from 'vue'
export const EventBus = new Vue()
新建一个 eventBus.vue
<tempalte>
</template>
<script>
    import Vue from 'vue';
    export default new Vue({
        data () {

        }
    })
</script>
父子组件引入
import {EventBus} from '@/eventBus.js'
父
mounted(){
    EventBus.$on('zdysjed',({a})=>{
      console.log(a);
    })
  },
  
子
stop(){
      EventBus.$emit('zdysjed',{a:'eventBus'});
 }
```

## 方法三、vuex与localStorage

## 方法四、`$attrs`/`$listeners`

```
多级组件嵌套需要传递数据时，通常使用的方法是通过vuex。但如果仅仅是传递数据，而不做中间处理，使用 vuex 处理，未免有点大材小用。
$attrs  可以通过 v-bind="$attrs" 传入内部组件
接收除了props声明外的所有绑定属性（class、style除外）
    <Son a='a' b='b'></Son> 
    <SonSon v-bind="$attrs"></SonSon>
    子组件通过this.$attrs直接获取
$listeners  可以通过 v-on="$listeners" 传入内部组件
接收除了带有.native事件修饰符的所有事件监听器
可以使用 $emit触发 parent.vue 的函数。
$emit("事件名")

```

## 方法五、provide/inject

```
data
provide
created  // 在这个阶段$el还未生成，在这先处理privide的逻辑，子孙组件才可以取到inject的值
mounted
父组件
 provide(){
    return{
      provide:this.datas
    }
  }
后代组件获取 不仅限与子组件
  inject:["datas"]
cosole.log(this.datas)


使用2.6最新API Vue.observable 优化响应式 provide
import Vue from 'vue'
  provide() {
    this.theme = Vue.observable({
      color: "blue"
    });
    return {
      theme: this.theme
    };
  }
  
  inject: {
    theme: {
      //函数式组件取值不一样
      default: () => ({})
    }
  }
//响应式方案
1.传递的值变成 this--> 整个实例
 provide: {
    app: this// 传递整个this过去
  }
  子组件
 inject: ['app'], // this.app 下面都是响应式的,因为都是同一实例下的引用
 
 2.使用computed
  provide(){
        return{
            tableLen:() => this.tableData.length
        }
    }
   子组件
 computed:{
      tableLength(){
          return this.tableLen();
      },
  },
```

## 方法六、`$parent` / `$children`与 `ref`

```
 <Son ref="sonRef"></Son> 
 使用this.$refs.sonRef能更快的获取操作子组件属性值或函数
 $refs不能在created生命周期中使用 因为在组件创建时候 该ref还没有绑定元素
 
 $children获取某个子组件的属性值或函数
 可以使用$children[i].paramsName 来获取某个子组件的属性值或函数，$children返回的是一个子组件数组
 
 $parent获取修改父组件的数据内容
 this.$parent.datas
 
```

## 总结

常见使用场景可以分为三类：

- 父子通信：

父向子传递数据是通过 props，子向父是通过 events（`$emit`）；通过父链 / 子链也可以通信（`$parent` / `$children`）；ref 也可以访问组件实例；provide / inject API；`$attrs/$listeners`

- 兄弟通信：

Bus；Vuex

- 跨级通信：

Bus；Vuex；provide / inject API、`$attrs/$listeners`
