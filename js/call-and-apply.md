# call和apply

```js
fn.call(isThis, arg1, arg2, ....)
```

```js
fn.apply(isThis, [arg1, arg2, ....])
```

相同点：

1. 改变 this 指向
2. 可以传参
3. 立即调用

区别：

1. apply 接收一个数组参数，call 直接接收参数
2. apply 的性能会比call差，因为要对数组参数进行判断和解构

模拟实现：

```js
Function.prototype.callLike = function (isThis) {
    //...
}

Function.prototype.applyLike = function (isThis) {
    //...
}
```

1. 传递的 isThis 如果是 undefined 或者 null，那么 this 就是 window，否则传递进来的就是要指向的this
2. call 从第二个参数开始就是要调用时用到参数
3. apply 的第二个参数为数组，数组中的元素就是调用时用到参数

第一个条件很简单，判断下 isThis 的类型即可

```js
isThis = typeof isThis === 'undefined' || isNull(isThis) ? window : isThis;


function isNull (value) {
    return typeof value === 'object' && !value === true
}
```

第二个条件和第三个条件是一样的，call 的参数我们需要处理下，因为我们预期不到它的参数个数

我们从第二个参数开始遍历一遍 arguments，然后放到一个数组里面去

```js
var args = [];
for (var i = 1, l = arguments.length; i< l; i++) {
    args.push(arguments[i]);
}
```

但是最关键的调用怎么办呢，怎么改变 this 的指向，一般来说谁调用谁就是 this，我们要想改变 this，那么就要用传递进来的 isThis 来调用

```js
isThis.fn = this;
isThis.fn();
delete isThis.fn;
```

这样的话就改变了 this 的指向，之后再 delete 掉，就 ok 了，但是这里会有一个问题，如果传递进来的是值类型呢，值类型我们是不能给它添加属性和方法的，所以 `isThis.fn()` 肯定会提示 `isThis.fn is not a function`，这里我们可以想一想值类型也是可以像对象一样有属性和方法的，并且可以添加属性和方法，但是为什么赋值完后就找不到呢

这里要说下包装类型了，值类型按理说是不可能有自己的属性和方法的，但是考虑到有时候需要处理下杂七杂八的琐事，所以当我们访问或者赋值的时候，它会临时给我们创建一个对应的包装对象，在我们访问或者赋值结束后那么这个包装对象就会被清理掉，那么我们就可以这样做，来模拟下包装对象

```js
var valueType = typeof isThis;
if (valueType === 'string') {
    isThis = new String(isThis)
}else if (valueType === 'number') {
    isThis = new Number(isThis)
}else if (valueType === 'boolean') {
    isThis = new Boolean(isThis)
}else if (valueType === 'symbol') {
    isThis = Object(isThis)
}
```

恩，这样一来就差不多了，接下来看看传参，args 的元素才是我们想要的参数，所以怎么拆开

```js
var result = eval('isThis.fn(' + args.join() + ')');
```

使用 eval，得益于 eval 强大的能力，我们可以把字符串当做 js 代码来执行，并且可以得到返回值，完美

但是这里会有一个问题，如果参数是个对象，那么 eval 对参数 toString 后我们我们就得不到想要的参数了，所以这里改造下，因为 eval 可以动态的改变作用域

```js
var args = [];
for (var i = 1, l = arguments.length; i< l; i++) {
    args.push('arguments[' + i  + ']');
}
var result = eval('isThis.fn(' + args.join() + ')');
```

这里我们用 args 存放着 arguments[1] arguments[1]... 这样的字符串，那么 eval 执行的时候会在上下文查找并绑定所需要的变量，这样就可以实现参数传递了

完整代码：

```js
Function.prototype.callLike = function (isThis) {
    isThis = typeof isThis === 'undefined' || isNull(isThis) ? window : isThis;

    var valueType = typeof isThis;
    if (valueType === 'string') {
        isThis = new String(isThis)
    }else if (valueType === 'number') {
        isThis = new Number(isThis)
    }else if (valueType === 'boolean') {
        isThis = new Boolean(isThis)
    }else if (valueType === 'symbol') {
        isThis = Object(isThis)
    }
    
    isThis.fn = this;

    var args = [];
    for (var i = 1, l = arguments.length; i< l; i++) {
        args.push('arguments[' + i  + ']');
    }

    var result = eval('isThis.fn(' + args.join() + ')');
    delete isThis.fn;

    function isNull (value) {
        return typeof value === 'object' && !value === true
    }

    return result;
}
```

```js
Function.prototype.applyLike = function (isThis, args) {
    isThis = typeof isThis === 'undefined' || isNull(isThis) ? window : isThis;

    var valueType = typeof isThis;
    if (valueType === 'string') {
        isThis = new String(isThis)
    }else if (valueType === 'number') {
        isThis = new Number(isThis)
    }else if (valueType === 'boolean') {
        isThis = new Boolean(isThis)
    }else if (valueType === 'symbol') {
        isThis = Object(isThis)
    }
    
    isThis.fn = this;

    var args = [];
    for (var i = 1, l = arguments.length; i< l; i++) {
        args.push('arguments[' + i  + ']');
    }
    
    var result = eval('isThis.fn(' + args.join() + ')');
    delete isThis.fn;

    function isNull (value) {
        return typeof value === 'object' && !value === true
    }

    return result;
}
```