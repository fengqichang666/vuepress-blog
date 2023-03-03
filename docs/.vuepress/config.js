/*
 * @Author: feng
 * @Date: 2022-11-07 15:42:06
 * @LastEditTime: 2022-11-07 16:03:22
 * @Description: file content
 */
const children = require('../sidebar')
module.exports = {
	title: '前端笔记',
	description: '前端笔记',
    base: '/vuepress-blog/',
	themeConfig: {
		sidebar: [
			{
				title: '列表', // 必要的
				collapsable: false, // 可选的, 默认值是 true,
				children:[encodeURI('/常用的正则表达式大全')],
			},
			// {
			// 	title: 'vue2', // 必要的
			// 	// path: '/vue2/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
			// 	collapsable: false, // 可选的, 默认值是 true,
			// 	children:[]
			// }
		],
	},
}
