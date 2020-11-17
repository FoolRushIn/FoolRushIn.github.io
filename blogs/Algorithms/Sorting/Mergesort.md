---
title: Mergesort
date: 2020-05-25
sidebar: 'auto'
categories:
 - 算法
tags:
 - 算法
---
# 归并排序

1. **能够保证将任意长度为N的数组排序所需的时间和$NlogN$成正比**
2. **主要的缺点是所需的额外空间和N成正比**

## 原地归并的抽象方法

实现归并最直截了当的方法是**将两个数组归并到第三个数组**，实现的方法很简单，从左到右逐一比较两数组的第一位元素，将小的一个放入第三个数组（假设两数组已经有序），完成操作后第三个数组就是有序的

当用归并将一个大数组排序时,需要进行很多次的归并,每次都创建一个新的数组会带来问题. 这时候需要在**原地归并的方法**  
将所有的元素复制到一个辅助数组中,再把归并的结果放回原数组中

```java
public static void merge(Comparable[] a, int lo, int mid, int hi) {
    int i = lo, j = mid + 1;
    for (int k = lo; k <= hi; k++) {
        aux[k] = a[k];
    }
    for (int k = lo; k <= hi; k++) {//将aux[]数组归并回a[]数组
        if (i > mid) {//数组的前半部分都走完了,将后半部分剩余的接在后边
            a[k] = aux[j++];
        } else if (j > hi) {//数组的后半部分走完了,将前半部分剩余的接在后边
            a[k] = aux[i++];
        } else if (less(aux[i], aux[j])) {//将数组的前半部分和后半部分挨个比较大小
            a[k] = aux[i++];
        } else {
            a[k] = aux[j++];
        }
    }
}	
```

### 快速归并

按**降序**将 a[ ] 的后半部分复制到 aux[ ],然后将其归并回 a[ ] 中. 这样可以去掉内循环中检测某半边是否用尽的代码(这样的排序产生的结果是不稳定的)

```java
private static void merge(Comparable[] a, int lo, int mid, int hi) { 
   for (int i = lo; i <= mid; i++)
      aux[i] = a[i]; 
   
   for (int j = mid+1; j <= hi; j++)
      aux[j] = a[hi-j+mid+1];
  
   int i = lo, j = hi; 
   for (int k = lo; k <= hi; k++) 
      if (less(aux[j], aux[i])) a[k] = aux[j--];//注意,j最初的状态是在末尾
      else                      a[k] = aux[i++];
} 
```



![avatar](https://wx1.sbimg.cn/2020/06/01/merge.md.png)



## 自顶向下的归并排序

- 基于原地归并的抽象实现了另一种**递归归并**, (这也是应用高效算法设计中==分治思想==的最典型的一个例子)  
- 这段递归代码是归纳证明算法能够正确地将数组排序的基础:  
  - 如果它能将两个子数组排序,它就能通过归并两个子数组来将整个数组排序

```Java
public class Merge{
    private static Comparable[] aux;
    public static void sort(Comparable[] a) {
        aux = a.clone();// 一次性分配空间
        sort(a,0, a.length - 1);
    }

    private static void sort(Comparable[] a,int lo, int hi) {
        if (hi <= lo) {
            return;
        }
        int mid = lo + (hi - lo) / 2;
        sort(aux,a, lo, mid);//左半边排序
        sort(aux,a, mid + 1, hi);//右半边排序
        merge(a,aux,lo, mid, hi);//归并结果（参考原地归并的抽象方法）
    }
}
```

![avatar](https://wx2.sbimg.cn/2020/06/01/mergesortTD.md.png)

### 命题 1

- 对于长度为N的任意数组,自顶向下的归并排序需要$1/2NlgN$至$NlgN$次比较   
- 对于长度为N的任意数组,自顶向下的归并排序最多需要访问数组$6NlgN$次
  - 即是归并所需要的时间和$NlgN$成正比

### 对小规模子数组使用插入排序

- 用不同的方法来处理小规模问题能改进大多数递归算法的性能,因为递归会使小规模问题中方法的调用过于频繁

  ![avatar](https://wx2.sbimg.cn/2020/06/03/mergesortTD-bars.png)

### 测试数组是否已经有序

添加判断条件, 如果a[mid] <= a[mid+1], 那么就认为数组有序并跳过merge()方法,使得任意有序的子数组算法的运行时间变为线性

### 不将元素复制到辅助数组

可以节约将数组元素复制到用于归并的辅助数组所用的时间(非空间)

要做到这一点我们要调用两种排序方法，一种将数据从输入数组排序到辅助数组，一种将数据从辅助数组排序到输入数组。这种方法需要一些技巧，我们要在递归调用的每个层次交换输入数组和辅助数组的角色

```Java
public static void sort(Comparable[] a) {
        Comparable[] aux = new Comparable[a.length];    // 一次性分配空间
        for (int k = 0; k < a.length; k++) {
            aux[k] = a[k];
        }
        sort(aux, a, 0, a.length - 1);
    }

    private static void sort(Comparable[] a, Comparable[] aux, int lo, int hi) {  // 将数组a[lo..hi]排序
        if (hi <= lo) return;
        int mid = lo + (hi - lo) / 2;
        sort(aux, a, lo, mid);       // 将a和aux互换位置,实现在递归中不断转换
        sort(aux, a, mid + 1, hi);     // 同上
        merge(a, aux, lo, mid, hi);  // 归并结果回a[]
    }

    public static void merge(Comparable[] a, Comparable[] aux, int lo, int mid,
                             int hi) {  // 将a[lo..mid] 和 a[mid+1..hi] 归并
        int i = lo, j = mid + 1;
        for (int k = lo; k <= hi; k++) {
            if (i > mid) 					aux[k] = a[j++];
            else if (j > hi) 				aux[k] = a[i++];
            else if (less(a[j], a[i])) 		 aux[k] = a[j++];
            else 						   aux[k] = a[i++];
        }  // 归并回到a[lo..hi]
    }
```



## 自底向上的归并排序

先归并微型数组,再成对归并得到的子数组  
这种实现方法比标准递归方法所需要的代码量更少  
自底向上的归并排序会多次遍历整个数组,根据子数组的大小进行两两归并  

```Java
public class MergeBU{
    private static Comparable[] aux;
    public static void sort(Comparable[] a){
        int N = a.length;
        axu = new Comparable[N];
        for(int sz = 1; sz < N; sz = sz + sz){
            for(int lo = 0; lo < N - sz; lo += sz + sz)
                merge(a, lo, lo + sz - 1, Math.min(lo + sz + sz - 1, N - 1));
        }
    }
}
```

![avatar](https://wx2.sbimg.cn/2020/06/03/mergesortBU.md.png)

### 命题 2 

对于长度为N的任意数组,自底向上的归并排序需要 $1/2NlgN$ 至 $NlgN$ 次比较, 最多访问数组 $6NlgN$ 次

- 自底向上的归并排序比较适合用链表组织的数据
  - 这种方法只需要重新组织链表链接就能将链表原地排列(不需要创建任何新的链表节点)

## 排序算法的复杂度

### 命题 3

没有任何**基于比较**!的算法能够保证使用少于 $lg(N!)$ ~ $NlgN$ 次比较将长度为N的数组排序  
![avatar](https://wx1.sbimg.cn/2020/06/03/IMG_20200603_210513.md.jpg)

![avatar](https://wx2.sbimg.cn/2020/06/03/IMG_20200603_210535.md.jpg)

### 命题 4

归并排序是一种渐进最优的基于比较排序的算法  
归并排序在最坏情况下的比较次数和任意基于比较的排序算法所需的最少比较次数都是 ~ $NlgN$

