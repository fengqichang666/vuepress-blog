---
title: nodejs-websocket
date: 2022-07-03 13:13:15
tags: 
---

文档地址：[nodejs-websocket - npm (npmjs.com)](https://www.npmjs.com/package/nodejs-websocket)

服务端：

```
const io = require('nodejs-websocket')
let server = io.createServer((connection:any)=>{
	//server.connections  返回包含所有 connection 的数组，可以用来广播所有消息
	console.log('new connection...')
	//客户端发送send过来的消息
	connection.on("text",function(data){
		console.log("接收到的客户端消息:"+data);
		//服务端发送数据致客户端
	//connection.send(data, [callback]): 发送一个字符串或者二进制内容到客户端，如果发送的是文本，类似于	// sendText()，如果发送的是二进制，类似于sendBinary(),
		connection.send("服务器端返回的数据，客户端使用onmessage接收")
		
	})
	// 监听关闭
    connection.on("close", function (code, reason) {
        console.log("Connection closed")
    })
    // 监听异常  （比如：直接关闭浏览器窗口）
	connection.on("error",(code) => {
		console.log('服务异常关闭...')
	})
}).listen(3333)

```

客户端

```
 const ws= new WebSocket('ws://127.0.0.1:3333')
 ws.onopen = () =>{
    console.log('成功')
    ws.send('发送至服务端的消息，服务端使用text事件接收')
 }
 //服务端send的数据
 ws.onmessage= (data) =>{
    console.log(data.data)
 }
 ws.onclose = () =>{
    console.log('close')
 }
```

