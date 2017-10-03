# bind实现

bind 经常会被拿来和 [call和apply](/js/call-and-apply.md) 做比较，这三种方法都可以改变 this 的指向，并且接收参数，不同的是bind并不会立即调用，他会返回一个改变了 this 的新函数，我们来实现下：

1. 改变 this 指向
2. 接收参数，bind 传参方式是比较特别的，调用 bind 的时候可以传参并且绑定函数也可以传参
3. 不会立即调用，而是返回一个改变了 this 的新函数

```js
Function.prototype.bindLike = function (isThis) {
    var that = this;
    var args = Array.prototype.slice.call(arguments, 1);

    return function () {
        return that.apply(isThis, args.concat(Array.prototype.slice.call(arguments)))
    }
}
```

我们利用[闭包](/js/bi-bao.md)的结构来实现，内部通过 apply 来改变 this 的指向，参数我们吧 arguments 转为真数组后使用 concat 进行拼接，并且 apply 也完美的帮我们解决了参数的问题

但是 bind 的绑定函数还可以被当做构造函数来使用，这时候this就会失效，但是会继承 bind 调用函数的原型链，好，我们来实现下:

```js
Function.prototype.bindLike = function (isThis) {
    var that = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fnOP = function() {};

    var fn =  function () {
        // 我们用 instanceof 来判断函数的调用，如果是 new 来调用，那么 this instanceof fn === true
        return that.apply(this instanceof fn ? this : isThis, args.concat(Array.prototype.slice.call(arguments)))
    }

    // 改造下原型，这里为什么要多加个 fnOP 步骤呢，因为 js 里面的对象赋值是引用赋值，这样牵一发而动全身
    fnOP.prototype = this.prototype;
    fn.prototype = new fnOP();

    return fn;
}
```

---

来源参考：

[MDN bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

