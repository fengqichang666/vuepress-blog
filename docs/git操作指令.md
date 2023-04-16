---
title: git命令总结
date: 2021-06-30 10:28:12
tags: git操作指令大全
---

## 配置

更改设置。可以是版本库的设置，也可以是系统的或全局的

```
取消追踪某文件 
git update-index --assume-unchanged src\js\app.js
重新追踪
git update-index --no-assume-unchanged src\js\app.js

false不忽略大小写 true忽略
git config core.ignorecase false/true

#重新输入账号密码
git config --system --unset credential.helper//若无效git config --global http.emptyAuth true

//无需每次都输入密码
1、输入密码后执行下面代码就可以了
git config --global credential.helper store

#查看仓库配置【必须要进入到具体的目录下，比如要查看TestGit仓库的配置信息】
git config --local -l 
git config --global -l 查看用户配置
git config --system -l 查看系统配置
git config -l查看所有的配置信息，依次是系统级别、用户级别、仓库级别
# 显示当前的Git配置
$ git config --list

# 编辑Git配置文件
$ git config -e [--global]

# 输出、设置基本的全局变量
$ git config --global user.email
$ git config --global user.name

$ git config --global user.email "MyEmail@gmail.com"
$ git config --global user.name "My Name"

# 为Git命令创建一个快捷方式（别名）。
 git config --global alias.st status
 
 git config --global alias.co checkout
 
 git config --global alias.ci commit
 
 git config --global alias.br branch
 
 git config --global alias.last 'log -1'
 设置文本编辑器
 git config --global core.editor vim # 默认是使用vi或者vim
 git config --global core.editor gedit # 如果能使用图形化的编辑器的话
```

## 配置文件

```
[user]配置账号信息
别名配置
方法一、
配置文件路径 ：C:\Users\feng\.gitconfig
下方添加 
[alias]
       co = ckeckout
       del = branch -D
下面的别名用来列出所有分支，并按提交日期对它们进行排序，优先显示最新的 git 分支。
       br = branch --format='%(HEAD) %(color:yellow)%(refname:short)%(color:reset) - %(contents:subject) %(color:green)(%(committerdate:relative)) [%(authorname)]' --sort=-committerdate
方法二、
git config --list --show-origin 详细列出所有的配置和源：
git config alias.s ‘status -s’  命令手动设置别名。
```

## 参考

```
[alias]
    s = status
    co = checkout
    cob = checkout -b
    del = branch -D    
    br = branch --format='%(HEAD) %(color:yellow)%(refname:short)%(color:reset) - %(contents:subject) %(color:green)(%(committerdate:relative)) [%(authorname)]' --sort=-committerdate
    save = !git add -A && git commit -m 'chore: savepoint'
    undo = reset HEAD~1 --mixed
    res = !git reset --hard
    done = !git push origin HEAD
    lg = !git log --pretty=format:\"%C(magenta)%h%Creset -%C(red)%d%Creset %s %C(dim green)(%cr) [%an]\" --abbrev-commit -30
```



## 信息

获取某些文件，某些分支，某次提交等 git 信息

```
# 显示commit历史，以及每次commit发生变更的文件
$ git log --stat

# 搜索提交历史，根据关键词
$ git log -S [keyword]

# 显示某个commit之后的所有变动，每个commit占据一行
$ git log [tag] HEAD --pretty=format:%s

# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
$ git log [tag] HEAD --grep feature

# 显示某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]

# 显示指定文件相关的每一次diff
$ git log -p [file]

# 显示过去5次提交
$ git log -5 --pretty --oneline

# 显示所有提交过的用户，按提交次数排序
$ git shortlog -sn

# 显示指定文件是什么人在什么时间修改过
$ git blame [file]

# 显示暂存区和工作区的差异
$ git diff

# 显示暂存区和上一个commit的差异
$ git diff --cached [file]

# 显示工作区与当前分支最新commit之间的差异
$ git diff HEAD

# 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]

# 显示今天你写了多少行代码
$ git diff --shortstat "@{0 day ago}"

# 比较暂存区和版本库差异
$ git diff --staged

# 比较暂存区和版本库差异
$ git diff --cached

# 仅仅比较统计信息
$ git diff --stat

# 显示某次提交的元数据和内容变化
$ git show [commit]

# 显示某次提交发生变化的文件
$ git show --name-only [commit]

# 显示某次提交时，某个文件的内容
$ git show [commit]:[filename]

# 显示当前分支的最近几次提交
$ git reflog

# 查看远程分支
$ git br -r

# 创建新的分支
$ git br <new_branch>

# 查看各个分支最后提交信息
$ git br -v

# 查看已经被合并到当前分支的分支
$ git br --merged

# 查看尚未被合并到当前分支的分支
$ git br --no-merged
```

## 添加

添加文件到当前工作空间中。如果你不使用 `git add` 将文件添加进去，那么这些文件也不会添加到之后的提交之中

```
# 添加一个文件
$ git add test.js

# 添加一个子目录中的文件
$ git add /path/to/file/test.js

# 支持正则表达式
$ git add ./*.js

# 添加指定文件到暂存区
$ git add [file1] [file2] ...

# 添加指定目录到暂存区，包括子目录
$ git add [dir]

# 添加当前目录的所有文件到暂存区
$ git add .

# 添加每个变化前，都会要求确认
# 对于同一个文件的多处变化，可以实现分次提交
$ git add -p
```

## 删除

rm 和上面的 add 命令相反，从工作空间中去掉某个文件

```
# 移除 HelloWorld.js
$ git rm HelloWorld.js

# 移除子目录中的文件
$ git rm /pather/to/the/file/HelloWorld.js

# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...

# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]
```

## 分支

管理分支，可以通过下列命令对分支进行增删改查切换等

```
# 查看所有的分支和远程分支
$ git branch -a

# 创建一个新的分支
$ git branch [branch-name]

# 重命名分支
# git branch -m <旧名称> <新名称>
$ git branch -m [branch-name] [new-branch-name]

# 编辑分支的介绍
$ git branch [branch-name] --edit-description

# 列出所有本地分支
$ git branch

# 列出所有远程分支
$ git branch -r

# 新建一个分支，但依然停留在当前分支
$ git branch [branch-name]

# 新建一个分支，并切换到该分支
$ git checkout -b [branch]

# 新建一个分支，指向指定commit
$ git branch [branch] [commit]

# 新建一个分支，与指定的远程分支建立追踪关系
$ git branch --track [branch] [remote-branch]

# 切换到指定分支，并更新工作区
$ git checkout [branch-name]

# 切换到上一个分支
$ git checkout -

# 建立追踪关系，在现有分支与指定的远程分支之间
$ git branch --set-upstream [branch] [remote-branch]

# 合并指定分支到当前分支
$ git merge [branch]

# 选择一个commit，合并进当前分支
$ git cherry-pick [commit]

# 删除分支
$ git branch -d [branch-name]

# 删除远程分支
$ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]

# 切换到某个分支
$ git co <branch>

# 创建新的分支，并且切换过去
$ git co -b <new_branch>

# 基于branch创建新的new_branch
$ git co -b <new_branch> <branch>

# 把某次历史提交记录checkout出来，但无分支信息，切换到其他分支会自动删除
$ git co $id

# 把某次历史提交记录checkout出来，创建成一个分支
$ git co $id -b <new_branch>

# 删除某个分支
$ git br -d <branch>

# 强制删除某个分支 (未被合并的分支被删除的时候需要强制)
$ git br -D <branch>
```

## 检出

将当前工作空间更新到索引所标识的或者某一特定的工作空间

```
# 检出一个版本库，默认将更新到master分支
$ git checkout
# 检出到一个特定的分支
$ git checkout branchName
# 新建一个分支，并且切换过去，相当于"git branch <名字>; git checkout <名字>"
$ git checkout -b newBranch
```

## 远程同步

远程同步的远端分支

```
# 下载远程仓库的所有变动
$ git fetch [remote]

# 显示所有远程仓库
$ git remote -v

# 显示某个远程仓库的信息
$ git remote show [remote]

# 增加一个新的远程仓库，并命名
$ git remote add [shortname] [url]

# 查看远程服务器地址和仓库名称
$ git remote -v

# 添加远程仓库地址 把本地仓库与远程仓库连接起来
$ git remote add origin git@ github:xxx/xxx.git

# 设置远程仓库地址(用于修改远程仓库地址)
$ git remote set-url origin git@ github.com:xxx/xxx.git

# 删除远程仓库
$ git remote rm <repository>

# 上传本地指定分支到远程仓库
# 把本地的分支更新到远端origin的master分支上
# git push <远端> <分支>
# git push 相当于 git push origin master
$ git push [remote] [branch]
#加了参数-u后，以后即可直接用git push 代替git push origin master
#git push -u origin master 上面命令将本地的master分支推送到origin主机，同时指定origin为默认主机，后面就可以不加任何参数使用git push了。

# 强行推送当前分支到远程仓库，即使有冲突
$ git push [remote] --force

# 推送所有分支到远程仓库
$ git push [remote] --all


```

## 撤销

```
# 恢复暂存区的指定文件到工作区
$ git checkout [file]

# 恢复某个commit的指定文件到暂存区和工作区
$ git checkout [commit] [file]

# 恢复暂存区的所有文件到工作区
$ git checkout .

# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
$ git reset [file]

# 重置暂存区与工作区，与上一次commit保持一致
$ git reset --hard

# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
$ git reset [commit]

# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --hard [commit]

# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
$ git reset --keep [commit]

Git 删除某一次提交（非最后一次，不可直接回退）
方法一
git revert 撤销 某次操作，此次操作之前和之后的commit和history都会保留，并且把这次撤销，作为一次最新的提交
# 新建一个commit，用来撤销指定commit
# 后者的所有变化都将被前者抵消，并且应用到当前分支
$ git revert [commit]

# 恢复最后一次提交的状态
$ git revert HEAD  //撤销最近一次提交
git revert HEAD~1                   //撤销上上次的提交，注意：数字从0开始
git revert 0ffaacc                  //撤销0ffaacc这次提交
如果这次提交是 merge 节点的话，则需要加上 -m 指令
git revert commit_id -m 1 // 第一个提交点	
git revert commit_id -m 2 // 第二个提交点
git push
方法二
git rebase -i commit_id进入 Vim 编辑模式，将要删除的 commit 前面的 `pick` 改成 `drop`
解决冲突后git rebase --continue（可能多次）
git push

# 暂时将未提交的变化移除，稍后再移入
$ git stash     备份当前工作区的内容，保存到git 栈中
$ git stash pop    从git栈中获取到最近一次stash进去的内容，恢复工作区的内容 使用pop命令进行恢复，会将stash列表中的信息进行删除。

# 列所有stash
$ git stash list   显示git栈中的所有工作区内容的备份

# 恢复暂存的内容
$ git stash apply  使用apply命令恢复，stash列表中的信息是会继续保留的

# 删除暂存区
$ git stash drop   丢弃stash条目，默认丢弃最上面的那条，即stash@{0}，此外还可以在drop后加stash@{n}
git stash clear ：删除所有缓存的stash
```

## commit

将当前索引的更改保存为一个新的提交，这个提交包括用户做出的更改与信息

```
# 提交暂存区到仓库区附带提交信息
$ git commit -m [message]

# 提交暂存区的指定文件到仓库区
$ git commit [file1] [file2] ... -m [message]

# 提交工作区自上次commit之后的变化，直接到仓库区
$ git commit -a

# 提交时显示所有diff信息
$ git commit -v

# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]

# 重做上一次commit，并包括指定文件的新变化
$ git commit --amend [file1] [file2] ...

# 选择一个commit，合并进当前分支
$ git cherry-pick [commit]

编辑模式
pick：  保留该commit
reword：保留该commit，但我需要修改该commit的注释
edit：  保留该commit, 但我要停下来修改该提交(不仅仅修改注释)
squash：将该commit和前一个commit合并，时间上的前一个
fixup： 将该commit和前一个commit合并，但我不要保留该提交的注释信息
exec：  执行shell命令
drop：  丢弃该commit

# 修改n次之前的commit信息
git rebase -i HEAD~n //n可以是次数或者git rebase -i commitID
进入编辑模式(i 或者 insert键)  ESC键，退出编辑模式，切换到命令模式。
将需要修改的commit的那一行的pick修改为edit
 然后输入
$ git commit --amend 进入你需要修改的commit编辑界面，编辑后保存退出
然后保存退出(ZZ或者:wq回车)
修改结束后，输入以下命令返回到最新的commit
$ git rebase --continue

如果只想保存文件，则键入":w"，回车后底行会提示写入操作结果，并保持停留在命令模式
键入 ":q!" 回车后放弃修改并退出vi。
 ":e!" 放弃所有文件修改，但不退出 vi
```

## diff

显示当前工作空间和提交的不同

```
# 比较工作区 与暂存的(git add 后)的差别
$ git diff  

# 比较暂存区文件 与上一次commit 的差别
$ git diff --cached

# 显示工作目录和最近一次提交的不同
$ git diff HEAD   git diff HEAD -- <文件名字>
```

## log

显示这个版本库的所有提交

```
# 显示所有提交
$ git log

# 显示某几条提交信息
$ git log -n 10

# 仅显示合并提交
$ git log --merges

# 查看该文件每次提交记录
$ git log <file>

# 查看每次详细修改内容的diff
$ git log -p <file>

# 查看最近两次详细修改内容的diff
$ git log -p -2


git reflog相比git log  包括已经被删除的 commit 记录和 reset 的操作

#查看提交统计信息
$ git log --stat

#显示某个文件的版本历史记录，包括文件的重命名。
$ git log –follow <file>
```

## merge

合并就是将外部的提交合并到自己的分支中

```
# 将其他分支合并到当前分支
$ git merge branchName

# 在合并时创建一个新的合并后的提交  默认情况下是fast forward (--ff)合并模式 , 如果没有冲突时, 不会自动创建一个新的commit节点  --no-ff 模式, 即使没有冲突也会创建新的合并commit节
# 不要 Fast-Foward 合并 ,fast forward 模式在历史记录中看不出合并历史，no fast forward 模式在历史记录中可以看出合并历史
$ git merge --no-ff branchName   

#提前给出新的合并commit的记录信息
$ git merge --no-ff m "message" 

#这会将更改合并到工作树中而不创建合并提交。当您提交合并的更改时，它将看起来像您的分支上新的“正常”提交：没有历史合并提交。
git merge --squash 

#这就像一个正常的合并，但不会创建一个合并提交。这个提交将是一个合并提交：当你查看历史时，你的提交将显示为正常合并。
git merge --no-commit 

#当合并出现冲突时, 可以使用该命令, 直接放弃本次合并, 使得当前分支恢复合并之前的状态
git merge --abort
```

## tag

```
# 列出所有tag
$ git tag

# 新建一个tag在当前commit
$ git tag [tag]

# 新建一个tag在指定commit
$ git tag [tag] [commit]

# 删除本地tag
$ git tag -d [tag]

# 删除远程tag
$ git push origin :refs/tags/[tagName]

# 查看tag信息
$ git show [tag]

# 提交指定tag
$ git push [remote] [tag]

# 提交所有tag
$ git push [remote] --tags

# 新建一个分支，指向某个tag
$ git checkout -b [branch] [tag]
```

## pull

从远端版本库合并到当前分支

```
# 从远端origin的master分支更新版本库
# git pull <远端> <分支>
$ git pull origin master

fetch的时候本地的master没有变化，但是与远程仓关联的那个版本号被更新了，我们接下来就是在本地合并这两个版本号的代码。
git fetch+git merge

# 抓取远程仓库所有分支更新并合并到本地，不要快进合并
$ git pull --no-ff
```

## rebase (谨慎使用)

将一个分支上所有的提交历史都应用到另一个分支上*不要在一个已经公开的远端分支上使用 rebase*.

```
rebase 会把你当前分支的 commit 放到公共分支的最后面,所以叫变基。就好像你从公共分支又重新拉出来这个分支一样。
而 merge 会把公共分支和你当前的 commit 合并在一起，形成一个新的 commit 提交
git rebase 后再git merge
rebase之前需要经master分支拉到最新
切换分支到需要rebase的分支，这里是dev分支
执行git rebase master，有冲突就解决冲突，解决后直接git add . 再git rebase --continue即可
git checkout master
git pull
git checkout dev
//git rebase -i HEAD~2  //可合并提交 --- 2表示合并两个
git rebase master---->解决冲突--->git rebase --continue
git checkout master
git merge dev
git push

git checkout dev   git rebase master 等价于 git rebase master dev

终止rebase的行动
git rebase --abort

举例：
分支dev1 要合并 dev2 的提交代码
切换到dev1，git rebase dev2 || git rebase dev2 dev1
若有冲突，解决冲突 提交冲突文件，继续rebase
git add .
git rebase --continue
push

```

## reset (谨慎使用)

将当前的头指针复位到一个特定的状态。这样可以使你撤销 merge、pull、commits、add 等 这是个很强大的命令，但是在使用时一定要清楚其所产生的后果

```
#用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变
$ git reset 默认 --mixed 

# 没有commit的修改会被全部擦掉  
$ git reset --hard

# 将当前分支恢复到某次提交，不改变现在的工作目录
# 在工作目录中所有的改变仍然存在
$ git reset dha78as
$ git reset HEAD^ hello.js //单独文件

# 将当前分支恢复到某次提交，覆盖现在的工作目录
# 并且删除所有未提交的改变和指定提交之后的所有提交
$ git reset --hard dha78as

hard
①移动本地库HEAD指针

②重置暂存区

③重置工作区
意思就是，回滚后，本地代码就是你回退版本的代码 

soft
①移动本地库HEAD指针

意思就是，回滚后，本地代码就是你回退版本的代码（未作commit）从commit状态变成未commit

mixed（默认）
①移动本地库HEAD指针

②重置暂存区

意思就是，回滚后，不仅移动了本地库的指针，同时暂存区的东西也没了，
意思就是你上次添加到暂存区的文件没了（未做add）从add状态变成未add
```

## HEAD^与HEAD~

```
HEAD~低头走y步，无视岔路口。	表示祖先
HEAD^抬头走1步，入x号岔路口。  表示父母 (涉及分支合并)
```

## revert 

```
git revert -n 版本号
git commit -m "备注"
git push
撤销之前的某一版本，但是又想保留该目标版本后面的版本
```



## 其他

```
# 生成一个可供发布的压缩包
$ git archive

# 打补丁
$ git apply ../sync.patch

# 测试补丁能否成功
$ git apply --check ../sync.patch

# 查看Git的版本
$ git --version
```

## 常用Git命令总结

```
git config --global user.name "你的名字" 让你全部的Git仓库绑定你的名字
git config --global user.email "你的邮箱" 让你全部的Git仓库绑定你的邮箱
git init 初始化你的仓库
git add . 把工作区的文件全部提交到暂存区
git add .// 把工作区的文件提交到暂存区
git commit -m "xxx" 把暂存区的所有文件提交到仓库区，暂存区空空荡荡
git remote add origin https://github.com/name/name_cangku.git 把本地仓库与远程仓库连接起来
git push -u origin master 把仓库区的主分支master提交到远程仓库里
git push -u origin <其他分支> 把其他分支提交到远程仓库
git status查看当前仓库的状态
git diff 查看文件修改的具体内容
git log 显示从最近到最远的提交历史
git clone + 仓库地址下载克隆文件
git reset --hard + 版本号 回溯版本，版本号在commit的时候与master跟随在一起
git reflog 显示命令历史
git checkout --撤销命令，用版本库里的文件替换掉工作区的文件。我觉得就像是Git世界的ctrl + z
git rm 删除版本库的文件
git branch 查看当前所有分支
git branch <分支名字> 创建分支
git checkout <分支名字> 切换到分支
git merge <分支名字> 合并分支
git branch -d <分支名字> 删除分支,有可能会删除失败，因为Git会保护没有被合并的分支
git branch -D + <分支名字> 强行删除，丢弃没被合并的分支
git log --graph 查看分支合并图
git merge --no-ff <分支名字> 合并分支的时候禁用Fast forward模式,因为这个模式会丢失分支历史信息
git stash 当有其他任务插进来时，把当前工作现场“存储”起来,以后恢复后继续工作
git stash list 查看你刚刚“存放”起来的工作去哪里了
git stash apply 恢复却不删除stash内容
git stash drop 删除stash内容
git stash pop 恢复的同时把stash内容也删了
git remote 查看远程库的信息，会显示origin，远程仓库默认名称为origin
git remote -v 显示更详细的信息
git pull 把最新的提交从远程仓库中抓取下来，在本地合并,和git push相反
git rebase 把分叉的提交历史“整理”成一条直线，看上去更直观
git tag 查看所有标签，可以知道历史版本的tag
git tag打标签，默认为HEAD。比如git tag v1.0
git tag<版本号> 把版本号打上标签，版本号就是commit时，跟在旁边的一串字母数字
git show查看标签信息
git tag -a-m "<说明>" 创建带说明的标签。-a指定标签名，-m指定说明文字
git tag -d删除标签
git push origin推送某个标签到远程
git push origin --tags 一次性推送全部尚未推送到远程的本地标签
git push origin :refs/tags/删除远程标签
git config --global color.ui true 让Git显示颜色，会让命令输出看起来更醒目
git add -f强制提交已忽略的的文件
git check-ignore -v检查为什么Git会忽略该文件
```

## hexo指令

```
#hexo new 文件名创建新的 md文件  目录D:\blog\source\_posts
	hexo new [layout] <title>
	layout 可选参数，用以指定文章类型，若无指定则默认由配置文件中的 default_layout 选项决定  md
	title 必填参数，用以指定文章标题，如果参数值中含有空格，则需要使用双引号包围
#hexo generate 命令用于生成静态文件 public文件夹下，一般可以简写为 hexo g
#hexo server 命令用于启动本地服务器，一般可以简写为 hexo s
	-p 选项，指定服务器端口，默认为 4000
	-i 选项，指定服务器 IP 地址，默认为 0.0.0.0
	-s 选项，静态模式 ，仅提供 public 文件夹中的文件并禁用文件监视
#hexo deploy 命令用于部署网站，一般可以简写为 hexo d
	hexo g -d	指定生成后部署
#hexo clean 命令用于清理缓存文件

```

