# 浏览器内核

浏览器内核也叫渲染引擎，除了渲染引擎还有 JS 引擎，JS 引擎耳熟能详的应该就是 V8 了，也正是有了 V8 前端才能像今天这样热门

作为前端，不管是手机还是 PC 上浏览器就是我们的根据地，我们要在这根据地上规划美好蓝图，那我们必不可少的要对它有一点认知

目前主流的浏览器 IE、FF、Safari、Chrome、Opera，当然还有国内的一些比如 QQ 浏览器、360浏览器、UC 浏览器和搜狗浏览器等等, [statcounter](http://gs.statcounter.com/browser-market-share) 数据显示 Chrome、Safari 和 FF 在全球浏览器的总市场占有率将近75%

![浏览器内核](/assets/liulanqineihe1.png)

浏览器|内核|JS引擎
-       |   -       |   -
IE      |   Trident |   Chakra
Chrome  |   Blink   |   V8
FF      |   Gecko   |   SpiderMonkey
Safari  |   Webkit  |   JavaScriptCore
Opera   |   Presto  |   Carakan

不同的内核和 JS 引擎对代码的执行效果也是不同的，毕竟不是同一家厂商，处理起来肯定会有所差异，这就涉及到浏览器兼容了