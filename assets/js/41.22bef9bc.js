(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{313:function(t,e,n){"use strict";n.r(e);var s=n(10),r=Object(s.a)({},(function(){var t=this._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[t("h2",{attrs:{id:"数据类型判断"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据类型判断"}},[this._v("#")]),this._v(" 数据类型判断")]),this._v(" "),t("p",[this._v("typeof 可以正确识别：Undefined、Boolean、Number、String、Symbol、Function 等类型的数据，但是对于其他的都会认为是 object，比如 Null、Date 等，所以通过 typeof 来判断数据类型会不准确。但是可以使用 Object.prototype.toString 实现。")]),this._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("function typeOf(obj) {\n-   let res = Object.prototype.toString.call(obj).split(' ')[1]\n-   res = res.substring(0, res.length - 1).toLowerCase()\n-   return res\n// 评论区里提到的更好的写法\n+   return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()\n}\ntypeOf([])        // 'array'\ntypeOf({})        // 'object'\ntypeOf(new Date)  // 'date'\n\n")])])])])}),[],!1,null,null,null);e.default=r.exports}}]);