---
title: MyBatis
sidebar: 'auto'
categories:
 - Java
tags:
 - Java
---


![](https://i.loli.net/2020/11/18/zeMZucSm5vby9jl.png)

**MyBatis 可以简化 JDBC 操作, 实现数据的持久化, 使用 ORM 思想实现了结果集的封装**

![](https://i.loli.net/2020/11/18/Dkvu8lAz4bTXLaI.png)

![](https://i.loli.net/2020/11/18/REgZcjwOeIivXht.png)

MyBatis 是一款优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射。MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。MyBatis 可以使用简单的 **XML 或注解**来配置和映射原生信息，将接口和 Java 的 POJOs(Plain Ordinary Java Object,普通的 Java对象)映射成数据库中的记录。

**ORM:**

Object relational Mapping , 对象关系映射, 把数据库表和实体类的属性对应起来, **操作实体类即可以实现操作数据库表**

![](https://i.loli.net/2020/11/18/SkLhFqBJZwmO1At.png)

mybatis规定:

- 输入参数和输出参数在形式上只能有一个, 可以写为数组
- 如果输入/输出参数是**简单类型**(8个基本类型 + String), 可以使用任何占位符, #{ xxxx }如果是对象类型(费简单类型), 则必须是对象的属性 #{ 属性名 }
- 返回值不论是一个还是多个, 在 resultType 中只需要写一个类型

简介: 

mybatis 用的是 JavaScript 中输入参数和输出参数在形式上只能有一个, 可以写为数组

如果数组或者输出是简单参数, 8个基本类型, 和 String 类型 可以使用任何占位符

**在mybatis中，映射文件中的namespace是用于绑定Dao接口的，即面向接口编程。当你的namespace绑定接口后，你可以不用写接口实现类，mybatis会通过该绑定自动帮你找到对应要执行的SQL语句**

[**https://www.cnblogs.com/xdp-gacl/p/4262895.html**](https://www.cnblogs.com/xdp-gacl/p/4262895.html) **使用mybatis对表实现CRUD操作( 基于xml和注解的方式 )**

1. 使用 xml 方式

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd"> 
<!-- 为这个mapper指定一个唯一的namespace，namespace的值习惯上设置成包名+sql映射文件名，这样就能够保证namespace的值是唯一的 例如namespace="me.gacl.mapping.userMapper"就是me.gacl.mapping(包名)+userMapper(userMapper.xml文件去除后缀) 
--> 
<mapper namespace="me.gacl.mapping.userMapper">    
    <!-- 在select标签中编写查询的SQL语句， 设置select标签的id属性为getUser，id属性值必须是唯一的，不能够重复    
	使用parameterType属性指明查询时使用的参数类型，resultType属性指明查询返回的结果集类型    
	resultType="me.gacl.domain.User"就表示将查询结果封装成一个User类的对象返回    User类就是users表所对应的实体类    
	-->    
    <!-- 根据id查询得到一个user对象-->    
    <select id="getUser" parameterType="int"         
            resultType="me.gacl.domain.User">        
        select * from users where id=#{id}    
    </select>        
    <!-- 创建用户(Create) -->    
    <insert id="addUser" parameterType="me.gacl.domain.User">        
        insert into users(name,age) values(#{name},#{age})    
    </insert>        
    <!-- 删除用户(Remove) -->    
    <delete id="deleteUser" parameterType="int">        
        delete from users where id=#{id}    
    </delete>       
    <!-- 修改用户(Update) -->    
    <update id="updateUser" parameterType="me.gacl.domain.User">       
        update users set name=#{name},age=#{age} where id=#{id}    
    </update>        
    <!-- 查询全部用户-->    
    <select id="getAllUsers" resultType="me.gacl.domain.User">       
        select * from users    
    </select>    
</mapper>
```

2. 使用 注解的方式

```java
/** * @author gacl * 定义sql映射的接口，使用注解指明方法要执行的SQL */ 
public interface UserMapperI {     
    //使用@Insert注解指明add方法要执行的SQL    
    @Insert("insert into users(name, age) values(#{name}, #{age})")    
    public int add(User user);        
    //使用@Delete注解指明deleteById方法要执行的SQL    
    @Delete("delete from users where id=#{id}")    
    public int deleteById(int id);        
    //使用@Update注解指明update方法要执行的SQL    
    @Update("update users set name=#{name},age=#{age} where id=#{id}")   
    public int update(User user);        
    //使用@Select注解指明getById方法要执行的SQL   
    @Select("select * from users where id=#{id}")    
    public User getById(int id);        
    //使用@Select注解指明getAll方法要执行的SQL   
    @Select("select * from users")   
    public List<User> getAll(); }
```

**需要说明的是，我们不需要针对UserMapperI接口去编写具体的实现类代码，这个具体的实现类由MyBatis帮我们动态构建出来，我们只需要直接拿来使用即可。**

并且在conf.xml中注册这个映射接口

```xml
<?xml version="1.0" encoding="UTF-8"?> 
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd"> <configuration>     
    <environments default="development">         
        <environment id="development">             
            <transactionManager type="JDBC" />             
            <!-- 配置数据库连接信息 -->             
            <dataSource type="POOLED">                 
                <property name="driver" value="com.mysql.jdbc.Driver" />                 
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis" />                 
                <property name="username" value="root" />                 
                <property name="password" value="XDP" />             
            </dataSource>        
        </environment>     
    </environments>          
    <mappers>         
        <!-- 注册userMapper.xml文件 userMapper.xml位于me.gacl.mapping这个包下，所以resource写成			me/gacl/mapping/userMapper.xml-->         
        <mapper resource="me/gacl/mapping/userMapper.xml"/>        
        <!-- 注册UserMapper映射接口-->         
        <mapper class="me.gacl.mapping.UserMapperI"/>    
    </mappers>     
</configuration>
```

**优化mybatis配置文件中的配置:**

一、连接数据库的配置单独放在一个properties文件中

二、为实体类定义别名，简化sql映射xml文件中的引用

　在conf.xml文件中<configuration></configuration>标签中添加如下配置：

```xml
<typeAliases>    <typeAlias type="me.gacl.domain.User" alias="_User"/> </typeAliases>
```

也可以使用如下的方式批量为某个包下的所有实体类设置别名

```xml
<!-- 配置实体类的别名，配置实体类别名的目的是为了在引用实体类时可以使用实体类的别名来代替实体类，达到简写的目的 -->    <typeAliases>       
    <!-- 为实体类me.gacl.domain.User配置一个别名_User -->       
    <!-- <typeAlias type="me.gacl.domain.User" alias="_User"/> -->       
    <!-- 为me.gacl.domain包下的所有实体类配置别名，MyBatis默认的设置别名的方式就是去除类所在的包后的简单的类名       
 比如me.gacl.domain.User这个实体类的别名就会被设置成User -->      
    <package name="me.gacl.domain"/>  
</typeAliases>
```

**解决字段名与实体类属性名不相同的冲突:**

解决办法一: 
通过在查询的sql语句中定义字段名的别名，让字段名的别名和实体类的属性名一致，这样就可以表的字段名和实体类的属性名一一对应上了，这种方式是通过在sql语句中定义别名来解决字段名和属性名的映射关系的。

解决办法二: 
通过resultMap来映射字段名和实体类属性名的一一对应关系。这种方式是使用MyBatis提供的解决方式来解决字段名和属性名的映射关系的。

其中 order_id 为表中的字段, id 为实体类中的属性名

```xml
<?xml version="1.0" encoding="UTF-8" ?> 
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd"> 
<!-- 为这个mapper指定一个唯一的namespace，namespace的值习惯上设置成包名+sql映射文件名，这样就能够保证namespace的值是唯一的 例如namespace="me.gacl.mapping.orderMapper"就是me.gacl.mapping(包名)+orderMapper(orderMapper.xml文件去除后缀)  --> <mapper namespace="me.gacl.mapping.orderMapper">        
    方法一:     
    <!--          
	根据id查询得到一个order对象，使用这个查询是可以正常查询到我们想要的结果的，         
	这是因为我们将查询的字段名都起一个和实体类属性名相同的别名，这样实体类的属性名和查询结果中的字段名就可以一一对应上     
 	-->    
    <select id="selectOrder" parameterType="int"        
            resultType="me.gacl.domain.Order">    
        select order_id id, order_no orderNo,order_price price from orders where order_id=#{id}    
    </select>        
    方法二:  
    <!--  
    根据id查询得到一个order对象，使用这个查询是可以正常查询到我们想要的结果的，  
   这是因为我们通过<resultMap>映射实体类属性名和表的字段名一一对应关系 -->  
    <select id="selectOrderResultMap" parameterType="int" resultMap="orderResultMap">    
        select * from orders where order_id=#{id}   
    </select>   
    <!--通过<resultMap>映射实体类属性名和表的字段名对应关系 -->   
    <resultMap type="me.gacl.domain.Order" id="orderResultMap">     
        <!-- 用id属性来映射主键字段 -->    
        <id property="id" column="order_id"/>    
        <!-- 用result属性来映射非主键字段 -->     
        <result property="orderNo" column="order_no"/>     
        <result property="price" column="order_price"/>  
    </resultMap>   
</mapper>
```

*上述用到了设置别名

注意: 为字段名,AS关键字可以省略不写

**同时: 使用第二种方法时, 需要****在conf.xml文件中注册orderMapper.xml映射文件**

```xml
<mappers>                
    <!-- 注册orderMapper.xml文件，   
      orderMapper.xml位于me.gacl.mapping这个包下，所以resource写成me/gacl/mapping/orderMapper.xml-->    
    <mapper resource="me/gacl/mapping/orderMapper.xml"/> 
</mappers>
```

**实现关联表查询:** 

![](https://i.loli.net/2020/11/18/l7I1NMdtwrUseXi.png)

其中 class 表对应的实体类中, 定义一个 teacher 属性

```java
/**      
* class表中有一个teacher_id字段，所以在Classes类中定义一个teacher属性，     
* 用于维护teacher和class之间的一对一关系，通过这个teacher属性就可以知道这个班级是由哪个老师负责的    
*/     
private Teacher teacher;
```

MyBatis中使用association标签来解决一对一的关联查询，association标签可用的属性如下：

- property:对象属性的名称
- javaType:对象属性的类型
- column:所对应的外键字段名称
- select:使用另一个查询封装的结果

```xml
<select id="getClass2" parameterType="int" resultMap="ClassResultMap2">      
    select * from class where c_id=#{id}    
</select>   
<!-- 使用resultMap映射实体类和字段之间的一一对应关系 -->    
<resultMap type="me.gacl.domain.Classes" id="ClassResultMap2">      
    <id property="id" column="c_id"/>    
    <result property="name" column="c_name"/>    
    <association property="teacher" column="teacher_id" select="getTeacher"/> 
</resultMap>         
<select id="getTeacher" parameterType="int" resultType="me.gacl.domain.Teacher">      
    select t_id id, t_name name from teacher where t_id=#{id}   
</select>
```

一对多:

```xml
<!--        
  根据classId查询对应的班级信息,包括学生,老师   
   -->   
<!-- 
     方式一: 嵌套结果: 使用嵌套结果映射来处理重复的联合结果的子集   
	SELECT * FROM class c, teacher t,student s WHERE c.teacher_id=t.t_id AND c.C_id=s.class_id AND  c.c_id=1   
-->   
<select id="getClass3" parameterType="int" resultMap="ClassResultMap3">     
    select * from class c, teacher t,student s where c.teacher_id=t.t_id and c.C_id=s.class_id and  c.c_id=#{id}     </select>   
<resultMap type="me.gacl.domain.Classes" id="ClassResultMap3">   
    <id property="id" column="c_id"/>   
    <result property="name" column="c_name"/>     
    <association property="teacher" column="teacher_id" javaType="me.gacl.domain.Teacher">       
        <id property="id" column="t_id"/>      
        <result property="name" column="t_name"/>     
    </association>         <!-- ofType指定students集合中的对象类型 -->      
    <collection property="students" ofType="me.gacl.domain.Student">   
        <id property="id" column="s_id"/>         
        <result property="name" column="s_name"/>    
    </collection>   
</resultMap>  
<!--   
       方式二：嵌套查询：通过执行另外一个SQL映射语句来返回预期的复杂类型    
         SELECT * FROM class WHERE c_id=1;       
      SELECT * FROM teacher WHERE t_id=1   //1 是上一个查询得到的teacher_id的值   
          SELECT * FROM student WHERE class_id=1  //1是第一个查询得到的c_id字段的值   
   -->    
<select id="getClass4" parameterType="int" resultMap="ClassResultMap4">  
    select * from class where c_id=#{id}    
</select> 
<resultMap type="me.gacl.domain.Classes" id="ClassResultMap4">    
    <id property="id" column="c_id"/>    
    <result property="name" column="c_name"/>     
    <association property="teacher" column="teacher_id" javaType="me.gacl.domain.Teacher" select="getTeacher2">
    </association>     
    <collection property="students" ofType="me.gacl.domain.Student" column="c_id" select="getStudent">
    </collection>    
</resultMap>       
<select id="getTeacher2" parameterType="int" resultType="me.gacl.domain.Teacher">  
    SELECT t_id id, t_name name FROM teacher WHERE t_id=#{id}     
</select>        
<select id="getStudent" parameterType="int" resultType="me.gacl.domain.Student">     
    SELECT s_id id, s_name name FROM student WHERE class_id=#{id}      
</select>
```

　**MyBatis中使用collection标签来解决一对多的关联查询，ofType属性指定集合中元素的对象类型。**

**调用存储过程:**https://blog.csdn.net/dwenxue/article/details/82257944

(存储过程是一个预编译的SQL语句，优点是允许模块化的设计，就是说只需创建一次，以后在该程序中就可以调用多次。如果某次操作需要执行多次SQL，使用存储过程比单纯SQL语句执行要快。可以用一个命令对象来调用存储过程。)

```sql
create table p_user(    
    id int primary key auto_increment,      
    name varchar(10),  
    sex char(2)
); 
    insert into p_user(name,sex) values('A',"男");  
    insert into p_user(name,sex) values('B',"女");  
    insert into p_user(name,sex) values('C',"男");   
-- 创建存储过程(查询得到男性或女性的数量, 如果传入的是0就女性否则是男性) 
DELIMITER $ 
CREATE PROCEDURE mybatis.ges_user_count(IN sex_id INT, OUT user_count INT) 
BEGIN 
IF sex_id=0 THEN 
SELECT COUNT(*) FROM mybatis.p_user WHERE p_user.sex='女' INTO user_count; 
ELSE 
SELECT COUNT(*) FROM mybatis.p_user WHERE p_user.sex='男' INTO user_count; 
END IF; 
END  
$ 
DELIMITER ; 
<!---  
	-- 调用存储过程    SET user_count = 0;    CALL mybatis.ges_user_count(1, user_count);    SELECT user_count; 
-->    
```

*** DELIMITER:**

**判断命令结束的符号, 默认为分号 " ; ", 在使用 DELIMITER 定义后, 需要重新定义为默认值**

```xml
在xml文件中添加配置项 
<!--    
     查询得到男性或女性的数量, 如果传入的是0就女性否则是男性  
   -->  
<select id="getUserCount" parameterMap="getUserCountMap" statementType="CALLABLE">    
    CALL mybatis.ges_user_count(?,?) 
</select>   
<!--  
      parameterMap.put("sexid", 0);    
    parameterMap.put("usercount", -1);    
 -->   
<parameterMap type="java.util.Map" id="getUserCountMap">     
    <parameter property="sexid" mode="IN" jdbcType="INTEGER"/>    
    <parameter property="usercount" mode="OUT" jdbcType="INTEGER"/>    
</parameterMap>
```

**mybatis缓存:**https://mybatis.org/mybatis-3/zh/dynamic-sql.html

正如大多数持久层框架一样，MyBatis 同样提供了**一级缓存**和**二级缓存**的支持

- **一级缓存**: 基于PerpetualCache 的 HashMap本地缓存，其**存储作用域为** **Session**，当 **Session flush 或 close** 之后，该**Session中的所有 Cache 就将清空**。
- **二级缓存**与一级缓存其机制相同，默认也是采用 PerpetualCache，HashMap存储，不同在于其**存储作用域为 Mapper(Namespace)**，并且**可自定义存储源**，如 Ehcache。
- 对于缓存数据更新机制，当某一个作用域(一级缓存Session/二级缓存Namespaces)的进行了 C/U/D 操作后，默认该作用域下所有 select 中的缓存将被clear。

![](https://i.loli.net/2020/11/18/ZeRvJrL8E59VnfH.png)

**动态SQL:**

动态 SQL 是 MyBatis 的强大特性之一。如果你使用过 JDBC 或其它类似的框架，你应该能理解根据不同条件拼接 SQL 语句有多痛苦，例如拼接时要确保不能忘记添加必要的空格，还要注意去掉列表最后一个列名的逗号。利用动态 SQL，可以彻底摆脱这种痛苦。

- if
- choose (when, otherwise)
- trim (where, set)
- foreach

```xml
<select id="findActiveBlogLike"     
        resultType="Blog">  SELECT * FROM BLOG WHERE state = ‘ACTIVE’ 
    <if test="title != null">   
        AND title like #{title} 
    </if>
    <if test="author != null and author.name != null">  
        AND author_name like #{author.name} 
    </if> 
</select>         
通过两个条件删选
```

```xml
<select id="findActiveBlogLike"  
        resultType="Blog"> 
    SELECT * FROM BLOG WHERE state = ‘ACTIVE’  <choose>  
    <when test="title != null">      AND title like #{title}   
    </when>   
    <when test="author != null and author.name != null">   
        AND author_name like #{author.name}
    </when>  
    <otherwise> 
    AND featured = 1 
    </otherwise> 
    </choose> 
</select>            多个条件中选择一个使用
```

```xml
<select id="findActiveBlogLike"
     resultType="Blog">
  SELECT * FROM BLOG
  <where>
    <if test="state != null">
         state = #{state}
    </if>
    <if test="title != null">
        AND title like #{title}
    </if>
    <if test="author != null and author.name != null">
        AND author_name like #{author.name}
    </if>
  </where>
</select>
```

where 元素只会在子元素返回任何内容的情况下才插入 “WHERE” 子句。而且，若子句的开头为 “AND” 或 “OR”，*where* 元素也会将它们去除。



```xml
<update id="updateAuthorIfNecessary"> 
    update Author  
    <set>    
        <if test="username != null">username=#{username},</if>   
        <if test="password != null">password=#{password},</if>   
        <if test="email != null">email=#{email},</if>  
        <if test="bio != null">bio=#{bio}</if>  
    </set> 
    where id=#{id} 
</update>
```

*用于动态更新语句的类似解决方案叫做 *set*。*set* 元素可以用于动态包含需要更新的列，忽略其它不更新的列

```xml
<select id="selectPostIn" resultType="domain.blog.Post">  
    SELECT * 
    FROM POST P  
    WHERE ID in  
    <foreach item="item" index="index" collection="list"    
             open="(" separator="," close=")">      
        #{item} 
    </foreach> 
</select>
```

*对集合进行遍历（尤其是在构建 IN 条件语句的时候）