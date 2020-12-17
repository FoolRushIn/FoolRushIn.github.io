(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{511:function(v,_,t){"use strict";t.r(_);var a=t(4),s=Object(a.a)({},(function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("h1",{attrs:{id:"链路层"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#链路层"}},[v._v("#")]),v._v(" 链路层")]),v._v(" "),t("p",[v._v("两种类型链路层信道:")]),v._v(" "),t("ol",[t("li",[v._v("广播信道")]),v._v(" "),t("li",[v._v("点对点通信链路")])]),v._v(" "),t("h2",{attrs:{id:"概述"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[v._v("#")]),v._v(" 概述")]),v._v(" "),t("p",[v._v("将运行链路层协议的任何设备均称为"),t("strong",[v._v("结点")]),v._v("，沿着通信路径连接相邻结点的通信信道称为"),t("strong",[v._v("链路")]),v._v("。通过特定链路时，传输结点将数据报封装在链路层帧中，将该"),t("strong",[v._v("帧")]),v._v("传入链路")]),v._v(" "),t("h3",{attrs:{id:"链路层提供的服务"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#链路层提供的服务"}},[v._v("#")]),v._v(" 链路层提供的服务")]),v._v(" "),t("p",[v._v("基本服务: 将数据报通过单一通信链路从一个结点移动到相邻结点")]),v._v(" "),t("ul",[t("li",[v._v("成帧\n"),t("ul",[t("li",[v._v("在网络层数据报经链路层传送之前,用链路层帧将其封装")])])]),v._v(" "),t("li",[v._v("链路接入\n"),t("ul",[t("li",[v._v("媒体访问控制(MAC)协议规定了帧在链路上传输的规则")])])]),v._v(" "),t("li",[v._v("可靠交付\n"),t("ul",[t("li",[v._v("当提供此服务时, 将保证无差错地经链路层移动每个网络层数据报")]),v._v(" "),t("li",[v._v("通过"),t("strong",[v._v("确认和重传")]),v._v("实现，类似TCP")]),v._v(" "),t("li",[v._v("通常用于高差错率链路，如无线链路.   同轴电缆、光纤、双绞线等链路不需要")]),v._v(" "),t("li",[v._v("目的是在差错发生的链路上纠正差错，而不是通过运输层或应用层进行端到端数据重传")]),v._v(" "),t("li",[v._v("对于低比特差错的链路, 链路层可靠交付可能会被认为是一种不必要的开销。由于这个原因，许多有线的链路层协议不提供可靠交付服务")])])]),v._v(" "),t("li",[v._v("差错检测和纠正\n"),t("ul",[t("li",[v._v("当帧中的一个比特作为1传输时,接收方结点中的链路层硬件可能将其判断为0. 这种情况由信号衰减和电磁噪声导致")])])])]),v._v(" "),t("h3",{attrs:{id:"链路层在何处实现"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#链路层在何处实现"}},[v._v("#")]),v._v(" 链路层在何处实现")]),v._v(" "),t("ul",[t("li",[v._v("路由器中：在线路卡中实现")]),v._v(" "),t("li",[v._v("端主机中：链路层主体部分在"),t("strong",[v._v("网络适配器（网络接口卡")]),v._v("，网卡）中实现\n"),t("ul",[t("li",[v._v("位于网卡核心的是"),t("strong",[v._v("链路层控制器")]),v._v("，一个实现了许多链路层服务（成帧、链路接入、差错检测）的专用芯片。")]),v._v(" "),t("li",[v._v("so链路层控制器的许多功能是硬件实现的.")]),v._v(" "),t("li",[v._v("从前是物理分离的卡，现在网卡直接焊在了主板上")])])])]),v._v(" "),t("p",[v._v("大部分链路层是在"),t("strong",[v._v("硬件")]),v._v("中实现的，但部分链路层是在运行于主机CPU上的软件中实现的，软件实现了高级功能，如组装链路层寻址信息和激活控制器硬件，响应控制器中断")]),v._v(" "),t("ul",[t("li",[v._v("链路层的部分功能由运行在cpu上的主机软件实现")]),v._v(" "),t("li",[t("strong",[v._v("链路层是协议栈中软件与硬件交接的地方")])])]),v._v(" "),t("h2",{attrs:{id:"差错检测和纠正技术"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#差错检测和纠正技术"}},[v._v("#")]),v._v(" 差错检测和纠正技术")]),v._v(" "),t("p",[v._v("**比特级差错检测与纠正，**即对从一个结点发送到另一个物理上连接的邻近结点的链路层帧中的比特损伤进行检测与纠正，它们通常是链路层提供的两种服务。")]),v._v(" "),t("p",[v._v("为了保护比特免受差错，使用"),t("strong",[v._v("差错检测和纠正比特（EDC")]),v._v("）。通常，要保护的数据不仅包括从网络层传递下来需要通过链路传输的数据报，而且包括链路帧首部中的链路级的寻址信息、序号和其它字段。")]),v._v(" "),t("p",[v._v("即使采用差错检验比特，也还是可能有"),t("strong",[v._v("未检出比特差错")]),v._v("。")]),v._v(" "),t("p",[t("strong",[v._v("传输数据中检测差错的三种技术")])]),v._v(" "),t("ol",[t("li",[v._v("奇偶校验（描述差错检测和纠正背后的思想）")]),v._v(" "),t("li",[v._v("检验和方法（应用于运输层）")]),v._v(" "),t("li",[v._v("循环冗余检测（应用在适配器中的链路层）")])]),v._v(" "),t("p",[v._v("==运输层使用检验和, 而链路层使用crc. 为什么?==")]),v._v(" "),t("p",[v._v("运输层差错检测用软件实现, 采用简单快速的方法很重要.  链路层的差错检测在适配器中用专用的硬件实现, 能快速的执行复杂的crc")]),v._v(" "),t("h3",{attrs:{id:"奇偶校验"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#奇偶校验"}},[v._v("#")]),v._v(" 奇偶校验")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://i.loli.net/2020/11/19/X5oYMW7svhwLGkC.png",alt:""}})]),v._v(" "),t("h4",{attrs:{id:"单个奇偶校验位"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#单个奇偶校验位"}},[v._v("#")]),v._v(" 单个奇偶校验位")]),v._v(" "),t("p",[v._v("单个比特的奇偶校验是指在要发送的数据最后附加一个奇偶校验位.")]),v._v(" "),t("ul",[t("li",[v._v("奇校验的意思就是整个编码中的1的个数要是奇数.(''原来的1'' 加上 ''后面的1'' 是奇数个)")]),v._v(" "),t("li",[v._v("偶校验就是1的个数是偶数.")]),v._v(" "),t("li",[v._v("显然如果有偶数个比特发生错误,那么奇偶校验就检测不出来了.")])]),v._v(" "),t("h4",{attrs:{id:"二维奇偶校验"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#二维奇偶校验"}},[v._v("#")]),v._v(" 二维奇偶校验")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://i.loli.net/2020/11/19/BE213dFPlk8KvbR.png",alt:""}})]),v._v(" "),t("p",[v._v("D中的d个比特被划分为 i 行 j 列.对每行每列计算奇偶值.产生的i + j + 1奇偶比特就构成了链路层帧的差错检测比特.")]),v._v(" "),t("ul",[t("li",[v._v("当出现单个比特差错时,发生错误的行和列都会出现差错.接收方不仅可以检测差错,还可以根据行列索引来纠正它.")]),v._v(" "),t("li",[v._v("二维奇偶校验也可以"),t("strong",[v._v("检测")]),v._v("(但不能纠正)"),t("strong",[v._v("两个比特错误")]),v._v("的任何组合.\n"),t("ul",[t("li",[v._v("如果在同一行两个比特错误,则那一行的奇偶校验正确,但是会有两列的奇偶校验失败.")]),v._v(" "),t("li",[v._v("如果不同行,则会有四列出错.")]),v._v(" "),t("li",[v._v("这两种情况都无法纠错,只能检测.但是还是有一些偶数个错误的情况是二维奇偶校验无法检测的.")])])])]),v._v(" "),t("p",[v._v("接收方检测和纠错的能力被称为"),t("strong",[v._v("前向纠错（FEC）")]),v._v(".")]),v._v(" "),t("h3",{attrs:{id:"检验和方法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#检验和方法"}},[v._v("#")]),v._v(" 检验和方法")]),v._v(" "),t("p",[v._v("在校验和方法中,数据被切成k比特的序列,这些序列全部相加之后取反码就是校验和.接收方收到数据之后,把所有数据加起来(包括校验和).用结果是否全为1来作为判断数据是否出错的标准.")]),v._v(" "),t("p",[v._v("和CRC相比,校验和提供较弱的保护.\n为什么传输层使用校验和而链路层使用CRC呢?")]),v._v(" "),t("ol",[t("li",[v._v("传输层使用软件实现,采用简单快速的方案是必须的(校验和)")]),v._v(" "),t("li",[v._v("链路层的CRC用硬件实现,能够快速执行CRC操作.")])]),v._v(" "),t("h3",{attrs:{id:"循环冗余检测-crc"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#循环冗余检测-crc"}},[v._v("#")]),v._v(" 循环冗余检测(CRC)")]),v._v(" "),t("p",[v._v("应用最广泛的差错检测技术基于CRC编码. CRC编码也称为"),t("strong",[v._v("多项式编码")]),v._v(". 该编码能够将要发送的比特串看作系数是0和1的一个多项式, 对比特串的操作被解释为多项式算术")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://i.loli.net/2020/11/19/e1tYP2DJErhIwsa.png",alt:""}})]),v._v(" "),t("p",[v._v("编码步骤如下 :")]),v._v(" "),t("ol",[t("li",[v._v("发送方和接收方实现协商一个r + 1的比特模式(比特串)G,叫做"),t("strong",[v._v("生成多项式")]),v._v(".要求G的最高位是1")]),v._v(" "),t("li",[v._v("对于一个给定的数据段D,发送方选择r个附加比特R, 并附加到D上.")]),v._v(" "),t("li",[v._v("使得得到的d + r比特模式用模2算数恰好能被G整除.(模2算数就是异或XOR)")])]),v._v(" "),t("p",[v._v("接收方的解码步骤很简单,用G去除收到的d + r比特.如果余数非0,接收方知道出了差错.否则认为数据被正确接收.\n怎么计算R")]),v._v(" "),t("p",[v._v("要使得R对于n有:  $D"),t("em",[v._v("2^r$ XOR R = nG​\n两边同异或R得:  $D")]),v._v("2^r$ = nG XOR R\n所以 R = remainder$((D*2^r)/G)$")]),v._v(" "),t("h2",{attrs:{id:"多路访问链路和协议"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#多路访问链路和协议"}},[v._v("#")]),v._v(" 多路访问链路和协议")]),v._v(" "),t("p",[t("strong",[v._v("点对点链路")]),v._v("\n点对点协议PPP\n高级数据链路控制协议HDLC")]),v._v(" "),t("p",[t("strong",[v._v("广播链路")]),v._v("\n让多个发送和接收结点都连接到相同的、单一的、共享的广播信道上\n当任何一个结点传输一个帧时，信道广播该帧，其他结点都收到一个副本\n如以太网和无线局域网")]),v._v(" "),t("p",[t("strong",[v._v("多路访问问题")])]),v._v(" "),t("p",[v._v("如何协调多个发送和接收结点对一个共享广播信道的访问, 这就是"),t("strong",[v._v("多路访问问题")]),v._v(". 结点通过这些协议来规范它们在共享的广播信道上的传输行为")]),v._v(" "),t("ul",[t("li",[v._v("所有结点都能传输帧，多个结点可能会同时传输帧, 当发生这种情况时, 所有结点同时接到多个帧, 传输的帧在所有接收方出碰撞了，发生碰撞时，所有帧丢失")])]),v._v(" "),t("p",[t("strong",[v._v("三种类型的多路访问协议")])]),v._v(" "),t("ol",[t("li",[v._v("信道划分协议")]),v._v(" "),t("li",[v._v("随机接入协议")]),v._v(" "),t("li",[v._v("轮流协议")])]),v._v(" "),t("p",[v._v("=="),t("strong",[v._v("协议希望有的特性，理想情况下对速率R:")]),v._v("==")]),v._v(" "),t("ul",[t("li",[v._v("仅有一个结点发送数据，结点具有R bps的吞吐量")]),v._v(" "),t("li",[v._v("M个结点发送数据时，每个结点平均吞吐量R/M bps")]),v._v(" "),t("li",[v._v("协议分散，不会因为主结点故障似整个系统崩溃")]),v._v(" "),t("li",[v._v("协议简单不昂贵")])]),v._v(" "),t("h3",{attrs:{id:"信道划分协议"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#信道划分协议"}},[v._v("#")]),v._v(" 信道划分协议")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://i.loli.net/2020/11/19/6kQq3yKvpOUmfdT.png",alt:""}})]),v._v(" "),t("h4",{attrs:{id:"时分多路复用tdm"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#时分多路复用tdm"}},[v._v("#")]),v._v(" 时分多路复用TDM")]),v._v(" "),t("p",[v._v("TDM把时间划分为时间帧,并进一步把时间帧划分为N个时隙(slot).(时间帧和链路层交换的单元帧不是一个意思),然后把每个时隙分给N个节点中的一个.无论何时某个节点在有分组想要发送的时候,他在循环的TDM帧中指派给它的时隙内传输分组比特.时隙长度一般应是一个时隙内能传输一个分组")]),v._v(" "),t("p",[v._v("缺点:")]),v._v(" "),t("ol",[t("li",[v._v("最高速率只能达到R/N bps ,即使只有一个人使用信道")]),v._v(" "),t("li",[v._v("节点总是总是要等待它的时隙,即使是唯一一个有帧要发送的结点. 可能会对缓存等造成压力")])]),v._v(" "),t("h4",{attrs:{id:"频分多路复用fdm"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#频分多路复用fdm"}},[v._v("#")]),v._v(" 频分多路复用FDM")]),v._v(" "),t("p",[v._v("FDM将Rbps的信道划分为不同的频段(每个频段具有R/N带宽),并把每个频段分给N个结点中的一个.因此FDM在N个较大的信道中创建了N个较小的R/N信道.")]),v._v(" "),t("p",[v._v("缺点:")]),v._v(" "),t("ol",[t("li",[v._v("限制了一个结点只能使用 R/N 的带宽, 即使是唯一一个有分组要发送的结点时")])]),v._v(" "),t("h4",{attrs:{id:"码分多址cdma"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#码分多址cdma"}},[v._v("#")]),v._v(" 码分多址CDMA")]),v._v(" "),t("p",[v._v("TDM和FDM分别为结点分配时隙和频率，CDMA对每个结点分配不同的编码")]),v._v(" "),t("ul",[t("li",[v._v("每个结点用其唯一编码对发送数据进行编码，使得不同结点能同时传输，接收方仍能正确而接收")]),v._v(" "),t("li",[v._v("抗干扰，军用系统，民用蜂窝电话")])]),v._v(" "),t("h3",{attrs:{id:"随机接入协议"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#随机接入协议"}},[v._v("#")]),v._v(" 随机接入协议")]),v._v(" "),t("p",[v._v("一个传输结点总是以信道的全部速率(即R bps)进行发送. 当有碰撞时,设计碰撞的每个结点反复的重发它的帧,直到该帧无碰撞地通过为止. 并且,在重发帧之前,等待一个"),t("strong",[v._v("随机时延")]),v._v(".")]),v._v(" "),t("p",[v._v("不具备多路访问协议理想特性中的  M个结点发送数据时，每个结点平均吞吐量R/M bps")]),v._v(" "),t("p",[v._v("几种随机接入协议:")]),v._v(" "),t("h4",{attrs:{id:"时隙-aloha"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#时隙-aloha"}},[v._v("#")]),v._v(" 时隙 ALOHA")]),v._v(" "),t("p",[v._v("当结点有新帧发送时，等到下一个时隙开始传输整个帧（设一个时隙传一个帧）。时隙开始时传输。")]),v._v(" "),t("p",[v._v("如果有碰撞，结点在时隙结束之前检测到这次碰撞，以p的概率在后序的每个时隙重传它的帧，直到无碰撞地传输出去。(p的概率意味着是本次时隙传输还是本次时隙不传输)")]),v._v(" "),t("p",[v._v("时隙ALOHA的确需要在结点中对时隙同步。刚好有一个结点传输的时隙称为一个"),t("strong",[v._v("成功时隙")]),v._v("。时隙多路访问协议的效率定义为：当有大量的活跃结点且每个结点总有大量的帧要发送时，长期运行中成功时隙的份额。")]),v._v(" "),t("p",[v._v("==效率==：当活跃结点数量趋向无穷大时，最大效率1/e，即37%。")]),v._v(" "),t("h4",{attrs:{id:"aloha"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#aloha"}},[v._v("#")]),v._v(" ALOHA")]),v._v(" "),t("p",[v._v("碰撞时，立即以概率p重传该帧, 否则等待一个帧传输时间, 然后以概率p传输")]),v._v(" "),t("p",[v._v("效率：仅为时隙ALOHA的一半: $1/(2e)$.")]),v._v(" "),t("h4",{attrs:{id:"载波侦听多路访问-csma"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#载波侦听多路访问-csma"}},[v._v("#")]),v._v(" 载波侦听多路访问 CSMA")]),v._v(" "),t("ul",[t("li",[t("strong",[v._v("载波侦听")]),v._v(": 说话之前先听。如果在说话，等他们说完话再说，网络中称为"),t("strong",[v._v("载波侦听")]),v._v(" ，结点等待直到一小段时间没有传输，然后开始传输")]),v._v(" "),t("li",[t("strong",[v._v("碰撞检测")]),v._v(": 如果与他人同时开始说话，停止说话。称为"),t("strong",[v._v("碰撞检测")]),v._v("，当一个传输结点在传输时一直侦听此信道，如果检测到另一个结点正在传输，它就停止，等待一段随机事件，重复『侦听=当空闲时传输』动作")])]),v._v(" "),t("p",[v._v("这两个规则包含在CSMA和具有碰撞检测的CSMA/CD"),t("strong",[v._v("协议族中")])]),v._v(" "),t("p",[v._v("=="),t("strong",[v._v("所有结点都载波侦听了，为何当初会发生碰撞？")]),v._v("==")]),v._v(" "),t("p",[v._v("B的比特沿着广播媒体传播所实际需要的时间不是0（即使接近光速），在还没到D时，尽管B正在发，但D侦听的信道空闲，D就开始传输，于是发生了碰撞")]),v._v(" "),t("p",[v._v("广播信道端到端信道传播时延决定了性能，时延越大，不能侦听到已传输结点的可能就越大，碰撞越多，性能越差")]),v._v(" "),t("h4",{attrs:{id:"具有碰撞检测的载波侦听多路访问-csma-cd"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#具有碰撞检测的载波侦听多路访问-csma-cd"}},[v._v("#")]),v._v(" 具有碰撞检测的载波侦听多路访问 CSMA/CD")]),v._v(" "),t("p",[v._v("当某结点执行碰撞检测时, 一旦它检测到碰撞将立即停止传输")]),v._v(" "),t("p",[v._v("从与广播信道相连的适配器(在结点中)的角度总结它的运行")]),v._v(" "),t("ol",[t("li",[v._v("适配器从网络层一条获得一条数据报，准备链路层帧，并将其放入帧适配器缓存中")]),v._v(" "),t("li",[v._v("如果适配器侦听到信道空闲，开始传输帧；如果侦听到信道在忙，等待，直到空闲")]),v._v(" "),t("li",[v._v("传输过程中，适配器监视信道")]),v._v(" "),t("li",[v._v("如果适配器传输整个帧而未检测到其他信号，该适配器完成了该帧，否则停止传输帧")]),v._v(" "),t("li",[v._v("中止传输后，适配器等待一个随机时间量，继续侦听(返回步骤2)")])]),v._v(" "),t("p",[v._v("回退时间间隔:")]),v._v(" "),t("p",[v._v("选择随机回退时间间隔太大，信道会空闲，太小会再次碰撞。当碰撞结点数量较少时时间应该间隔较短，否则较长。二进制指数后退算法解决这个问题")]),v._v(" "),t("ol",[t("li",[v._v("帧经历一连串n次碰撞，结点随机从{0，1，2，…，2^n-1}选择一个K值")]),v._v(" "),t("li",[v._v("一个帧经历碰撞越多，K选择的间隔越大.该算法称为"),t("strong",[v._v("二进制指数倒退")]),v._v("。")]),v._v(" "),t("li",[v._v("以太网中，一个结点等待的实际时间量是K*512bit的时间.")])]),v._v(" "),t("p",[v._v("效率:")]),v._v(" "),t("p",[v._v("信道在大多数时间都会有效地工作: $1/(1+5d_{prop}/d_{trans})$ .  当$d_{prop}$接近0时, 或者 $d_{trans}$变得很大时, 效率接近于1")]),v._v(" "),t("h3",{attrs:{id:"轮流协议"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#轮流协议"}},[v._v("#")]),v._v(" 轮流协议")]),v._v(" "),t("p",[v._v('ALOHA和CDMA不具备  "M个结点发送数据时，每个结点平均吞吐量R/M bps"  这个理想特性, 由此创造轮流协议')]),v._v(" "),t("p",[v._v("两种重要的轮流协议:")]),v._v(" "),t("h4",{attrs:{id:"轮询协议"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#轮询协议"}},[v._v("#")]),v._v(" 轮询协议")]),v._v(" "),t("ul",[t("li",[v._v("指定一个主结点，以循环的方式轮询每个结点")]),v._v(" "),t("li",[v._v("主结点首先向结点A发送一个报文，告知A能传输帧的最大数量，A传完后主结点告诉B能传帧的最多数量，如此循环")])]),v._v(" "),t("p",[v._v("缺点:")]),v._v(" "),t("ul",[t("li",[v._v("有轮询时延")]),v._v(" "),t("li",[v._v("主结点故障，整个信道就GG")])]),v._v(" "),t("h4",{attrs:{id:"令牌传递协议"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#令牌传递协议"}},[v._v("#")]),v._v(" 令牌传递协议")]),v._v(" "),t("p",[v._v("这种协议中没有主结点.")]),v._v(" "),t("ul",[t("li",[v._v("一个叫令牌token的特殊帧在结点之间以固定次序交换，如1发给2，2发给3，N发给1，就像网络拓扑结构中的环状网络令牌")]),v._v(" "),t("li",[v._v("当一个结点收到令牌时，有帧发送，则发送最大数量的帧，然后转发令牌；没帧发送，直接把令牌转发.")])]),v._v(" "),t("p",[v._v("缺点:")]),v._v(" "),t("ul",[t("li",[v._v("一个结点的故障可能导致整个信道崩溃")]),v._v(" "),t("li",[v._v("一个结点忘记释放令牌, 必须调用某些恢复步骤使令牌返回到循环中来")])]),v._v(" "),t("h3",{attrs:{id:"docsis-用于电缆因特网接入的链路层协议"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docsis-用于电缆因特网接入的链路层协议"}},[v._v("#")]),v._v(" DOCSIS: 用于电缆因特网接入的链路层协议")]),v._v(" "),t("p",[v._v("包含前面三种协议的每一种.")]),v._v(" "),t("p",[v._v("一个电缆接入网通常在电缆网头端将几千个住宅电缆调制解调器与一个**电缆调制解调器端接系统(CMTS)**连接")]),v._v(" "),t("p",[v._v("DOCSIS使用FDM将下行(CMTS到调制解调器)和上行(调制解调器到CMTS)网络段划分为多个频率信道")]),v._v(" "),t("h2",{attrs:{id:"交换局域网"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#交换局域网"}},[v._v("#")]),v._v(" 交换局域网")]),v._v(" "),t("h3",{attrs:{id:"链路层寻址和arp"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#链路层寻址和arp"}},[v._v("#")]),v._v(" 链路层寻址和ARP")]),v._v(" "),t("p",[v._v("主机和路由器具有链路层地址(同时在第4章提到主机和路由器具有网路层地址). "),t("strong",[v._v("地址解析协议(ARP)")]),v._v(": 该协议提供了将IP地址转换为链路层地址的机制")]),v._v(" "),t("h4",{attrs:{id:"mac地址"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mac地址"}},[v._v("#")]),v._v(" MAC地址")]),v._v(" "),t("p",[v._v("事实上, 并不是"),t("strong",[v._v("主机或路由器")]),v._v("具有链路层地址，而是它们的适配器（网络接口）具有链路层地址。具有多个网络接口的主机或路由器也有多个链路层地址，就像它也有多个IP地址一样。")]),v._v(" "),t("ul",[t("li",[v._v("链路层交换机并没有链路层地址，交换机透明地执行在主机与路由器之间承载数据报的任务\n"),t("ul",[t("li",[v._v("主机和路由器不必明确地将帧寻址到其间地交换机")])])])]),v._v(" "),t("p",[v._v("链路层地址有不同的称呼: "),t("strong",[v._v("LAN地址、物理地址、MAC地址")])]),v._v(" "),t("ul",[t("li",[v._v("MAC地址长度"),t("strong",[v._v("6字节")]),v._v("，共有$2^{48}$个可能的MAC地址，通常用"),t("strong",[v._v("十六进制表示法")]),v._v("，如5C-66-AB-90-75-B1")]),v._v(" "),t("li",[v._v("MAC地址一般是固定的（也有软件改变适配器MAC地址的可能）")]),v._v(" "),t("li",[t("strong",[v._v("没有两块适配器有相同的MAC地址")]),v._v("，MAC地址空间由IEEE管理，IEEE给公司固定前24个比特，后面24个比特让公司自己去生成")]),v._v(" "),t("li",[v._v("==MAC地址具有"),t("strong",[v._v("扁平结构(与IP地址的层次结构相反)")]),v._v(",适配器到哪里地址都不会发生变化。比如具有802.11接口的手机总是有相同mac地址，而当主机移动时，IP地址会改变（IP地址是"),t("strong",[v._v("层次结构")]),v._v(",一个网络部分和一个主机部分）==\n"),t("ul",[t("li",[v._v("MAC地址像身份证号，IP地址像邮政地址，有层次，会改变")])])])]),v._v(" "),t("p",[v._v("当某适配器要向目的适配器发送一个帧时，发送适配器将目的适配器的MAC地址插入该帧，发送到局域网上，适配器可以接受一个并非向它寻址的帧，当适配器接受一个帧时，检查帧中的目的MAC地址与自己的MAC地址是否匹配，若匹配则取出数据报，向上传递，否则丢弃")]),v._v(" "),t("ul",[t("li",[v._v("适配器通过"),t("strong",[v._v("MAC广播地址FF-FF-FF-FF-FF-FF")]),v._v("来广播")])]),v._v(" "),t("h4",{attrs:{id:"保持各层独立"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#保持各层独立"}},[v._v("#")]),v._v(" ==保持各层独立==")]),v._v(" "),t("p",[v._v("主机和路由器接口除了网络层地址之外还有MAC地址,有如下几个原因")]),v._v(" "),t("ol",[t("li",[v._v("局域网是为任意网络层协议而设计的,而不只是用于IP和因特网\n"),t("ol",[t("li",[v._v("如果适配器被指派IP地址而不是中性的MAC地址,则适配器不能方便的支持其他网络层协议")]),v._v(" "),t("li",[v._v("如果适配器使用网络层地址而不是MAC地址,网路层地址必须存储在适配器的RAM中,并在每次适配器移动或加电时要重新配置")])])]),v._v(" "),t("li",[v._v("如果适配器中不适用任何地址, 让每个适配器将它接收到每帧数据沿协议栈向上传递,接着网络层核对地址")])]),v._v(" "),t("h4",{attrs:{id:"地址解析协议-arp-即插即用的"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#地址解析协议-arp-即插即用的"}},[v._v("#")]),v._v(" 地址解析协议 ARP（即插即用的）")]),v._v(" "),t("p",[v._v("转换网络层地址(IP地址)和链路层地址(MAC地址)")]),v._v(" "),t("ul",[t("li",[v._v("DNS为因特网中任何地方的主机解析主机名，而ARP只为在同一个"),t("strong",[v._v("子网")]),v._v("上的主机和路由器接口解析IP地址")]),v._v(" "),t("li",[v._v("每台主机和路由器在内存中有一个"),t("strong",[v._v("ARP表")]),v._v("，包含IP地址到MAC地址的映射关系，过期时间20分钟")]),v._v(" "),t("li",[v._v("若发送方的ARP表没有目的主机的表项，发送方用ARP协议来解析这个地址\n"),t("ul",[t("li",[v._v("首先发送方构造一个ARP分组，字段包括发送和接受IP地址和MAC地址，ARP查询分组和响应分组格式相同")]),v._v(" "),t("li",[v._v("适配器用MAC广播地址发送该ARP查询分组，每个适配器都把ARP分组向上传递给ARP模块，检查自己的IP地址和分组中的目的IP地址是否一致")]),v._v(" "),t("li",[v._v("匹配的主机发送回一个ARP响应分组，然后查询主机更新它的ARP表，并发送它的IP数据报")])])])]),v._v(" "),t("p",[t("strong",[v._v("ARP协议是一个跨越链路层和网络层的协议")])]),v._v(" "),t("h4",{attrs:{id:"发送数据报到子网以外"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#发送数据报到子网以外"}},[v._v("#")]),v._v(" 发送数据报到子网以外")]),v._v(" "),t("p",[v._v("路由器有几个接口，就有几个IP地址、ARP模块和适配器，假设一个路由器连着两个子网A、B. 子网A中的适配器要发往子网B中的适配器，先通过子网A的ARP把数据报发到子网A跟子网B相连的路由器（目的地址是路由器的MAC），路由器通过子网B的ARP将该数据报转发给目的适配器（目的地址是最终目的地的MAC）。")]),v._v(" "),t("h3",{attrs:{id:"以太网"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#以太网"}},[v._v("#")]),v._v(" 以太网")]),v._v(" "),t("p",[v._v("以太网是目前为止最流行的有线局域网技术")]),v._v(" "),t("p",[v._v("基于集线器的星形拓扑以太网安装: 主机和路由器就直接用双绞线与一台集线器相连")]),v._v(" "),t("ul",[t("li",[v._v("集线器是一种物理层设备，作用于比特而不是帧。当0或1的比特到达一个接口时，集线器只是重新生成这个比特，将其能量强度放大，并将该比特向其他所有接口传输出去")]),v._v(" "),t("li",[v._v("因此,采用基于集线器的星形拓扑以太网也是一个广播局域网")])]),v._v(" "),t("p",[v._v("早期基于集线器"),t("strong",[v._v("星形拓扑以太网")]),v._v("，现在位于中心的集线器被"),t("strong",[v._v("交换机")]),v._v("所取代。")]),v._v(" "),t("ul",[t("li",[v._v("交换机是无碰撞的存储转发分组交换机，运行在链路层")])]),v._v(" "),t("h4",{attrs:{id:"以太网帧结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#以太网帧结构"}},[v._v("#")]),v._v(" 以太网帧结构")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://i.loli.net/2020/11/19/hgXVyZdrvbPlqnk.png",alt:""}})]),v._v(" "),t("ul",[t("li",[v._v("数据字段（46~1500字节）：承载了IP数据报（如），超过1500字节的数据报需要分片；若小于46字节，需要填充到46字节")]),v._v(" "),t("li",[v._v("目的地址（6字节）：目的适配器的MAC地址。当目的适配器收到一个以太网帧，若目的地址是自己的MAC地址或广播地址，将数据字段传给网络层，其他则丢弃")]),v._v(" "),t("li",[v._v("源地址: 源适配器的MAC地址")]),v._v(" "),t("li",[v._v("类型字段：允许以太网复用多种网络层协议")]),v._v(" "),t("li",[v._v("CRC（4字节）：差错检测")]),v._v(" "),t("li",[v._v("前同步码（8字节）：以太网帧以一个8字节的前同步码开始，前7个字节用于唤醒接收适配器，同步发送方接收方时钟，第8个字节最后两个比特（11）警告目的适配器，重要内容来了")])]),v._v(" "),t("p",[v._v("以太网技术向网络层提供"),t("strong",[v._v("不可靠")]),v._v("、"),t("strong",[v._v("无连接")]),v._v("服务。一个帧无论是否通过CRC校验,都不发送返回信息,当不通过CRC,直接丢弃该帧。所以适配器A不知道传输的帧是否到达了B并通过CRC校验")]),v._v(" "),t("h4",{attrs:{id:"以太网技术"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#以太网技术"}},[v._v("#")]),v._v(" 以太网技术")]),v._v(" "),t("p",[v._v("早期10BASE-2和10BASE-5标准规定两种类型的同轴电缆的10Mbps以太网，每种标准限制在500米，通过转发器得到更长运行距离。    BASE表示基带以太网。前面的数字代表速率。T代表双绞线。F代表光纤。 100BASE-FX")]),v._v(" "),t("p",[v._v("今天的以太网，结点经点对点由双绞铜线或光纤构成的线段与一台交换机相连")]),v._v(" "),t("ul",[t("li",[v._v("10Gbps以太网，5类UTP线缆")]),v._v(" "),t("li",[v._v("线代交换机是"),t("strong",[v._v("全双工")]),v._v("的，一台交换机和一个结点能同时向对方发送帧而没有干扰。在基于交换机的以太局域网中，没有必要使用MAC协议了！")])]),v._v(" "),t("h3",{attrs:{id:"链路层交换机"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#链路层交换机"}},[v._v("#")]),v._v(" 链路层交换机")]),v._v(" "),t("p",[v._v("交换机的任务：")]),v._v(" "),t("ul",[t("li",[t("p",[v._v("接收入链路层帧，转发到出链路")])]),v._v(" "),t("li",[t("p",[v._v("交换机自身对子网中的主机和路由器是透明的, 顺利将帧发送进局域网，并不知道交换机干嘛")]),v._v(" "),t("ul",[t("li",[v._v("主机/路由器向另一个主机/路由器寻址一个帧(而不是向交换机寻址该帧)，顺利将帧发送进局域网")]),v._v(" "),t("li",[v._v("并不知道交换机会接收该帧并转发给另一个结点")])])]),v._v(" "),t("li",[t("p",[v._v("交换机输出接口设有缓存")])]),v._v(" "),t("li",[t("p",[v._v("交换机是"),t("strong",[v._v("即插即用设")]),v._v("备，管理员无需配置")])]),v._v(" "),t("li",[t("p",[v._v("交换机是"),t("strong",[v._v("双工")]),v._v("的，任何交换机接口能同时发送和接收")])])]),v._v(" "),t("h4",{attrs:{id:"交换机转发和过滤"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#交换机转发和过滤"}},[v._v("#")]),v._v(" 交换机转发和过滤")]),v._v(" "),t("ul",[t("li",[t("strong",[v._v("过滤")]),v._v(" "),t("ul",[t("li",[v._v("是决定一个帧应该转发到某个接口还是应当将其丢弃的交换机功能")])])]),v._v(" "),t("li",[t("strong",[v._v("转发")]),v._v(" "),t("ul",[t("li",[v._v("是决定一个帧应该被导向哪个接口,并吧该帧移动到那些接口的交换机功能")])])])]),v._v(" "),t("p",[v._v("交换机的过滤和转发借助于交换机表完成")]),v._v(" "),t("ul",[t("li",[v._v("包含局域网上某些主机和路由器的但不是全部的表项\n"),t("ul",[t("li",[v._v("MAC地址")]),v._v(" "),t("li",[v._v("通向该MAC地址的交换机接口")]),v._v(" "),t("li",[v._v("表项放置的时间")])])])]),v._v(" "),t("p",[t("strong",[v._v("假定目的地址为DD-DD-DD-DD-DD-DD的帧从交换机接口x到达，交换机用该MAC地址索引交换机表，有三种可能：")])]),v._v(" "),t("ul",[t("li",[v._v("表中没有该地址，交换机广播该帧")]),v._v(" "),t("li",[v._v("表中有表项将该地址与接口x联系起来，过滤掉，因为该帧从x来，DD也通过x去，说明该帧跟DD适配器在同一个局域网段，该帧已经在包含目的地的局域网网段广播过了")]),v._v(" "),t("li",[v._v("表中有表象将该地址与接口y≠x联系起来，该帧需要被转发到与接口y相连的局域网段，放到接口y前的输出缓存，完成转发功能")])]),v._v(" "),t("h4",{attrs:{id:"自学习"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#自学习"}},[v._v("#")]),v._v(" 自学习")]),v._v(" "),t("p",[v._v("交换机具有令人惊奇的特性: 表是自动、动态和自治地建立的, 没有来自网络管理员或配置协议的干预. 也就是说,交换机是"),t("strong",[v._v("自学习")]),v._v("的,通过如下方式实现")]),v._v(" "),t("ol",[t("li",[v._v("交换机表初始为空")]),v._v(" "),t("li",[v._v("对于每个接口接收到的每个入帧，交换机在其表中存储\n"),t("ol",[t("li",[v._v("该帧源MAC地址")]),v._v(" "),t("li",[v._v("帧到达的接口")]),v._v(" "),t("li",[v._v("当前时间")])])]),v._v(" "),t("li",[v._v("一段时间后(称为老化期)，交换机没有接受到以该地址作为源地址的帧，在表中删除该地址。如果一台PC被另一台PC代替，原来PC的MAC地址将被清除")])]),v._v(" "),t("h4",{attrs:{id:"链路层交换机的性质"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#链路层交换机的性质"}},[v._v("#")]),v._v(" 链路层交换机的性质")]),v._v(" "),t("ul",[t("li",[v._v("消除碰撞\n"),t("ul",[t("li",[v._v("交换机缓存帧并且不会在网段上同时传输多于一个帧，交换机提供了比广播链路局域网高的多的性能改善")])])]),v._v(" "),t("li",[v._v("异质的链路\n"),t("ul",[t("li",[v._v("交换机将链路彼此隔离，因此局域网中的不同链路能够以不同速率运行，在不同媒介上运行")])])]),v._v(" "),t("li",[v._v("网络管理\n"),t("ul",[t("li",[v._v("主动断开异常适配器")]),v._v(" "),t("li",[v._v("收集带宽使用的统计数据、碰撞率和流量类型，这些信息用来调试解决问题")])])])]),v._v(" "),t("p",[t("strong",[v._v("安全性")]),v._v("\n交换机毒化：向交换机发送大量不同伪造源MAC地址的分组，用伪造表项填满了交换机表，没有为合法主机留下空间，导致交换机广播大多数帧，被嗅探器俘获到")]),v._v(" "),t("h4",{attrs:{id:"交换机和路由器比较"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#交换机和路由器比较"}},[v._v("#")]),v._v(" ==交换机和路由器比较==")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://i.loli.net/2020/11/19/y2mz8YpKSBtbeGU.png",alt:""}})]),v._v(" "),t("p",[v._v("路由器是第三层的分组交换机，交换机是第二层的分组交换机")]),v._v(" "),t("p",[t("strong",[v._v("链路层交换机主要用在接入网中，路由器主要用在网络核心")])]),v._v(" "),t("p",[v._v("交换机：")]),v._v(" "),t("ul",[t("li",[v._v("交换机即插即用，相对高的分组过滤和转发速率")]),v._v(" "),t("li",[v._v("防止广播帧循环，交换网络的活跃拓扑限制为一颗生成树")]),v._v(" "),t("li",[v._v("大型交换网络要求在主机和路由器中有大的ARP表，生成大量ARP流量和处理量")]),v._v(" "),t("li",[v._v("对广播风暴不提供任何保护，使得以太网崩溃")])]),v._v(" "),t("p",[v._v("路由器：")]),v._v(" "),t("ul",[t("li",[v._v("分组不会被限制到生成树上，可以使用源到目的地的最佳路径，拓扑结构更加丰富")]),v._v(" "),t("li",[v._v("对第二层的广播风暴提供了防火墙保护")]),v._v(" "),t("li",[v._v("不是即插即用，需要人为配置IP地址")]),v._v(" "),t("li",[v._v("对分组处理时间较长，因为必须处理第三层字段")])]),v._v(" "),t("h5",{attrs:{id:"区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#区别"}},[v._v("#")]),v._v(" 区别:")]),v._v(" "),t("ul",[t("li",[v._v("工作层次不同：\n"),t("ul",[t("li",[v._v("交换机主要工作在数据链路层（第二层）")]),v._v(" "),t("li",[v._v("路由器工作在网络层（第三层）。")])])]),v._v(" "),t("li",[v._v("转发依据不同：\n"),t("ul",[t("li",[v._v("交换机转发所依据的对象时：MAC地址。（物理地址）")]),v._v(" "),t("li",[v._v("路由转发所依据的对象是：IP地址。（网络地址）")])])]),v._v(" "),t("li",[v._v("主要功能不同：\n"),t("ul",[t("li",[v._v("交换机主要用于组建局域网，")]),v._v(" "),t("li",[v._v("而路由主要功能是将由交换机组好的局域网相互连接起来，或者接入Internet。")]),v._v(" "),t("li",[v._v("交换机能做的，路由都能做。")]),v._v(" "),t("li",[v._v("交换机不能分割广播域，路由可以。")]),v._v(" "),t("li",[v._v("路由还可以提供防火墙的功能。")]),v._v(" "),t("li",[v._v("路由配置比交换机复杂。")])])])]),v._v(" "),t("ol",[t("li",[v._v("路由器可以给你的局域网自动分配IP，虚拟拨号，就像一个交通警察，指挥着你的电脑该往哪走，你自己不用操心那么多了。交换机只是用来分配网络数据的。")]),v._v(" "),t("li",[v._v("路由器在网络层，路由器根据IP地址寻址，路由器可以处理TCP／IP协议，交换机不可以。\n交换机在中继层，交换机根据MAC地址寻址。")]),v._v(" "),t("li",[v._v("路由器可以把一个IP分配给很多个主机使用，这些主机对外只表现出一个IP。交换机可以把很多主机连起来，这些主机对外各有各的IP。")]),v._v(" "),t("li",[v._v("路由器提供防火墙的服务，交换机不能提供该功能。集线器、交换机都是做端口扩展的，就是扩大局域网(通常都是以太网)的接入点，也就是能让局域网可以连进来更多的电脑。路由器是来做网间连接,也就是用来连接不同的网络。")]),v._v(" "),t("li",[v._v("举个例子:路由器相当于邮局，把信投递到收件人地址，它的任务就完成了。但是信邮到了你们宿舍楼,而这个地址不是你一-个人专享的，所以楼管王大爷还要负责把信给到你手里，他不会关心收件人地址，只看收件人姓名，然后打个内线电话叫你来取信。")])]),v._v(" "),t("h3",{attrs:{id:"虚拟局域网"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#虚拟局域网"}},[v._v("#")]),v._v(" 虚拟局域网")]),v._v(" "),t("p",[v._v("现代机构的局域网常常是配置为等级结构的: 每个工作组有自己的交换局域网,经过一个交换机等级结构与其他工作组的交换局域网互联. 这样的配置有3个缺点:")]),v._v(" "),t("ul",[t("li",[v._v("缺乏流量控制")]),v._v(" "),t("li",[v._v("交换机的无效使用")]),v._v(" "),t("li",[v._v("管理用户")])]),v._v(" "),t("p",[v._v("可以通过支持**虚拟局域网(VLAN)**的交换机来处理. 支持VLAN的交换机允许经一个单一的物理局域网基础设施定义多个蓄奴局域网"),t("br"),v._v("\n在一个VLAN内的主机彼此通信")]),v._v(" "),t("p",[v._v("在一个基于端口的VLAN中,交换机的端口(接口)由网络管理员划分为组. 每个组构成一个VLAN, 在每个VLAN中的端口形成一个广播域(一个VLNA = 一个广播域 = 一个逻辑子网)")]),v._v(" "),t("h2",{attrs:{id:"链路虚拟化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#链路虚拟化"}},[v._v("#")]),v._v(" 链路虚拟化")]),v._v(" "),t("ul",[t("li",[v._v("链路是连接两台通信主机间的信道")]),v._v(" "),t("li",[v._v("信道可以是一条物理链路，也可以是无线电频谱，交换以太网，乃至更复杂的电话网络等")]),v._v(" "),t("li",[v._v("即逻辑上简单的一条链路层链路，物理上可能是相当复杂的实体网络")])]),v._v(" "),t("h3",{attrs:{id:"多协议标签交换网络-mpls"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#多协议标签交换网络-mpls"}},[v._v("#")]),v._v(" 多协议标签交换网络(MPLS)")]),v._v(" "),t("p",[v._v("分组交换的虚电路网络，可以作为为因特网IP设备提供服务的链路层技术")]),v._v(" "),t("p",[v._v("产业界将虚电路技术综合进了数据报网络以改善IP路由器的转发速度")]),v._v(" "),t("p",[v._v("通过来自虚电路网络的一个关键概念—固定长度标签，"),t("strong",[v._v("多协议标签交换")]),v._v("进行演化,来改善lP路由器的转发速度")]),v._v(" "),t("ul",[t("li",[v._v("对于基于固定长度标签和虚电路的技术，在不放弃基于目的地IP数据报转发的基础设施的前提下，当可能时通过选择性地标识数据报并允许路由器基于固定长度的标签而非IP地址转发数据报以增强其功能")]),v._v(" "),t("li",[v._v("MPLS基于标签执行交换而不必考虑分组的IP地址")]),v._v(" "),t("li",[v._v("优点在于交换速度的潜在增加和流量管理能力")]),v._v(" "),t("li",[v._v("MPLS的流量管理能力使得网络运行者能超越IP路由选择，迫使流量沿特定路径移")]),v._v(" "),t("li",[v._v("MPLS已被用于实现虚拟专用网(VPN)")])]),v._v(" "),t("h2",{attrs:{id:"数据中心网络"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据中心网络"}},[v._v("#")]),v._v(" 数据中心网络")]),v._v(" "),t("p",[v._v("本节介绍用于云应用的数据中心网络；")]),v._v(" "),t("ul",[t("li",[v._v("数据中心的主机称作刀片，通常是含CPU，内存，磁盘的商用主机；")]),v._v(" "),t("li",[v._v("主机被堆叠在机架上，每个机架一般有20~40台刀片；")]),v._v(" "),t("li",[v._v("每个机架顶部有一台机架顶部交换机，其与该机架主机相连，并与数据中心的其它交换机相连；")]),v._v(" "),t("li",[v._v("数据中心网络包括内部主机间的流量和外部客户与内部主机间的流量；")])])])}),[],!1,null,null,null);_.default=s.exports}}]);