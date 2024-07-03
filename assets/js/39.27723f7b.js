(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{316:function(v,_,d){"use strict";d.r(_);var e=d(10),$=Object(e.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h5",{attrs:{id:"常用的正则表达式大全"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#常用的正则表达式大全"}},[v._v("#")]),v._v(" 常用的正则表达式大全")]),v._v(" "),_("ol",[_("li",[_("div",{staticClass:"language- extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[v._v('1. 数字：`^[0-9]*$`\n2. n位的数字：`^\\d{n}$`\n3. 至少n位的数字：`^\\d{n,}$`\n4. m-n位的数字：`^\\d{m,n}$`\n5. 零和非零开头的数字：`^(0|[1-9][0-9]*)$`\n6. 非零开头的最多带两位小数的数字：`^([1-9][0-9]*)+(.[0-9]{1,2})?$`\n7. 带1-2位小数的正数或负数：`^(\\-)?\\d+(\\.\\d{1,2})?$`\n8. 验证数字非负数  小数点保留两位小数点 /^(?!0+(?:\\.0+)?$)(?:[1-9]\\d*|0)(?:\\.\\d{1,2})?$/\n9.  /^[+-]?(0|([1-9]\\d*))(\\.\\d+)?$/;  //不限制小数位数   \n\t/^[+-]?((\\d*(\\.\\d{1,})$)|(\\d+$))/ //可限制小数位数   {1,}  小数时，必须1位以上小数\n\t/^[+-]?((\\d*(\\.\\d{1,})$)|(\\d{1,3}$))/; //可限制整数位数  {1,3}  整数时，1到3位整数\n\t/^([1-9]\\d*|[0]{1,1})$/; //含0正整数\n10. 正数、负数、和小数：`^(\\-|\\+)?\\d+(\\.\\d+)?$`\n11. 有两位小数的正实数：`^[0-9]+(.[0-9]{2})?$`\n12. 有1~3位小数的正实数：`^[0-9]+(.[0-9]{1,3})?$`\n13. 非零的正整数：`^[1-9]\\d*$` 或 `^([1-9][0-9]*){1,3}$` 或 `^\\+?[1-9][0-9]*$`\n14. 非零的负整数：`^\\-[1-9][]0-9"*$` 或 `^-[1-9]\\d*$`\n15. 非负整数：`^\\d+$` 或 `^[1-9]\\d*|0$`\n16. 非正整数：`^-[1-9]\\d*|0$` 或 `^((-\\d+)|(0+))$`\n17. 非负浮点数：`^\\d+(\\.\\d+)?$` 或 `^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*|0?\\.0+|0$`\n18. 非正浮点数：`^((-\\d+(\\.\\d+)?)|(0+(\\.0+)?))$` 或 `^(-([1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*))|0?\\.0+|0$`\n19. 正浮点数：`^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*$` 或 `^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$`\n20. 负浮点数：`^-([1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*)$` 或 `^(-(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*)))$`\n21. 浮点数：`^(-?\\d+)(\\.\\d+)?$` 或 `^-?([1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*|0?\\.0+|0)$`\n')])])])])]),v._v(" "),_("hr"),v._v(" "),_("ol",[_("li",[v._v("汉字："),_("code",[v._v("^[\\u4e00-\\u9fa5]{0,}$")])]),v._v(" "),_("li",[v._v("英文和数字："),_("code",[v._v("^[A-Za-z0-9]+$")]),v._v(" 或 "),_("code",[v._v("^[A-Za-z0-9]{4,40}$")])]),v._v(" "),_("li",[v._v("长度为3-20的所有字符："),_("code",[v._v("^.{3,20}$")])]),v._v(" "),_("li",[v._v("由26个英文字母组成的字符串："),_("code",[v._v("^[A-Za-z]+$")])]),v._v(" "),_("li",[v._v("由26个大写英文字母组成的字符串："),_("code",[v._v("^[A-Z]+$")])]),v._v(" "),_("li",[v._v("由26个小写英文字母组成的字符串："),_("code",[v._v("^[a-z]+$")])]),v._v(" "),_("li",[v._v("由数字和26个英文字母组成的字符串："),_("code",[v._v("^[A-Za-z0-9]+$")])]),v._v(" "),_("li",[v._v("由数字、26个英文字母或者下划线组成的字符串："),_("code",[v._v("^\\w+$")]),v._v(" 或 "),_("code",[v._v("^\\w{3,20}$")])]),v._v(" "),_("li",[v._v("中文、英文、数字包括下划线："),_("code",[v._v("^[\\u4E00-\\u9FA5A-Za-z0-9_]+$")])]),v._v(" "),_("li",[v._v("中文、英文、数字但不包括下划线等符号："),_("code",[v._v("^[\\u4E00-\\u9FA5A-Za-z0-9]+$")]),v._v(" 或 "),_("code",[v._v("^[\\u4E00-\\u9FA5A-Za-z0-9]{2,20}$")])])]),v._v(" "),_("hr"),v._v(" "),_("ol",[_("li",[v._v("Email地址："),_("code",[v._v("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$")])]),v._v(" "),_("li",[v._v("域名："),_("code",[v._v("[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?")])]),v._v(" "),_("li",[v._v("InternetURL："),_("code",[v._v("[a-zA-z]+://[^\\s]*")]),v._v(" 或 "),_("code",[v._v("^http://([\\w-]+\\.)+[\\w-]+(/[\\w-./?%&=]*)?$")])]),v._v(" "),_("li",[v._v("手机号码："),_("code",[v._v("^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$")])]),v._v(" "),_("li",[v._v("手机号码 var phonetest=/^1[3456789]\\d{9}$/   if(phonetest（val）！=true){格式不对}")]),v._v(" "),_("li",[v._v('电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)：'),_("code",[v._v("^(\\(\\d{3,4}-)|\\d{3.4}-)?\\d{7,8}$")])]),v._v(" "),_("li",[v._v("国内电话号码(0511-4405222、021-87888822)："),_("code",[v._v("\\d{3}-\\d{8}|\\d{4}-\\d{7}")])]),v._v(" "),_("li",[v._v("身份证号(15位、18位数字)："),_("code",[v._v("^\\d{15}|\\d{18}$")])]),v._v(" "),_("li",[v._v("短身份证号码(数字、字母x结尾)："),_("code",[v._v("^([0-9]){7,18}(x|X)?$")]),v._v(" 或 "),_("code",[v._v("^\\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$")])]),v._v(" "),_("li",[v._v("帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)："),_("code",[v._v("^[a-zA-Z][a-zA-Z0-9_]{4,15}$")])]),v._v(" "),_("li",[v._v("密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)："),_("code",[v._v("^[a-zA-Z]\\w{5,17}$")])]),v._v(" "),_("li",[v._v("强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)："),_("code",[v._v("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$")])]),v._v(" "),_("li",[v._v("日期格式："),_("code",[v._v("^\\d{4}-\\d{1,2}-\\d{1,2}")])]),v._v(" "),_("li",[v._v("一年的12个月(01～09和1～12)："),_("code",[v._v("^(0?[1-9]|1[0-2])$")])]),v._v(" "),_("li",[v._v("一个月的31天(01～09和1～31)："),_("code",[v._v("^((0?[1-9])|((1|2)[0-9])|30|31)$")])]),v._v(" "),_("li",[v._v("xml文件："),_("code",[v._v("^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\\\.[x|X][m|M][l|L]$")])]),v._v(" "),_("li",[v._v("中文字符的正则表达式："),_("code",[v._v("[\\u4e00-\\u9fa5]")])]),v._v(" "),_("li",[v._v("双字节字符："),_("code",[v._v("[^\\x00-\\xff]")]),v._v(" (包括汉字在内，可以用来计算字符串的长度(一个双字节字符长度计2，ASCII字符计1))")]),v._v(" "),_("li",[v._v("空白行的正则表达式："),_("code",[v._v("\\n\\s*\\r")]),v._v(" (可以用来删除空白行)")]),v._v(" "),_("li",[v._v("首尾空白字符的正则表达式："),_("code",[v._v("^\\s*|\\s*$")]),v._v("或"),_("code",[v._v("(^\\s*)|(\\s*$)")]),v._v(" (可以用来删除行首行尾的空白字符(包括空格、制表符、换页符等等)，非常有用的表达式)")]),v._v(" "),_("li",[v._v("腾讯QQ号："),_("code",[v._v("[1-9][0-9]{4,}")]),v._v(" (腾讯QQ号从10000开始)")]),v._v(" "),_("li",[v._v("中国邮政编码："),_("code",[v._v("[1-9]\\d{5}(?!\\d)")]),v._v(" (中国邮政编码为6位数字)")]),v._v(" "),_("li",[v._v("IP地址："),_("code",[v._v("\\d+\\.\\d+\\.\\d+\\.\\d+")]),v._v(" (提取IP地址时有用)")]),v._v(" "),_("li",[v._v("IP地址："),_("code",[v._v("((?:(?:25[0-5]|2[0-4]\\\\d|[01]?\\\\d?\\\\d)\\\\.){3}(?:25[0-5]|2[0-4]\\\\d|[01]?\\\\d?\\\\d))")])]),v._v(" "),_("li",[v._v("IP-v4地址："),_("code",[v._v("\\\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\b")]),v._v(" (提取IP地址时有用)")]),v._v(" "),_("li",[v._v("子网掩码："),_("code",[v._v("((?:(?:25[0-5]|2[0-4]\\\\d|[01]?\\\\d?\\\\d)\\\\.){3}(?:25[0-5]|2[0-4]\\\\d|[01]?\\\\d?\\\\d))")])]),v._v(" "),_("li",[v._v("校验日期:"),_("code",[v._v("^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$")]),v._v("(“yyyy-mm-dd“ 格式的日期校验，已考虑平闰年。)")]),v._v(" "),_("li",[v._v("抽取注释："),_("code",[v._v("\x3c!--(.*?)--\x3e")])])])])}),[],!1,null,null,null);_.default=$.exports}}]);