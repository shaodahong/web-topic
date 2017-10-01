# all和apply

```js
fn.call(isThis, arg1, arg2, ....)
```

```js
fn.apply(isThis, [arg1, arg2, ....])
```

相同点：

1. 改变this指向
2. 可以传参
3. 立即调用

区别：

1. apply接收一个数组参数，call直接接收参数
2. apply的性能会比call差，因为要对数组参数进行判断和解构，但是性能的差距可以忽略不计。在有些场景下apply是比call更好用的

模拟实现：

```js
Function.prototype.callLike = function (isThis) {
    isThis = isThis || window;
    isThis.fn = this;
    var args = [];
    for (var i = 1, l = arguments.length; i< l; i++) {
        args.push(arguments[i]);
    }
    var result = eval('isThis.fn(' + args.join() + ')');
    delete isThis.fn;
    return result;
}
```

```js
Function.prototype.applyLike = function (isThis, args) {
    isThis = isThis || window;
    isThis.fn = this;
    var result = eval('isThis.fn(' + args.join() + ')');
    delete isThis.fn;
    return result;
}
```