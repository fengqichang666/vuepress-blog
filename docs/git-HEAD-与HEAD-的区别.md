---
title: git HEAD~与HEAD^的区别
date: 2022-11-15 14:17:58
tags:
---

- HEAD~ 表示祖先
- HEAD^ 表示父母 (涉及分支合并)

举例 A B C 三个分支

- A: A1, A2, A3
- B: B1, B2, B3
- C: C1, C3, C3

当前在分支 A 上, 合并 B C 这两个分支

```
git merge B C
```

当前提交一共有 3 个父母

~ 表示第 1 个分支的第 n 个祖先

HEAD~ 表示 A3
HEAD~2 表示 A2
HEAD~3 表示 A1
^ 表示第 n 个父母

HEAD^ 表示 A3
HEAD^2 表示 B3
HEAD^3 表示 C3
注意事项

HEAD~ 与 HEAD~1 等效, HEAD^ 与 HEAD^1 等效
HEAD~3 等效于 HEAD~~~ 等效于 HEAD^^^ 都表示 A1
HEAD~n 等效于 HEAD~...~ (n 次 ~) 等效于 HEAD^^^ (n 次 ^)
HEAD^3 与 HEAD^^^ 不同, 前者表示 C3 (即第 3 个父母), 后者表示 A1
总结:
一般情况下, 使用 HEAD~n 情况即可, 表示前 n 次提交, 而使用 HEAD^n 用于分支合并的情况多
