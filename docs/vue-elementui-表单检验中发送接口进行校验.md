---
title: vue+elementui 表单检验中发送接口进行校验
date: 2022-09-19 19:30:51
tags: vue+elementui 表单检验中发送接口进行校验
---

## 使用场景

项目中的一个表单中，有两个下拉框，都选择之后需要发接口把所选信息上送，后端进行校验，看两个下拉框所选内容是否符合条件，如果不符合，后端返回标识，下拉框下方报错。

## 方法一

element-ui的form-item有一个error属性可以进行设置错误信息，在接口返回信息后，设置error信息

```
 <el-form-item label="表单元素" prop="valid_num" :error="errorMsg">
    <el-input v-model="ruleForm.valid_num"></el-input>
  </el-form-item>
```

设置验证码error="errorMsg"（errorMsg在data中定义）

在后台数据返回后进行

this.erroMsg = res.data.message

## 方法二

```
	这里使用async await；可根据个人喜好使用promise.then写法
	var checkAge = async(rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        
        let res = await this.query();
        if(res){
        	return callback(new Error(res));
        }
        callback()
      };
      
      
   methods: {
   		async query(){
   			const params = {
   				入参
   			}
   			let res = await check(params)
   			……处理逻辑
   			//如果需要报错，return出根据返回值判断后，想要的报错
   			return "报错了"
   			//校验成功return空字符串
   			return ""
   		}
   }
```

## 其他

其他实现方式目前尚未探索
