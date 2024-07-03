(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{282:function(t,e,a){"use strict";a.r(e);var s=a(10),r=Object(s.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"git凭据管理的三种方式-https"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git凭据管理的三种方式-https"}},[t._v("#")]),t._v(" "),e("em",[e("strong",[t._v("Git凭据管理的三种方式")])]),t._v("(https)")]),t._v(" "),e("p",[t._v("Git的凭据存储有cache、store、manager三种方式")]),t._v(" "),e("p",[t._v("Git 中有三种级别system 、global 、local ，可以针对不同的级别设置不同的凭据存储方式")]),t._v(" "),e("p",[t._v("同时也有三个级别的config文件，分别是"),e("strong",[t._v("system、global和local")]),t._v("。在当前环境中，分别对应"),e("code",[t._v("%GitPath%\\mingw64\\etc\\gitconfig")]),t._v("文件、"),e("code",[t._v("$home\\.gitconfig")]),t._v("文件和"),e("code",[t._v("%RepoPath%\\.git\\config")]),t._v("文件。其中"),e("code",[t._v("%GitPath%")]),t._v("为Git的安装路径，"),e("code",[t._v("%RepoPath%")]),t._v("为某仓库的本地路径。所以system配置整个系统只有一个，global配置每个账户只有一个，而local配置和git仓库的数目相同，并且只有在仓库目录才能看到该配置。")]),t._v(" "),e("p",[t._v("当"),e("code",[t._v("git commit")]),t._v("时，Author信息依次读取local、global和system的配置，如果找到则不再继续读取。"),e("strong",[t._v("其他配置的读取顺序也是如此")]),t._v("。")]),t._v(" "),e("h2",{attrs:{id:"查看不同级别的凭据管理方式-credential-helper"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看不同级别的凭据管理方式-credential-helper"}},[t._v("#")]),t._v(" "),e("strong",[t._v("查看不同级别的凭据管理方式")]),t._v("(credential.helper)")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ git config --system credential.helper\nmanager\n\nglobal 、local 如果不设置，默认是没有的\n$ git config --global credential.helper\n\n$ git config --local credential.helper\n")])])]),e("h2",{attrs:{id:"修改指定级别的凭据管理方式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#修改指定级别的凭据管理方式"}},[t._v("#")]),t._v(" "),e("em",[e("strong",[t._v("修改指定级别的凭据管理方式")])])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ git config --system credential.helper wincred\n")])])]),e("h2",{attrs:{id:"平时输入账号密码-用的是哪种-账号密码保存在哪里-如何进行修改"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#平时输入账号密码-用的是哪种-账号密码保存在哪里-如何进行修改"}},[t._v("#")]),t._v(" 平时输入账号密码，用的是哪种？账号密码保存在哪里？如何进行修改？")]),t._v(" "),e("h4",{attrs:{id:"一、manager"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#一、manager"}},[t._v("#")]),t._v(" "),e("em",[e("strong",[t._v("一、manager")])])]),t._v(" "),e("p",[t._v("若安装Git时安装了GitGUI，自动会在system级别中设置credential.helper为manager。")]),t._v(" "),e("p",[t._v("git-credential-manager.exe和 git-credential-wincred.exe 都是将凭据存储在系统的凭据管理器中，只不过前者是有图形界面，后者没有图形界面，需要在命令行中输入密码")]),t._v(" "),e("p",[t._v("你的账号密码是在弹窗中输入的，例如下面的这样。使用的就是manager来进行凭据管理的")]),t._v(" "),e("img",{staticStyle:{zoom:"67%"},attrs:{src:"https://fengqichang666.github.io/images/manage.png"}}),t._v(" "),e("h5",{attrs:{id:"凭据保存的位置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#凭据保存的位置"}},[t._v("#")]),t._v(" "),e("em",[e("strong",[t._v("*凭据保存的位置*")])])]),t._v(" "),e("p",[t._v("在控制面板->用户账户->凭据管理器，可以看到对应的git账号凭据管理，可以修改或者删除。")]),t._v(" "),e("p",[t._v("删除后，再次pull或者push，会重新输入密码")]),t._v(" "),e("img",{staticStyle:{zoom:"67%"},attrs:{src:"https://fengqichang666.github.io/images/control.png"}}),t._v(" "),e("p",[t._v("当再次在本机push的时候，会直接读取凭据管理器的中账户信息。"),e("strong",[t._v("经个人测试，除非手动点击“编辑”或者“删除”，否则无法更改账户")]),t._v("。")]),t._v(" "),e("h4",{attrs:{id:"二、stroe"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#二、stroe"}},[t._v("#")]),t._v(" "),e("em",[e("strong",[t._v("*二、stroe*")])])]),t._v(" "),e("p",[t._v("如果你在输入账号密码的时候，关闭了manager 方式的输入框，就会要求你在命令行中输入账号")]),t._v(" "),e("h5",{attrs:{id:"存储密码"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#存储密码"}},[t._v("#")]),t._v(" "),e("em",[e("strong",[t._v("*存储密码*")])])]),t._v(" "),e("p",[t._v("1、 设置global 的凭据管理方法为store ，命令如下：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("git config --global credential.helper store\n")])])]),e("p",[t._v("2 、在"),e("code",[t._v("C:/user/用户名")]),t._v(" 目录下的.gitconfig文件添加以下内容")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("[credential]\n\thelper = store\n")])])]),e("p",[t._v("3、输入账号和密码，push或者pull后，此时查看C:/user/用户名 会自动生成.git-credentials 文件，里面明文保存了你的账号和密码。")]),t._v(" "),e("p",[t._v("4、可以使用类似如下参数的形式指定存储上述信息文件。再次push，便会将账户信息存至"),e("code",[t._v("D:/credential/cred1.txt")]),t._v("中。若想清除账户，删除该文件即可")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("[credential]\nhelper = store --file=D:/credential/cred1.txt\n")])])]),e("p",[t._v("注意：系统自动的.git-credentials文件和自己手动写入.git-credentials 文件，符号编码是不一样导致，所以自己手动生成该文件，可能是无法使用的")]),t._v(" "),e("p",[e("em",[t._v("特别注意：如果使用store存储凭据，会在.git-credentials 文件和控制面板的凭据管理器中，两个地方同时生成凭据。所以如果要修改，最后两处一起删除")])]),t._v(" "),e("h4",{attrs:{id:"三、cache"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#三、cache"}},[t._v("#")]),t._v(" "),e("em",[e("strong",[t._v("*三、cache*")])])]),t._v(" "),e("p",[t._v("将凭证存放在内存中一段时间。 密码永远不会被存储在磁盘中，并且默认在15分钟后从内存中清除。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("git config --global credential.helper cache\n如果想自己设置时间，可以这样做： 密码将保存在内存中1小时\ngit config credential.helper 'cache --timeout=3600'\n")])])]),e("h4",{attrs:{id:"小结"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#小结"}},[t._v("#")]),t._v(" 小结")]),t._v(" "),e("p",[t._v("综上，因为store使用明文保存账户信息，存在安全隐患。使用manager和wincred方式比较安全，但不能满足多账户（GitHub账户）切换（除非删除重录）。\n"),e("strong",[t._v("使用store方式时，配置每个repository的local级别credential.helper，并且通过--file配置不同的文件，这样每个repository可以读取独立的账户信息，可满足需求。")])])])}),[],!1,null,null,null);e.default=r.exports}}]);