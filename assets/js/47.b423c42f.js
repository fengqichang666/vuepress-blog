(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{322:function(n,e,t){"use strict";t.r(e);var r=t(10),i=Object(r.a)({},(function(){var n=this._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[n("p",[this._v("局部自定义指令v-money")]),this._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[this._v("使用： v-money可输入两位小数   v-money.int整数\n<el-input v-money.int v-model=\"inputVal\"></el-input>\ndirectives: {\n        money: {\n            bind(el, binding) {\n                el = el.children[0];获取到el-input输入框dom\n                let type = binding.modifiers //自定义指令参数\n                function format(n) {\n                    if (!n) return n;\n                    if (Number(n) == 0 || n == '.') return '';//只输入0、.清空输入框\n                    let str = n.split('.');\n                    let re = /\\d{1,3}(?=(\\d{3})+$)/g;\n                    let n1 = str[0].replace(re, \"$&,\");//千分位\n                    if (type.int) return n1;//若不需要补小数点、补零\n                    if (str.length > 1 && str[1]) {\n                    \t//已输入一位小数，补一位0\n                        str[1].length === 1 ? str[1] = str[1] + '0' : str[1]\n                    }\n                    return str.length > 1 && str[1] ? `${n1}.${str[1]}` : `${n1}.00`;\n                }\n                //去除千分位中的‘，’\n                function unformat(num) {\n                    if (!num) return num;\n                    num = num.toString();\n                    num = num.replace(/,/gi, '');\n                    let str = num.split('.');\n                    if (type.int) return num;\n                    //有小数为00，聚焦自动去除\n                    if (str.length > 1) {\n                        str[1] == '00' ? num = str[0] : num\n                    } else {\n                        num = num\n                    }\n                    return num;\n                }\n                el.addEventListener('focus', function (e) {\n                    let inputVal = e.target.value || '';\n                    e.target.value = unformat(inputVal)\n                    //解决ie重新聚焦输入框，光标在最前方bug\n                    el.setSelectionRange(e.target.value.length, e.target.value.length);\n                })\n                el.addEventListener('blur', function (e) {\n                    e.target.value = format(e.target.value);\n                })\n                //当用户使用拼音输入法开始输入汉字时，compositionstart事件就会被触发，输入过程中不会再触发\n                el.addEventListener('compositionstart', function (e) {\n                    e.target.isNeedPrevent = true;\n\n                })\n                //当文本段落的组成完成或取消时, compositionend 事件将被触发。\n                el.addEventListener('compositionend', function (e) {\n                    e.target.isNeedPrevent = false;\n                })\n                el.addEventListener('input', function (e) {\n                //setTimeout+compositionstart+compositionend解决输入法为中文时，每输入拼音都会触发事件、\t\t\t\t且会删除已经输入的正确内容的bug\n                    setTimeout(() => {\n                        if (e.target.isNeedPrevent) return;\n                        let reg\n                        if (type.int) {\n                            reg = /[^\\d]/g\n                        } else {\n                            reg = /[^\\d.]/g\n                        }\n                        let str = e.target.value\n                        str = str.replace(reg, '')\n                        e.target.value = str\n                    })\n                })\n                el.addEventListener('keypress', function (e) {\n                    if (e.target.value == '' && e.key === '.') {//首位禁止输入.\n                        e.preventDefault()\n                    }\n                    //注：这里的正则reg必须在本function内部声明。直接写在bind下会导致每第二次输入错误字符可\t\t\t\t\t以正常输入\n                    let reg\n                    if (type.int) {\n                        reg = /[^\\d]/g\n                    } else {\n                        reg = /[^\\d.]/g\n                    }\n                    if (reg.test(e.key)) {\n                        e.preventDefault()\n                    }\n                    if (e.target.value.indexOf('.') > -1) {\n                        let str = e.target.value.split('.')\n                        //如果已经存在小数点，禁止再次输入\n                        //已经存在两位小数，禁止继续输入\n                        if (e.key === '.' || str[1].length >= 2) {\n                            e.preventDefault()\n                        }\n                    }\n                })\n            }\n        }\n    }\n")])])])])}),[],!1,null,null,null);e.default=i.exports}}]);