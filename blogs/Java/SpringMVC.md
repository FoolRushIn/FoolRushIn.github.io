---
title: springMVC
sidebar: 'auto'
categories:
 - Java
tags:
 - Java
---
SpringMVC配置文件: springmvc.xml

选中常用的命名空间: 	

![](https://i.loli.net/2020/11/18/526aWg3n98XpxKO.png)

**普通的servlet流程:** 

请求 --> url-pattern --> 交给对应的servlet处理

**SpringMVC流程:**

在web.xml中配置一个springmvc jar包自带的servlet（或者alt+/ dispatcher自动生成）

```xml
<servlet> 	
    <servlet-name>springDispatcherServlet</servlet-name> 	
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class> 
    <init-param>   //告知springmvc.xml的位置 	
        <param-name>contextConfigLocation</param-name> 		
        <param-value>classpath:springmvc.xml</param-value> 
    </init-param>
    <load-on-startup>1</load-on-startup> 
    //web启动时运行
</servlet>
<servlet-mapping> 
    <servlet-name>springDispatcherServlet</servlet-name> 
    <url-pattern>/</url-pattern>
    //拦截一切请求
</servlet-mapping>
```

用注解的方式让普通类变成拦截， 拦截welcome请求 

```java
@Controller public class handler {
    @RequestMapping("welcome") 
    //映射，有多个时用key value对的形式 如value="handle" 
    public String welcome() { 
        return "success"; 
    }
}
```

**@RequestMapping可以使用的属性值：**

**1、 value， method；**

value：   指定请求的实际地址，指定的地址可以是URI Template 模式（后面将会说明）；

method： 指定请求的method类型， GET、POST、PUT、DELETE等；

 

**2、 consumes，produces；**

consumes： 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html;

produces:  指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回；

 

**3、 params，headers；**

params： 指定request中必须包含某些参数值是，才让该方法处理。

headers： 指定request中必须包含某些指定的header值，才能让该方法处理请求。

**）**

在springmvc.xml中配置扫描器以及servlet返回请求

```xml
<!-- 扫描有注解的包 -->
<context:component-scan base-package="servlet.handler">
</context:component-scan> 
<!-- 配置视图解析器 --> 
<bean class= "org.springframework.web.servlet.view.InternalResourceViewResolver">
    <!-- 配置前缀和后缀  锁定servlet返回请求jsp的位置 -->
    <property name="prefix" value="/views/"></property> 
    <property name="suffix" value=".jsp"></property> 
</bean>
```

**页面跳转时， 默认使用了请求转发的跳转方式**

**Springmvc的rest风格**

**REST：即 Representational State Transfer。（资源）表现层状态转化。**是目前最流行的一种互联网软件架构。它结构清晰、符合标准、易于理解、扩展方便， 所以正得到越来越多网站的采用。	

　　　　我们可以通过rest风格占位符方式，利用@PathVariable注解将占位符的值赋给调用方法参数，实现结果：

　　   /某路径/1     HTTP GET ：         得到 id = 1 的 一条数据

　　   /某路径/1     HTTP DELETE：      删除 id = 1的 一条数据

　　   /某路径/1    HTTP PUT：         更新id = 1的 一条数据

​      /某路径       HTTP POST：        新增一条数据

　　　　

在HTTP 协议里面，四个表示操作方式的动词：GET、POST、PUT、DELETE。 

　　　　·它们分别对应四种基本操作：　　　　

　　　　　　1、GET  ======  获取资源  查

　　　　　　2、POST ====== 新建资源  增

　　　　　　3、PUT=======  更新资源  改

　　　　　　4、DELETE==== 删除资源  删

**普通浏览器 只支持 get/post 方式，需要通过过滤器，增加delete/put 方式， 通过**

```xml
//第一步 
<input type="hidden" name="_method" value="delete/put"/> 
//此方法要求请求方式之前为post
```

**可以将请求变成value中的请求**

**过滤器由springmvc写好， 名字：HiddenHttpMethodFilter ，在web.xml中配置即可**

```xml
//第二步
<filter> 	
    <filter-name>HiddenHttpMethodFilter </filter-name> 	
    <filter-class>全类名</filter-class> 
</filter> 
<filter-mapping> 	
    <filter-name>HiddenHttpMethodFilter </filter-name>
    <url-pattern>/*</url-pattern> 
</filter-mapping>
```

**@PathVariable注解使用**[**https://blog.csdn.net/sswqzx/article/details/84194979**](https://blog.csdn.net/sswqzx/article/details/84194979)

**@PathVariable是spring3.0的一个新功能：接收请求路径中占位符的值**

**//第三步**

![](https://i.loli.net/2020/11/18/mLJsw6XUjx38cEa.png)

![](https://i.loli.net/2020/11/18/STNVOiq2Lpuw9Cr.png)

**当用rest风格传值时，用@pathVariable， 用普通方法传值时，用@RequestParam**

**获取请求头信息： @RequestHeader**

```java
public String testRequestHeader(@RequestHeader("AcceptLanguage") String a1){
    //获取了AcceptLanguage的值，并将值保存在a1变量中 
}
```

**通过mvc获取cookie值**

**@CookieValue**

**（服务端在接受客户端的第一次请求时，会给给客户端分配一个session，该session包含一个sessionId，并且服务端会在第一次响应客户端时，将该sessionId赋值给JSESSION，并传递给客户端的cookie中）**

**小结：** 

**springMVC处理各种参数的流程/逻辑：**

前端发送请求a  —> @RequestMapping("a")

处理请求中的参数：

```java
@RequestMapping("a") 
public String aa(@Xxxx注解（"xyz") xyz)
```

**使用对象接受实体参数：**

**在SpringMVC中使用原生态的servlet API：**

如httpServletRequest, 直接在mvc映射的方法 的参数中写就行了 （HttpServletRequest req）

**处理模型数据：** 

如果跳转时需要带数据：（同时有view和model， 数据和视图）则可以使用以下方式

ModelAndView， ModelMap， Map， Model         --**数据放在了request作用域**

```java
public class handler { 
    @RequestMapping("welcome") public ModelAndView test() { 
        ModelAndView mv = new ModelAndView("success"); 	
        Student student = new Studnet(); 	
        student.setId(2); 
        student.setName("ls"); 
        mv.addObject("student", student);        
        //mv.addObject(attributeName, attributeValue)
    } 
}
```

在使用ModelAndView， ModelMap， Map， Model 时， 如果想将数据放入session中， 可以在用 @SessionAttributes 

```java
@SessionAttributes("attributeName") 
public class handler {
    @RequestMapping("welcome")
    public ModelAndView test() { 
        ModelAndView mv = new ModelAndView("success"); 	
        Student student = new Studnet(); 
        student.setId(2);
        student.setName("ls"); 	
        mv.addObject("student", student);          
        //mv.addObject(attributeName, attributeValue)
    } 
}
```

 @ModelAttribute  

在更新时使用, 在不改变源代码之上, 插入新方法

在任何一次请求前, 都会先执行ModelAttribute方法 ( 是为了在修改数据前先查询数据 )

**约定: map的key就是即将查询的 方法类型参数的首字母小写**

![](https://i.loli.net/2020/11/18/pPWYQuyLjim5IoK.png)

**通过 @ModelAttribute 修饰的方法, 会在每次请求前先执行, 并且该方法中的 map.put() 方法 可以将对象放入即将查询的参数当中**

**视图和视图解析器:**

视图的顶级接口: 	View

视图解析器: 		ViewResolver

常见的视图和解析器: 

InternalResourceView, InternalResourceViewResolver

public class JstlView extends InternalResourceView:

springMVC 解析 jsp时, 会默认使用InternalResourceView, 如果发现 jsp 中包含了 jstl 语言,则自动转为 JstlView 

JstlView 可以解析jstl 实现国际化操作

**实现国际化规范:**

1. **创建资源文件**

![](https://i.loli.net/2020/11/18/6SRECe35uhPwjkl.png)

**如果其他资源文件中没有设置一些属性的值, 则在该文件中查找**

1. **配置SpringMVC.xml, 加载资源文件**

2. **会在springMVC响应时介入, 实现国际化资源文件**
   2. **springMVC启动时, 会自动查找一个ID="messageSource" 的bean, 如果有,加载**

```xml
<bean id="messageSource" class="类路径"> 
    <propertity name="basename" value="i18n"></propertity>
</bean>
```



1. **通过 jstl 使用国际化**

2. **jstl.jar  standar.jar**
   2. **在jsp头标签中引入**

![](https://i.loli.net/2020/11/18/VAl8Sd7JxFWgymK.png)

```xml
<body>   
    <fmt:message key="resource.welcome"></fmt:message>  
    <fmt:message key="resource.hello"></fmt:message>
</body>
```

**InternalResourceView的其他功能:**

1. 上面通过Controller(@RequestMapping) 实现了请求的拦截跳转  即:`index.jsp  --->  Controller(@RequestMapping)  --->success.jsp`,要用SpringMVC实现: `index.jsp  --> success.jsp`

```xml
<mvc:view-controller path="请求路径 handler/welcome" view-name="跳转路径 "/>
此配置会忽略掉所有的@RequestMapping,如果想共存,需要加注解

<mvc:annotation-driven></mvc:annotation-driven> 
此配置也是mvc基本配置 , 必加 能实现ajax快捷请求 jsr303校验 映射动态请求 

<!-- 将springMVC不能处理交给Tomcat -->
<mvc:default-servlet-handler/>
```

相当于下边的代码

```java
@Controller public class handler { 
    @RequestMapping("welcome")  //映射，有多个时用key value对的形式 如value="handle" 
    public String welcome() {
    	return "success"; 
	}
}
```

2. 指定请求方式

上面提到默认使用请求转发的方式, 现在转为重定向 ( 如果使用此方法, MVC会忽略视图解析器的前缀和后缀, 需要手动加上 )

![](https://i.loli.net/2020/11/18/D3HstKeXAJzpijf.png)

3. 处理静态资源

在MVC中, 如果直接访问静态资源, 结果是404  原因:

![](https://i.loli.net/2020/11/18/x2TpHuEAZU18QlK.png)

dispatcherServlet是入口

**解决静态资源方案:**

**如果有SpringMVC对应的@requestMapping 则交给springMVC 处理, 如果没有对应的, 就交给服务器Tomcat默认的服务器处理(直接访问): 在Springmvc.xml中增加一个配置即可:**

```xml
<mvc:default-servlet-handler> 
    //同时上面的 
<mvc:annotation-driven></mvc:annotation-driven>
```

4. **类型转换**

a. Spring自带一些常见的类型转换器: 

```java
public String testDelete(@PathVariable("id") String id)
    //既可以接受int类型 也可以接受String类型
```

b. 可以自定义

org.springframework.context.support.ConversionServiceFactoryBean

5. **SpringMVC提供了很多注解,方便数据格式化**

```xml
<bean id="ConversionService" class="org.springframework.format.support.Forg.springframework.format.support.FormattingConversionServiceFactoryBean">	    
    ------ 中间部分为类型转换的内容   
    <property name="converters"> 
        <set> 	
        <ref bean="myConverter"/> 
        </set>   
    </property>    
    ----- 
</bean> 
//配置springmvc 
```

( 格式化使用的bean包含了自定义类型转换的bean, 所以可以将类型转换写在该bean里 )

用注解实现

@DateTimeFormat(pattern="yyyy-MM-dd") private Data bir(); //@DateTimeFormat(pattern="yyyy-MM-dd")可以将形如1988-12-01的字符串转换为 //java.util.Date类型。

![](https://i.loli.net/2020/11/18/3tFDoKTWk4SPq81.png)

**关于@BindingResult** 

https://www.cnblogs.com/zdj-/p/8693071.html

**数据校验:** 

JSR303 或者 hibernate validator

https://blog.csdn.net/u013815546/article/details/77248003?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1

**AJax请求SpringMVC, 并且返回JSON格式的数据**

**SpringMVC实现文件上传**

和servlet本质一样, 都是通过 commons-fileupload.jar 和 commons-io.jar

**SprignMVC可以简化文件上传的代码: (通过实现MultipartResolver接口)**

```xml
	<!-- 用于实现文件上传 --> 
<!-- id值固定, SpringIOC初始化时, 自动寻找并加载该id的bean -->
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver"> 	
    <property name="defaultEncoding" value="UTF-8"></property> 
    <property name="maxUploadSize" value="10240000"></property> 
</bean>
```

```java
@RequestMapping("/upload") 
public String upload(@RequestParam("file") MultipartFile file, HttpServletRequest req) 	throws IllegalStateException, IOException { 	
    // 判断文件是否为空，空则返回失败页面 
    if (file.isEmpty()) { 
        return "failed"; } 
    // 获取文件存储路径（绝对路径）
    String path = req.getServletContext().getRealPath("/WEB-INF/file"); 
    // 获取原文件名 
    String fileName = file.getOriginalFilename(); 
    // 创建文件实例 
    File filePath = new File(path, fileName); 
    // 如果文件目录不存在，创建目录 
    if (!filePath.getParentFile().exists()) { 	
        filePath.getParentFile().mkdirs(); 
        System.out.println("创建目录" + filePath); 
    } 
    // 写入文件 
    file.transferTo(filePath);
    return "success"; }  
```

**拦截器:**

**通过实现HandlerInterceptor接口**

![](https://i.loli.net/2020/11/18/DYTNq2lOKG9RUtx.png)

**渲染: 将JSP中的<% String name =%>,  css, js等组装完毕,最终显示出来,就是渲染**

**步骤:** 

```java
public class MyInterceptor implements HandlerInterceptor{    
    @Override  
    public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)        throws Exception {    
        // 渲染完之后  
    } 
    @Override    
    public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)        throws Exception {      
        // 拦截响应   
    }   
    @Override   
    public boolean preHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2) throws Exception {  
        // 拦截请求     
        return false;    
        //return false表示拦截并不放行, true表示拦截之后放行   
    } 
}
```

配置: 将拦截器配置到SpringMVC或Spring中(都行,干的事情一样)

```xml
	<!-- 默认拦截全部请求 -->
<mvc:interceptors> 
    <bean class="方法中的拦截器位置"></bean> 
</mvc:interceptors>
```

或者

```xml
<mvc:interceptors> 
    <!-- 配置具体的拦截路径, 不配置默认拦截全部请求 -->
    <mvc:interceptor> 
        <!-- 指定拦截的路径, 基于ant风格 --> 
        <mvc:mapping path=""/>
        <!-- 指定不拦截的路径 --> 
        <mvc:exclude-mapping path=""/> 
        <!-- 将bean放在最下面 --> 
        <bean class="方法中的拦截器位置"></bean>  </mvc:interceptor>  
    <mvc:interceptor>   
    </mvc:interceptor>
</mvc:interceptors>
```

执行顺序: 

**拦截器1拦截请求  -->  拦截器2拦截请求  -->  执行方法  -->拦截器2处理响应  -->拦截器1处理响应  -->拦截器2渲染 -->  拦截器1渲染**

**SpringMVC 异常处理方式:** https://www.cnblogs.com/kise-ryota/p/11266497.html

**1. 使用@ExceptionHandler**

```java
@RequestMapping("secong")
public String testException() { 
    System.out.println(1/0); 
    return "success"; 
} 
@ExceptionHandler({ArithmeticException.class})
public String handlerArithmeticException(ArithmeticException e) {   
    System.out.println(e); 
    return "error"; 
}
```

 

**异常处理路径: 	最短优先**

**如果有一个方法抛出一个ArithmeticExcrption异常, 而该类中有两个对应的异常处理方法, 优先采用最短的(两个异常的class名相同就是最短)**

**注意;** 

**@ExceptionHandler默认只能捕获当前类中的异常方法,** **如果发生异常的方法和处理异常的方法不在同一个类中, 需要加一个注解: 	@ControllerAdvice**

```java
@ControllerAdvice 
public class ExceptionHandler{ 
    //这个类不是控制器, 是只用于处理异常的类   
    @ExceptionHandler 
    public ModelAndView handler(Exception e){   
        //处理异常的方法   
    } 
}
```



- 如果一个方法用于处理异常, 并且只处理当前类中的异常：	@**ExceptionHandler**

- 如果一个方法用于处理异常, 并且用于处理所有类的异常: 	

- - **给该类前加注解@ControllerAdvice**
  - **给该类中处理异常的方法加注解@ExceptionHandler**

**2. 使用ResponseStatusExceptionResolver: 异常状态提示, 自定义异常显示页面**

标识在类前或方法前都可以