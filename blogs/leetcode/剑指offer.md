---
title: 剑指offer(持续更新中)
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

#### 小小结论

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

   

# 一些特殊的题目

#### 斐波那契数列（剑指offer 10）

斐波那契数列的定义是 `f(n + 1) = f(n) + f(n - 1) `，生成第 `n`项的做法有以下几种：

1. 递归法

   - 拆分为`f(n-1)和f(n-2)`，递归的终止条件是`f(0)和f(1)`
   - 缺点是会有大量的重复计算，可以通过将计算过的值放入map中，在每次递归开始时判断map中是否有计算结果
   - 如果```n```很大将会出现数字溢出，可能会要求将结果取余，需要在每一步的计算中取余，而不是在最终的结果取余。因为可能在还没到最后一步就已经溢出了。

   ![](D:\blogImage\a6f819589ee5e50ec378f2c10835e9a510529bac44618444beb2202486062eee-image.png)

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

   

##### 青蛙跳台阶问题

一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 `n` 级的台阶总共有多少种跳法。

- 将青蛙跳台阶划分为两步，那么最后一步有两种情况：跳一级台阶，跳两级台阶。剩下的台阶就是`n-1`和`n-2`，即`f(n-1)+f(n-2)`就是`n`级台阶的跳法



#### 剪绳子 (剑指offer 14)

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



#### 数值的整数次方（pow方法）（剑指offer 16）

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



#### 打印从1到最大的n位数(剑指 Offer 17. )

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





# 二叉树

#### 重建二叉树 （剑指offer 7）

输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

- 用一个`Map`保存中序遍历，其中`key`为数组元素，`value`为元素对应的下标
- 通过前序遍历可以获得`root`，在中序遍历中以`root`划分左子树和右子数
- 此问题我纠结的是参数的传递
  - 一开始想的是要想区分左右子树需要分别传递左右子树的长度到前序数组中
  - 接着发现长度可以用下标计算得来，所以传递了前序和中序以及其下标：`int[] preorder, int pre_start, int pre_end, int[] inorder, int ino_start, int ino_end`，这种传输十分繁琐
  - 接着发现pre数组的start主要用来确定root,可以直接传入; end用来判断递归结束,可以通过判断inorder数组实现一样的效果；inorder数组也没有用到，只是用到了下标。即是将`int[] preorder`声明在类中，简化后的参数传递为`int root, int left, int right`

```java
class Solution {
    /**
    简化了递归方法的参数
    pre数组的start主要用来确定root,可以直接传入; end用来判断递归结束,可以通过判断inorder数组实现一样的效果

    */
    int[] preorder;
    HashMap<Integer, Integer> dic = new HashMap<>();
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        this.preorder = preorder;
        for(int i = 0; i < inorder.length; i++)
            dic.put(inorder[i], i);
        return recur(0, 0, inorder.length - 1);
    }
    /**
    简化版本
    */
    TreeNode recur(int root, int left, int right) {//参数为root，inorder中的左右下标
        if(left > right) return null;
        TreeNode node = new TreeNode(preorder[root]);
        int i = dic.get(preorder[root]);        
        node.left = recur(root + 1, left, i - 1);
        node.right = recur(root + i - left + 1, i + 1, right);
        return node;                                           
    }
    /**
    未简化版本，仅供参考
    */
        public TreeNode takeTree(int[] preorder, int ps, int pe, int[] inorder, int is, int ie, Map<Integer, Integer> map){
        if (ps > pe)    return null;
        int root = preorder[ps];
        TreeNode node = new TreeNode(root);
        if (ps == pe) {
            return node;
        } else {
            int temp = map.get(root);
            node.left = takeTree(preorder, ps + 1, ps + temp - is, inorder, is, temp - 1, map);
            node.right = takeTree(preorder, ps + temp - is + 1, pe, inorder, temp + 1, ie, map);
        }
        return node;
    }
}
```



# 数组

## 一维数组

#### 旋转数组的最小数字（剑指offer 11）

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如，数组 `[3,4,5,1,2]` 为 `[1,2,3,4,5] `的一个旋转，该数组的最小值为1。  

- 通过二分法，利用数组的部分有序缩减时间复杂度

- 处理该问题的两个关键点：

  1. 对判断中high与low点处理

  ```java
  if (numbers[high] > numbers[mid]){
      high = mid;// 当mid处刚好是最小值时,若high=mid-1,则会丢掉最小值
  }else if(numbers[high] < numbers[mid]){
      low = mid + 1;//该情况下最小值必定在mid右边(不包括mid)
  }else{
      high--;//若mid与high相等，则mid~high全相等，例[2,3,0,1,1,1,1]  [1,2,3,3,3]
  }
  ```

  2. 选取`numbers[high]`而不是`numbers[low]`作为比较值的意义
     - 本质上是由于`high` 初始值肯定在右排序数组中；`low`初始值无法确定在哪个排序数组中。
     - 本人实践发现：选取`low`作为比较值的时候，若遇到数组局部为有序，如`[1,2,3]`，那么会先将 low 值设置为 1，即`high = 1, number[high] == 2`，接着`2与3进行比较就会出现最小值为3的结果`。

#### 找出数组中重复的数字（剑指offer 3）

在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

- 使用额外的空间（新建一个数组或容器），使用数组来记录元素出现的次数，或使用set的元素不可重复特性
- 不适用额外的空间（类似原地排序），从左到右依次将对应下标的元素放在相应位置，若遇到本元素和交换元素都对应下标，则是重复了





## 二维数组（图）

大家都熟悉的数据结构：图，就是一堆顶点和边，在代码中是怎么表示的呢？主要通过**邻接列表**和**邻接矩阵**来表示。

具体定义：

- 逻辑结构分为两部分：V和E集合，其中，V是顶点，E是边。因此，用一个一维数组存放图中所有顶点数据；用一个二维数组存放顶点间关系（边或弧）的数据，这个二维数组称为邻接矩阵。邻接矩阵又分为**有向图邻接矩阵**和**无向图邻接矩阵**。

so，这儿讨论二维数组的问题，大多也就是对图的问题。

### BFS广度优先搜索

- 广度遍历通常用到一个Queue队列存放数组点，Queue为空则表明遍历完成

#### 机器人的运动范围(剑指offer 13)

地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？

- 分析题目可知，机器人由`[0, 0]`开始运动，则运动轨迹为向下和向右
- 广度遍历通常用到一个Queue队列存放数组点，Queue为空则表明遍历完成
- 思路：
  - 将`[0][0]`加入到队列中
  - 用`queue.poll()`来弹出队头元素，判断该点是否满足终止条件，若满足则`continue`，或者将该点的右方和下方的点加入到队列中
  - 若队列为空，则说明遍历完成

```java
class Solution {
    public int movingCount(int m, int n, int k) {
        Queue<int[]> queue = new LinkedList<>();
        boolean[][] visited = new boolean[m][n];//辅助数组，用来标记以访问数组点
        int res = 0;
        queue.add(new int[] {0 ,0, 0, 0});
        while(!queue.isEmpty()){
            int[] temp = queue.poll();
            int i = temp[0], j = temp[1], si = temp[2], sj = temp[3];
            if(i >= m || j >= n || si + sj > k || visited[i][j])    continue;//注意为continue，只是跳出这一次循环
            //与使用DFS不同，DFS通常使用递归，那么遇到终止条件会直接return
            visited[i][j] = true;
            res++;
            queue.add(new int[]{i + 1, j, (i + 1) % 10 == 0? si - 8: si + 1, sj});
            queue.add(new int[]{i, j + 1, si, (j + 1) % 10 == 0? sj - 8: sj + 1});
            //本题中特殊的数位计算方法，在换行或换列时对应的si或sj会减少8，如[19][1]到[20][1]，si由10变到了2
        }
        return res;
    }
}
```



### DFS深度优先搜索

- 深度优先搜索： 可以理解为暴力法模拟机器人在矩阵中的所有路径。DFS 通过递归，先朝一个方向搜到底，再回溯至上个节点，沿另一个方向搜索，以此类推。
- 剪枝： 在搜索中，遇到数位和超出目标值、此元素已访问，则应立即返回，称之为**可行性剪枝** 。
- 通常借助递归来实现

#### 机器人的运动范围(剑指offer 13，同上)

- 思路同上，在搜索的时候借助递归以及辅助数组

```java
class Solution {
    boolean[][] visited;
    public int movingCount(int m, int n, int k) {
        visited = new boolean[m][n];
        if (k == 0) return 1;
        return dfs (0, 0, 0, 0, k);
    }
    public int dfs (int i, int j, int si, int sj, int k){
        if (i >= visited.length || j >= visited[0].length || si + sj > k || visited[i][j])   return 0;
        //终止条件：超出数组界限，超出规定k值或已经访问过
        visited[i][j] = true;
        return  1 + dfs(i+1, j, (i + 1) % 10 == 0?si - 8:si + 1, sj, k) 
            + dfs(i, j+1, si, (j + 1)%10 == 0? sj - 8: sj + 1, k);
        //[0][0]这个点加上向下和向右搜索的点
    }
}
```

#### 矩阵中的路径（剑指offer 12）

- 这道题，与前面一道题的不同：
  - 出发点不确定，需要通过两次循环来确定初始点，并且搜索方向为上下左右四个方向

直接上代码，边看边说

```java
class Solution {
    public boolean exist(char[][] board, String word) {
        char[] words = word.toCharArray();//转换为字符数组方便使用
        boolean res = false;
        for (int i = 0; i < board.length; i++){
            for (int j = 0; j < board[0].length; j++){
                // res = dfs(board, words, i, j, 0);错误
                // return dfs(board, words, i, j, 0);错误
                //注意，上边两种都是我翻过的错误，第一种将dfs结果存放在res中，那么会被后来的结果覆盖。第二种直接返回dfs结果则是根本不执行后边的代码了。脑袋一时没反应过来，纠结了好一会儿-_-
                if(dfs(board, words, i, j, 0)) 
                    return true;
                //正确做法，在判断dfs返回为true时才return，因为我们只需要判断有满足word的一个路径
            }
        }
        return false;//否则return false
    }
    boolean dfs(char[][] board, char[] words, int i, int j, int k){
        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != words[k])  return false;
        //终止条件：超出边界或以访问
        if (k == words.length - 1)  return true;
        //words数组遍历完了，任务完成！
        char temp = board[i][j];
        board[i][j] = '/';
        boolean ans = dfs(board, words, i+1, j, k+1) || dfs(board, words, i-1, j, k+1) ||
            dfs(board, words, i, j+1, k+1) || dfs(board, words, i, j-1, k+1);
        //很巧妙的代码，因为只需要有一条正确的路径就行了，也就是说四个方向有一个返回true就行了，所以用短路或
        board[i][j] = temp;
        return ans;
    }
}
```

# 位运算(二进制)

#### 二进制中1的个数（也被称为汉明重量）（剑指offer 15）

请实现一个函数，输入一个整数，输出该数二进制表示中 1 的个数。例如，把 9 表示成二进制是 1001，有 2 位是 1。因此，如果输入 9，则该函数输出 2。

- 只需要将该数与1进行`&`运算，就可以得出该树的二进制最后一位是否为1，随后使用`>>>`无符号右移，挨个比较

```java
public class Solution {
    // you need to treat n as an unsigned value
    public int hammingWeight(int n) {
        int res = 0;
        while(n != 0){
            res += n & 1;
            n >>>= 1;
        }
        return res;
    }
}
```

- 或者可以使用另一种思想：巧用`n & (n-1)`
  - `(n−1)` 解析： 二进制数字 n 最右边的 1 变成 0 ，此 1 右边的 0 都变成 1 。
  - `n & (n-1)` 解析： 二进制数字 n 最右边的 1 变成 0 ，其余不变。
  - 即是每次循环都消去位数最低的一个 1， 循环次数即是 1 的个数

```java
public class Solution {
    public int hammingWeight(int n) {
        int res = 0;
        while(n != 0) {
            res++;
            n &= n - 1;
        }
        return res;
    }
}
```

- **(引申)**也可用`n & (n-1)`来判断2的幂
  - 若 `n = 2 ^ x`，且 `x` 为自然数（即 `n` 为 2 的幂），则一定满足以下条件：
    - 恒有 `n & (n - 1) == 0`，这是因为：
      - n 二进制最高位为 11，其余所有位为 0；
      - `n - 1` 二进制最高位为 0，其余所有位为 1；
    - 一定满足 `n > 0`。



# 链表

## 单链表

#### 删除链表的结点（剑指offer 18）

给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。返回删除后的链表的头节点。

- 删除结点：将该结点的前结点指向该节点的下一个结点，即是`pre.next = cur.next;`
- 此题可用单指针和双指针两种方式（永远使用一个指针指向头结点）
  - 单指针：不使用一个单独的结点表示前驱节点，判断结点的时候使用`cur.next.val == val;`，删除结点的时候使用`cur.next = cur.next.next;`
  - 双指针：使用单独的结点表示前驱节点
- 也可以使用哨兵结点，免去对空指针特殊情况的判断

```java
//单指针
class Solution {
    public ListNode deleteNode(ListNode head, int val) {
        if (head == null) return null;
        if (head.val == val) return head.next;
        ListNode cur = head;
        while (cur.next != null && cur.next.val != val)
            cur = cur.next;
        if (cur.next != null)
            cur.next = cur.next.next;
        return head;
    }
}
```

```java
//双指针
class Solution {
    public ListNode deleteNode(ListNode head, int val) {
        if(head.val == val) return head.next;
        ListNode pre = head, cur = head.next;
        while(cur != null && cur.val != val) {
            pre = cur;
            cur = cur.next;
        }
        if(cur != null) pre.next = cur.next;
        return head;
    }
}
```

```java
//哨兵结点
class Solution {
    public ListNode deleteNode(ListNode head, int val) {
        // 哨兵节点：head节点的前一个节点
        ListNode pre = new ListNode();
        pre.next = head;
        // 返回结果节点的前一个节点
        ListNode preResult = pre;
        while (head != null) {
            if (head.val == val) {
                pre.next = head.next;
                break; // 找到删除节点后跳出循环
            }
            pre = head;
            head = head.next;
        }
        return preResult.next;
    }
}
```



#### 链表中倒数第k个结点（剑指offer 22）

输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。例如，一个链表有6个节点，从头节点开始，它们的值依次是1、2、3、4、5、6。这个链表的倒数第3个节点是值为4的节点。

- 本题大可遍历链表获取其长度，再直接定位到倒数第k个结点。但是太低端
- 使用双指针的方法。先将两个指针都指向头结点head，令指针1向前走k个结点；此时令两个指针同时向前走，当指针1判断为null时，指针2所在结点就是倒数第k个结点

![](D:\blogImage\924c58447a25fdfa664dba9649d83e2e0b41a7136238696bfb24a363cbc68bb2-Picture7.png)

```java
class Solution {
    public ListNode getKthFromEnd(ListNode head, int k) {
        ListNode former = head, latter = head;
        for(int i = 0; i < k; i++)
            former = former.next;
        while(former != null) {
            former = former.next;
            latter = latter.next;
        }
        return latter;
    }
}
```



#### 反转链表（剑指offer 24）

定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

- 此题有两种方法，迭代和递归
  - 双指针迭代：设置`res和cur`两个指针，分别指向null和头结点，用来存储新链表和指向当前结点，在迭代的时候将结点一个个摘出来并作为新链表的头结点
  - 递归：先递归到链表的尾结点，将尾结点作为头结点，不断回溯并将前一个结点接在后边

双指针迭代：

![双指针流程图](D:\blogImage\1604779288-jExDGV-Picture3.png)

```java
//双指针
class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null)	return null;
        ListNode res = null, cur = head, temp;
        while(cur != null){
            temp = cur.next;
            cur.next = res;
            res = cur;	//因为此时cur才是新链表的头结点，这行代码就是将头结点给res
            cur = temp;	
        }
        return res;
    }
}
```

递归

![](D:\blogImage\dacd1bf55dec5c8b38d0904f26e472e2024fc8bee4ea46e3aa676f340ba1eb9d-递归.gif)

```java
class Solution {
	public ListNode reverseList(ListNode head) {
		//递归终止条件是当前为空，或者下一个节点为空
		if(head==null || head.next==null) {
			return head;
		}
		//这里的cur就是最后一个节点,新链表的头结点
		ListNode cur = reverseList(head.next);
		//如果链表是 1->2->3->4->5，那么此时的cur就是5
		//而head是4，head的下一个是5，下下一个是空
		//所以head.next.next 就是5->4
		head.next.next = head;
		//防止链表循环，需要将head.next设置为空
		head.next = null;
		//每层递归函数都返回cur，也就是最后一个节点
		return cur;
	}
}
```



#### 合并两个排序的链表（剑指offer 25）

输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。

- 通过`while`循环或者递归实现就行了

```java
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if (l1 == null)	return l2;
        if (l2 == null) return l1;
        if (l1 == null && l2 == null)	return null;

        ListNode head = null;
        if (l1.val < l2.val) {
            head = l1;
            head.next = mergeTwoLists(l1.next, l2);
        } else {
            head = l2;
            head.next = mergeTwoLists(l1, l2.next);
        }
        return head;
    }
}
```







# 字符串

#### 表示数值的字符串 （剑指offer 20）

请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。例如，字符串"+100"、"5e2"、"-123"、"3.1416"、"-1E-16"、"0123"都表示数值，但"12e"、"1a3.14"、"1.2.3"、"+-5"及"12e+5.4"都不是。

- 该问题即是对字符串规律的总结，可以使用**有限状态自动机**（可以参考[博客中文章](https://suelcun.xyz/blogs/Algorithms/String/%E6%9C%89%E9%99%90%E8%87%AA%E5%8A%A8%E7%8A%B6%E6%80%81%E6%9C%BA.html)）
- 规律总结：
  1. 字符串首尾可能为空格
  2. `.`出现的情况：只能出现一次，并且在`e`之前
  3. `e`出现的情况：只能出现一次，并且在数字之后
  4. `+ 或 -`出现的情况：在首尾或`e`之后的以为

```java
//对字符串逐个进行判断
class Solution {
    public boolean isNumber(String s) {
        if (s == null || s.length() == 0){
            return false;
        }
        s = s.trim();//去除首位空格
        boolean numFlag = false;
        boolean dotFlag = false;
        boolean eFlag = false;
        for (int i = 0; i < s.length(); i++){
            if (s.charAt(i) >= '0' && s.charAt(i) <= '9'){
                numFlag = true;
            }else if (s.charAt(i) == '.' && !dotFlag && !eFlag){
                dotFlag = true;
            }else if ((s.charAt(i) == 'e' || s.charAt(i) == 'E') && !eFlag && numFlag){
                eFlag = true;
                numFlag = false;//将数字的标志位置为false，避免发生123e这种非法请求
            }else if ((s.charAt(i) == '+' || s.charAt(i) == '-') && ((i == 0) || s.charAt(i-1) == 'e' || s.charAt(i-1) == 'E')){
                numFlag = false;
            }else{
                return false;
            }
        }
        return numFlag;//最后一位一定是数字
    }
}
```

```java
//使用有限状态自动机
class Solution {
    public boolean isNumber(String s) {
        Map[] states = {
            new HashMap<>() {{ put(' ', 0); put('s', 1); put('d', 2); put('.', 4); }}, // 0.
            new HashMap<>() {{ put('d', 2); put('.', 4); }},                           // 1.
            new HashMap<>() {{ put('d', 2); put('.', 3); put('e', 5); put(' ', 8); }}, // 2.
            new HashMap<>() {{ put('d', 3); put('e', 5); put(' ', 8); }},              // 3.
            new HashMap<>() {{ put('d', 3); }},                                        // 4.
            new HashMap<>() {{ put('s', 6); put('d', 7); }},                           // 5.
            new HashMap<>() {{ put('d', 7); }},                                        // 6.
            new HashMap<>() {{ put('d', 7); put(' ', 8); }},                           // 7.
            new HashMap<>() {{ put(' ', 8); }}                                         // 8.
        };
        //使用Map存储状态转移表。
        //HashMap中k为行动，v为状态，执行k则转换为v状态。后边的数字表示初始状态，如0执行s，则状态变为1
        
        int p = 0; //初始化状态
        char t;
        for(char c : s.toCharArray()) {
            if(c >= '0' && c <= '9') t = 'd';
            else if(c == '+' || c == '-') t = 's';
            else if(c == 'e' || c == 'E') t = 'e';
            else if(c == '.' || c == ' ') t = c;
            else t = '?';
            if(!states[p].containsKey(t)) return false;
            p = (int)states[p].get(t);
        }
        return p == 2 || p == 3 || p == 7 || p == 8;
    }
}
```

