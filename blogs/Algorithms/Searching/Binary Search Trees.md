---
title: 二叉查找树BST
date: 2020-11-09
sidebar: 'auto'
categories:
 - 算法
tags:
 - 算法

---

# 二叉查找树

二叉查找树的get和put方法

```java
    public Value get(Key key) {
        return get(root, key);
    }

    private Value get(Node x, Key key) {
        if (key == null) throw new IllegalArgumentException("calls get() with a null key");
        if (x == null) return null;
        int cmp = key.compareTo(x.key);
        if      (cmp < 0) return get(x.left, key);
        else if (cmp > 0) return get(x.right, key);
        else              return x.val;
    }

    public void put(Key key, Value val) {
        if (key == null) throw new IllegalArgumentException("calls put() with a null key");
        if (val == null) {
            delete(key);
            return;
        }
        root = put(root, key, val);
    }

    private Node put(Node x, Key key, Value val) {
        if (x == null) return new Node(key, val, 1);
        int cmp = key.compareTo(x.key);
        if      (cmp < 0) x.left  = put(x.left,  key, val);
        else if (cmp > 0) x.right = put(x.right, key, val);
        else              x.val   = val;
        x.size = 1 + size(x.left) + size(x.right);  //本文中size表示以该结点为根的子树的结点总数
        return x;
    }
```

#### 命题C：

在由N个随机键构造的BST中,查找命中平均所需的比较次数为~2lnN

一次结束于给定结点的命中查找所需的比较次数为**查找路径的深度加1**。如果将树中的所有结点的深度加起来，我们就能得到一棵树的**内部路径长度**。 因此，在BST中的平均比较次数即为平均内部路径长度加1。

#### 命题D：

在由N个随机键构造的BST中插入操作和查找未命中平均所需的比较次数为~2lnN

插入操作和查找未命中平均比查找命中需要一次额外的比较，通过归纳法可以得到。

- 插入一个新键的成本是对数级别的，这是基于二分查找的有序数组所不具备的灵活性，其插入操作所需访问数组的次数是线性级别的

