# 订阅发布模式

简称pub/sub，pub/sub模式是我们平时业务中经常会使用到的，sub会监听一类消息来达到pub发布的时候进行相应的逻辑处理

<p align="center">
    <img src="../assets/fabudingyue1.png" />
</p>

举个例子，比如页面上有个列表，当我们点击刷新的时候要更新列表，当我们添加一个数据的数据的要更新列表，当我们删除一个数据的时候要更新列表，这时候我们就可以用到pub/sub模式

好，我们来简单写个pub/sub模式

```js
var scope = (function() {
    //消息列表
    var events = {};
    return {
        //消息订阅
        on: function(name, handler) {
            var index;	//记录当前消息事件的索引
            //如果该消息已经存在，则将处理函数放到该消息的事件队列中
            if (events[name]) {
                index = events[name].push(handler) - 1;
            } else {
                //如果该消息已经不存在，则创建该消息的事件队列，并将处理函数放到该消息的事件队列中
                events[name] = [handler];
                index = 0;
            }
            //返回当前消息处理事件的移除函数
            return function() {
                events[name].splice(index, 1);
            }
        },
        //消息关闭
        off: function(name) {
            if (!events[name]) return;
            //如果该消息存在，则将该消息删除
            delete events[name];
        },
        //消息发布
        emit: function(name, msg) {
            //如果该消息不存在，不处理
            if (!events[name]) {
                return;
            }
            //该消息存在，将该消息事件队列中的事件都处理一遍
            events[name].forEach(function(v, i) {
                v(msg);
            })
        }
    }
})()

var remove = scope.on('refreshFileList', function(msg) {
    //处理逻辑
})

//点击刷新
var refresh = function () {
    scope.emit('refreshFileList')
}

//添加数据
var addItem = function () {
    scope.emit('refreshFileList')
}

//删除数据
var removeItem = function () {
    scope.emit('refreshFileList')
}

var destroy = function () {
    remove();	//移除refreshFileList中对应的事件
    scope.off('refreshFileList');	//移除refreshFileList
}
```