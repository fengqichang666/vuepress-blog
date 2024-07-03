(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{290:function(t,n,a){"use strict";a.r(n);var e=a(10),i=Object(e.a)({},(function(){var t=this,n=t._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h2",{attrs:{id:"配置"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#配置"}},[t._v("#")]),t._v(" 配置")]),t._v(" "),n("p",[t._v("更改设置。可以是版本库的设置，也可以是系统的或全局的")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('取消追踪某文件 \ngit update-index --assume-unchanged src\\js\\app.js\n重新追踪\ngit update-index --no-assume-unchanged src\\js\\app.js\n\nfalse不忽略大小写 true忽略\ngit config core.ignorecase false/true\n\n#重新输入账号密码\ngit config --system --unset credential.helper//若无效git config --global http.emptyAuth true\n\n//无需每次都输入密码\n1、输入密码后执行下面代码就可以了\ngit config --global credential.helper store\n\n#查看仓库配置【必须要进入到具体的目录下，比如要查看TestGit仓库的配置信息】\ngit config --local -l \ngit config --global -l 查看用户配置\ngit config --system -l 查看系统配置\ngit config -l查看所有的配置信息，依次是系统级别、用户级别、仓库级别\n# 显示当前的Git配置\n$ git config --list\n\n# 编辑Git配置文件\n$ git config -e [--global]\n\n# 输出、设置基本的全局变量\n$ git config --global user.email\n$ git config --global user.name\n\n$ git config --global user.email "MyEmail@gmail.com"\n$ git config --global user.name "My Name"\n\n# 为Git命令创建一个快捷方式（别名）。\n git config --global alias.st status\n \n git config --global alias.co checkout\n \n git config --global alias.ci commit\n \n git config --global alias.br branch\n \n git config --global alias.last \'log -1\'\n 设置文本编辑器\n git config --global core.editor vim # 默认是使用vi或者vim\n git config --global core.editor gedit # 如果能使用图形化的编辑器的话\n')])])]),n("h2",{attrs:{id:"配置文件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#配置文件"}},[t._v("#")]),t._v(" 配置文件")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("[user]配置账号信息\n别名配置\n方法一、\n配置文件路径 ：C:\\Users\\feng\\.gitconfig\n下方添加 \n[alias]\n       co = ckeckout\n       del = branch -D\n下面的别名用来列出所有分支，并按提交日期对它们进行排序，优先显示最新的 git 分支。\n       br = branch --format='%(HEAD) %(color:yellow)%(refname:short)%(color:reset) - %(contents:subject) %(color:green)(%(committerdate:relative)) [%(authorname)]' --sort=-committerdate\n方法二、\ngit config --list --show-origin 详细列出所有的配置和源：\ngit config alias.s ‘status -s’  命令手动设置别名。\n")])])]),n("h2",{attrs:{id:"参考"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[t._v("#")]),t._v(" 参考")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("[alias]\n    s = status\n    co = checkout\n    cob = checkout -b\n    del = branch -D    \n    br = branch --format='%(HEAD) %(color:yellow)%(refname:short)%(color:reset) - %(contents:subject) %(color:green)(%(committerdate:relative)) [%(authorname)]' --sort=-committerdate\n    save = !git add -A && git commit -m 'chore: savepoint'\n    undo = reset HEAD~1 --mixed\n    res = !git reset --hard\n    done = !git push origin HEAD\n    lg = !git log --pretty=format:\\\"%C(magenta)%h%Creset -%C(red)%d%Creset %s %C(dim green)(%cr) [%an]\\\" --abbrev-commit -30\n")])])]),n("h2",{attrs:{id:"信息"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#信息"}},[t._v("#")]),t._v(" 信息")]),t._v(" "),n("p",[t._v("获取某些文件，某些分支，某次提交等 git 信息")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('# 显示commit历史，以及每次commit发生变更的文件\n$ git log --stat\n\n# 搜索提交历史，根据关键词\n$ git log -S [keyword]\n\n# 显示某个commit之后的所有变动，每个commit占据一行\n$ git log [tag] HEAD --pretty=format:%s\n\n# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件\n$ git log [tag] HEAD --grep feature\n\n# 显示某个文件的版本历史，包括文件改名\n$ git log --follow [file]\n$ git whatchanged [file]\n\n# 显示指定文件相关的每一次diff\n$ git log -p [file]\n\n# 显示过去5次提交\n$ git log -5 --pretty --oneline\n\n# 显示所有提交过的用户，按提交次数排序\n$ git shortlog -sn\n\n# 显示指定文件是什么人在什么时间修改过\n$ git blame [file]\n\n# 显示暂存区和工作区的差异\n$ git diff\n\n# 显示暂存区和上一个commit的差异\n$ git diff --cached [file]\n\n# 显示工作区与当前分支最新commit之间的差异\n$ git diff HEAD\n\n# 显示两次提交之间的差异\n$ git diff [first-branch]...[second-branch]\n\n# 显示今天你写了多少行代码\n$ git diff --shortstat "@{0 day ago}"\n\n# 比较暂存区和版本库差异\n$ git diff --staged\n\n# 比较暂存区和版本库差异\n$ git diff --cached\n\n# 仅仅比较统计信息\n$ git diff --stat\n\n# 显示某次提交的元数据和内容变化\n$ git show [commit]\n\n# 显示某次提交发生变化的文件\n$ git show --name-only [commit]\n\n# 显示某次提交时，某个文件的内容\n$ git show [commit]:[filename]\n\n# 显示当前分支的最近几次提交\n$ git reflog\n\n# 查看远程分支\n$ git br -r\n\n# 创建新的分支\n$ git br <new_branch>\n\n# 查看各个分支最后提交信息\n$ git br -v\n\n# 查看已经被合并到当前分支的分支\n$ git br --merged\n\n# 查看尚未被合并到当前分支的分支\n$ git br --no-merged\n')])])]),n("h2",{attrs:{id:"添加"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#添加"}},[t._v("#")]),t._v(" 添加")]),t._v(" "),n("p",[t._v("添加文件到当前工作空间中。如果你不使用 "),n("code",[t._v("git add")]),t._v(" 将文件添加进去，那么这些文件也不会添加到之后的提交之中")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("# 添加一个文件\n$ git add test.js\n\n# 添加一个子目录中的文件\n$ git add /path/to/file/test.js\n\n# 支持正则表达式\n$ git add ./*.js\n\n# 添加指定文件到暂存区\n$ git add [file1] [file2] ...\n\n# 添加指定目录到暂存区，包括子目录\n$ git add [dir]\n\n# 添加当前目录的所有文件到暂存区\n$ git add .\n\n# 添加每个变化前，都会要求确认\n# 对于同一个文件的多处变化，可以实现分次提交\n$ git add -p\n")])])]),n("h2",{attrs:{id:"删除"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#删除"}},[t._v("#")]),t._v(" 删除")]),t._v(" "),n("p",[t._v("rm 和上面的 add 命令相反，从工作空间中去掉某个文件")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("# 移除 HelloWorld.js\n$ git rm HelloWorld.js\n\n# 移除子目录中的文件\n$ git rm /pather/to/the/file/HelloWorld.js\n\n# 删除工作区文件，并且将这次删除放入暂存区\n$ git rm [file1] [file2] ...\n\n# 停止追踪指定文件，但该文件会保留在工作区\n$ git rm --cached [file]\n")])])]),n("h2",{attrs:{id:"分支"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#分支"}},[t._v("#")]),t._v(" 分支")]),t._v(" "),n("p",[t._v("管理分支，可以通过下列命令对分支进行增删改查切换等")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("# 查看所有的分支和远程分支\n$ git branch -a\n\n# 创建一个新的分支\n$ git branch [branch-name]\n\n# 重命名分支\n# git branch -m <旧名称> <新名称>\n$ git branch -m [branch-name] [new-branch-name]\n\n# 编辑分支的介绍\n$ git branch [branch-name] --edit-description\n\n# 列出所有本地分支\n$ git branch\n\n# 列出所有远程分支\n$ git branch -r\n\n# 新建一个分支，但依然停留在当前分支\n$ git branch [branch-name]\n\n# 新建一个分支，并切换到该分支\n$ git checkout -b [branch]\n\n# 新建一个分支，指向指定commit\n$ git branch [branch] [commit]\n\n# 新建一个分支，与指定的远程分支建立追踪关系\n$ git branch --track [branch] [remote-branch]\n\n# 切换到指定分支，并更新工作区\n$ git checkout [branch-name]\n\n# 切换到上一个分支\n$ git checkout -\n\n# 建立追踪关系，在现有分支与指定的远程分支之间\n$ git branch --set-upstream [branch] [remote-branch]\n\n# 合并指定分支到当前分支\n$ git merge [branch]\n\n# 选择一个commit，合并进当前分支\n$ git cherry-pick [commit]\n\n# 删除分支\n$ git branch -d [branch-name]\n\n# 删除远程分支\n$ git push origin --delete [branch-name]\n$ git branch -dr [remote/branch]\n\n# 切换到某个分支\n$ git co <branch>\n\n# 创建新的分支，并且切换过去\n$ git co -b <new_branch>\n\n# 基于branch创建新的new_branch\n$ git co -b <new_branch> <branch>\n\n# 把某次历史提交记录checkout出来，但无分支信息，切换到其他分支会自动删除\n$ git co $id\n\n# 把某次历史提交记录checkout出来，创建成一个分支\n$ git co $id -b <new_branch>\n\n# 删除某个分支\n$ git br -d <branch>\n\n# 强制删除某个分支 (未被合并的分支被删除的时候需要强制)\n$ git br -D <branch>\n")])])]),n("h2",{attrs:{id:"检出"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#检出"}},[t._v("#")]),t._v(" 检出")]),t._v(" "),n("p",[t._v("将当前工作空间更新到索引所标识的或者某一特定的工作空间")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('# 检出一个版本库，默认将更新到master分支\n$ git checkout\n# 检出到一个特定的分支\n$ git checkout branchName\n# 新建一个分支，并且切换过去，相当于"git branch <名字>; git checkout <名字>"\n$ git checkout -b newBranch\n')])])]),n("h2",{attrs:{id:"远程同步"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#远程同步"}},[t._v("#")]),t._v(" 远程同步")]),t._v(" "),n("p",[t._v("远程同步的远端分支")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("# 下载远程仓库的所有变动\n$ git fetch [remote]\n\n# 显示所有远程仓库\n$ git remote -v\n\n# 显示某个远程仓库的信息\n$ git remote show [remote]\n\n# 增加一个新的远程仓库，并命名\n$ git remote add [shortname] [url]\n\n# 查看远程服务器地址和仓库名称\n$ git remote -v\n\n# 添加远程仓库地址 把本地仓库与远程仓库连接起来\n$ git remote add origin git@ github:xxx/xxx.git\n\n# 设置远程仓库地址(用于修改远程仓库地址)\n$ git remote set-url origin git@ github.com:xxx/xxx.git\n\n# 删除远程仓库\n$ git remote rm <repository>\n\n# 上传本地指定分支到远程仓库\n# 把本地的分支更新到远端origin的master分支上\n# git push <远端> <分支>\n# git push 相当于 git push origin master\n$ git push [remote] [branch]\n#加了参数-u后，以后即可直接用git push 代替git push origin master\n#git push -u origin master 上面命令将本地的master分支推送到origin主机，同时指定origin为默认主机，后面就可以不加任何参数使用git push了。\n\n# 强行推送当前分支到远程仓库，即使有冲突\n$ git push [remote] --force\n\n# 推送所有分支到远程仓库\n$ git push [remote] --all\n\n\n")])])]),n("h2",{attrs:{id:"撤销"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#撤销"}},[t._v("#")]),t._v(" 撤销")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("# 恢复暂存区的指定文件到工作区\n$ git checkout [file]\n\n# 恢复某个commit的指定文件到暂存区和工作区\n$ git checkout [commit] [file]\n\n# 恢复暂存区的所有文件到工作区\n$ git checkout .\n\n# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变\n$ git reset [file]\n\n# 重置暂存区与工作区，与上一次commit保持一致\n$ git reset --hard\n\n# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变\n$ git reset [commit]\n\n# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致\n$ git reset --hard [commit]\n\n# 重置当前HEAD为指定commit，但保持暂存区和工作区不变\n$ git reset --keep [commit]\n\nGit 删除某一次提交（非最后一次，不可直接回退）\n方法一\ngit revert 撤销 某次操作，此次操作之前和之后的commit和history都会保留，并且把这次撤销，作为一次最新的提交\n# 新建一个commit，用来撤销指定commit\n# 后者的所有变化都将被前者抵消，并且应用到当前分支\n$ git revert [commit]\n\n# 恢复最后一次提交的状态\n$ git revert HEAD  //撤销最近一次提交\ngit revert HEAD~1                   //撤销上上次的提交，注意：数字从0开始\ngit revert 0ffaacc                  //撤销0ffaacc这次提交\n如果这次提交是 merge 节点的话，则需要加上 -m 指令\ngit revert commit_id -m 1 // 第一个提交点\t\ngit revert commit_id -m 2 // 第二个提交点\ngit push\n方法二\ngit rebase -i commit_id进入 Vim 编辑模式，将要删除的 commit 前面的 `pick` 改成 `drop`\n解决冲突后git rebase --continue（可能多次）\ngit push\n\n# 暂时将未提交的变化移除，稍后再移入\n$ git stash     备份当前工作区的内容，保存到git 栈中\n$ git stash pop    从git栈中获取到最近一次stash进去的内容，恢复工作区的内容 使用pop命令进行恢复，会将stash列表中的信息进行删除。\n\n# 列所有stash\n$ git stash list   显示git栈中的所有工作区内容的备份\n\n# 恢复暂存的内容\n$ git stash apply  使用apply命令恢复，stash列表中的信息是会继续保留的\n\n# 删除暂存区\n$ git stash drop   丢弃stash条目，默认丢弃最上面的那条，即stash@{0}，此外还可以在drop后加stash@{n}\ngit stash clear ：删除所有缓存的stash\n")])])]),n("h2",{attrs:{id:"commit"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#commit"}},[t._v("#")]),t._v(" commit")]),t._v(" "),n("p",[t._v("将当前索引的更改保存为一个新的提交，这个提交包括用户做出的更改与信息")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('# 提交暂存区到仓库区附带提交信息\n$ git commit -m [message]\n\n# 提交暂存区的指定文件到仓库区\n$ git commit [file1] [file2] ... -m [message]\n\n# 提交工作区自上次commit之后的变化，直接到仓库区\n$ git commit -a\n\n# 提交时显示所有diff信息\n$ git commit -v\n\n# 使用一次新的commit，替代上一次提交\n# 如果代码没有任何新变化，则用来改写上一次commit的提交信息\n$ git commit --amend -m [message]\n\n# 重做上一次commit，并包括指定文件的新变化\n$ git commit --amend [file1] [file2] ...\n\n# 选择一个commit，合并进当前分支\n$ git cherry-pick [commit]\n\n编辑模式\npick：  保留该commit\nreword：保留该commit，但我需要修改该commit的注释\nedit：  保留该commit, 但我要停下来修改该提交(不仅仅修改注释)\nsquash：将该commit和前一个commit合并，时间上的前一个\nfixup： 将该commit和前一个commit合并，但我不要保留该提交的注释信息\nexec：  执行shell命令\ndrop：  丢弃该commit\n\n# 修改n次之前的commit信息\ngit rebase -i HEAD~n //n可以是次数或者git rebase -i commitID\n进入编辑模式(i 或者 insert键)  ESC键，退出编辑模式，切换到命令模式。\n将需要修改的commit的那一行的pick修改为edit\n 然后输入\n$ git commit --amend 进入你需要修改的commit编辑界面，编辑后保存退出\n然后保存退出(ZZ或者:wq回车)\n修改结束后，输入以下命令返回到最新的commit\n$ git rebase --continue\n\n如果只想保存文件，则键入":w"，回车后底行会提示写入操作结果，并保持停留在命令模式\n键入 ":q!" 回车后放弃修改并退出vi。\n ":e!" 放弃所有文件修改，但不退出 vi\n')])])]),n("h2",{attrs:{id:"diff"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#diff"}},[t._v("#")]),t._v(" diff")]),t._v(" "),n("p",[t._v("显示当前工作空间和提交的不同")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("# 比较工作区 与暂存的(git add 后)的差别\n$ git diff  \n\n# 比较暂存区文件 与上一次commit 的差别\n$ git diff --cached\n\n# 显示工作目录和最近一次提交的不同\n$ git diff HEAD   git diff HEAD -- <文件名字>\n")])])]),n("h2",{attrs:{id:"log"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#log"}},[t._v("#")]),t._v(" log")]),t._v(" "),n("p",[t._v("显示这个版本库的所有提交")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("# 显示所有提交\n$ git log\n\n# 显示某几条提交信息\n$ git log -n 10\n\n# 仅显示合并提交\n$ git log --merges\n\n# 查看该文件每次提交记录\n$ git log <file>\n\n# 查看每次详细修改内容的diff\n$ git log -p <file>\n\n# 查看最近两次详细修改内容的diff\n$ git log -p -2\n\n\ngit reflog相比git log  包括已经被删除的 commit 记录和 reset 的操作\n\n#查看提交统计信息\n$ git log --stat\n\n#显示某个文件的版本历史记录，包括文件的重命名。\n$ git log –follow <file>\n")])])]),n("h2",{attrs:{id:"merge"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#merge"}},[t._v("#")]),t._v(" merge")]),t._v(" "),n("p",[t._v("合并就是将外部的提交合并到自己的分支中")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('# 将其他分支合并到当前分支\n$ git merge branchName\n\n# 在合并时创建一个新的合并后的提交  默认情况下是fast forward (--ff)合并模式 , 如果没有冲突时, 不会自动创建一个新的commit节点  --no-ff 模式, 即使没有冲突也会创建新的合并commit节\n# 不要 Fast-Foward 合并 ,fast forward 模式在历史记录中看不出合并历史，no fast forward 模式在历史记录中可以看出合并历史\n$ git merge --no-ff branchName   \n\n#提前给出新的合并commit的记录信息\n$ git merge --no-ff m "message" \n\n#这会将更改合并到工作树中而不创建合并提交。当您提交合并的更改时，它将看起来像您的分支上新的“正常”提交：没有历史合并提交。\ngit merge --squash \n\n#这就像一个正常的合并，但不会创建一个合并提交。这个提交将是一个合并提交：当你查看历史时，你的提交将显示为正常合并。\ngit merge --no-commit \n\n#当合并出现冲突时, 可以使用该命令, 直接放弃本次合并, 使得当前分支恢复合并之前的状态\ngit merge --abort\n')])])]),n("h2",{attrs:{id:"tag"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#tag"}},[t._v("#")]),t._v(" tag")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("# 列出所有tag\n$ git tag\n\n# 新建一个tag在当前commit\n$ git tag [tag]\n\n# 新建一个tag在指定commit\n$ git tag [tag] [commit]\n\n# 删除本地tag\n$ git tag -d [tag]\n\n# 删除远程tag\n$ git push origin :refs/tags/[tagName]\n\n# 查看tag信息\n$ git show [tag]\n\n# 提交指定tag\n$ git push [remote] [tag]\n\n# 提交所有tag\n$ git push [remote] --tags\n\n# 新建一个分支，指向某个tag\n$ git checkout -b [branch] [tag]\n")])])]),n("h2",{attrs:{id:"pull"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#pull"}},[t._v("#")]),t._v(" pull")]),t._v(" "),n("p",[t._v("从远端版本库合并到当前分支")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("# 从远端origin的master分支更新版本库\n# git pull <远端> <分支>\n$ git pull origin master\n\nfetch的时候本地的master没有变化，但是与远程仓关联的那个版本号被更新了，我们接下来就是在本地合并这两个版本号的代码。\ngit fetch+git merge\n\n# 抓取远程仓库所有分支更新并合并到本地，不要快进合并\n$ git pull --no-ff\n")])])]),n("h2",{attrs:{id:"rebase-谨慎使用"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#rebase-谨慎使用"}},[t._v("#")]),t._v(" rebase (谨慎使用)")]),t._v(" "),n("p",[t._v("将一个分支上所有的提交历史都应用到另一个分支上"),n("em",[t._v("不要在一个已经公开的远端分支上使用 rebase")]),t._v(".")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("rebase 会把你当前分支的 commit 放到公共分支的最后面,所以叫变基。就好像你从公共分支又重新拉出来这个分支一样。\n而 merge 会把公共分支和你当前的 commit 合并在一起，形成一个新的 commit 提交\ngit rebase 后再git merge\nrebase之前需要经master分支拉到最新\n切换分支到需要rebase的分支，这里是dev分支\n执行git rebase master，有冲突就解决冲突，解决后直接git add . 再git rebase --continue即可\ngit checkout master\ngit pull\ngit checkout dev\n//git rebase -i HEAD~2  //可合并提交 --- 2表示合并两个\ngit rebase master----\x3e解决冲突---\x3egit rebase --continue\ngit checkout master\ngit merge dev\ngit push\n\ngit checkout dev   git rebase master 等价于 git rebase master dev\n\n终止rebase的行动\ngit rebase --abort\n\n举例：\n分支dev1 要合并 dev2 的提交代码\n切换到dev1，git rebase dev2 || git rebase dev2 dev1\n若有冲突，解决冲突 提交冲突文件，继续rebase\ngit add .\ngit rebase --continue\npush\n\n")])])]),n("h2",{attrs:{id:"reset-谨慎使用"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#reset-谨慎使用"}},[t._v("#")]),t._v(" reset (谨慎使用)")]),t._v(" "),n("p",[t._v("将当前的头指针复位到一个特定的状态。这样可以使你撤销 merge、pull、commits、add 等 这是个很强大的命令，但是在使用时一定要清楚其所产生的后果")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("#用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变\n$ git reset 默认 --mixed \n\n# 没有commit的修改会被全部擦掉  \n$ git reset --hard\n\n# 将当前分支恢复到某次提交，不改变现在的工作目录\n# 在工作目录中所有的改变仍然存在\n$ git reset dha78as\n$ git reset HEAD^ hello.js //单独文件\n\n# 将当前分支恢复到某次提交，覆盖现在的工作目录\n# 并且删除所有未提交的改变和指定提交之后的所有提交\n$ git reset --hard dha78as\n\nhard\n①移动本地库HEAD指针\n\n②重置暂存区\n\n③重置工作区\n意思就是，回滚后，本地代码就是你回退版本的代码 \n\nsoft\n①移动本地库HEAD指针\n\n意思就是，回滚后，本地代码就是你回退版本的代码（未作commit）从commit状态变成未commit\n\nmixed（默认）\n①移动本地库HEAD指针\n\n②重置暂存区\n\n意思就是，回滚后，不仅移动了本地库的指针，同时暂存区的东西也没了，\n意思就是你上次添加到暂存区的文件没了（未做add）从add状态变成未add\n")])])]),n("h2",{attrs:{id:"head-与head"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#head-与head"}},[t._v("#")]),t._v(" HEAD^与HEAD~")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("HEAD~低头走y步，无视岔路口。\t表示祖先\nHEAD^抬头走1步，入x号岔路口。  表示父母 (涉及分支合并)\n")])])]),n("h2",{attrs:{id:"revert"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#revert"}},[t._v("#")]),t._v(" revert")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('git revert -n 版本号\ngit commit -m "备注"\ngit push\n撤销之前的某一版本，但是又想保留该目标版本后面的版本\n')])])]),n("h2",{attrs:{id:"其他"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#其他"}},[t._v("#")]),t._v(" 其他")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("# 生成一个可供发布的压缩包\n$ git archive\n\n# 打补丁\n$ git apply ../sync.patch\n\n# 测试补丁能否成功\n$ git apply --check ../sync.patch\n\n# 查看Git的版本\n$ git --version\n")])])]),n("h2",{attrs:{id:"常用git命令总结"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#常用git命令总结"}},[t._v("#")]),t._v(" 常用Git命令总结")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('git config --global user.name "你的名字" 让你全部的Git仓库绑定你的名字\ngit config --global user.email "你的邮箱" 让你全部的Git仓库绑定你的邮箱\ngit init 初始化你的仓库\ngit add . 把工作区的文件全部提交到暂存区\ngit add .// 把工作区的文件提交到暂存区\ngit commit -m "xxx" 把暂存区的所有文件提交到仓库区，暂存区空空荡荡\ngit remote add origin https://github.com/name/name_cangku.git 把本地仓库与远程仓库连接起来\ngit push -u origin master 把仓库区的主分支master提交到远程仓库里\ngit push -u origin <其他分支> 把其他分支提交到远程仓库\ngit status查看当前仓库的状态\ngit diff 查看文件修改的具体内容\ngit log 显示从最近到最远的提交历史\ngit clone + 仓库地址下载克隆文件\ngit reset --hard + 版本号 回溯版本，版本号在commit的时候与master跟随在一起\ngit reflog 显示命令历史\ngit checkout --撤销命令，用版本库里的文件替换掉工作区的文件。我觉得就像是Git世界的ctrl + z\ngit rm 删除版本库的文件\ngit branch 查看当前所有分支\ngit branch <分支名字> 创建分支\ngit checkout <分支名字> 切换到分支\ngit merge <分支名字> 合并分支\ngit branch -d <分支名字> 删除分支,有可能会删除失败，因为Git会保护没有被合并的分支\ngit branch -D + <分支名字> 强行删除，丢弃没被合并的分支\ngit log --graph 查看分支合并图\ngit merge --no-ff <分支名字> 合并分支的时候禁用Fast forward模式,因为这个模式会丢失分支历史信息\ngit stash 当有其他任务插进来时，把当前工作现场“存储”起来,以后恢复后继续工作\ngit stash list 查看你刚刚“存放”起来的工作去哪里了\ngit stash apply 恢复却不删除stash内容\ngit stash drop 删除stash内容\ngit stash pop 恢复的同时把stash内容也删了\ngit remote 查看远程库的信息，会显示origin，远程仓库默认名称为origin\ngit remote -v 显示更详细的信息\ngit pull 把最新的提交从远程仓库中抓取下来，在本地合并,和git push相反\ngit rebase 把分叉的提交历史“整理”成一条直线，看上去更直观\ngit tag 查看所有标签，可以知道历史版本的tag\ngit tag打标签，默认为HEAD。比如git tag v1.0\ngit tag<版本号> 把版本号打上标签，版本号就是commit时，跟在旁边的一串字母数字\ngit show查看标签信息\ngit tag -a-m "<说明>" 创建带说明的标签。-a指定标签名，-m指定说明文字\ngit tag -d删除标签\ngit push origin推送某个标签到远程\ngit push origin --tags 一次性推送全部尚未推送到远程的本地标签\ngit push origin :refs/tags/删除远程标签\ngit config --global color.ui true 让Git显示颜色，会让命令输出看起来更醒目\ngit add -f强制提交已忽略的的文件\ngit check-ignore -v检查为什么Git会忽略该文件\n')])])]),n("h2",{attrs:{id:"hexo指令"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#hexo指令"}},[t._v("#")]),t._v(" hexo指令")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("#hexo new 文件名创建新的 md文件  目录D:\\blog\\source\\_posts\n\thexo new [layout] <title>\n\tlayout 可选参数，用以指定文章类型，若无指定则默认由配置文件中的 default_layout 选项决定  md\n\ttitle 必填参数，用以指定文章标题，如果参数值中含有空格，则需要使用双引号包围\n#hexo generate 命令用于生成静态文件 public文件夹下，一般可以简写为 hexo g\n#hexo server 命令用于启动本地服务器，一般可以简写为 hexo s\n\t-p 选项，指定服务器端口，默认为 4000\n\t-i 选项，指定服务器 IP 地址，默认为 0.0.0.0\n\t-s 选项，静态模式 ，仅提供 public 文件夹中的文件并禁用文件监视\n#hexo deploy 命令用于部署网站，一般可以简写为 hexo d\n\thexo g -d\t指定生成后部署\n#hexo clean 命令用于清理缓存文件\n\n")])])])])}),[],!1,null,null,null);n.default=i.exports}}]);