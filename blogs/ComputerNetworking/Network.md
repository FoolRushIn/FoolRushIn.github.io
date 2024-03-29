---
title: 网络层
sidebar: 'auto'
date: 2020-07-15
categories:
 - 计算机网络
tags:
 - 计算机网络
---
# 网络层

## 概述

==**网络层的3个主要组件**==

1. IP协议
2. 路由选择协议
3. ICMP协议 (Internet Control Message Protocol, 因特网控制报文协议)

### 转发和路由选择

网络层的作用就是将分组从一台发送主机移动到一台接收主机

- 数据报网络中网络层的作用
  - 转发(单个过程)
    - 将分组从一个输入链路接口转移到适当的输出链路接口的路由器本地动作
  - 路由选择(整体过程)
    - 指网络范围的过程，以决定分组从源到目的地所采取的端到端路径
    - 计算这些路径的算法称为**路由选择算法**
- 虚电路网络中网络层的3个最重要的功能
  - **连接建立**
  - 转发
  - 路由选择
  - 比在数据报网络中多了一个功能，连接建立。

每台路由器具有一张转发表

### 网络服务模型

**因特网的网络层**提供了单一的服务: **尽力而为服务(best-effort service)**. 

**网络层体系结构不止是因特网，还有如ATM异步传输模型等。**

网络服务模型定义了分组在发送与接收端系统之间的端到端运输特性

- 确保交付
- 具有时延上界的确保交付
- 有序分组交付
- 确保最小带宽
- 确保最大时延抖动
- 安全性服务

ATM服务模型

- 恒定比特率
- 可用比特率

## 虚电路和数据报网络

- 提供的主机到主机服务
  - 仅在网络层提供**连接服务**的计算机网路称为**虚电路网络**(因特网)
  - 仅在网络层提供**无连接服务**的计算机网络称为**数据报网络**(ATM. 帧中继的体系结构)
- 虚电路网络比在数据报网络中多了一个功能，连接建立。

### 虚电路网路

组成:

1. 源和目的主机之间的路径(一系列链路和路由器)
2. VC号, 沿着该路径的每段链路的一个号码
3. 沿着该路径的每台路由器中的转发表表项

- 属于一条虚电路的分组将在它的首部携带一个VC号
- 因为一条虚电路在每条链路上可能具有不同的VC号, 每台中间路由器必须用一个新的VC号代替每个传输分组的VC号. 该新的VC号从转发表获得
- 无论何时跨越一台路由器创建一条新的虚电路,转发表就增加了一个新表项. 终止一条虚电路,就沿着该路径每个表中的相应项就被删除

一个分组沿着其路由在每条链路上不保持相同的VC号的原因:

1. 减少了分组首部中VC字段的长度
2. 每条链路有一个不同的VC号,**简化了虚电路的建立**

在虚电路网络中, 该网络的路由器必须为进行中的连接维持**连接状态信息**. 

在虚电路中有3个阶段:

- 虚电路建立
- 数据传送
- 虚电路拆除

网络层虚电路建立连接与运输层建立连接的区别

- 运输层连接建立仅涉及两个端系统. 两个端系统独自决定运输层连接的参数. 虽然两个端系统已经知道该运输层连接,但网络中的路由器则对这些完全不知情
- 对于一个虚电路网络层,沿两个端系统之间的路径上的路由器都要参与虚电路的建立,且每台路由器都完全知道经过它的所有虚电路

端系统向网络发送指示虚电路启动与终止的报文, 以及路由器之间传递的用于建立虚电路的报文, 被称为**信令报文**, 用来交换这些报文的协议常被称为**信令协议**

### 数据报网络

端系统发送分组时,为分组加上目的端系统的地址,然后将分组推进网络中  

- 通过一系列路由器传递,每台都使用分组的目的地址来转发该分组
  - 每台路由器都有一个将目的地址映射到链路接口的转发表



- 网络层提供数据报服务的情况下, 在给定源和目的地址之间的不同分组可能采用不同的路由(等价为路径)
  - 数据报网络中的转发表能够在任何时刻修改(通过路由选择算法)
- 网络层提供虚电路服务的情况下, 在给定源和目的地址之间的所有的分组将采用相同的路径



## 路由器工作原理

网络层的**转发功能**: 实际分组从一台路由器的入链路传送到适合的出链路

![](https://i.loli.net/2020/11/19/cm5xnJ2uUWPV4e8.png)

路由器的四个组成部分: 

- 输入端口
  - 执行将一条输入的物理链路与路由器相连接的物理层功能
  - 执行与位于入链路远端的数据链路层交互的数据链路层功能
  - 在输入端口完成查找功能
  - 控制分组从输入端口转发到路由选择器(端口指路由器的物理输入和输出接口)
- 交换结构
  - 将路由器的输入端口和输出端口相连接
- 输出端口
  - 存储从交换结构接收的分组,并通过执行必要的链路层和物理层功能在输入链路上传输这些分组
- 路由选择处理器
  - 执行路由选择协议, 维护路由选择表以及连接的链路状态信息,并为路由器计算转发表

### 输入端口

![](https://i.loli.net/2020/11/19/lfw3G6HJIpqh2cB.png)

### 交换结构

三种交换技术。

  　　1. 经内存交换
         　　1. 分组到达一个输入端口时,端口会通过终端方式向路由选择处理器发出信号
                  　　2. 该分组冲输入端口处别复制到处理器内存中
                        　　3. 路由选择处理器从器首部体区目的地址,在转发表中找出适合的输出端口
                              　　4. 将该分组复制到输出端口的缓存中
            　　2. 经总线交换
                          　　1. 输入端口经一根共享总线将分组直接传送到输出端口,不需要路由器的干预
                                　　1. 让输入端口为分组预先计划一个交换机内部标签(首部),指示本地输出端口,使分组在总线上传送和传输到输出端口
                                  　　2. 该分组能由所有输出端口接收到,但只有与该标签匹配的端口才能保存该分组
                                          　　3. 标签在输出端口被去除
                                    3. 每次只能有一个分组能够跨越总线, 若有多个分组同时到达路由器,除了一个分组外所有其他分组必须等待
           3. 经互联网络交换
                  　　1. 由2N条总线组成的互联网络,连接N个输入端口和N个输出端口

　　![](https://i.loli.net/2020/11/19/gqXdiQ8uYs7wvZV.png)

### 输出端口

![](https://i.loli.net/2020/11/19/cU7ATmh9z2SGOvN.png)

### 排队

输入输出都会出现排队

三种路由器中的排队规则

1. 先进先出
2. 优先权排队
3. 循环和加权公平排队

## 网络协议(IP):因特网中IP的转发和编址

### IPv4

#### IPv4数据报格式

![](https://i.loli.net/2020/11/19/DC4he3cjEdNKZbq.png)

- 版本号：包括IPv4、IPv6。
- 首部长度：通常20字节。
- 服务类型：区分不同类型数据报，如实时流量（IP电话）和非实时流量（FTP）。
- 数据报长度：首部+数据长度，很少超过1500字节。
- 标识、标志、片偏移：用于分组分片。IPv6不分片
- 寿命（Time-To-Live, TTL）：经过一台路由器，TTL减一。
- 上层协议：数据报交付给哪个应用层协议。
- 首部检验和：只对首部校验，TCP/UDP与IP不一定属于同一协议栈（如ATM代替IP）。
- 源和目的IP。
- 选项：IPv6不使用。
- 数据：交付给运输层的数据，也可能是ICMP报文等其他类型。

##### IPv4 数据报分片

并不是所有的链路层协议都能承载相同长度的网络层分组. 有的协议能承载大数据报,而有的协议只能承载小分组. 

一个链路层能承载的最大数据量叫做最大传送单元(MTU)

- 链路层MTU限制数据报长度，不同链路使用不同的协议，MTU不同，所以一个数据报可能分成数个小的数据报，称为分片（fragment）。
- 数据报在端系统中重新组装，然后上传传输层。
- 标识标记初始IP数据报。
- 最后一个片的标志为0，其余为1。
- 偏移字段指定该片在初始IP数据报的位置。

#### IPv4编址

主机与路由器连入网络的方法

- 一台主机通常只有一条链路连接到网络，主机IP发送数据报从该链路发送
- 主机与物理链路的边界叫**接口**,路由器与它的任意一条链路之间的边界也叫接口, 一台路由器有多个接口
- IP要求每台主机和路由器都有自己的IP地址，**因此一个IP地址实际上是与每一个接口相关联的**
- 每个IP地址长度32bit（4字节），总共2^32个可能的IP地址，约40亿个.  **点分十进制记法**，如193.32.216.9
- 一个接口的IP地址的一部分需要由其连接的子网决定
- 如互联3个主机接口与1个路由器接口的网络形成一个子网，IP编址为这个子网分配一个地址：223.1.1.0/24，/24记法称为子网掩码，指示了32bit中的最左侧24bit定义了子网地址
- 为了确定子网，分开主机和路由器的每个接口，产生几个隔离的网络岛，使用接口端接这些隔离的网络的端点，这些隔离的网络中每一个都叫做一个子网

因特网地址分配策略：**无类别域间路由选择 CIDR** 

- a.b.c.d/x的地址的x最高比特构成IP地址的网络部分，称为该地址的**前缀**，一个组织通常被分配一块连续的地址，即具有相同前缀的一段地址。
- BGP路由选择协议中，该组织网络外的路由器仅考虑x，减少了转发表的长度，因为形式为a.b.c.d/x单一表项足以将数据报转发到该组织内的任何目的地

地址聚合（路由聚合）：使用单个网络前缀通告多个网络的能力 

- 一个ISP将8个组织连接到因特网。该ISP向外界通告：向我发送以200.23.16.0/20开始的任何内容。外部无需知道在该地址块内还有8个其他组织，每个组织有自己的子网

在CDIR出现之前，采用分类编址，A、B、C类网络，分别具有8、16、24比特子网地址 

- C类（/24）仅能容纳2^8-2=254台主机（其中两个用于特殊用途）
- B类（/16）支持65534台主机，一个组织分配一个B类地址却只用2000个接口，造成巨大浪费
- A类
- IP广播地址: 255.255.255.255
  - 当一台主机发出目的地址为255.255.255.255的数据报时，报文会交付给同一个网络的所有主机，可用于DHCP发现报文的发送，广播最小生成树



##### **动态主机配置协议（Dynamic Host Configuration, DHCP**），允许主机自动获取一个IP地址，还有其他信息，例如子网掩码、第一条路由器地址（默认网关）、本地DNS服务器地址。

DHCP是C-S协议，客户是新到达的主机，服务器是子网中的DHCP服务器或者是DHCP中继代理（通常是路由器）。

4个步骤 :

 　1. DHCP服务器发现。使用广播目的地址255.255.255.255和源地址0.0.0.0，进行链路层广播。
   　2. DHCP服务器提供。使用广播发送推荐IP、地址租用期等信息。
   　3. DHCP请求。从一个或多个服务器提供的选择中响应，回显配置参数。
   　4. DHCP ACK。对请求报文响应，证实要求的参数。

![](https://i.loli.net/2020/11/19/fEFtOB4VN1jZGkH.png)

##### 主机获得地址的步骤:

1. 获取一块地址

   1. 一个组织获取一个地址块

2. 获取主机地址: 动态主机配置协议

   1. 组织获取一块地址后,就可为本组织内的主机与路由器几口逐个分配IP地址

3. 网络地址转换(NAT)

   1. 网络地址转换（Network Address Translation, NAT），通过NAT转换表管理小型子网络，对外隐藏网络细节。
   2. 子网络中的主机使用专用地址（10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16），该地址只有在该网络中才有意义，不能用于因特网。
   3. NAT路由器将因特网的IP和端口号、子网的IP和端口号进行转换，对外行为就像具有单一IP的单一设备。

4. UPnP

   1. 允许主机发现并配置邻近NAT的协议

### 因特网控制报文协议 ICMP

主机和路由器用来彼此沟通网络层的信息. 最典型的用途是差错报告

ICMP通常被认为是IP的一部分, 但是从体系结构上来说他是位于IP之上的, 因为ICMP报文是承载在IP分组中的

- ICMP是作为IP有效载荷承载的,就像TCP与UDP报文段作为IP有效载荷被承载
- 当一台主机收到一个指明上层协议为ICMP的IP数据报时,它分解出该数据报的内容给ICMP,就像分解出一个数据报的内容给TCP/UDP一样

### IPv6

#### IPv6数据报格式

![](https://i.loli.net/2020/11/19/daRZ8Oy2vqBtWmP.png)

- 重要的变化
  - 扩大的地址容量: 
    - IPV6地址长度为128位，地址空间增大了2的96次方倍
  - 简化高效的40字节首部
  - 流标签与优先级

**取消的字段**

- 分片：如果数据报太长，发送ICMP差错报文。
- 首部校验和:  运输层(TCP和UDP) 和 数据链路层(以太网) 协议执行了校验操作
- 选项:  并没有消失, 可能出现在IPv6首部中由  "下一个首部"  指出的位置上

### 从IPv4到IPv6的迁移，两种双栈（dual-stack）方法。

- 接受结点和发送节点如果有一个为IPv4，则使用IPv4
- 将IPv4路由器集合作为隧道（tunneling），将IPv6数据报放入IPv4的数据字段。

## 路由选择算法

确定从发送发到接受方通过路由器网络的好路径

1. 主机通常直接与一台路由器相连，该路由器即为该主机的**默认路由器**或**第一跳路由器**
2. 源主机默认路由器称为**源路由器**，目的主机默认路由器称为**目的路由器**
3. 一个分组从源主机到目的主机的路由选择问题 == 从源路由器到目的路由器的路由选择问题

### 路由算法分类

#### 第一种路由算法分类: 根据是全局式还是分散式

- 全局路由选择算法
  - 用完整、全局性的网络信息计算出最短路径（最低费用路径）
  - 具有全局状态信息的算法常被称为**链路状态(LS)算法**
- 分散式路由选择算法
  - 迭代、分布式的方式计算最短路径
  - 没有结点拥有关于网络链路的完整信息，每个结点仅有与其直接相连链路的信息即可工作
  - 通过迭代计算并与相邻结点交换信息，逐渐计算出最低费用路径
  - 如: **距离向量算法（DV）**

#### 第二种路由算法分类: 根据是静态还是动态

- 静态路由选择算法
  - 变化缓慢，通常人工干预
- 动态路由选择算法
  - 网络流量负载或拓扑发生变化时改变路由选择路径
  - 周期性运行或直接响应变化
  - 坏处: 容易受路由选择循环、路由震荡等问题的影响

#### 第三种路由算法分类：根据负载是否敏感

- 负载敏感算法
  - 链路费用动态变化来反映链路拥塞水平
- 负载迟钝算法
  - 链路费用与拥塞无关，**当今因特网路由选择算法基本都是迟钝的**

### 链路状态路由选择算法(LS)

网络拓扑和所有链路费用已知。 
实践中是由每个节点向网络其他所有节点广播链路状态分组完成的，其中每个链路状态分组包含它连接的链路的特征和费用  
例如OSPF路由选择协议由**链路状态广播**算法完成
所有节点都具有该网络的信息，每个节点运行LS算法

#### Dijkstra算法

计算从某结点(源节点, 称之为u)到网络中所有其他结点的最低费用路径

Dijkstra算法算是**贪心思想**实现的，首先把起点到所有点的距离存下来找个最短的，然后松弛一次再找出最短的，所谓的松弛操作就是，遍历一遍看通过刚刚找到的距离最短的点作为中转站会不会更近，如果更近了就更新距离，这样把所有的点找遍之后就存下了起点到其他所有点的最短距离。

Dijkstra算法是迭代算法,其性质是经算法的第k次迭代后,可知到k个目的结点的最低费用路径

- $D(v)$:到算法的本次迭代, 从源节点到目的结点v的最DV低费用的路径
- $p(v)$: 从源到v沿着当前最低费用路径的前一结点(v的邻居)
- $N的导数$: 结点子集

### 距离向量路由选择算法(DV)

一种迭代的, 异步的和分布式的算法

- 分布式: 每个结点都要从一个或多个直接相连邻居接收某些信息, 执行计算, 然后将其计算结果发送给邻居
- 迭代: 此过程一直要持续到邻居之间无更多信息要交换为止
- 异步: 不要求所有的结点相互之间步伐一致地操作

#### Bellman-Ford方程

$$
d_x(y) = min_v[c(x,v)+d_v(y)]
$$

其中$d_x(y)$代表着从开始结点x到目的y的最低费用路径的费用。 $c(x,v)$表示从结点x到**邻接结点v**的费用，$d_v(y)$ 表示从邻接结点v到目的结点y的最小费用路径的费用。 $min_v$ 表示在所有邻接结点v的方程计算中取一个最小值。

也就是说：**我到目的地的最小距离，等于 我到邻居距离与邻居到目的地最小距离之和（存在一个或多个邻居） 的最小值。**

### 两种路由算法的比较(LS与DV)

- 报文复杂性
  - 显然LS复杂得多，每条链路费用改变都要通知所有结点
- 收敛速度
  - DV算法收敛较慢，且会遇到路由选择环路和无穷计数问题
- 健壮性
  - 路由器发生故障，LS结点仅计算自己的转发表，提供了一定健壮性
  - DV算法一个 不正确的结点会扩散到整个网络

### 路由层次选择

实践中的问题: 

- 规模: 
  - 路由器数目变得很大,路由选择信息的计算等开销很大
- 管理自治
  - 一个组织按照自己的愿望运行和管理其网络,并能将其网络和其他外部网络连接

#### AS自治系统

通过将路由器组织进**自治系统(AS)**来解决, 每个AS由一组通常处在相同管理控制下的路由器组成

- 每个AS由一组处在相同管理控制下的路由器组成（如相同的ISP运营）
- 在相同的AS中的路由器全部运行相同的路由选择算法(如一种LS或DV算法)
- 在一个自治系统内运行的路由选择算法叫做**自治系统内部路由选择协议**
- **自治系统间路由选择协议**涉及两个AS之间的通信
  - 执行从相邻AS获取可达性信息和向该AS中所有路由器传播可达性信息
- 为实现AS彼此互联,一个AS内的一台或多台路由器负责向在本AS之外的目的地转发分组. 被称为**网关路由器**
  - 当有多台网关路由器，需要用到自制系统间路由选择协议来配置转发表
- 每台路由器接收来自一个AS内部路由选择协议和一个AS间路由选择协议的信息，并使用来自这两个协议的信息配置它的转发表。
- AS路由选择协议:
  - 两种AS内部路由选择协议
    - RIP
    - OSPF
  - 一种AS间路由选择协议
    - BGP
- 因特网中所有AS中都运行相同的**AS间路由选择协议BGP4**

#### 在多个AS间选择——热土豆路由选择

针对某分组可通过多个网关转发的情况，路由器必须决定将该分组发往哪个网关。

- AS尽可能快（经济）地丢掉（转发）分组；
- 考虑AS A内的路由器L，试图将一个分组转发到AS C内的情况：
   AS A通过自洽系统间路由选择协议得知可以通过AS A的邻居AS B1,AS B2到达AS C，
   并将该信息告知A内每一台路由器，如L；
- 现在，L必须在经过B1到达C和经过B2到达C的两条路径中做选择；
- 根据热土豆路由选择策略，L会（通过自洽系统内部路由选择协议）考察L到A-B1网关的费用和L到A-B2网关的费用，**选择费用（时间，金融费用）较低的那条，并将分组发往相应网关**；
- 亦即，热土豆路由选择策略会使得分组尽快地离开当前AS；

#### 路由表配置

- 转发表由AS内部路由算法与AS间路由算法共同配置
- AS内部路由算法设置AS内部目的网络路由入口
- AS内部路由算法与AS间路由算法共同设置AS外部目的网络路由入口

## 因特网中的路由选择

- AS内部路由选择协议，又称内部网关协议
  - 路由选择信息协议**RIP**，通常设置在下层ISP中
  - 开放最短优先**OSPF**，通常设置在上层ISP中

OSPF和其兄弟IS-IS通常设置在上层ISP中，RIP在下层ISP和企业网中

### 因特网中AS内部的路由选择: 

#### RIP（DV思想）

AS内部路由选择协议: **内部网关协议AS**

RIP是一种距离向量协议(很像理想化DV协议),使用**跳数**作为其费用测度

- **跳**：沿着源路由器到目的子网（包括）的最短路径经过的子网数量
  - 一条路径的最大费用限制为15，因此RIP使用限制在网络直径不超过15跳的自治系统内
- 路由选择更新信息在邻居之间通过使用**RIP响应报文（RIP通告**）来交换，大约每30s交换一次
  - 一台路由器或主机发出的响应报文包含了该AS内多达25个目的子网的列表，以及发送方到每个子网的距离
  - 每台路由器维护一张称为**路由选择表的RIP表**，包括该路由器的**距离向量和转发表**（转发表内容: 目的子网，下一台路由器，到目的地跳数）
  - 路由器收到通告后，将通告与路由选择表合并，记下更短路径（最短路径变化原因: DV算法还在收敛，或者新的链路加入AS)
  - **一台路由器超过180s没有从邻居听到报文，该邻居要么死记要么链路中断**
    - RIP可以修改本地路由选择表，向活着的邻居发送RIP通告
    - 也可以使用RIP请求报文请求邻居到目的地的费用
  - RIP被当做一个**应用**进程来实现，能在一个标准socket上发送个接收报文，并且使用一个标准的运输层协议
    - 路由器在**UD**P上用端口520相互发送RIP请求/响应报文。意思是RIP使用一个运输层协议实现网络层功能

#### OSPF（LS思想）

OSPF核心：使用洪泛链路状态信息的**LS**协议 + **Dijkstra最低费用路径算法**。**各条链路费用（权值）是管理员配置的**

- 使用OSPF，一台路由器构建了整个AS的拓扑图，然后在本地运行Dijkstra算法
- 使用OSPF，路由器向AS内所有其他路由器**广播路由选择信息**。即使链路未发生变化，也要周期性广播链路状态（at least 30 minutes at a time）

OSPF通告包含在OSPF报文中, 该OSPF报文直接由IP承载, 对OSPF其上层协议的值为89. 

OSPF的优点: 

- **安全**：
  - 能够鉴别OSPF路由器之间的交换，仅有受信任的路由器能参与AS内的OSPF协议。包括使用MD5加密
- **多条相同费用路径**：
  - 无需仅选择单一路径承载所有流量
- **支持单播多播路由选择**
- **支持在单个路由选择域内的层次结构**：
  - 具有按层次结构构造一个自治系统的能力

一个OSPF AS可以配置成多个区域，每个区域运行自己的OSPF链路状态路由选择(LS)算法，一个区域内每台路由器可以向该区域其他路由器广播链路状态

一个区域内，一台或多台**区域边界路由器**负责为流向该区域以外的分组提供路由选择

AS内只有一个OSPF区域配置成主干区域，为其他区域之间的流量提供路由选择。该主干包含AS内所有区域边界路由器，也可能包含一些非边界路由器

`某区域内分组—>区域边界路由器—>主干—>目的区域边界路由器—>目的地`

### AS间的路由选择：BGP

BGP：**边界网关协议**，跨越多个AS的源和目的对之间确定路径，现在用的BGP4

BGP为每个AS提供了进行以下的工作的手段: 

1. 从相邻AS处获得子网可达性信息
2. 向本AS内部所有路由器传播这些可达性信息
3. 基于可达性信息和AS策略，决定到达子网的 "好" 路由

==BGP使得每个子网向因特网其余部分通告它的存在：一个子网高声宣布『在这！』，并且确保因特网中所有AS知道该子网以及如何到达==

#### BGP基础

1. 是因特网中至关重要的协议，正是BGP将一切『粘合』起来
2. BGP中，路由器通过使用179端口的半永久**TCP**连接来交换路由信息
3. 跨越两个 AS的TCP连接称为**外部BGP会话eBGP**，AS内部每对路由器之间的TCP连接称为**内部BGP会话iBGP**
   1. 对于每条tcp连接,位于该链接端点的两台路由器称为**BGP对等方**
   2. 沿着该连接发送所有BGP报文的TCP连接称为**BGP会话**
   3. iBGP并不总与物理链路对应

假设你开了公司，与ISP签订协议，获得了一个IP地址范围（子网），每台路由器是通过BGP知道你公司地址的前缀进行转发的，这样别人才能成功将分组发到公司

4. BGP使每个AS知道经过其相邻AS可到达哪些目的地子网，**目的地是CDIR化的前缀，子网或子网的集合**

#### 路由属性和BGP路由

1. BGP中，一个AS由其全局唯一的**自治系统号**ASN标识, 由ICANN地区注册机构分配
2. 当一台路由器通过BGP会话通告一个前缀时，它在前缀中包括一些BGP属性。带属性的前缀称为一条路由，BGP对等方彼此通告路由
   1. 两个重要的属性: AS-PATH 和 NEXT-HOP
      1. AS-PATH
         1. 该属性包含了前缀通告已经通过的AS，当一个前缀传送到一个AS时，AS将其ASN增加到AS-PATH中
         2. 路由器使用AS-PATH属性检测和**防止循环通告**
         3. 路由器使用AS-PATH在多条路径中选择相同的前缀
      2. NEXT-HOP
         1. 是一个开始某AS-PATH的路由器接口
         2. **路由器使用该属性正确地配置它们的转发表**
         3. 使用NEXT-HOP值和AS内部路由选择算法，路由器能确定到每条对等链路的路径的费用，用热土豆路由选择决定适当的接口

#### BGP路由选择

BGP使用eBGP和iBGP向在AS中的所有路由器发布路由，路由器可能知道到达任何一条前缀的多条路由。消除规则从上到下：

- 选择具有最高本地偏好值（管理员决定）的路由

- 选择具有最短AS-PATH的路由

- 最靠近NEXT-HOP路由器的路由，最靠近指最低费用路径最低，由AS内部算法决定（hot potato routing）

- 使用BGP标识符选择路由

  

## 广播和多播路由选择

上面的都是**单播通信**的路由选择协议,即单个源结点基于这种协议向单个目的结点发送分组

- 广播路由选择: 
  - 网路层提供了从一种源结点到网络中的所有其他结点交付分组的服务
  - 必须同一网段
- 多播路由选择: 
  - 使单个源结点能够向其他网络结点的一个子集发送分组的副本
  - 不必同一网段

### 广播路由选择算法

#### N次单播

给定N个目的节点，源结点产生该分组的N份副本，对不同目的地每个副本编址，用单播路由选择传送  

缺点: 

1. 效率低，多份独立的副本会重复经过某段链路，让网络结点本身生成分组副本更有效
2. N次单播的一个假设是广播的接收方及其地址为发送方所知晓。但是怎样得到这些消息呢？最可能的是，可能还需要另外的协议机制(如广播成员或目的复杂性)。这将增加更多的开销。
3. 与使用广播的目的有关. 在使用广播来生成和更新单播路由的情况下,基于单播路由选择基础设施来取得广播是不明智地

#### 无控制洪泛

实现广播最显而易见地技术是**洪泛方法**. 该方法要求源结点向它的所有邻居发送分组的副本,当某结点接收到一个广播分组时,该结点复制该分组并向它邻居(除了从其接收到分组的邻居)转发

缺点: 

1. 图中有环，会无休止循环
2. 当一个结点与两个以上结点连接时，它将生成并转发广播分组的多个副本，副本中的每个又产生多个副本，产生**广播风暴**，使网络变得毫无用处

#### 受控洪泛

每个结点明确的选择何时洪泛分组,何时不洪泛分组

两种受控洪泛方法

- 序号控制洪泛
  - 源节点将其地址或其他唯一标识和**广播序号**放入广播分组，每个结点维护**它已经收到的、复制的和转发的源地址和序号列表。**
  - 当结点接受到一个广播分组时，它首先检查该分组是否在列表中。如果在，丢弃该分组；如果不在，复制该分组并向该结点的所有邻居转发。
- 反向路径转发(RPF)
  - 仅当分组到达的链路正好位于它自己返回源的最短单薄路径上，才传输报文，否则丢弃。
  - RPF仅需要知道在它到发送方的单薄路径上的下一个邻居；它仅用这个邻居的身份以决定是否洪泛一个接收到的广播分组。

#### 生成树广播

虽然**序号控制洪泛**和**RPF**避免了广播风暴，但它们不能完全避免冗余广播分组的传输。

如果每段链路具有相应的费用并且一棵树的费用就是其链路费用之和,则在该图中的所有生成树中费用最小的生成树被称为**最小生成树**

- 对网络结点构造出一棵最小生成树
- 一个结点不需要知道整棵树, 只需知道哪些邻居是生成树中的邻居

##### **分布式生成树算法**
**基于中心的方法**：建立一棵生成树时，定义一个中心结点（**汇合点、核**），结点向中心结点单播加入树报文。加入树报文使用单播路由选择朝着中心结点转发，直到它到达一个已经属于生成树的结点或达到该中心，经过的路径再嫁接到现有生成树中。

==**在实践中，广播协议被用于应用层和网络层**==

### 多播

只有一部分路由器（那些具有加入该多播组的相连主机的路由器）实际需要接收多播流量。

- 一些新兴应用要求将分组从一个或多个发送方交付给一组接收方，比如各种直播、游戏
- 多播数据报使用**间接地址**来编址。每个分组难道携带所有接收方IP地址？这不科学
- 用一个标识表示一组接收方（D类多播地址），接收方小组称为**多播组**

#### 因特网组管理协议IGMP
​    IGMP + 多播路由选择协议 组成网络层多播

#### 确定多播路由选择：

两种方法来确定多播路由选择树:(区别在于是用单一的组共享树来为组种的所有发送方分发流量, 还是为每个独立的发送方构建一棵特定源的路由选择树)

1. **使用一棵组共享树的多播路由选择（共享的）：**通过组共享树进行多播路由选择的基础是构建一棵树。
2. **使用一棵基于源的树的多播路由选择：**而第二种方法为多播组中的每个源构建一棵多播路由选择树。

解决应用RPF时会收到不想要的多播分组这个问题成为**剪枝。**一台接收到该多播分组的多播路由器，如它无加入改组的相连主机，则它向其上游路由器发送一个剪枝报文，则它就能向上游转发一个剪枝报文。