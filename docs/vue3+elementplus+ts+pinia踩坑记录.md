---
title: vue3+elementplus+ts+pinia踩坑记录
date: 2021-12-08 15:23:24
tag:
---

## element-plus单选框无法更改问题

```
<el-form ref="form" :model="form" class="mt15">
 	<el-radio v-model="form.amtRadio" label="1">按钮1</el-radio>
    <el-radio v-model="form.amtRadio" label="2">按钮2</el-radio>
</el-form>

```

发现单选按钮2无法选中

原因：el-form中绑定的ref 跟v-model 相同

## 与elementui的表单样式区别

elementui中 表单的label与content使用浮动保持在一行

elementplus中表单的item使用的display布局。

## Ts如何通过中括号读取属性值

```
type form = {
    amtRadio:string,
    mainAmt:string,
    subAmt:string
}
const form = reactive<form>({
    amtRadio: '1',
    mainAmt: '',
    subAmt:''
})
const blurAmt = (key:string): void => {
    console.log(form[key])   //ts会报错：类型"String"不能作为索引类型使用
}
解决方法：keyof typeof
const blurAmt = (key:keyof typeof form): void => {}
```

## 控制台警告： [Vue warn]:Missing required prop: "***" 

```
父组件：
    <LayOut msg="Vue3 + Vite + Ts + Pinia" />
子组件：
	defineProps<{ msg: string }>()
解决方案：
子组件：
	defineProps<{ msg?: string }>()
```



## 子组件更改接受到的对象数组

```
数据类型:[{title:'',value:''},{title:'',value:''}]
场景1
父组件传过来的值，子组件需要在子组件更改为响应式
type item = {
    title: string,
    value: string
}
const props = defineProps<{
    info: Array<item>
}>()
//toRefs toRef无效
const info = ref(props.info) //重新ref（会改变父组件源对象，可深拷贝解决）

简单数据类型
<div>{{info}}</div>
const props =defineProps<{
    xxx:string
}>()
const info =ref(props.xxx)//父组件更改xxx值，子组件无响应。但是子组件可任意更改info值（影响不到父组件）

解决方法  父组件更改xxx值，子组件同时发生改变，但是为只读。无法在子组件更改
{{info.xxx}}
const info =toRefs(props)

{{xxx}}
const info =toRef(props,'xxx')


```

使用components.d.ts报错：找不到模块“./src/components/com.vue”或其相应的类型声明。

原因：tsconfig.json中需要在include中添加"components.d.ts"

## localStorage取值、赋值

直接使用JSON.parse(localStorage.getItem('****'))会报错  类型“string | null”的参数不能赋给类型“string”的参数。

解决方案  JSON.**parse**(localStorage.**getItem**('****') as string)  使用as关键字  类型断言

## 超大静态资源拆分

vite打包警告：Some chunks are larger than 500 KiB after minification.

尚未解决：element-plus 600KiB依旧有警告

vite.config.ts：设置包名、拆分 

```
build: {
            rollupOptions: {
                output: {
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                    manualChunks(id) { //静态资源分拆打包
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    }
                }
            }
        }
```

## 部署到hexo博客github.io/fast-page （hash模式）

有的时候项目需要部署在服务器的子目录下，这时就要根据开发环境或生产环境动态配置 `vite.config.ts` 中的 `base` 选项

vite.config.ts： 

`command` 属性一共有两个值 `build` 和 `serve`，对应了 `package.json` 定义的脚本名称，分别为构建生产版本和开启开发服务。

```
import { defineConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
    return {
    	plugins: [
            vue()
        ],
        base: command === 'build' ? '/fast-page/' : '/'
    }
})
```

### history路由模式需后端配合，放弃

## draggable拖动插件引起的问题

```
// 点击卡片右上角图标删除本条
<el-icon  @click="del(element,index)">
      <CloseBold />
</el-icon>

script代码
const del = (item: List, i: number): void => {
    dataList.splice(i, 1) // 页面显示
    delItem(item) // 本地存储
}
```

有时候点击之后触发了del事件，本地存储的数据也已经删了。页面上没删掉。

解决方案：拖动过程中事件逻辑不让执行，拖动完成再触发

```
const lock = ref(false)
// draggable提供 拖动开始事件
const onStart = ():void =>{
    lock.value = true
}
// draggable提供 拖动结束事件
const onEnd = ():void => {
    lock.value = false
}
const del = (item: List, i: number): void => {
    if(lock.value){return}
    dataList.splice(i, 1) // 页面显示
    delItem(item) // 本地存储
}
```

## 刷新页面，element-plus菜单选中样式与当前菜单不匹配

解决方案：

```
 <el-menu router :collapse-transition="false" :default-active="activeIndex">
 </el-menu>

const route = useRoute()
const activeIndex = ref('/okr') // 定义默认
activeIndex.value = route.path // 刷新页面后，获取到当前的path
```

## 全局引入icon，switch组件active-icon与inactive-icon直接使用ts报错

场景：

在main.ts中import * as ElementPlusIconsVue from '@element-plus/icons-vue'全局使用icon

代码中直接使用报错：

```
 <el-switch v-model="darkTheme" class="mt-2" style="margin-left: 24px" inline-prompt
                        :active-icon="Check" :inactive-icon="Close" />
```

类型“{ $: ComponentInternalInstance; $data: {}; $props: Partial<{}> & Omit<Readonly<ExtractPropTypes<{}>> & VNodeProps & AllowedComponentProps & ComponentCustomProps, never>; ... 10 more ...; $watch(source: string | Function, cb: Function, options?: WatchOptions<...> | undefined): WatchStopHandle; } & ... 5 more ... & Sh...”上不存在属性“Check”。ts(2339)

解决方法：重新定义。。

```
const Check = 'Check'
const Close = 'Close'
```

