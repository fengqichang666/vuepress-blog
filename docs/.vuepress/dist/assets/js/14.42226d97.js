(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{286:function(n,A,t){"use strict";t.r(A);var v=t(14),_=Object(v.a)({},(function(){var n=this,A=n._self._c;return A("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[A("ul",[A("li",[n._v("HEAD~ 表示祖先")]),n._v(" "),A("li",[n._v("HEAD^ 表示父母 (涉及分支合并)")])]),n._v(" "),A("p",[n._v("举例 A B C 三个分支")]),n._v(" "),A("ul",[A("li",[n._v("A: A1, A2, A3")]),n._v(" "),A("li",[n._v("B: B1, B2, B3")]),n._v(" "),A("li",[n._v("C: C1, C3, C3")])]),n._v(" "),A("p",[n._v("当前在分支 A 上, 合并 B C 这两个分支")]),n._v(" "),A("div",{staticClass:"language- extra-class"},[A("pre",{pre:!0,attrs:{class:"language-text"}},[A("code",[n._v("git merge B C\n")])])]),A("p",[n._v("当前提交一共有 3 个父母")]),n._v(" "),A("p",[n._v("~ 表示第 1 个分支的第 n 个祖先")]),n._v(" "),A("p",[n._v("HEAD~ 表示 A3\nHEAD~2 表示 A2\nHEAD~3 表示 A1\n^ 表示第 n 个父母")]),n._v(" "),A("p",[n._v("HEAD^ 表示 A3\nHEAD^2 表示 B3\nHEAD^3 表示 C3\n注意事项")]),n._v(" "),A("p",[n._v("HEAD~ 与 HEAD~1 等效, HEAD^ 与 HEAD^1 等效\nHEAD~3 等效于 HEAD~~~ 等效于 HEAD^^^ 都表示 A1\nHEAD~n 等效于 HEAD~...~ (n 次 ~) 等效于 HEAD^^^ (n 次 ^)\nHEAD^3 与 HEAD^^^ 不同, 前者表示 C3 (即第 3 个父母), 后者表示 A1\n总结:\n一般情况下, 使用 HEAD~n 情况即可, 表示前 n 次提交, 而使用 HEAD^n 用于分支合并的情况多")])])}),[],!1,null,null,null);A.default=_.exports}}]);