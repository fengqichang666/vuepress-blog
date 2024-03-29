---
title: git merge --no-ff 与--ff 和--squash的区别
date: 2022-06-19 11:18:58
---

推荐在合并分支时，，加上 `--no-ff` 参数，会生成一个新的commit，用于查看这次合并的差异了：`--no-ff` 在这的作用是禁止快进式合并。

Git 合并两个分支时，如果顺着一个分支走下去可以到达另一个分支的话，那么 Git 在合并两者时，只会简单地把指针右移，叫做“快进”（fast-forward），比如下图：

```
          A---B---C feature
         /
D---E---F master
```

要把 feature 合并（直接merge）到 master 中，结果就会变成

```
          A---B---C feature
         /         master
D---E---F 
```

因为 feature 就在 master 的下游，所以直接移动了 master 的指针，master 和 feature 都指向了 C。而如果执行了 `git merge --no-ff feature` 的话，是下面的结果：

```
          A---B---C feature
         /         \
D---E---F-----------G master
```

由于 `--no-ff` 禁止了快进，所以会生成一个新的提交，master 指向 G。

从合并后的代码来看，结果其实是一样的，区别就在于 `--no-ff` 会让 Git 生成一个新的提交对象。为什么要这样？通常我们把 master 作为主分支，上面存放的都是比较稳定的代码，提交频率也很低，而 feature 是用来开发特性的，上面会存在许多零碎的提交，快进式合并会把 feature 的提交历史混入到 master 中，搅乱 master 的提交历史。所以如果你根本不在意提交历史，也不爱管 master 干不干净，那么 `--no-ff` 其实没什么用。不过，如果某一次 master 出现了问题，你需要回退到上个版本的时候，比如上例，你就会发现退一个版本到了 B，而不是想要的 F，因为 feature 的历史合并进了 master 里。

## 图形化工具sourceTree，这个可以帮助我们更直观的观察每种merge方式的过程

### 从master分支 切出 b1分支  制造两次提交：

```
commit1:
 create mode 100644 file2.txt
 create mode 100644 file3.txt	
commit2:
 create mode 100644 file4.txt
 create mode 100644 file5.txt
```

合并分支

```
git merge --no-ff b1 -m "Merge branch b1"
```

我们可以看到，以 `git merge --no-ff` 方式进行合并以后，git的节点图表是如下图所示的。1、2两个节点是每次提交后创建的提交节点，3节点是使用`--no-diff`进行合并时，创建的提交节点。

![](https://fengqichang666.github.io/images/1619677619775-20210429142658.png)

从文件上面看，最后的这个节点的变更，是每次提交的变更的一个汇总，是将分支`b1`的所有的变更，都汇总到一起形成了一个新的提交节点，然后将这个节点提交到`master` 分支上面去。

![](https://fengqichang666.github.io/images/1619677724167-20210429142843.png)

![](https://fengqichang666.github.io/images/1619677762866-20210429142922.png)

![](https://fengqichang666.github.io/images/1619677806322-20210429143005.png)

### 从master分支 切出 b2分支  制造两次提交：

```
commit1:
  create mode 100644 file6.txt
commit2:
  create mode 100644 file7.txt
 create mode 100644 file8.txt
```

合并分支

`git merge` 是默认带 `--ff` 参数的，也就是`fast forward`的意思

```
git merge b2 -m "merge branch b2"
```

我们可以看到，直接使用git merge，会将整个b2的所有的提交节点，都直接汇入到master分支中。比如说，我有一个开发分支，开发了两周，中间的大大小小的提交有上百次，如果我直接将这个开发分支通过git merge的方式进行提交到master分支的话，那master分支将会被我这个分支中的琐碎的提交所淹没。
![](https://fengqichang666.github.io/images/1619679062606-20210429145101.png)

拿图中的merge --no-ff与直接merge相比较，我们可以看到， merge --no-ff的合并方式，会合并提交，并保留有原来的提交记录，也不会将原来的提交记录汇入到被合并的分支中，保证了被合并分支的提交记录的整洁，如果有需要进行回滚的点，也可以很方便的从历史提交记录中找到相应的提交点。

![](https://fengqichang666.github.io/images/1619680127536-20210429150846.png)

而且，就算我们将b1这个分支删除掉，这个记录也不会消失。我们执行完删除操作以后，可以从下图中看到，分支中的b1分支已经没了，但是历史的提交节点并没有受到影响。

![](https://fengqichang666.github.io/images/1619681371508-20210429152930.png)

### **merge --squash**

`merge --squash` 会将分支的所有的提交压缩到一次提交中，并且不会自动提交，需要`merge`的操作人手动进行提交。

 从master分支中创建b3分支，并切换到b3分支上

`merge --squash` 后`b3`分支与`master`分支间的关联是中断的，`b3`分支中提交的文件，在新创建的节点中，也是未提交的状态，`merge --squash`操作，会将要合并的分支的所有的提交进行合并压缩到一次提交上。

![](https://fengqichang666.github.io/images/1619681946336-20210429153905.png)

在我们将合并提交以后，我们可以看到，这次提交以后，`merge --squash`新创建的提交点，与原来的`b3`分支是断开的，是无法溯源的

![](https://fengqichang666.github.io/images/1619683130210-20210429155849.png)

### **merge --no-ff --no-commit**

在合并分支时使用`--no-commit` 参数，可以只执行合并代码的操作，不进行提交操作。

可以直观的看到，使用`--no-ff --no-commit` 的方式进行提交以后，合并是并没有提交的。

![](https://fengqichang666.github.io/images/1619684451105-20210429162050.png)

手动进行提交以后，才提交上去

![](https://fengqichang666.github.io/images/1619684848026-20210429162727.png)

### 结论

merge --no-ff 与 merge --ff 和merge --squash 相比，拥有可以保持分支整洁，而且可追溯的优点，所以在开发中，推荐使用 merge --no-ff 方式进行分支合并，而且在合并时，配合 --no-commit 进行合并，待检查合并完毕的文件以后再进行提交的方式为最佳方案。
