---
title: Maven
sidebar: 'auto'
categories:
 - Java
tags:
 - Java
---
**maven 是一款服务于 Java 平台的自动化构建工具**

- 管理 jar 包

- - 增加第三方 jar 包
  - 解决 jar 包之间的依赖关系

- 将项目拆分成若干个模块

- - 

**maven 的核心概念:**

- 约定的目录结构

![img](https://wx2.sbimg.cn/2020/08/31/6Z9zA.png)

- POM
- 坐标
- 依赖
- 仓库
- 生命周期 / 插件 / 目标
- 继承
- 聚合

**maven 常见命令**

- 编译:		mvn compile  ( 只编译main目录下的Java文件 )
- 测试: 		mvn test
- 打包:		mvn package ( 打包成 war / jar )
- 将开发的模块放入本地仓库, 供其他模块使用:		mvn install

依赖:

```xml
 <dependency> 
     <groupId>junit</groupId>  
     <artifactId>junit</artifactId>  
     <version>4.0</version>   
     <scope>test</scope>
</dependency>
```

其中<scope>标签表示

在一个maven项目中，如果存在编译需要而发布不需要的jar包，可以用scope标签，值设为provided

( maven 在编译, 测试, 运行项目时, 各自使用一套 classpath )

![img](https://wx2.sbimg.cn/2020/08/31/6Zdme.md.png)

- **compile**

默认的scope，表示 dependency 都可以在生命周期中使用。而且，这些dependencies 会传递到依赖的项目中。适用于所有阶段，会随着项目一起发布

- **provided**

跟compile相似，但是表明了dependency 由JDK或者容器提供，例如Servlet AP和一些Java EE APIs。这个scope 只能作用在编译和测试时，同时没有传递性。????????

- **runtime**

表示dependency不作用在编译时，但会作用在运行和测试时，如JDBC驱动，适用运行和测试阶段。

- **test**

表示dependency作用在测试时，不作用在运行时。 只在测试时使用，用于编译和运行测试代码。不会随项目发布。

- **system**

跟provided 相似，但是在系统中要以外部JAR包的形式提供，maven不会在repository查找它。

**依赖的传递性**

eg:A->b->c  A依赖于B，B依赖于C，如果试A依赖于C成立，则需要B依赖于C的范围必须是compile

**依赖调解**

eg.HelloWorldTime ->HelloWorld2 ->junit

![img](https://wx1.sbimg.cn/2020/08/31/6ZsIj.md.png)

看上面的例子,如果两个项目都引入的Junit ,那么maven是如何来避免 Jar冲突的呢。

**两个原则，原则一：路径最短，**

如上图：HelloWorldTime 依赖于HelloWorld,然后HelloWorld依赖于junit4.0。然而HelloWorldTime自己有添加的依赖Juit3.8 ，这个时候Maven 会在HelloWorldTime选择用哪个呢？答案是Junit3.8。

**原则二：路径长度相同的**

如下这种情况：

i.在同一个pom.xml文件中有2个相同的依赖（覆盖）：后面声明的依赖 会覆盖前面声明的依赖 （严禁使用本情况，严禁在同一个pom中声明2个版本不同的依赖）

ii.如果是不同的 pom.xml中有2个相同的依赖（优先）：则先声明的依赖 ，会覆盖后声明的依赖

![img](https://wx1.sbimg.cn/2020/08/31/6ZuOh.md.png)

**存在：A->-B>-C->X(1.0)和A->D->X(2.0)**

**原则：路径最近原则（指依赖通过几层传递性依赖引入），X(2.0)将会被解析**

**存在：A->B->Y(1.0)和A->C->Y(2.0)**

**原则：第一声明优先原则，哪个现在pom中声明（也就是在pom文件的上边），就以哪个为准****（Maven2.0.9开始使用，在此之前是不确定的，导致构建项目具有一定的随机性）**

**依赖排除：**

我们通过在pom中配置<dependency></dependency>来引入依赖，但是该依赖存在多个传递性依赖，如果某个间接依赖不是我们需要的，影响到了我们项目的正常构建，那么我们可以使用<exclusions><exclusion></exclusion></exclusions>来干掉它。示例如下：

```xml
<dependency>   
    <groupId>com.xx.miliao</groupId>   
    <artifactId>xx-serviceapi</artifactId>   
    <exclusions>      
        <exclusion>        
            <artifactId>xx-thrift-micloud-common</artifactId>       
            <groupId>com.xx</groupId>     
        </exclusion>         
        <exclusion>     
            <artifactId>thrift</artifactId>        
            <groupId>org.apache.thrift</groupId>    
        </exclusion>    
        <exclusion>    
        <groupId>com.xx</groupId>     
        <artifactId>ipWrapper</artifactId>   
        </exclusion> 
    </exclusions>  
</dependency>
```

**归类依赖：**

通过Maven统一配置各需要jar和plugs等内容的的版本， 归类依赖看着高大上，其实说白了就是为了统一简单的管理依赖版本，如果某些依赖的version都是一致的或者是存在某些特殊的关系，我们可以在pom中使用<properties></properties>配置一些变量，在下边的时候使用$变量名来搞定。

这个profiles 可以配置jdk等很多属性,也可以对一些依赖的版本号进行配置 ，比如统一编码，

![img](https://wx2.sbimg.cn/2020/08/31/6ZqPM.md.png)

![img](https://wx1.sbimg.cn/2020/08/31/6Zeua.md.png)

**maven中继承的概念:**

Maven是一种强大的构建工具，能够帮助我们自动下载构件，并且通过给每一个构件确定其坐标，实现了构件在仓库中的存储。正是Maven的生命周期和插件的互相绑定才使得我们可以非常愉快的完成项目的构建。

在实际的项目中，我们往往会建立多个模块（module）。本文中要介绍的聚合和继承就特别适合多个模块的协同工作。

**Maven的继承特性****可以将各个模块相同的依赖和插件配置提取出来，在简化POM的同时还可以促进各个模块配置的一致性。**

eg: A-->B ，A继承与B，则 B是一个父类的存在

**A会继承所有B 的依赖**。 在创建B的时候我们称之为父工程，在创建的时候父工程不需要进行编码之类的东西，只添加依赖，所以在父工程的打包类型packageing选择 pom类型（java是jar,web项目是war）

如果在配置的时候，父工程的groupId和version等属性 如果相同，在子工程里，其实这些信息可以省略，因为他会继承父工程的。

**在dependencyManagement元素下得依赖声明不会引入实际的依赖，不过它能够约束dependencies下的依赖使用。**

**dependencies即使在子项目中不写该依赖项，那么子项目仍然会从父项目中继承该依赖项（全部继承）**

   **dependencyManagement里只是声明依赖，并不实现引入，因此子项目需要显示的声明需要用的依赖。如果不在子项目中声明依赖，是不会从父项目中继承下来的；只有在子项目中写了该依赖项，并且没有指定具体版本，才会从父项目中继承该项，并且version和scope都读取自父pom;另外如果子项目中指定了版本号，那么会使用子项目中指定的jar版本。**

```xml
继承实现步骤：
1.建立父工程： 父工程的打包方式为pom 
2.在父工程的pom.xml中编写依赖：
<dependencyManagement> 
    <dependencies> 
        <dependency> 
		3.子类: 
            <!-- 给当前工程 继承一个父工程：1加入父工程坐标gav   2当前工程的Pom.xml到父工程的Pom.xml之间的 相对路径  --> 
            <parent>        
            	<!-- 1加入父工程坐标gav -->      
           	 	<groupId>org.lanqiao.maven</groupId>     
                <artifactId>B</artifactId> 
                <version>0.0.1-SNAPSHOT</version>   
                <!-- 2当前工程的Pom.xml到父工程的Pom.xml之间的 相对路径 -->      
                <relativePath>../B/pom.xml</relativePath> 
            </parent> 
            4.在子类中 需要声明 ：使用那些父类的依赖 
            <!-- 声明：需要使用到父类的junit （只需要ga） -->  
            <dependency>
```

**maven 能识别的: 自身包含, 本地仓库中的**

即 m2 依赖于 m1, 则在执行时, 必须将 m1 加入到本地仓库( install ), 之后才能执行 m2

**Maven的聚合特性:**

![img](https://wx2.sbimg.cn/2020/08/31/6Zt8R.md.png)

聚合特性可以帮助我们把项目的多个模块聚合在一起，使用一条命令进行构建，即一条命令实现构建多个项目

我们在一个项目中会存在模块A和模块B，在各自的项目目录下，我们可以分别通过命令 **mvn clean package** 来构建各个模块

但是如果我们想将这两个模块一起构建, 就**需要建立一个模块C做为一个聚合模块。**

![img](https://wx1.sbimg.cn/2020/08/31/6ZzmI.md.png)

C模块的打包方式必须为pom。

聚合模块和父模块经常可以做到合二为一。

**通过<properties>元素用户可以自定义一个或多个Maven属性，然后在POM的其他地方使用${属性名}的方式引用该属性，这种做法的最大意义在于消除重复和统一管理。**

**Maven总共有6类属性，内置属性、POM属性、自定义属性、Settings属性、java系统属性和环境变量属性**

https://www.cnblogs.com/youzhibing/p/5427130.html