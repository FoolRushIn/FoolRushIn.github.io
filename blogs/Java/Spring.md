---
title: Spring
sidebar: 'auto'
categories:
 - Java
tags:
 - Java
---

**IOC: 控制反转 ( DI: 依赖注入 )**

https://www.cnblogs.com/jichi/p/10165538.html

将一个普通的类变成有特定功能的类: 

1. 继承类
2. 实现接口
3. 注解
4. 配置

**SpringIOC容器:**	

1. 创建对象
2. 给对象的属性赋值

![](https://i.loli.net/2020/11/18/tWcimPz6CELAU3q.png)

**总结:** 

IOC/DI 无论需要什么对象, 都可以直接去 Springioc 容器中获取, 而不需要自己操作( new / setXxx())

因此之后的IOC分为2步: 

1. 先给 springioc 中存放对象并赋值
2.  拿取对象

**SpringIoc容器初始化:**	

**1. 将IOC容器中所有的 bean 实例化为对象**

**2. 将各个 bean 依赖的属性值注入**

**(两种程序中IOC容器初始化的区别,** 

**造成的原因是Java程序有统一的入口main,只需要在main中通过语句初始化一次就行,而web程序没有统一的入口)**

**Java程序中:** 	

**通过new ClassPathXmlApplicationContext("applicationContext.xml") 将IOC容器初始化**

**JavaWeb程序中:** 

**tomcat启动时, 通过监听器将 IOC 容器初始化**

**通过注解的方式将bean以及相应值放入IOC容器中:**

https://blog.csdn.net/qq_41885819/article/details/95360777

1. **在applicationContext.xml中配置扫描器，多个包名之间以逗号隔开**
2. **在类名上方添加@Component("类id")**

**spring中的工厂BeanFactory与ApplicationContext的区别**

1. BeanFactory
   1. spring原始接口，功能较为单一，在从容器中获得对象的时候才会创建对象。
2. ApplicationContext
   1. 每次启动容器的时候，初始化容器中的所有对象并提供更多功能。其中的实现类ClassPathXmlApplicationContext是加载类路径下的spring配置文件，FileSystemXmlApplicationContext是加载本地磁盘下spring的配置文件。

![](https://i.loli.net/2020/11/18/urkEWaKg9lnNsfU.png)

**IOC容器赋值:** 

**如果是简单类型( 8个基本类型 + String ), 使用 value; 如果是对象类型, 使用 ref = " 需要引用的 id 值 "**

**依赖注入的3种方式:** 

- set 注入:	

  - 通过setXxx()赋值, 赋值默认使用的是set()方法;底层通过反射实现
  - <property...>

- 构造器注入:	

  - 通过构造方法赋值
  - <constructor-arg...>
  - 如果<constructor-arg...>的顺序与构造方法参数的顺序不一致, 则需要通过type或者index		  或者name指定

- p命名空间注入

  - xmlns:p="http://www.springframework.org/schema/p"
  - `<bean name="user" class="com.jichi.entity.User" p:name="小白" p:age="10"></bean>`

- 自动装配:

  - 只适用于 ref 类型(引用类型)
  - 约定优于配置

**注意:** 

- **无论是String还是int/short.long, 在赋值时都是 value = "值", 建议配合type进行区分**
- **在IOC中定义bean的前提: 该bean的类 必须提供了无参构造**

**value属性和<value>注入方式的区别:**	

![](https://i.loli.net/2020/11/18/1e9vX8NVcOiW2U4.png)

**使用注解实现事务(声名式事务)**https://blog.csdn.net/jiadajing267/article/details/81056057

1. 导入相关jar包
2. 使用xml配置事务

```xml
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">      
    <property name="dataSource" ref="dataSource" />
</bean>
```



1. 用注解 @Transactional 声明式管理事务

## **AOP: 面向切面编程**

![](https://i.loli.net/2020/11/18/WedJHXz6nNK3i7U.png)

**1. 通过xml配置方式实现AOP**

```xml
<bean name = "userDaoImpl" class="com.jichi.aop.UserDaoImpl"></bean>  
<bean name="userAdvice" class="com.jichi.aop.UserAdvice"></bean>   
<aop:config>      
    <aop:pointcut expression="execution(* com.jichi.aop..UserDaoImpl.*(..))" id="pc"/>  
    <aop:aspect ref="userAdvice">       
    <aop:before method="before" pointcut-ref="pc"/>      
        <aop:after-returning method="afterReturning" pointcut-ref="pc"/>      
        <aop:around method="around" pointcut-ref="pc"/>        
        <aop:after-throwing method="afterThrowException" pointcut-ref="pc"/>      
        <aop:after method="after" pointcut-ref="pc"/>     
    </aop:aspect>  
</aop:config>
```

![](https://i.loli.net/2020/11/18/DFEd1eYLKoUiOPt.png)

![](https://i.loli.net/2020/11/18/mT37Osnkld1B48q.png)

**2. 通过注解方式实现AOP**

```java
@Aspect       
//表明是AOP通知类
public class UserAdvice{  
    @Before("execution(* com.jichi.aop..UserDaoImpl.*(..))")  
    //给方法加@before, 该方法就是前置方法了 
    public void before(){   
        System.out.println("前置通知");    }     
    @AfterReturning("execution(* com.jichi.aop..UserDaoImpl.*(..))")  
    public void afterReturning(){    
        System.out.println("后置通知（不发生异常的情况下调用）"); 
    }   
    @Around("execution(* com.jichi.aop..UserDaoImpl.*(..))") 
    public Object around(ProceedingJoinPoint pjp) throws Throwable{  
        System.out.println("执行前");     
        Object proceed = pjp.proceed();    
        System.out.println("执行后");    
        return proceed;   
    }    
    @AfterThrowing("execution(* com.jichi.aop..UserDaoImpl.*(..))")   
    public void afterThrowException(){      
        System.out.println("发生异常调用");  
    }      
    @After("execution(* com.jichi.aop..UserDaoImpl.*(..))")   
    public void after(){      
        System.out.println("后置通知，发生异常也会调用");   
    } 
}
```

在spring配置文件中进行配置，并开启注解aop

//bean可以手动写入或者通过注解自动写入 <aop:aspectj-autoproxy></aop:aspectj-autoproxy>

**通过注解形式实现的AOP, 如果想获取目标对象的一些参数, 需要使用对象: JoinPoint**

```java
@AfterThrowing("execution(* com.jichi.aop..UserDaoImpl.*(..))") 
public void after(JoinPoint jp){      
    System.out.println("目标对象:" + jp.getTarget() + "方法名: "  + jp.getSignature().getName());  
}
```

**3. 基于Schema配置实现AOP**

1. 编写一个普通类
2. 将该类通过配置转换为一个 " 通知 "

## **Spring开发WEB项目**

**SpringIoc容器初始化:**	

**1. 将IOC容器中所有的 bean 实例化为对象**

**2. 将各个 bean 依赖的属性值注入**

**(两种程序中IOC容器初始化的区别,** 

**造成的原因是Java程序有统一的入口main,只需要在main中通过语句初始化一次就行,而web程序没有统一的入口)**

**Java程序中:** 	

**通过new ClassPathXmlApplicationContext("applicationContext.xml") 将IOC容器初始化**

**JavaWeb程序中:** 

**tomcat启动时, 通过监听器将 IOC 容器初始化**

**可以使用 Spring-web.jar 来实现,** web项目启动时会自动加载 web.xml , 因此需要在web.xml 中加载监听器

```xml
<listener>    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class> </listener>
```

同时告诉监听器IOC容器的位置 (或者不配置,按照约定的位置)

```xml
<context-param>   
    <param-name>contextConfigLocation</param-name>    
    <param-value>classpath:applicationContext.xml</param-value> 
</context-param> classpath为类路径,如src,此处代表src

```

## 拆分Spring配置文件

**Java项目:** 

无论几个都可以直接使用

**web项目:**

拆分的依据: 

1. 三层结构
   1. UI(html/csss/jsp,servlet)
   2. service
   3. DAO
   4. 公共数据库

2. 功能结构
   1. 例:  学生相关配置, 班级相关配置

**合并：将多个配置文件合并**

**１.　在监听器中同时列举多个classpath文件**

```xml
<context-param>   
    <param-name>contextConfigLocation</param-name>  
    <param-value>classpath:applicationContext.xml</param-value>   
    <param-value>classpath:applicationContext-Dao.xml</param-value>  
    <param-value>classpath:applicationContext-Control.xml</param-value> 
</context-param>
```

**2. 用 -\* 来表示所有的有后缀xml文件**

```xml
<context-param>
    <param-name>contextConfigLocation</param-name>   
    <param-value>classpath:applicationContext.xml</param-value>  
    <param-value>classpath:applicationContext-*.xml</param-value> 
</context-param>
```

**3. 只在web.xml中加载主配置文件,在主配置文件中引入其他配置文件**

***注意:** 

**bean的实例化是保存在IOC容器中, 但是每次request是请求servlet容器**

![](https://i.loli.net/2020/11/18/BCQGaXtbdUYVDnP.png)

**解决方法: 在servlet中的 init() 方法中获取SpringIOC容器中的bean对象(即是初始化servlet时获取对象)**