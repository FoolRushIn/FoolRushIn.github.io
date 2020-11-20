---
title: 剑指offer(目录及一些特殊题目)
sidebar: 'auto'
date: 2020-11-11
categories:
 - 算法
 - leetcode
tags:
 - Java 
 - 算法
 - leetcode
---

### 小小结论

1. 涉及到数组中重复的元素，可以从两个方面下手

   1. 使用额外的空间（新建一个数组或容器），使用数组来记录元素出现的次数，或使用set的元素不可重复特性
   2. 不适用额外的空间（类似原地排序），从左到右依次将对应下标的元素放在相应位置，若遇到本元素和交换元素都对应下标，则是重复了

2. 字符串替换

   1. 可以使用`stringBuffer`，因为字符串不可变，而`stringBuffer不定长，可变`
   2. 库函数`string.replace(" ","%20");`

3. 涉及到倒叙输出，从两个方面入手

   1. 使用栈（如使用两个栈实现一个队列）
   2. 通过递归，在递归语句之后的代码会从深到浅依次执行

4. 涉及到二叉树

   1. 多多使用递归
2. 
   
   

# 一些特殊的题目

### 斐波那契数列（剑指offer 10）

斐波那契数列的定义是 `f(n + 1) = f(n) + f(n - 1) `，生成第 `n`项的做法有以下几种：

1. 递归法

   - 拆分为`f(n-1)和f(n-2)`，递归的终止条件是`f(0)和f(1)`
   - 缺点是会有大量的重复计算，可以通过将计算过的值放入map中，在每次递归开始时判断map中是否有计算结果
   - 如果```n```很大将会出现数字溢出，可能会要求将结果取余，需要在每一步的计算中取余，而不是在最终的结果取余。因为可能在还没到最后一步就已经溢出了。

   ![](https://i.loli.net/2020/11/18/bHOvUTWZNdEXwVu.png)

   ```java
   int constant = 1000000007;
   
   public int fib(int n) {
       return fib(n, new HashMap());
   }
   
   public int fib(int n, Map<Integer, Integer> map) {
       if (n < 2)
           return n;
       if (map.containsKey(n))
           return map.get(n);
       int first = fib(n - 1, map) % constant;
       map.put(n - 1, first);
       int second = fib(n - 2, map) % constant;
       map.put(n - 2, second);
       int res = (first + second) % constant;
       map.put(n, res);
       return res;
   }
   ```

   

2. 动态规划

   - 利用公式进行计算即可

   ```java
   class Solution {
       public int fib(int n) {
           int f1 = 0, f2 = 1, ans =0;
           if(n==0||n==1){
               return n;
           }else{
               for (int i = 2; i <= n; i++){
                   ans = (f1 + f2) %1000000007;
                   f1 = f2;
                   f2 = ans;
               }
           }
           return ans;
       }
   }
   ```

   

### 青蛙跳台阶问题

一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 `n` 级的台阶总共有多少种跳法。

- 将青蛙跳台阶划分为两步，那么最后一步有两种情况：跳一级台阶，跳两级台阶。剩下的台阶就是`n-1`和`n-2`，即`f(n-1)+f(n-2)`就是`n`级台阶的跳法



### 剪绳子 (剑指offer 14)

给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 `k[0],k[1]...k[m-1]` 。请问 `k[0]*k[1]*...*k[m-1]` 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。

- 两个切入点：
  - 每段绳子的长度一样时，其乘积最大 
  - 单段绳子的长度是3时有最优解（可用数学证明，也可**推断**：当长度为2或3时不可分，而3比2更优）
- 用`n / 3 和 n % 3`计算出 3 出现的次数和余数，余数有`0，1，2`三种情况，当余数为 1 时，取出一个 3 和余数相加凑成一个 4，因为`2 * 2 > 1 * 3`，余数为 2 或 1 则不用特别计算

```java
class Solution {
    public int cuttingRope(int n) {
        if(n <= 3) return n - 1;
        int a = n / 3, b = n % 3;
        if(b == 0) return (int)Math.pow(3, a);
        if(b == 1) return (int)Math.pow(3, a - 1) * 4;
        return (int)Math.pow(3, a) * 2;
    }
}
```

```java
/**
*也可以逐个将3拿出来并计算乘积，直到剩下的数字等于4，将4乘入之前得到的乘积就是结果
*/
class Solution {
    public int cuttingRope(int n) {
        if (n <= 3)	return n-1;
        if (n == 4) return 4;
        int number;
        int count = 1;
        while (n >= 5) {
            count *= 3;
            n -= 3;
        }
        return  count * n;
    }
}

/**
*若需要考虑数值溢出的情况，答案需要取模1e9+7（1000000007）
*/
class Solution {
    public int cuttingRope(int n) {
        if (n <= 3) return n-1;
        if (n == 4) return 4;
        int p = 1000000007;
        long res = 1;
        while(n >= 5){
            res *= 3;
            res %= p;
            n -= 3;
        }
        return (int)(res*n%p);
    }
}
```



### 数值的整数次方（pow方法）（剑指offer 16）

实现函数`double Power(double base, int exponent)`，求`base的exponent次方`。不得使用库函数，同时不需要考虑大数问题。

- 思想就是使用**快速幂**，将时间复杂度降低至 $O(log_2 n)$ ：
  - 快速幂算法的核心思想就是每一步都把指数分成两半，而相应的底数做平方运算
- 需要考虑的情况：
  - 指数为负数：将其转换为正数，并将底数base变为`1/base`
  - 指数为正数时，分为奇数和偶数：
    - 偶数：计算`Power(base * base, exponent/2)`，比如我们要计算`Power（3，8）`，我们可以改为
      `Power（3 * 3，8 / 2）`，也就是`Power（9，4）`。
    - 奇数：计算`base * Power(base * base, exponent / 2)`，比如`Power（3，9）`，我们需要计算`3 * Power（3 * 3，9/2）`，也就是`3 * Power（9，4）`。

```java
class Solution {
    public double myPow(double x, int n) {
        /*
        转化为位运算：
            向下整除 n / 2 等价于 右移一位 n >> 1；
            取余数 n % 2 等价于 判断二进制最右一位值 n & 1 ；
        */
        if (x == 0)  return 0;
        long a = n;
        double res = 1;
        if (n < 0){
            x = 1 / x;
            a = -a;
        }
        while (a > 0){
            if ((a & 1) == 1){//既是对奇数的处理，也是最高位的终止条件
                res *= x;
            }
            x *= x;
            a >>= 1;
        }
        return res;
    }
}
```



### 打印从1到最大的n位数(剑指 Offer 17. )

输入数字 `n`，按顺序打印出从 1 到最大的 n 位十进制数。比如输入 3，则打印出 1、2、3 一直到最大的 3 位数 999。

- 可发现，输出的数字最大为 `10 ^ n - 1`，只需要构建出数组填充数字即可
- 本题的核心是大数问题，若`n`足够大，那么输出的数字将会超出`int`的范围
  - 基本数据类型的取值都有一定的范围，应该使用`String` 类型来表示大数
  - 不同于`int`类型，`String`类型不能进行`+1`操作，进位也需要循环判断。发现输出的数字其实是`0-9`的全排列，
    - 基于分治算法的思想，先固定高位，向低位递归，当个位已被固定时，添加数字的字符串。例如当 `n = 2`时（数字范围 `1 - 99`），固定十位为 `0 - 9` ，按顺序依次开启递归，固定个位 `0 - 9` ，终止递归并添加数字字符串。

- 不考虑大数

```java
class Solution {
    public int[] printNumbers(int n) {
        int end = (int)Math.pow(10, n) - 1;
        int[] res = new int[end];
        for(int i = 0; i < end; i++)
            res[i] = i + 1;
        return res;
    }
}
```

- 考虑大数问题
  - 使用`String`输出的数字会出现`001,002`的情况，使用`Integer.parseInt()`可以自动将前置的0消去。也可定义一个`start`来标记有效数字的边界，在转换为`String`的时候使用`subString()`来切分字符串

```java
class Solution {
    char[] num;
    int[] ans;
    int count = 0,n;
    public int[] printNumbers(int n) {
        this.n = n;
        num = new char[n];	//输出的数字最高有几位数，每一位都对应一个下标。
        ans = new int[(int) (Math.pow(10, n) - 1)];
        dfs(0);
        return ans;
    }
    private void dfs(int n) {
        if (n == this.n) {	//终止条件，注意最开始传入的是0
            String tmp = String.valueOf(num);//执行到这儿num只是一个‘数’，如001
            int curNum = Integer.parseInt(tmp);
            if (curNum!=0) ans[count++] = curNum;
            return;
        }
        for (char i = '0'; i <= '9'; i++) {
            num[n] = i;
            dfs(n + 1);
        }
    }
}
```





