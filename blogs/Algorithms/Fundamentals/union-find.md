---
title: union-find
date: 2020-05-19
sidebar: 'auto'
categories:
 - 算法
tags:
 - 算法
---
# 并查集(union-find)算法

1. 概念:  
**并查集（Disjoint set或者Union-find set）是一种树型的数据结构，常用于处理一些不相交集合（Disjoint Sets）的合并及查询问题。**  
2. 基本操作:
并查集是一种非常简单的数据结构，它主要涉及两个基本操作，分别为:  
A． 合并两个不相交集合,通过union()方法实现  
B． 判断两个元素是否属于同一个集合,通过find(i)和find(j)是否连通  
## 动态连通性
相连(假设是一种等价关系):
1. 自反性: p和p是相连的
2. 对称性: 如果p和q相连,那么q和p也相连
3. 传递性: 如果p和q相连且q和r相连,那么p和r相连  
**等价关系能将对象分为多个等价类,在这儿,只有两个对象相连时它们才属于同一个等价类**  
### 对问题建模：
在对问题进行建模的时候，我们应该尽量想清楚需要解决的问题是什么。因为模型中选择的数据结构和算法显然会根据问题的不同而不同，就动态连通性这个场景而言，我们需要解决的问题可能是:  
- 给出两个节点，判断它们是否连通，如果连通，不需要给出具体的路径  
- 给出两个节点，判断它们是否连通，如果连通，需要给出具体的路径  
## 算法实现
### 概念:
**选择一个以触点为索引的数组id[]作为基本数据结构来表示所有分量,使用分量中的某个触点的名称作为分量的标识符**  
在这个算法问题中,书上一共给出了3中算法来实现:
1. quick-find  
将一个连通分量中的所有触点在id[]中的值设为相同的值
2. quick-union  
每个触点所对应的id[]元素都是同一个分量中的另一个触点的名称(指向父触点,也可能是它自己,如根触点)---将这种联系称为链接
3. union-find(加权quick-union)  
记录每一棵树的大小并总是将较小的树连接到较大的树上

### 实现:

#### quick-find算法:

- 在判断两个触点是否为同一分量时十分快速,只需要访问id[]数组一次,即只需要判断id[i]和id[j]就行了  
- 但是在进行union()操作时,对于**每一对**输入union()都需要将整个数组遍历一遍,改变对应的id[]  
  ![](https://i.loli.net/2020/11/20/eabqT4xvJMKHXBN.png)  
  
##### 命题F: 在quick-find算法中,每次find()调用只需要访问数组一次,而归并两个分量的union()操作访问数组的次数在(N+3)到(2N+1)之间
  
  假设我们使用quick-find算法解决动态连通性问题，并且最后只得到了一个连通分量，那么至少需要调用N-1次union()，即至少$（N+3）*（N-1）~N²$次数访问，因而可以得出结论，quick-find算法的运行时间对于最终只能得到少数连通分量的一般应用是平方级别的。  

#### quick-union算法:

- 此算法通过父链接将分支表现为树的形式,find()方法将返回对应分支的根触点,由此判断是否在同一分量.  
- 最好的情况: find()只需要访问数组一次就可以得到一个触点所在的分量的标识符
- 最坏的情况: find()需要 2N+1 次数组访问  
- 与quick-find算法比较: 解决了union()操作总是线性级别的问题  
  ![](https://i.loli.net/2020/11/20/GtTh3svILFdQRac.png)  

  ##### 命题G: quick-union算法中的find()方法访问数组的次数为1加上给定触点所对应的节点的深度的两倍. union()和connected()访问数组的次数为两次find()操作(如果union()中给定的两个触点分别存在于不同的树中则还需要加1)

  对于整数对 0-i,union()操作访问数组的次数为2i+1(触点0的深度为i-1,触点i的深度为0),因此,处理**N对**整数所需的所有find()操作访问数组的总次数为$3+5+7+...+(2N-1)~N^2$  
#### 加权quick-union算法:

- 最坏情况: 其中将要被归并的树的大小总是相等的
- 加权quick-union算法能够保证**对数级别**的性能  
![](https://i.loli.net/2020/11/20/AH7GEdlLg34oY2C.png)  

```java
public class WeightedQuickUnionUF{
    private int[] id;  //父链接数组
    private int[] sz;  //各个根节点所对应的分量的大小
    private in count;  //连通分量的数量
    public WeightedQuickUnionUF(int N){
        count = N;
        id = new int[N];
        for(int i = 0; i < N; i++)
            id[i] = i;
        sz = new int[N];
        for(int i = 0; i < N; i++)
            sz[i] = 1;
    }
    public int count(){
        return count;
    }
    public boolean connected(int p, int q){
        return find(p) == find(q);
    }
    public int find(int p){ //跟随链接找到根节点
        while(p != id[p]){
            p = id[p];
        }
        return p;
    }
    public void union(int p, int q){
        int i = find(p);
        int j = find(q);
        if(i ==j) return;
        if(sz[i] < sz[j]){
            id[i] = j;
            sz[j] += sz[i];
        }else{
            id[j] = i;
            sz[i] += sz[j];
        }
        count--;
    }
}
```
##### 命题:

对于N个触点,加权quick-union算法构造的森林中的任意节点的深度最多为lgN

**证明: 森林中大小为k的树的高度最多为lgk.**  
归纳法: 在原始情况下,k=1时书的高度为0,假设大小为i的树的高度最多为lgi,其中i<k. 设i<=j且i+j=k,当将大小为i和大小为j的树归并时,小树中所有的节点的深度增加了1,  **1+lgi=lg(i+i)<=lg(i+j)=lgk**  
**对于加权quick-union算法和N个触点,在最坏的情况下find(),connected()和union()的成本的增长数量级为logN**(对于从一个节点到它的根节点的路径上的每个节点,每种操作最多都只会访问数组常数次)  
**此算法处理N个触点和M条链接时最多访问数组cMlgN次,其中c为常数**    


![](https://i.loli.net/2020/11/20/WPkfHxQJ2BjTL8Z.png)

#### 最优算法(这儿通过路径压缩方法实现):

**路径压缩方法:** 理想情况下,希望将每个节点直接链接到它的根节点上,即在检查节点的同时将它们链接到根节点,通过为find()方法添加一个循环,将在路径上遇到的所有节点都直接链接到根节点,得到几乎是扁平化的树.   
