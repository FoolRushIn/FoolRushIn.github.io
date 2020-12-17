---
title: 存储过程(plsql+oracle)
date: 2020-12-6
sidebar: 'auto'
categories:
 - 数据库
tags:
 - 数据库
 - plsql
---

## PLSQL

### 基本使用

Procedure Language/SQL，是Oracle对sql语言的过程化扩展。在SQL命令语句中增加了过程处理语句（如分支，循环），使SQL语言具有过程处理能力

```plsql
-- Created on 2020/12/6 by JESUS 
declare 
  -- Local variables here 申明变量的地方，变量名称在前，变量类型在后
  i integer := 1;  --赋值方法 :=
begin
  -- Test statements here 执行sql语句的地方
  dbms_output.put_line(); -- 输出语句，相当于system.out.println();
end;
```

![](https://i.loli.net/2020/12/06/DhnIpvixRuws3kB.png)

在`sqlplus`或者`cmd`中执行`sql`语句，最后需要用一个`/`来表示结束。但是可见并没有输出结果。

![](https://i.loli.net/2020/12/06/sofc3rQCMOVb5Ij.png)

添加了命令`set serveroutput on`，来显示输出结果

### 变量

变量类型申明：`变量名 变量类型（变量长度）  例如：  v_name varchar2(20)`

#### 普通变量

如`char, varchar2, date, number, boolean, long`。

- 值得注意的是，在`Oracle`中，使用了`varchar2`代替`varchar`
- 目前`VARCHAR是VARCHAR2`的同义词。工业标准的`VARCHAR`类型可以存储空字符串，但是`oracle`不这样做，尽管它保留以后这样做的权利。Oracle自己开发了一个数据类型VARCHAR2，这个类型不是一个标准的`VARCHAR`，它将在数据库中`varchar`列可以存储空字符串的特性改为存储`NULL`值。如果你想有向后兼容的能力，Oracle建议使用`VARCHAR2`而不是`VARCHAR`。

赋值语句:

```plsql
variable := expression ;
--其中variable 是一个PL/SQL变量, expression 是一个PL/SQL 表达式

--直接赋值
var_name varchar2(20) := '张三';

--语句赋值
var_name varchar2(20) ;
select num1 into var_name form table01 where ...; -- 将查询结果into到变量中
```



#### 引用型变量

变量类型和长度取决于表中字段的类型和长度

```plsql
       变量名      引用的表.表中字段%TYPE
例如：  var_name   stu.sid%TYPE;
```



#### 记录型变量

接收表中的一整行记录，想当于Java的一个对象

```plsql
       变量名       表名%ROWTYPE
例如：  var_name    stu%ROWTYPE
```

```plsql
-- Created on 2020/12/6 by JESUS 
declare 
  res stu%ROWTYPE;
begin
  SELECT * INTO res FROM stu WHERE s_id = 1;--查询一行的记录
  dbms_output.put_line('学生id:' || res.s_id || ', 学生名字:' || res.sname);
  --注意：||符号相当于用+拼接
end;
```

 

### 流程控制

#### 条件分支

```plsql
BEGIN
  IF 条件1 THEN
    执行语句1;
  ELSIF 条件2 THEN   -- 注意是elsif ， 不是elseif
    执行语句2;
  ELSE
    执行语句3;
  END IF;
END;
```



#### 循环语句

Oracle中有三种循环方式

1. ORACLE中的GOTO用法

```plsql
DECLARE
  x number;
BEGIN
  x := 9;
  <<repeat_loop>> --循环点
  x := x - 1;
  DBMS_OUTPUT.PUT_LINE(X);
  IF X > 0 THEN
    GOTO repeat_loop; --当x的值大与0时,就goto到repeat_loop
  END IF;
END;
```

2. ORACLE中的FOR循环用法

```plsql
DECLARE
  X number; --声明变量
BEGIN
  x := 1; --给初值
  FOR X IN REVERSE 1 .. 10 LOOP   --reverse由大到小，若是正序排列，则去掉reverse
    DBMS_OUTPUT.PUT_LINE('内:x=' || x);
  END LOOP;
  DBMS_OUTPUT.PUT_LINE('end loop:x=' || X); --x=1
END;

打印结果：
内:x=10
内:x=9
内:x=8
内:x=7
内:x=6
内:x=5
内:x=4
内:x=3
内:x=2
内:x=1
end loop:x=1
```

3. Oracle中while循环用法

```plsql
DECLARE
  x number;
BEGIN
  x := 0;
  WHILE x < 9 LOOP
    x := x + 1;
    DBMS_OUTPUT.PUT_LINE('内:x=' || x);
  END LOOP;
  DBMS_OUTPUT.PUT_LINE('外:x=' || x);
END;
```

4. Oracle中LOOP循环用法

```plsql
DECLARE
  X NUMBER;
BEGIN
  X := 0;
  LOOP
    X := X + 1;
  
    EXIT WHEN X > 9; -- 出循环
    DBMS_OUTPUT.PUT_LINE('内:x=' || X);
  END LOOP;
  DBMS_OUTPUT.PUT_LINE('外:x=' || X);
END;
```

### 游标

用于临时存储一个查询返回的多行数据

游标的使用方式：申明 -- 打开 -- 读取 -- 关闭

游标的属性：

- %ROWTYPE：获得FETCH语句返回的数据行数，返回整形
- %FOUND：最近的FETCH语句返回为真，否则为假
- %NOTFOUND
- %ISOPEN：游标打开

```plsql
-- Created on 2020/12/6 by JESUS 
DECLARE

  CURSOR RES IS
    SELECT S_ID, SDES FROM STU;
  -- 申明游标并赋值
  R_NAME STU.SNAME%TYPE;
  R_DESC STU.SDES%TYPE;
BEGIN

  OPEN RES; -- 打开
  LOOP
    FETCH RES
      INTO R_NAME, R_DESC; -- 通过FRTCH语句获取游标中的值并赋值给变量
    EXIT WHEN RES%NOTFOUND; -- 退出LOOP循环
    DBMS_OUTPUT.PUT_LINE(R_NAME || R_DESC);
  END LOOP;
  CLOSE RES; -- 关闭

END;
```

带参数的游标

```plsql
-- Created on 2020/12/6 by JESUS 
DECLARE
  CURSOR RES(rid stu.s_id%TYPE) IS
    SELECT S_ID, SDES FROM STU WHERE s_id = rid; 
  -- 在建立游标的时候带上形式参数并以此作为判断where
  R_NAME STU.SNAME%TYPE;
  R_DESC STU.SDES%TYPE;
BEGIN
  OPEN RES(3); -- 打开游标的时候传入参数
  LOOP
    FETCH RES
      INTO R_NAME, R_DESC;
    EXIT WHEN RES%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE(R_NAME || R_DESC);
  END LOOP;
  CLOSE RES;

END;
```

### 存储过程

- Procedure文件内容

```plsql
CREATE OR REPLACE PROCEDURE P_TEST(NUM1 IN STU.S_ID%TYPE,
                                   DES  OUT STU.MONEY%TYPE) IS
-- 建立存储过程并带上传入参数和传出参数，分别用 IN 和 OUT 表示
BEGIN
  SELECT MONEY INTO DES FROM STU WHERE S_ID = NUM1;
  -- 将查询出的结果赋值给传出参数DES
END P_TEST;
```

- 调用
  - 就在plsql中调用：`使用存储过程名调用即可，如： p_test(1，res)`
  - 在Java代码中调用:

```java
public class test {
    public static void main(String[] args) throws Exception {

        Class.forName("oracle.jdbc.driver.OracleDriver"); //获取驱动
        String url = "jdbc:oracle:thin:@localhost:1521:DEMO";
        String user_name = "system";
        String pwd = "sue";
        Connection conn = DriverManager.getConnection(url, user_name, pwd);
        
        String sql = "{call p_test(?, ?)}";//调用存储过程的方法
        
        CallableStatement stmt = conn.prepareCall(sql);// 使用CallableStatement
        stmt.setInt(1, 2); // 根据下标或者变量名来set值
        stmt.registerOutParameter(2, OracleTypes.TINYINT);//注册输出变量,注意Oracle中数据类型与Java数据类型的对应
        stmt.execute();
        System.out.println(stmt.getInt(2));
        stmt.close();
        conn.close();
    }
}
```



