# HTML5 API

## canvas

canvas标签可以让我们通过js来绘制图形，如果浏览器不支持canvas，那么其包裹的内容会被显示出来，这样我们可以通过内容来告诉用户浏览器不支持

## Audio和Video

Audio和Video一般放在一起讨论，Audio和Video可以让我们的页面支持音视频，提升内容的丰富性

## Geolocation

geolocation可以通过navigator获得，我们可以通过geolocation来获取用户的位置（用户允许的前提条件下）

## WebSocket

通过WebSocket我们可以和服务端建立双向连接，服务端可以主动推送消息到客户端，客户端也可以主动发送消息到服务端，典型的比如聊天室就可以你用WebSocket来实现

## Web Storage

Web Storage 提供了两种存储机制，并且能提供的存储量比 cookie （4K左右）更大，5M左右（每个浏览器的数值略有差异）：
* sessionStorage : sessionStorage 仅存活在会话页面的打开期间，当会话页面被关闭后它会被清除
* localStorage : localStorage 中存储的数据只要用户不是手动清楚则会一直存在

## postMessage

postMessage 给我们提供了跨页面跨源通信的能力

## Web Workers

在js单线程的基础上，可以使用 Web Workers 当初开辟出一个 Worker 线程，除了不能操作 DOM 和使用一些 windows 的属性和方法外，可以运行任意的代码

## requestAnimationFrame

在以往开发中我们通过 setInterval 来实现一个动画，但是遇到一些复杂的动画往往 setInterval 的实现会使页面卡顿（掉帧），主要原因是js单线程的运行下， setInterval 会阻塞页面的其他操作，而 requestAnimationFrame 会优化我们动画，保持可见动画的流畅度，和浏览器的绘制保持一致

---

来源参考：

[HTML5 API大盘点](http://jartto.wang/2016/07/25/make-an-inventory-of-html5-api/)

[MDN &lt;canvas&gt;](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas)



